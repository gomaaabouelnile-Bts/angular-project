import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalAPIService } from '../global-api.service';
import { IVersionQuestionAnswer } from 'src/app/Interfaces/codes-Interfaces/iversion-question-answer';

@Injectable({
  providedIn: 'root'
})
export class VersionQuestionAnswerServiceService {

  VQA:IVersionQuestionAnswer;
  constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }

  localUrl = this.GlobalAPI.URLAPI + "VersionQuestionAnswer/";
  postdata()
  {
    return this.http.post(this.localUrl + 'post', this.VQA);
  }
  putdata()
  {
    return this.http.put(this.localUrl + 'put', this.VQA);
  }
  GetAlldata()
  {
    return this.http.get<IVersionQuestionAnswer[]>(this.localUrl + 'get');
  }
  Getone(index)
  {
    return this.http.get<IVersionQuestionAnswer>(this.localUrl + 'get/'+index);
  }

  GetByVersion(index)
  {
    return this.http.get<IVersionQuestionAnswer[]>(this.localUrl + 'getByVersion/'+index);
  }

  RetunAQuestionView(index)
  {
    return this.http.get<IVersionQuestionAnswer[]>(this.localUrl + 'RetunAQuestionView/'+index);
  }


  Delete(index)
  {
    return this.http.delete(this.localUrl + 'Delete/' + index);
  }
  DeleteVersion(index)
  {
    return this.http.delete(this.localUrl + 'DeleteVersion/' + index);
  }

  DeleteQuestion(index)
  {
    return this.http.delete(this.localUrl + 'DeleteQuestion/' + index);
  }
}
