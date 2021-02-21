import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GridApi } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CustomerService } from 'src/app/api.service/customer/customer-service';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { ProductGroupService } from 'src/app/api.service/codes-service/ProductGroup.service';
import { CustomerProductGroupService } from 'src/app/api.service/customer/CustomersProductGroup-service';
import { GovernorateService } from 'src/app/api.service/codes-service/governorate-service.service';
import { RegionService } from 'src/app/api.service/codes-service/region-service.service';
import { SectorService } from 'src/app/api.service/codes-service/Sector.service';
import { TerritoryService } from 'src/app/api.service/codes-service/territory.service';
import { element } from 'protractor';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AllColumnsCustomerProductGroup } from 'src/app/Interfaces/View/all-columns-customer-product-group';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Component({
  selector: 'app-cust-procuct-grep',
  templateUrl: './cust-procuct-grep.component.html',
  styleUrls: ['./cust-procuct-grep.component.css']
})
export class CustProcuctGRepComponent implements OnInit {

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

  ExportExcel(List): void {
    if(this.ReportName!="")
    {
      this.spinner.show();
      this.exportAsExcelFile(List, this.ReportName);
      this.ReportName="";
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
    }
    
    else
    {
      alert("من فضلك ادخل اسم التقرير");
    }
    
  }
  //#endregion


ReportName:string="";
CustClass: any[] = [];
CustID:any=0;
CustomerClassViewList:AllColumnsCustomerProductGroup[]=[];
CustomerClassViewElement:AllColumnsCustomerProductGroup;
ChoosenProductGroupList: any[]=[];

Governorate:any;
Region:any;
Territory:any;
Sector:any;

Gid:any=0;
Rid:any=0;
Sid:any=0;
Tid:any=0;


dropdownSettings2: IDropdownSettings = {};
FilteredList:any[]=[];
Total:any;


rowData: any;
rowData2:any;
rowSelection = 'single';

isSubmitted = false;
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
{ headerName: this.Rtl ? 'العميل' : 'Customer', field: 'customerName', width: 200, sortable: true, filter: true },
 { headerName: this.Rtl ? 'المحافظه' : 'Governorate', field: 'governorateName', width: 200, sortable: true, filter: true },
 { headerName: this.Rtl ? 'المنطقه' : 'Region', field: 'regionName', width: 200, sortable: true, filter: true },
 { headerName: this.Rtl ? 'الاقليم' : 'Territory', field: 'territoryName', width: 200, sortable: true, filter: true },
 { headerName: this.Rtl ? 'القطاع' : 'Sector', field: 'sectorName', width: 200, sortable: true, filter: true },
 { headerName: this.Rtl ? 'المركز' : 'Address', field: 'adress', width: 200, sortable: true, filter: true },
 { headerName: this.Rtl ? 'المعرض' : 'Company', field: 'company', width: 200, sortable: true, filter: true },
 { headerName: this.Rtl ? 'اصناف التعاملات' : 'Product Group', field: 'productGroupName', width: 600, sortable: true, filter: true },
 
 { headerName: this.Rtl ? 'الاجمالي' : 'Total', field: 'total', width: 150, sortable: true, filter: true },
];

columnDefs2 = [
  { headerName: this.Rtl ? 'التصنيف' : 'Group', field: 'groups', width: 200, sortable: true, filter: true },
  { headerName: this.Rtl ? 'الاجمالي' : 'Total', field: 'total', width: 200, sortable: true, filter: true },
];

constructor(public RegionServ:RegionService,public SectorServ:SectorService,public TerritoryServ:TerritoryService,
  public GovernorateServ:GovernorateService,public ProductGroupServ:ProductGroupService, public CustomerProductGroupServ:CustomerProductGroupService,
  private spinner: NgxSpinnerService, private translate: TranslateService,
  private modalService: BsModalService) {
  this.defaultColDef = { resizable: true };
}

ngOnInit(): void {
  
  this.ProductGroupServ.GetAlldata().subscribe(res=>{
    this.CustClass=res;
  });

  this.GovernorateServ.GetAlldata().subscribe(res=>{
    this.Governorate=res;
  });

  this.TerritoryServ.GetAlldata().subscribe(res=>{
    this.Territory=res;
  });

  this.dropdownSettings2 = {
    singleSelection: false,
    idField: 'productGroupId',
    textField: 'productGroupName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 4,
    allowSearchFilter: true
  };

  this.reset();
 
}
reset(){
  this.CustomerClassViewElement={
    customerId:0,
    customerName:'',
    territoryName: "",
    sectorName: "",
    governorateName: "",
    regionName: "",
    productGroupName: "",
    productGroupID: 0,
    company : "",
    adress : "",
    territoryID: 0,
    sectorID: 0,
    governorateID: 0,
    regionID: 0,
    total:0,
  }
}

onGridReady(params) {
  
  this.gridApi = params.api;
  this.CustomerProductGroupServ.CustomerProductGroupViews().subscribe(res=>{
    this.CustomerProductGroupServ.TotalCustomerProductsViews().subscribe(res1=>{
      res.forEach(element => {
        res1.forEach(element1 => {
          if(element.customerId==element1.customerId)
          {
            this.CustomerClassViewElement.customerId=element1.customerId;
            this.CustomerClassViewElement.customerName=element.customerName;
            this.CustomerClassViewElement.territoryName=element.territoryName;
            this.CustomerClassViewElement.sectorName=element.sectorName;
            this.CustomerClassViewElement.governorateName=element.governorateName;
            this.CustomerClassViewElement.regionName=element.regionName;
            this.CustomerClassViewElement.productGroupName=element.productGroupName;
            this.CustomerClassViewElement.productGroupID=element.productGroupID;
            this.CustomerClassViewElement.company=element.company;
            this.CustomerClassViewElement.adress=element.adress;
            this.CustomerClassViewElement.territoryID=element.territoryID;
            this.CustomerClassViewElement.sectorID=element.sectorID;
            this.CustomerClassViewElement.governorateID=element.governorateID;
            this.CustomerClassViewElement.regionID=element.regionID;
            this.CustomerClassViewElement.total=element1.total;

            this.CustomerClassViewList.push(this.CustomerClassViewElement);
            this.reset();



          }
          
        });
        
      });

    
    });
  });
  
  this.FilteredList=[];
  this.agGrid.gridOptions.api.setRowData(this.FilteredList);
  
}

onGridReady2(params) {

  this.gridApi2 = params.api;

  this.Total = [];
  this.agGrid2.gridOptions.api.setRowData(this.Total);
  this.CustomerProductGroupServ.TotalForTotalViews().subscribe(res=>{
    this.Total=res;
    this.agGrid2.gridOptions.api.setRowData(this.Total);
  });

}

Filter(){
  this.FilteredList=[];

  
  if(this.ChoosenProductGroupList.length!=0)
  {
    this.ChoosenProductGroupList.forEach(Lelement => { 

      this.CustomerClassViewList.forEach(element => {
        if(element.productGroupID==Lelement.productGroupId)
        {
          this.FilteredList.push(element);
        }
        
      });
    });
    
  }

  if(this.Gid!=0)
  {
    if(this.ChoosenProductGroupList.length !=0)
    {
      let CopyList=this.FilteredList;
      this.FilteredList=[]
      CopyList.forEach(element => {
        if(element.governorateID==this.Gid)
        {
          this.FilteredList.push(element);
        }
        
      });

    }
    else
    {
      this.CustomerClassViewList.forEach(element => {
        if(element.governorateID==this.Gid)
        {
          this.FilteredList.push(element);
        }
        
      });
    }
    if(this.Rid!=0)
    {
      let copyList=this.FilteredList;
      this.FilteredList=[];
      copyList.forEach(element => {
        if(element.regionID==this.Rid)
        {
          this.FilteredList.push(element);
        }
      }); 
    }
  }

  if(this.Tid!=0)
  {
    if(this.ChoosenProductGroupList.length!=0 || this.Gid !=0)
    {
      let CopyList=this.FilteredList;
      this.FilteredList=[]
      CopyList.forEach(element => {
        if(element.territoryID==this.Tid)
        {
          this.FilteredList.push(element);
        }
        
      });

    }
    else
    {
      this.CustomerClassViewList.forEach(element => {
        if(element.territoryID==this.Tid)
        {
          this.FilteredList.push(element);
        }
        
      });
    }
    if(this.Sid!=0)
    {
      let copyList=this.FilteredList;
      this.FilteredList=[];
      copyList.forEach(element => {
        if(element.sectorID==this.Sid)
        {
          this.FilteredList.push(element);
        }
        
      });
    }
  }

  if(this.ChoosenProductGroupList.length==0&&this.Tid==0&&this.Sid==0&&this.Rid==0&&this.Gid==0)
  {
    this.FilteredList=this.CustomerClassViewList;
  }
  let id = [];
  this.FilteredList.forEach(element => {

    if (!id.includes(element.customerId)) {
      id.push(element.customerId);
    }

  });
  
  let Copy = this.FilteredList;
  this.FilteredList = [];
  var i = -1;

  id.forEach((idelement, index) => {
    var x = {
      customerName: '',
      customerClassName: '',
      adress: '',
      sectorName: '',
      regionName: '',
      governorateName: '',
      territoryName: '',
      company: '',
      productGroupName:'',
      total:0
    };
    Copy.forEach(Listelement => {
      if (idelement == Listelement.customerId) {
        if (i != index) {
          x.customerName = Listelement.customerName;
          x.customerClassName = Listelement.customerClassName;
          x.adress = Listelement.adress;
          x.sectorName = Listelement.sectorName;
          x.regionName = Listelement.regionName;
          x.governorateName = Listelement.governorateName;
          x.territoryName = Listelement.territoryName;
          x.company = Listelement.company;
          x.total = Listelement.total;
          
          i = i + 1;
        }

        x.productGroupName=x.productGroupName+","+ Listelement.productGroupName;

      }
    });
    this.FilteredList.push(x);
  });
  
  this.agGrid.gridOptions.api.setRowData(this.FilteredList);

}

onChangeSelectionCustomerClass(selected) {
  this.CustID=parseInt(selected);
}

onChangeSelectionR(selected) {
  this.Rid = parseInt(selected);
 
}

onChangeSelectionG(selected) {
  this.Gid = parseInt(selected);
  this.RegionServ.getone(this.Gid).subscribe(res=>{
    this.Region=res;
  });
 
}

onChangeSelectionT(selected) {
  this.Tid = parseInt(selected);
  this.SectorServ.getone(this.Tid).subscribe(res=>{
    this.Sector=res;
  });
 
}

onChangeSelectionS(selected) {
  this.Sid=parseInt(selected);
}


}

