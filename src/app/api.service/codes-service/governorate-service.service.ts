import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IGovernorate } from 'src/app/Interfaces/codes-Interfaces/Governorate.Interface';
import { GlobalAPIService } from '../global-api.service';
@Injectable({
  providedIn: 'root'
})
export class GovernorateService
{
    //localUrl = 'http://151.106.34.109:7040/api/Governorate/';
    obIGovernorate: IGovernorate;
    constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }

    localUrl = this.GlobalAPI.URLAPI + "Governorate/";
  
  postdata()
  {
    return this.http.post(this.localUrl + 'post', this.obIGovernorate);
  }
  putdata()
  {
    return this.http.put(this.localUrl + 'put', this.obIGovernorate);
  }
  GetAlldata()
  {
    return this.http.get<IGovernorate[]>(this.localUrl + 'get');
  }
  getone(index)
  {
    return this.http.get<IGovernorate[]>(this.localUrl + 'getone' + '/' + index);
  }
  FindByTerritoryId(index, id2:any)
  {
 
    return this.http.post<IGovernorate[]>(this.localUrl + 'FindByTerritoryId' + '/' + index
    , id2);
  }
  FindByTerritoryandse(index, id2:any)
  {
 
    return this.http.get<IGovernorate[]>(this.localUrl + 'get' + '/' + index+'/'+id2);
  
  }
  Delete(index)
  {
    return this.http.delete(this.localUrl + 'Delete/' + index);
  }
}
