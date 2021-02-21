import { Injectable, APP_ID } from '@angular/core';
import { ISalesRep } from 'src/app/Interfaces/codes-Interfaces/isales-rep';
import { HttpClient } from '@angular/common/http';
import { GlobalAPIService } from '../global-api.service';

@Injectable({
  providedIn: 'root'
})
export class SalesRepService {


  // localUrl ='http://151.106.34.109:7040/api/SalesRep/'; 

  objSalesRep: ISalesRep;

  constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }

  localUrl = this.GlobalAPI.URLAPI + "SalesRep/";



  postdata() {
  
    return this.http.post<ISalesRep>(this.localUrl + 'post', this.objSalesRep);
  }
  putdata() {
    return this.http.put<ISalesRep>(this.localUrl + 'put', this.objSalesRep);
  }
  GetAlldata() {
    return this.http.get<ISalesRep[]>(this.localUrl + 'get');
  }

  GetByPlace(g, t) {
    return this.http.get<ISalesRep[]>(this.localUrl + 'getSales/' + g + '/' + t );
  }
  GetSalesByFullPlace(g, t,s,r) {
   
    return this.http.get<ISalesRep[]>(this.localUrl + 'getSales/' + g + '/' + t + '/' + s + '/' + r);
  }

  GetByUserID(index) {
    return this.http.get<number>(this.localUrl + 'getSalesID/' + index);
  }

  salesexist(index) {
    return this.http.get<boolean>(this.localUrl + 'salesexist/' + index);
  }

  getone(index) {
    return this.http.get<ISalesRep[]>(this.localUrl + 'get/' + index);
  }
  Getmax() {
    return this.http.get<number>(this.localUrl + 'GetMax');
  }
  Delete(index) {
    return this.http.delete(this.localUrl + 'Delete/' + index);
  }
}
