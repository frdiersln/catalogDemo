import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(
    @Inject('apiUrl') private apiUrl: string,
    private http: HttpClient
  ) { }

  signUp(obj: any){
    return this.http.post(this.apiUrl + 'user/register', obj)
  }
}
