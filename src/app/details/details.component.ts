import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetailsService } from '../services/details.service'
import { Product } from '../models/product'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  token: any;
  productId: any;
  product = new Product;

  constructor(
    private router: Router,
    private detailsService: DetailsService
  ) { 
    const navigation = this.router.getCurrentNavigation();
    const state = navigation!.extras.state as {token: any, productId: number};
    this.token = state.token;
    console.log(this.token);
    this.productId = state.productId;
   }

  ngOnInit(): void {

    this.detailsService.getProduct(this.token, this.productId)
    .subscribe({

      next: (res: any) => {
        this.product = res
      },

      error: (err) => console.log(err)
    })

  }

}
