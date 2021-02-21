import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalAPIService } from '../global-api.service';
import { IQuestion } from 'src/app/Interfaces/codes-Interfaces/iquestion';

@Injectable({
  providedIn: 'root'
})
export class QuestionServiceService {
  Question:IQuestion;

  constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }

  localUrl = this.GlobalAPI.URLAPI + "Question/";
  postdata()
  {
    return this.http.post(this.localUrl + 'post', this.Question);
  }
  putdata()
  {
    return this.http.put(this.localUrl + 'put', this.Question);
  }
  GetAlldata()
  {
    return this.http.get<IQuestion[]>(this.localUrl + 'get');
  }
  Getone(index)
  {
    return this.http.get<IQuestion>(this.localUrl + 'get/'+index);
  }
  GetMax()
  {
    return this.http.get<number>(this.localUrl + 'getMax');
  }
  Delete(index)
  {
    return this.http.delete(this.localUrl + 'Delete/' + index);
  }
}
