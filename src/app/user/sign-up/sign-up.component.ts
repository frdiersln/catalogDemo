import { Component, OnInit } from '@angular/core';
import { SignUpService } from '../../services/sign-up.service'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  name: any;
  password: any;
  email: any;

  constructor(
    private signUpService: SignUpService
  ) { }

  ngOnInit(): void {
  }

  preRegister(){
    this.register(this.name, this.password, this.email);
  }

  register(name: string, password: string, email: string){
    
    const obj = {"name": name,
                 "password": password,
                 "email": email}
    console.log(obj)
    this.signUpService.signUp(obj)
    .subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err)
    })
  }

}
