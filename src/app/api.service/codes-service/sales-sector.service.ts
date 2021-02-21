import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalAPIService } from '../global-api.service';
import { SalesSactor } from 'src/app/Interfaces/codes-Interfaces/sales-sactor';

@Injectable({
  providedIn: 'root'
})
export class SalesSectorService {
  SalesSactor:SalesSactor;
  SalesSactorList:SalesSactor[];

  constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }

  localUrl = this.GlobalAPI.URLAPI + "SalesSector/";
  postdata() {
    return this.http.post(this.localUrl + 'post', this.SalesSactor);
  }
  putdata() {
    return this.http.put(this.localUrl + 'put', this.SalesSactor);
  }
  GetAlldata() {
    return this.http.get<SalesSactor[]>(this.localUrl + 'get');
  }
 
  Delete(index) {
    return this.http.delete(this.localUrl + 'Delete/' + index);
  }
  GetBySalesID(id) {
    return this.http.get<SalesSactor[]>(this.localUrl + 'GetBySalesID/'+id);
  }
  GetBySalesIDview(id) {
    return this.http.get<SalesSactor[]>(this.localUrl + 'GetBySalesIDview/'+id);
  }
  GetBySectorID(id) {
    return this.http.get<SalesSactor[]>(this.localUrl + 'GetBySectorID/'+id);
  }
  GetBySalesSector(id , rid) {
    return this.http.get<SalesSactor[]>(this.localUrl + 'GetBySalesSector/'+id+'/'+rid);
  }

  DeleteNull() {
    return this.http.delete(this.localUrl + 'DeleteNull' );
  }

  DeletebySales(id) {
    return this.http.delete(this.localUrl + 'DeletebySales/'+id );
  }
}
