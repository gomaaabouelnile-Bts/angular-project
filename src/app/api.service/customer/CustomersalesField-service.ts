import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICustomerSalesField } from 'src/app/Interfaces/customer/ICustomerSalesField';
import { GlobalAPIService } from '../global-api.service';
import { ICustomerSalesFieldView } from 'src/app/Interfaces/View/icustomer-sales-field-view';
import { TotalSalesField } from 'src/app/Interfaces/View/total-sales-field';

@Injectable({
  providedIn: 'root'
})
export class CustomerSalesFieldService
{
    //localUrl = 'http://151.106.34.109:7040/api/CustomerSalesField/';
    obICustomerSalesField: ICustomerSalesField[];
    oboneCustomerSalesField: ICustomerSalesField;
    constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }

    localUrl = this.GlobalAPI.URLAPI + "CustomerSalesField/";
  postdata()
  {
    return this.http.post(this.localUrl + 'post', this.obICustomerSalesField);
  }
  putdata()
  {
    return this.http.put(this.localUrl + 'put', this.obICustomerSalesField);
  }
  GetAlldata()
  {
    return this.http.get<ICustomerSalesField[]>(this.localUrl + 'get');
  }

  CustomerSalesFieldViews()
  {
    return this.http.get<ICustomerSalesFieldView[]>(this.localUrl + 'CustomerSalesFieldViews');
  }

  totalSalesFieldViews()
  {
    return this.http.get<TotalSalesField[]>(this.localUrl + 'totalSalesFieldViews');
  }
  getone(index)
  {
    return this.http.get<ICustomerSalesField[]>(this.localUrl + 'get/' + index);
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

}
