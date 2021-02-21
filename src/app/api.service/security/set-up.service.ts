import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalAPIService } from '../global-api.service';
import { IsetUp } from 'src/app/Interfaces/security/iset-up';

@Injectable({
  providedIn: 'root'
})
export class SetUpService {

  _IsetUp:IsetUp;
  constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }
  localUrl = this.GlobalAPI.URLAPI + "GeneralSetUp/";

  GetAlldata()
   {
     return this.http.get<IsetUp[]>(this.localUrl + 'getList');
   }

   putData()
   {
     return this.http.put(this.localUrl+'put',this._IsetUp);
   }

   postData()
   {
     return this.http.post(this.localUrl +'post',this._IsetUp);
   }

   Delete(mail)
   {
     return this.http.delete(this.localUrl + 'Delete/'+mail);
   }
   SendMail(Tomail)
   {
     return this.http.get(this.localUrl + 'SendMail/'+Tomail);
   }

   GetOne(mail)
   {
     return this.http.get(this.localUrl + 'get/'+mail);
   }
}
