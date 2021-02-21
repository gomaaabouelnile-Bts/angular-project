import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalAPIService } from '../global-api.service';
import { ITempCustomers } from 'src/app/Interfaces/customer/itemp-customers';

@Injectable({
  providedIn: 'root'
})
export class TempCustomersService {
  temp:ITempCustomers;

  constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }
  localUrl = this.GlobalAPI.URLAPI + "TempCustomer/";

  postdata() {
    return this.http.post(this.localUrl + 'post', this.temp);
  }

  putdata() {
    return this.http.put(this.localUrl + 'put', this.temp);
  }
  deletedata(index) {
    return this.http.delete(this.localUrl + 'Delete/',index);
  }

  GetAlldata() {
    return this.http.get<ITempCustomers[]>(this.localUrl + 'get');
  }

  GetOne(index) {
    return this.http.get(this.localUrl + 'get/', index);
  }

  GetBySalesID(index) {
    return this.http.get(this.localUrl + 'getBySales/', index);
  }
}

