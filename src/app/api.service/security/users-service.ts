import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Iuser } from 'src/app/Interfaces/security/user-Interface';
import { GlobalAPIService } from '../global-api.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  // localUrl = 'http://151.106.34.109:7040/api/Auth/';
  public  Seruser: Iuser;
  constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }

    localUrl = this.GlobalAPI.URLAPI + "Auth/";
  Login(name, password)
  {
    return this.http.get<Iuser>(this.localUrl + 'login' + '/' + name + '/' + password);
  }
  postdata()
  {
    return this.http.post(this.localUrl + 'register', this.Seruser);
  }
  putdata()
  {
    return this.http.put(this.localUrl + 'put', this.Seruser);
  }

  GetOne(id,val)
  {
    return this.http.get<Iuser>(this.localUrl + 'getOne/'+id+'/'+val);
  }

  GetAlldata()
  {
    return this.http.get(this.localUrl + 'get');
  }

  GetAllAvailable()
  {
    return this.http.get(this.localUrl + 'getAvailable');
  }
  GetAvialableUsersnew(index)
  {
    
    return this.http.get(this.localUrl + 'GetAvialableUsersnew/'+index);
  }
  Delete(index)
  {
    return this.http.delete(this.localUrl + 'Delete/' + index);
  }

  ResetPassword(username)
  {
    return this.http.get(this.localUrl + 'Reset/' + username);
  }
}
