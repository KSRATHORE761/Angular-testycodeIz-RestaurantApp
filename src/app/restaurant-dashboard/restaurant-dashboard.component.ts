import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
//import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurentData } from './restaurent.Model';
@Component({
  selector: 'app-restaurant-dashboard',
  templateUrl: './restaurant-dashboard.component.html',
  styleUrls: ['./restaurant-dashboard.component.css']
})
export class RestaurantDashboardComponent implements OnInit {

  formValue!: FormGroup;
  restaurentApiData : any=[];
  restaurentModelObj: RestaurentData = new RestaurentData;

  constructor(private formBuilder: FormBuilder,private api:ApiService) { }
  ngOnInit() {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: ['']
    });
    this.getAllData();
  }
  //Now subscribing our data which is maped via services..
  addRestaurent(){
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.servcies;
    this.api.postRestaurent(this.restaurentModelObj).subscribe(res=>{
      console.log(res);
      alert("Restaurent Records Added Successfully😎");
      this.getAllData();
      this.formValue.reset();

    },err=>{
      alert("Something went wrong while adding restaurent")
    }
    )
  }

  // Get all data:
  getAllData(){
    this.api.getRestaurent().subscribe(res=>{
      this.restaurentApiData =res;
    })
  }
  //Deleting Restaurent Data: 
  deleteRestaurentData(data:any){
    alert("Data deleted successfully!");
    this.api.deleteRestaurent(data.id).subscribe(res=>{
      alert("Data deleted successfully!");
      this.getAllData();
    })
  }
  //Editing restaurent Data:
  onEditClick(data:any){
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);
  }
}
