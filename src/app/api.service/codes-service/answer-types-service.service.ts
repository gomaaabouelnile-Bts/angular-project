import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalAPIService } from '../global-api.service';
import { IAnswerTypes } from 'src/app/Interfaces/codes-Interfaces/ianswer-types';

@Injectable({
  providedIn: 'root'
})
export class AnswerTypesServiceService {
  AnswerType:IAnswerTypes

  constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }

  localUrl = this.GlobalAPI.URLAPI + "AnswerTypes/";
  postdata()
  {
    return this.http.post(this.localUrl + 'post', this.AnswerType);
  }
  putdata()
  {
    return this.http.put(this.localUrl + 'put', this.AnswerType);
  }
  GetAlldata()
  {
    return this.http.get<IAnswerTypes[]>(this.localUrl + 'get');
  }
  Getone(index)
  {
    return this.http.get<IAnswerTypes>(this.localUrl + 'get/'+index);
  }
  Delete(index)
  {
    return this.http.delete(this.localUrl + 'Delete/' + index);
  }
}
