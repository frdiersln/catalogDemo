import { Component, OnInit } from '@angular/core';
import { SignUpService } from '../../services/sign-up.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  name: any;
  password: any;
  email: any;
  token: any;

  constructor(
    private signUpService: SignUpService,
    private router: Router
  ) { }

  ngOnInit(): void {}

  preRegister(){
    this.register(this.name, this.password, this.email);
  }

  register(name: string, password: string, email: string){
    
    const obj = {"name": name,
                 "password": password,
                 "email": email}
    
    this.signUpService.signUp(obj)
    .subscribe({
      next: (res) => {
        this.token = res
        this.router.navigate(['home'], { state: { token: this.token, email: this.email} });
      },
      error: (err) => console.log(err)
    })
  }
  
}
