import { Component, OnInit } from '@angular/core';
import {  FormGroup,FormBuilder,FormControl,Validators,} from '@angular/forms';
//import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurentData } from '../model/restaurent.Model';

declare var window: any;

@Component({
  selector: 'app-restaurant-dashboard',
  templateUrl: './restaurant-dashboard.component.html',
  styleUrls: ['./restaurant-dashboard.component.css']
})
export class RestaurantDashboardComponent implements OnInit {

  bootstarpModal : any;
  formValue!: FormGroup;
  restaurentApiData : any=[];
  restaurentModelObj: RestaurentData = new RestaurentData;
  isEdit:boolean=false;

  constructor(private formBuilder: FormBuilder,private api:ApiService) { }
  ngOnInit() {

    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: ['']
    });
    this.bootstarpModal = new window.bootstrap.Modal(document.getElementById('exampleModal'));
    this.getAllData();
  }

  onCloseClick(){
    this.formValue.reset();
    this.isEdit = false;
  }
//Now subscribing our data which is maped via services..
  addRestaurent(){
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;
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
    this.restaurentModelObj.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);
    this.isEdit = true;
    this.bootstarpModal.show();
  }
  updateRestaurentData(){
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;
    this.api.updateRestaurent(this.restaurentModelObj,this.restaurentModelObj.id).subscribe(res=>{
      alert("Restaurent Data is updated successfully!");
      this.getAllData();
      this.formValue.reset();
      this.bootstarpModal.hide();
      this.isEdit = false;
    },err=>{
      console.log(err);
    })
  }
}
