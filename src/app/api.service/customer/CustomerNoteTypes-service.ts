import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICustomerNoteTypes } from 'src/app/Interfaces/customer/ICustomerNoteTypes';
import { GlobalAPIService } from '../global-api.service';
import { ICustomerNoteTypesView } from 'src/app/Interfaces/View/icustomer-note-types-view';

@Injectable({
  providedIn: 'root'
})

export class CustomerNoteTypesService
{
    //localUrl = 'http://151.106.34.109:7040/api/CustomerNoteType/';
    obICustomerNoteTypes: ICustomerNoteTypes[];
    oboneCustomerNoteTypes: ICustomerNoteTypes;
    constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }

    localUrl = this.GlobalAPI.URLAPI + "CustomerNoteType/";
  postdata()
  {
    return this.http.post(this.localUrl + 'post', this.obICustomerNoteTypes);
  }
  putdata()
  {
    return this.http.put(this.localUrl + 'put', this.obICustomerNoteTypes);
  }
  GetAlldata()
  {
    return this.http.get<ICustomerNoteTypes[]>(this.localUrl + 'get');
  }

  CustomerNoteTypesView()
  {
    return this.http.get<ICustomerNoteTypesView[]>(this.localUrl + 'CustomerNoteTypesView');
  }
  getone(index)
  {
    return this.http.get<ICustomerNoteTypes[]>(this.localUrl + 'get/' + index);
  }
  Delete(index)
  {
    return this.http.delete(this.localUrl + 'Delete/' + index);
  }
  deletelist(listob: any)
  {
    return this.http.delete(this.localUrl + 'Deletelist' + listob);
  }
  deleteone(index: any)
  {
    return this.http.delete(this.localUrl + 'getone/' + index);
  }

}
