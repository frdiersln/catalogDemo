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
    if (this.router.getCurrentNavigation()!.extras!.state! == undefined) {
      this.router.navigate(['login'])
    }
    else{
      const navigation = this.router.getCurrentNavigation();
      const state = navigation!.extras.state as {token: any, name: string, email: string};
      this.token = state.token.token;
      this.name = state.name;
      this.email = state.email;
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


  _arrayBufferToBase64( buffer: any ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
       binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  }

  sanitize( url:string ) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
function forEach(res: ArrayBuffer, arg1: (product: Product) => void) {
  throw new Error('Function not implemented.');
}

