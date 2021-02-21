import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { NoteTypeService } from 'src/app/api.service/codes-service/NoteType.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-note-type',
  templateUrl: './note-type.component.html',
  styleUrls: ['./note-type.component.css']
})
export class NoteTypeComponent implements OnInit {

  rowData: any;
  rowSelection = 'single';
  isSubmitted = false;
  public defaultColDef;
  private gridApi;
  title: string;
  modalRef: BsModalRef;
  // tslint:disable-next-line: triple-equals
  public Rtl = localStorage.getItem('textDir') == 'ltr' ? false : true;
  @ViewChild('agGrid') agGrid: AgGridAngular;
  columnDefs = [
    {headerName: this.Rtl ? 'الكود' : 'Note Type Id', field: 'noteTypeId',  width: 150 , sortable: true, filter: true},
   // tslint:disable-next-line: max-line-length
   { headerName: this.Rtl ? 'الوصف العربى' : 'Note Type Name', field: 'noteTypeName',  width: 300 , sortable: true, filter: true},
    // tslint:disable-next-line: max-line-length
    {headerName: this.Rtl ? 'الوصف الانجليزى' : 'Note Type LatName', field: 'noteTypeLatName',  width: 300 , sortable: true, filter: true}
  ];
  constructor(public obserNoteType: NoteTypeService, private spinner: NgxSpinnerService
    ,         private translate: TranslateService, private modalService: BsModalService) {
    this.defaultColDef = { resizable: true };
  }

  ngOnInit( ): void {
    this.reset();
    this.rowData = this.obserNoteType.GetAlldata();
  }
  reset()
  {
    this.obserNoteType.obInNoteType =
    {
      noteTypeName: null,
      noteTypeLatName: null,
      createUserid: null,
      dateAndTime: null,
      noteTypeId: 0
    };
    this.gridApi?. deselectAll();

  }
  onSubmit(f: NgForm)
  {
       this.spinner.show();
       this.isSubmitted = f.invalid;
       if (!this.isSubmitted)
    {
      if (this.obserNoteType.obInNoteType.noteTypeId == null ||
        // tslint:disable-next-line: triple-equals
        this.obserNoteType.obInNoteType.noteTypeId == 0)
        {
this.obserNoteType.postdata().subscribe(res => {
  this.rowData = this.obserNoteType.GetAlldata();
  this. hide();
  setTimeout(() => {
    this.spinner.hide();
  }, 1000);

}
, err => {
console.log(err);
setTimeout(() => {

  this.spinner.hide();
}, 1000);
});
}
else{
  this.obserNoteType.putdata().subscribe(res => {
    this.rowData = this.obserNoteType.GetAlldata();
    this. hide();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }
  , err => {
  console.log(err);
  setTimeout(() => {
    this.spinner.hide();
  }, 1000);
  } );
}
    }
       setTimeout(() => {

  this.spinner.hide();
}, 1000);

}
Delete(index: number)
{
  if (confirm('Are you sure to delete')) {
    {
this.obserNoteType. Delete(index).subscribe((data) =>
{
  this.rowData = this.obserNoteType.GetAlldata();
  this.hide();
    }

);
}
  }
}
deleteSelectedRows() {
  const alertRow  = this.gridApi.getSelectedRows();
  this.agGrid.api.updateRowData({remove: [alertRow[0]]});
  this.reset();
}
onSelectionChanged(params) {

  const selectedRows = this.gridApi.getSelectedRows();
  if (selectedRows != null && selectedRows.length === 1)
  {
  this.obserNoteType.obInNoteType = selectedRows [0]
  }
}
onGridReady(params) {
  this.gridApi = params.api;
  this.rowData = this.obserNoteType.GetAlldata();
}

hide()
{
  this. modalRef.hide();
}
Addnewrecord(template: TemplateRef<any>)
{
  this.reset();
  this.title = 'Add';
  this.modalRef = this.modalService.show(template);
}
UpdateRecord(template: TemplateRef<any>)
{
  const selectedRows = this.gridApi.getSelectedRows();
  if (selectedRows != null && selectedRows.length === 1)
  {
  this.obserNoteType.obInNoteType = selectedRows [0];
  this.title = 'Edit' ;//+ this.obserNoteType.obInNoteType.noteTypeName;
  this.modalRef = this.modalService.show(template);
  }
  else
  {
    alert('Must select Record to edit');
  }
}
}
