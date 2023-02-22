import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { login } from '../model/login.Model';
import { UserServiceService } from '../shared/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormData ! : FormGroup;
  loginObj : login = new login;

  constructor(
    private formBuilder:FormBuilder,
    private _userService : UserServiceService,
    private _route : Router
    ){}
  ngOnInit(): void {
      this.loginFormData = this.formBuilder.group({
        email:[''],
        password:['']
      })
  }
  login(){
    this._userService.getUser().subscribe(res=>{
      const user = res.find((i:any)=>{
        return i.email === this.loginFormData.value.email && i.password === this.loginFormData.value.password
      })
      if(user){
        alert('Login is successfull!')
        this.loginFormData.reset();
        this._route.navigate(['dashboard']);
      }
      else{
        alert("User Not found");
      }
    },err=>{
      console.log(err);
    }
    )
  }
}
