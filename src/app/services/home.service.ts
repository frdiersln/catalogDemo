import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    @Inject('apiUrl') private apiUrl: string,
    private http: HttpClient
  ) { }

  getProducts(token: any){
    return this.http.get(this.apiUrl + 'product/all', token)
  }

}