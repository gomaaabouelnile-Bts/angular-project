import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GridApi } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CustomerService } from 'src/app/api.service/customer/customer-service';
import {ModuleRegistry} from "@ag-grid-community/core";
import {ExcelExportModule} from '@ag-grid-enterprise/excel-export';


import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { SalesRepService } from 'src/app/api.service/codes-service/sales-rep.service';
import { CustomerVisitsService } from 'src/app/api.service/codes-service/customer-visits.service';
import { GetAllVisits } from 'src/app/Interfaces/View/get-all-visits';
import { CustimerIDs } from 'src/app/Interfaces/View/custimer-ids';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Component({
  selector: 'app-total-visits-rep',
  templateUrl: './total-visits-rep.component.html',
  styleUrls: ['./total-visits-rep.component.css']
})
export class TotalVisitsRepComponent implements OnInit {


  //#region  Excel
  public exportAsExcelFile(json: any[], excelFileName: string): void {

    const myworksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const myworkbook: XLSX.WorkBook = { Sheets: { 'data': myworksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(myworkbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_exported' + EXCEL_EXTENSION);
  }

  ExportExcel(): void {
    if (this.ReportName != "") {
      this.spinner.show();
      /* var params = {
        allColumns:  true,
        columnGroups:true,
        fileName: this.ReportName
    };
    this.agGrid.gridOptions.api.exportDataAsExcel(params);
     this.gridApi.api.ExportExcel(params); */
      this.exportAsExcelFile(this.FilteredList, this.ReportName);
      this.ReportName = "";
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
    }
    else {
      
      alert("من فضلك ادخل اسم التقرير");
    }


  }
  //#endregion




  ReportName: string = "";
  CustomerID: number = 0;
  SalesID: number = 0;
  FromDate: any;
  ToDate: any;
  AllSales: any;
  AllCustomers: any;
  
  FilteredList: GetAllVisits[] = [];
  selectedobj: GetAllVisits;
  obj: GetAllVisits;

  AllTotalVisits: any;
  TotalVisits: any[] = [];
  SalesCustomersList: CustimerIDs[] = [];
  VisitDetails: any[] = [];

  showSecondGrid: boolean = false;

  rowData: any;
  rowData2: any;
  rowSelection = 'single';

  isSubmitted = false;
  private gridApiOption;
  public defaultColDef;
  private gridApi;
  public api: GridApi;
  private gridApi2;
  public api2: GridApi;
  title: string;
  modalRef: BsModalRef;
  public Rtl = localStorage.getItem('textDir') === 'ltr' ? false : true;
  @ViewChild('agGrid') agGrid: AgGridAngular;
  @ViewChild('agGrid2') agGrid2: AgGridAngular;
  columnDefs = [
    { headerName: this.Rtl ? 'الزيارات' : 'Visits', field: 'visitsNo', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'العميل ' : 'Customer', field: 'customerName', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'المندوب ' : 'Sales Representative', field: 'salesRepName', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'المحافظه' : 'Governorate', field: 'governorateName', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'المنطقه' : 'Region', field: 'regionName', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'الاقليم' : 'Territory', field: 'territoryName', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'القطاع' : 'Sector', field: 'sectorName', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'المركز' : 'Address', field: 'adress', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'المعرض' : 'Company', field: 'companyName', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'التصنيف' : 'Class', field: 'cclName', width: 200, sortable: true, filter: true },
  ];

  columnDefs2 = [
    { headerName: this.Rtl ? 'العميل ' : 'Customer', field: 'customerName', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'المندوب ' : 'Sales Representative', field: 'salesRepName', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'التصنيف' : 'Class', field: 'cclName', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'التاريخ' : 'Date', field: 'date', width: 200, sortable: true, filter: true },
  ];

  constructor(public CustomerVisitsServ: CustomerVisitsService, public obserCustomer: CustomerService, public CustomerServ: CustomerService, public SerSalesRep: SalesRepService,
    private spinner: NgxSpinnerService, private translate: TranslateService,
    private modalService: BsModalService) {
    this.defaultColDef = { resizable: true };
  }

  ngOnInit(): void {

    this.resetObj();

    this.ToDate = new Date().toJSON().slice(0, 10);

    this.obserCustomer.GetAlldata().subscribe(res => {
      this.AllCustomers = res;
    });

    this.SerSalesRep.GetAlldata().subscribe(res => {
      this.AllSales = res;
    });

    this.CustomerVisitsServ.GetAllVisits().subscribe(res => {
      this.AllTotalVisits = res;
    });

    this.CustomerVisitsServ.CustomerVisitsView().subscribe(res => {
      this.TotalVisits = res;
    });

  }

  resetObj() {
    this.obj = {
      customerCode: 0,
      customerName: null,
      customerLatName: null,
      salesRepId: 0,
      salesRepName: null,
      salesRepLatName: null,
      visitsNo: 0

    }
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApiOption=params.api
    this.FilteredList = [];
    this.agGrid.gridOptions.api.setRowData(this.FilteredList);
  }

  onGridReady2(params) {

    this.gridApi2 = params.api;

    this.VisitDetails = [];
    this.agGrid2.gridOptions.api.setRowData(this.VisitDetails);

  }
  

  Filter() {
    this.FilteredList = [];

    this.showSecondGrid = false;

    if (this.FromDate == null && this.CustomerID == 0 && this.SalesID == 0) {
      this.FilteredList = this.AllTotalVisits;
    }
    if (this.FromDate != null) {
      this.CustomerVisitsServ.GetVisitsByTime(this.FromDate, this.ToDate).subscribe(res => {
        res.forEach(element => {
          this.FilteredList.push(element);
          if (this.SalesID == 0 && this.CustomerID == 0) {
            this.agGrid.gridOptions.api.setRowData(this.FilteredList);
          }
        });
        if (this.SalesID != 0) {
          let copyList: any[] = [];
          copyList = this.FilteredList;
          this.FilteredList = [];
          copyList.forEach(element => {
            if (element.salesRepId == this.SalesID) {
              this.FilteredList.push(element);
            }
          });
          if (this.CustomerID == 0) {
            this.agGrid.gridOptions.api.setRowData(this.FilteredList);
          }
        }

        if (this.CustomerID != 0) {
          if (this.SalesID != 0 || this.FromDate != null) {
            let copyList: any[] = [];
            copyList = this.FilteredList;
            this.FilteredList = [];
            copyList.forEach(element => {
              if (element.customerCode == this.CustomerID) {
                this.FilteredList.push(element);
              }
            });
          }
          this.agGrid.gridOptions.api.setRowData(this.FilteredList);


        }
      });
    }
    else {
      if (this.SalesID != 0) {

        let count: number;
        this.SalesCustomersList.forEach(element => {
          count = 0;
          this.TotalVisits.forEach(CVelement => {
            if (CVelement.customerCode == element.customerCode) {

              if (count == 0) {
                this.obj.customerCode = CVelement.customerCode;
                this.obj.customerName = CVelement.customerName;
                this.obj.salesRepName = CVelement.salesRepName;
                this.obj.salesRepId = CVelement.salesRepId;
                this.obj.customerLatName = CVelement.customerLatName;
                this.obj.salesRepLatName = CVelement.salesRepLatName;
              }
              count = count + CVelement.visitsNo;
            }
          });
          this.obj.visitsNo = count;
          this.FilteredList.push(this.obj);
          this.resetObj();
        });

      }

      if (this.CustomerID != 0) {
        if (this.SalesID != 0) {
          let copyList: any[] = [];
          copyList = this.FilteredList;
          this.FilteredList = [];
          copyList.forEach(element => {
            if (element.customerCode == this.CustomerID) {
              this.FilteredList.push(element);
            }
          });
        }
        else {

          let count: number = 0;
          this.TotalVisits.forEach(CVelement => {
            if (CVelement.customerCode == this.CustomerID) {

              if (count == 0) {
                this.obj.customerCode = CVelement.customerCode;
                this.obj.customerName = CVelement.customerName;
                this.obj.salesRepName = CVelement.salesRepName;
                this.obj.salesRepId = CVelement.salesRepId;
                this.obj.customerLatName = CVelement.customerLatName;
                this.obj.salesRepLatName = CVelement.salesRepLatName;
              }
              count = count + CVelement.visitsNo;
            }
          });
          this.obj.visitsNo = count;
          this.FilteredList.push(this.obj);
          this.resetObj();

        }

      }
    }
    this.agGrid.gridOptions.api.setRowData(this.FilteredList);
  }

  onChangeSelectionByCustomer(selected) {
    this.CustomerID = parseInt(selected);
  }

  onChangeSelectionCustomerBySalesID(selected) {
    this.SalesID = parseInt(selected);

    this.CustomerVisitsServ.GetSalesCustomers(this.SalesID).subscribe(res => { this.SalesCustomersList = res; });
  }

  view() {


    this.showSecondGrid = true;
    this.VisitDetails = [];
    this.agGrid2.gridOptions.api.setRowData(this.VisitDetails);
    const selectedRows = this.gridApi.getSelectedRows();
    this.selectedobj = selectedRows[0];

  


    this.TotalVisits.forEach(element => {


      if (this.selectedobj.customerCode == element.customerCode && this.selectedobj.salesRepId == element.salesRepId) {
        if (this.FromDate == null) {
          this.VisitDetails.push(element);

        }
        else {
          if (element.date >= this.FromDate && element.date <= this.ToDate) {
            this.VisitDetails.push(element);
          }

        }


      }
    });
    this.agGrid2.gridOptions.api.setRowData(this.VisitDetails);


  }

  hide() {
    this.modalRef.hide();
  }

}

