import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../services/home.service'
import { Product } from '../models/product'
import { HttpHeaders } from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  token: any;
  name: any;
  email: any;
  products: Product[] = [];

  constructor(
    private router: Router,
    private homeService: HomeService,
    private sanitizer:DomSanitizer
    ) {

    if (this.router.getCurrentNavigation()!.extras!.state! === undefined && (localStorage.getItem('token') === undefined || localStorage.getItem('token') === null)) {
      this.router.navigate(['login'])
    }
    else{
      const navigation = this.router.getCurrentNavigation();
      const state = navigation!.extras.state as {token: any, email: string};
      if(localStorage.getItem('token') === undefined || localStorage.getItem('token') === null){
        this.token = state.token.token;
        this.email = state.email;
      }else{
        this.token = localStorage.getItem('token');
        this.email = localStorage.getItem('email');
      }
    }
   }

  ngOnInit(): void {

    this.token = {headers: new HttpHeaders({ 'access-token': this.token })} //convert string token to http headers

    this.homeService.getProducts(this.token)
    .subscribe({

      next: (res: any) => {
        res['products'].forEach((product: Product) => {
          this.products.push(product);
        })
      },

      error: (err) => console.log(err)
    })
      
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  like(productId: number){
    this.homeService.like(this.token, productId)
    .subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (err) => console.log(err)
    })
  }

  redirectToDetails(productId: number){
    this.router.navigate(['details'], { state: { token: this.token, productId: productId} });
  }

}