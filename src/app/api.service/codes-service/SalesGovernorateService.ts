
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalAPIService } from '../global-api.service';
import { SalesGovernorate } from 'src/app/Interfaces/codes-Interfaces/SalesGovernorate';

@Injectable({
  providedIn: 'root'
})
export class SalesGovernorateService {
    SalesGovernorate:SalesGovernorate;
    SalesGovernorateList:SalesGovernorate[];

  constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }

  localUrl = this.GlobalAPI.URLAPI + "SalesGovernorate/";
  postdata() {
    return this.http.post(this.localUrl + 'post', this.SalesGovernorateList);
  }

  GetAlldata() {
    return this.http.get<SalesGovernorate[]>(this.localUrl + 'get');
  }
 
  Delete(index) {
    return this.http.delete(this.localUrl + 'Delete/' + index);
  }
  GetBySalesID(id) {
    return this.http.get<SalesGovernorate[]>(this.localUrl + 'GetBySalesID/'+id);
  }
  GetBySalesIDview(id) {
   
    return this.http.get<SalesGovernorate[]>(this.localUrl + 'GetBySalesIDview/'+id);
  }





  DeletebySales(id) {
    return this.http.delete(this.localUrl + 'DeletebySales/'+id );
  }
}
