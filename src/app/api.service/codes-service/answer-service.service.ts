import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalAPIService } from '../global-api.service';
import { IAnswer } from 'src/app/Interfaces/codes-Interfaces/ianswer';

@Injectable({
  providedIn: 'root'
})
export class AnswerServiceService {
  Answer:IAnswer;

  constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }

  localUrl = this.GlobalAPI.URLAPI + "Answer/";
  postdata()
  {
    return this.http.post(this.localUrl + 'post', this.Answer);
  }
  putdata()
  {
    return this.http.put(this.localUrl + 'put', this.Answer);
  }
  GetAlldata()
  {
    return this.http.get<IAnswer[]>(this.localUrl + 'get');
  }
  Getone(index)
  {
    return this.http.get<IAnswer>(this.localUrl + 'get/'+index);
  }

  GetByQuestion(index)
  {
    return this.http.get<IAnswer>(this.localUrl + 'getByQuestion/'+index);
  }

  Delete(index)
  {
    return this.http.delete(this.localUrl + 'Delete/' + index);
  }
  DeleteQuestion(index)
  {
    return this.http.delete(this.localUrl + 'DeleteQuestion/' + index);
  }
}
