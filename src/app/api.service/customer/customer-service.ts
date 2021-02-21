import { Injectable } from '@angular/core';
import { Icustomer } from 'src/app/Interfaces/customer/Icustomer';
import { HttpClient } from '@angular/common/http';
import { ICustomerView } from 'src/app/Interfaces/customer/icustomer-view';
import { GlobalAPIService } from '../global-api.service';
import { ICustomerClassView } from 'src/app/Interfaces/View/icustomer-class-view';
import { TotalClass } from 'src/app/Interfaces/View/total-class';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  //localUrl = 'http://localhost:5000/api/Customer/';
  obIcustomer: Icustomer;
  objICustomerView: ICustomerView;
  constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }

  localUrl = this.GlobalAPI.URLAPI + "Customer/";
  postdata() {
    return this.http.post(this.localUrl + 'post', this.obIcustomer);
  }
  putdata() {
    return this.http.put(this.localUrl + 'put', this.obIcustomer);
  }
  GetAlldata() {
    return this.http.get<Icustomer[]>(this.localUrl + 'get');
  }
  

  GetView() {
    return this.http.get<ICustomerView[]>(this.localUrl + 'GetCustomersView');
  }

  CustomerClassView() {
    return this.http.get<ICustomerClassView[]>(this.localUrl + 'CustomerClassView');
  }

  totalClassification() {
    return this.http.get<TotalClass[]>(this.localUrl + 'totalClassification');
  }

  getone(index) {
    return this.http.get<Icustomer[]>(this.localUrl + 'getone' + '/' + index);
  }

  GetByActualID(index) {
    return this.http.get<Icustomer>(this.localUrl + 'GetByActualID' + '/' + index);
  }

  getCustomersBySalesRep(index) {
    return this.http.get<Icustomer[]>(this.localUrl + 'FindCustomers' + '/' + index);
  }

  getByStatus(index) {
    return this.http.get<Icustomer[]>(this.localUrl + 'getByStatus' + '/' + index);
  }

  getMax() {
    return this.http.get<number>(this.localUrl + 'getMax');
  }
  Delete(index) {
    return this.http.delete(this.localUrl + 'Delete/' + index);
  }

  getMaxStatus() {
    return this.http.get<number>(this.localUrl + 'getMaxStatus');
  }
}
