import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalAPIService } from '../global-api.service';
import { SalesRegion } from 'src/app/Interfaces/codes-Interfaces/sales-region';
@Injectable({
  providedIn: 'root'
})
export class SalesRegionService {
  SalesRegion:SalesRegion;
  SalesRegionList:SalesRegion[];

  constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }

  localUrl = this.GlobalAPI.URLAPI + "SalesRegion/";
  postdata() {
    return this.http.post(this.localUrl + 'post', this.SalesRegion);
  }
  putdata() {
    return this.http.put(this.localUrl + 'put', this.SalesRegion);
  }
  GetAlldata() {
    return this.http.get<SalesRegion[]>(this.localUrl + 'get');
  }
  Delete(index) {
    return this.http.delete(this.localUrl + 'Delete/' + index);
  }

  GetBySalesID(id) {
    return this.http.get<SalesRegion[]>(this.localUrl + 'GetBySalesID/'+id);
  }
  GetByRegionID(id) {
    return this.http.get<SalesRegion[]>(this.localUrl + 'GetByRegionID/'+id);
  }
  GetByRegionIDview(id) {
    return this.http.get<SalesRegion[]>(this.localUrl + 'GetByRegionIDview/'+id);
  }
  GetBySalesRegion(id , rid) {
    return this.http.get<SalesRegion[]>(this.localUrl + 'GetBySalesRegion/'+id+'/'+rid);
  }

  DeleteNull() {
    return this.http.delete(this.localUrl + 'DeleteNull' );
  }

  DeletebySales(id) {
    return this.http.delete(this.localUrl + 'DeletebySales/'+id );
  }
}
