import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISector } from 'src/app/Interfaces/codes-Interfaces/Sector.Interface';
import { GlobalAPIService } from '../global-api.service';
@Injectable({
  providedIn: 'root'
})
export class SectorService {
  //localUrl = 'http://151.106.34.109:7040/api/Sector/';
  obISector: ISector[];
  oboneSector: ISector;
  constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }

  localUrl = this.GlobalAPI.URLAPI + "Sector/";
  postdata() {
    return this.http.post(this.localUrl + 'post', this.obISector);
  }
  putdata() {
    return this.http.put(this.localUrl + 'put', this.obISector);
  }
  GetAlldata() {
    return this.http.get<ISector[]>(this.localUrl + 'get');
  }
  getone(index) {
    return this.http.get<ISector[]>(this.localUrl + 'get/' + index);
  }
  Delete(index) {
    return this.http.delete(this.localUrl + 'Delete/' + index);
  }
  deletelist(listob: any) {
    return this.http.delete(this.localUrl + 'Deletelist' + listob);
  }
  deleteone(index: any) {
    return this.http.delete(this.localUrl + 'getone/' + index);
  }

}
