import { Igroup } from 'src/app/Interfaces/security/group-Interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalAPIService } from '../global-api.service';
@Injectable({
    providedIn: 'root'
  })
export class GroupService {
    //localUrl = 'http://151.106.34.109:7040/api/Groups/';
   Sergroup: Igroup;
   SergroupList:Igroup[];
   constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }

    localUrl = this.GlobalAPI.URLAPI + "Groups/";
   GetAlldata()
   {
     return this.http.get<Igroup[]>(this.localUrl + 'get');
   }
   Getdata()
   {
     return this.http.get(this.localUrl + 'get');
   }
   putData()
   {
     return this.http.put(this.localUrl+'put',this.Sergroup);
   }

   postData()
   {
     return this.http.post(this.localUrl + 'post',this.Sergroup);
   }
   Delete(index)
   {
     return this.http.delete(this.localUrl + 'Delete/'+index);
   }
   GetOne(index){
     return this.http.get(this.localUrl+'get/'+index);
   }

   

 }
