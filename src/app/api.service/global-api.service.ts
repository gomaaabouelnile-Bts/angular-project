import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalAPIService {

  public URLAPI:string="http://151.106.34.109:7040/api/";

  constructor() { }
}
