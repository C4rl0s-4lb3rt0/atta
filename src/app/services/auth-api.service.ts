import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  
  token:string;
  bea_token:string;

  constructor( private http:HttpClient ) { 
    console.log('servicio de api listo')
    
    // console.log(this.bea_token)
    // this.getUsers();
    this.getLogin()
  }
  
  getLogin(){
    
    const headers = new HttpHeaders({
  
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa('frontendapp:12345')
      
    })

    let params = new HttpParams().set("username",'norberto.camacho').set("password", '12345').set("grant_type",'password'); //Create new HttpParams


  //  this.http.get('http://13.64.68.213:3000/dashboard/candidates/ROLE_USER/3', { headers }).subscribe(data => {console.log(data) })
  //  this.http.post('/api/security/oauth/token', { headers }, { params }).subscribe(data => {console.log(data) })


   this.http.post('/api/security/oauth/token', { headers }, { params })
     .subscribe((data:any) => {
         console.log(data)
        this.token = data.access_token
        console.log(this.token)
      })
   
        // console.log(headers);
        // this.http.post('/api/security/oauth/token', { headers }, {params}).subscribe((data:any) => {
        //    this.bea_token = `Bearer ${data.access_token}`
        //     this.token = data.access_token
        //     console.log(data);
        // })
     
     
     
    //  .subscribe((data:any) => {
    //      this.bea_token = `Bearer ${data.access_token}`
    //       this.token = data.access_token
    //   })

      

  }
  // 

  getUsers(){


    const headers= new HttpHeaders({
      'Authorization': `${this.bea_token}`
    })

    let params = new HttpParams().set("username",'norberto.camacho').set("password", '12345').set("grant_type",'password'); //Create new HttpParams
  
    this.http.get('/dashboard/candidates/ROLE_USER/3', { headers }).subscribe((data:any) => {
      console.log(data)})


  }



}
