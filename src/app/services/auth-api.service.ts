import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  postId
  constructor( private http:HttpClient ) { 
    console.log('servicio de api listo')
    
    this.getUser();
  }
  
  getUser(){
    const headers= new HttpHeaders({
  
      'username': 'frontendapp',
      'password': '12345',
      // 'Access-Control-Allow-Origin':'*',
    })

    let params = new HttpParams().set("username",'norberto.camacho').set("password", '12345').set("grant_type",'password'); //Create new HttpParams

    // username:norberto.camacho
    // password:12345
    // grant_type:password

    // const body= {'Username': 'norberto.camacho',
    // 'Password': '12345',
    // 'grant_type':'password'}
  //  this.http.get('http://13.64.68.213:3000/dashboard/candidates/ROLE_USER/3', { headers }).subscribe(data => {console.log(data) })
   this.http.post('/api/security/oauth/token', { headers, params: params }).subscribe(data => {console.log(data) })
  }
  // 
}
