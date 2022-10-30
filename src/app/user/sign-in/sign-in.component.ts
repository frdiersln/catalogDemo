import { Component, OnInit } from '@angular/core';
import { SignInService } from '../../services/sign-in.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  password: any;
  email: any;
  token: any;

  constructor(
    private signInService: SignInService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  preLogin(){
    this.login(this.password, this.email);
  }

  login(password: string, email: string){
    
    const obj = {"password": password,
                 "email": email}
    
    this.signInService.login(obj)
    .subscribe({
      next: (res) => {
        this.token = res
        this.router.navigate(['home'], { state: { token: this.token, email: this.email} });
      },
      error: (err) => console.log(err)
    })
  }


}
