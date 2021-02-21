import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalAPIService } from '../global-api.service';
import { Iversion } from 'src/app/Interfaces/codes-Interfaces/iversion';

@Injectable({
  providedIn: 'root'
})
export class VersionServiceService {

  Version:Iversion;

  constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }

  localUrl = this.GlobalAPI.URLAPI + "Version/";
  postdata()
  {
    return this.http.post(this.localUrl + 'post', this.Version);
  }
  putdata()
  {
    return this.http.put(this.localUrl + 'put', this.Version);
  }
  GetAlldata()
  {
    return this.http.get<Iversion[]>(this.localUrl + 'get');
  }
  Getone(index)
  {
    return this.http.get<Iversion>(this.localUrl + 'get/'+index);
  }
  GetMax()
  {
    return this.http.get<number>(this.localUrl + 'getMax');
  }
  Delete(index)
  {
    return this.http.delete(this.localUrl + 'Delete/' + index);
  }
}
