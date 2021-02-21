import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICustomerProductGroup } from 'src/app/Interfaces/customer/ICustomerProductGroup';
import { GlobalAPIService } from '../global-api.service';
import { ICustomerProductGroupView } from 'src/app/Interfaces/View/icustomer-product-group-view';
import { TotalCustomerGroup } from 'src/app/Interfaces/View/total-customer-group';
import { TotalforTotal } from 'src/app/Interfaces/View/totalfor-total';


@Injectable({
  providedIn: 'root'
})
export class CustomerProductGroupService
{
    //localUrl = 'http://151.106.34.109:7040/api/CustomerProductGroup/';
    obICustomerProductGroup: ICustomerProductGroup[];
    oboneCustomerProductGroup: ICustomerProductGroup;
    constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }

    localUrl = this.GlobalAPI.URLAPI + "CustomerProductGroup/";
  postdata()
  {
    return this.http.post(this.localUrl + 'post', this.obICustomerProductGroup);
  }
  putdata()
  {
    return this.http.put(this.localUrl + 'put', this.obICustomerProductGroup);
  }
  GetAlldata()
  {
    return this.http.get<ICustomerProductGroup[]>(this.localUrl + 'get');
  }
  getone(index)
  {
    return this.http.get<ICustomerProductGroup[]>(this.localUrl + 'get/' + index);
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

  CustomerProductGroupViews()
  {
    return this.http.get<ICustomerProductGroupView[]>(this.localUrl + 'CustomerProductGroupViews');
  }
  TotalCustomerProductsViews()
  {
    return this.http.get<TotalCustomerGroup[]>(this.localUrl + 'TotalCustomerProductsViews');
  }

  TotalForTotalViews()
  {
    return this.http.get<TotalforTotal[]>(this.localUrl + 'TotalForTotalViews');
  }

}
