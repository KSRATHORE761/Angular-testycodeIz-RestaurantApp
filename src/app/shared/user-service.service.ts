import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private _http:HttpClient) { }

  saveuser(data:any){
    return this._http.post<any>("http://localhost:3000/user",data).pipe(map((res:any)=>{
      return res;
    }))
  }

  getUser(){
    return this._http.get<any>("http://localhost:3000/user").pipe(map((res:any)=>{
      return res;
    }))
  }

}
