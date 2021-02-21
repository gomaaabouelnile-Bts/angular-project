import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICustomerCompetition } from 'src/app/Interfaces/customer/ICustomerCompetition';
import { GlobalAPIService } from '../global-api.service';
import { CustomersCompanies } from 'src/app/Interfaces/View/customers-companies';
import { CustomersNames } from 'src/app/Interfaces/View/customers-names';


@Injectable({
  providedIn: 'root'
})
export class CustomerCompetitionService
{
    //localUrl = 'http://151.106.34.109:7040/api/CustomerCompetition/';
    obICustomerCompetition: ICustomerCompetition[];
    oboneCustomerCompetition: ICustomerCompetition;
    constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }

    localUrl = this.GlobalAPI.URLAPI + "CustomerCompetition/";
  postdata()
  {
    return this.http.post(this.localUrl + 'post', this.obICustomerCompetition);
  }
  putdata()
  {
    return this.http.put(this.localUrl + 'put', this.obICustomerCompetition);
  }
  GetAlldata()
  {
    return this.http.get<ICustomerCompetition[]>(this.localUrl + 'get');
  }
  getone(index)
  {
    return this.http.get<ICustomerCompetition[]>(this.localUrl + 'get/' + index);
  }
  Delete(index)
  {
    return this.http.delete(this.localUrl + 'Delete/' + index);
  }
  deletelist(listob: any)
  {
    return this.http.delete(this.localUrl + 'Deletelist' + listob);
  }
  deleteone(index: any)
  {
    return this.http.delete(this.localUrl + 'getone/' + index);
  }

  CustomercompitionCompanyView()
  {
    return this.http.get<CustomersCompanies[]>(this.localUrl + 'CustomercompitionCompanyView');
  }

  NotCustomercompitionCompanyView()
  {
    return this.http.get<CustomersNames[]>(this.localUrl + 'NotCustomercompitionCompanyView');
  }

}
