import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  token: any;
  name: any;
  email: any;

  constructor(private router: Router) {
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

  ngOnInit(): void { console.log(this.token) }

}
