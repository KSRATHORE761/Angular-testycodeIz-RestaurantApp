import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl } from '@angular/forms';
import { UserServiceService } from '../shared/user-service.service';
import { User } from '../model/user.Model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm! : FormGroup
  userData: User = new User;

  constructor(private formBuilder:FormBuilder,private _userService: UserServiceService, private route:Router){}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      name:[''],
      mobile:[''],
      email:[''],
      password:['']
    })
  }
  saveuser(){
    this.userData.name = this.signUpForm.value.name;
    this.userData.email = this.signUpForm.value.email;
    this.userData.mobile = this.signUpForm.value.mobile;
    this.userData.password = this.signUpForm.value.password;

    this._userService.saveuser(this.userData).subscribe(res=>{
      alert("User Details saved successfully!");
      this.signUpForm.reset();
      this.route.navigate(['login'])
    },err=>{
      console.log(err);
    });
  }
}
