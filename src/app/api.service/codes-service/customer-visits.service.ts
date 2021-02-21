import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { GlobalAPIService } from '../global-api.service';
import { ICustomerVisits } from 'src/app/Interfaces/codes-Interfaces/icustomer-visits';
import { IVCustomerVisits } from 'src/app/Interfaces/codes-Interfaces/ivcustomer-visits';
import { IcustomerVisits } from 'src/app/Interfaces/View/icustomer-visits';
import { GetAllVisits } from 'src/app/Interfaces/View/get-all-visits';
import { CustimerIDs } from 'src/app/Interfaces/View/custimer-ids';
import { AvRate } from 'src/app/Interfaces/View/av-rate';
import { AvQuestion } from 'src/app/Interfaces/View/av-question';
import { AvPercentage } from 'src/app/Interfaces/View/av-percentage';


@Injectable({
  providedIn: 'root'
})
export class CustomerVisitsService {
  ICustomerVisits:ICustomerVisits;
  IVCustomerVisits:IVCustomerVisits;

  constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }

  localUrl = this.GlobalAPI.URLAPI + "CustomerVisits/";

  getCustomerVisit( Cid ,  VN ,  SalesRepID)
  {
    return this.http.get<ICustomerVisits[]>(this.localUrl + 'getCustomerVisit/'+Cid+'/'+VN+'/'+SalesRepID);
  }

  GetCustomerVisitQuestions( Cid ,  VN ,  SalesRepID)
  {
    return this.http.get<ICustomerVisits[]>(this.localUrl + 'GetCustomerVisitQuestions/'+Cid+'/'+VN+'/'+SalesRepID);
  }

  GetTheView()
  {
    return this.http.get<IVCustomerVisits[]>(this.localUrl + 'GetTheView');
  }

  GetForView( V,  Q)
  {
    return this.http.get<ICustomerVisits>(this.localUrl + 'GetForView/'+V+'/'+Q);
  }

  GetSalesCustomers( V)
  {
    return this.http.get<CustimerIDs[]>(this.localUrl + 'GetSalesCustomers/'+V);
  }

  GetVisitsByTime( V,  Q)
  {
    return this.http.get<GetAllVisits[]>(this.localUrl + 'GetVisitsByTime/'+V+'/'+Q);
  }

  GetAllVisits()
  {
    return this.http.get<GetAllVisits[]>(this.localUrl + 'GetAllVisits');
  }

  CustomerVisitsView()
  {
    return this.http.get<IcustomerVisits[]>(this.localUrl + 'CustomerVisitsView');
  }

  AvRateProcedure( V)
  {
    return this.http.get<AvRate[]>(this.localUrl + 'AvRateProcedure/'+V);
  }

  AvQuestionProcedure( V)
  {
    return this.http.get<AvQuestion[]>(this.localUrl + 'AvQuestionProcedure/'+V);
  }

  AvPercentageProcedure( V)
  {
    return this.http.get<AvPercentage[]>(this.localUrl + 'AvPercentageProcedure/'+V);
  }
}

