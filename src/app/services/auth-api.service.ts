import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  
  userToken:string;
  bea_token:string;

  constructor( private http:HttpClient ) { 
    console.log('servicio de api listo')
    
    this.leerToken();
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
        this.userToken = data.access_token
        console.log(this.userToken)
        console.log('ssss')
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


  logout(){
    localStorage.removeItem('token');
  }


  getLogin2(user, pass){
    console.log(user);
    console.log(pass);
    // const headers = new HttpHeaders({
  
    //   'Content-Type':  'application/json',
    //   'Authorization': 'Basic ' + btoa('frontendapp:12345')
      
    // })
    // const body = JSON.stringify({username: user,
    //   password: pass});
    // console.log(headers);
    // console.log('headers');

    let params = new HttpParams().set("username",'norberto.camacho').set("password", '12345').set("grant_type",'password'); //Create new HttpParams


  //  this.http.get('http://13.64.68.213:3000/dashboard/candidates/ROLE_USER/3', { headers }).subscribe(data => {console.log(data) })
  //  this.http.post('/api/security/oauth/token', { headers }, { params }).subscribe(data => {console.log(data) })

    return this.http.post('/api/security/oauth/token',{
      headers: {'Username':'frontendapp','Password':'12345'}}, { params }).pipe(
      map( (resp:any) => {
        this.userToken = resp.access_token
        this.guardarToken( resp.access_token )
        this.bea_token = `Bearer ${resp.access_token}`
        console.log('2222');
        return resp
      })
    );

   
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

  private guardarToken( idToken: string ){
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
    
     let hoy = new Date();
     hoy.setSeconds( 3600 )

     localStorage.setItem('expira', hoy.getTime().toString())



  }

  leerToken(){
    if( localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    }else{
      this.userToken = '';
    }
    return this.userToken;
  }

  getUsers(){


    const headers= new HttpHeaders({
      'Authorization': `${this.bea_token}`
    })

    
    return this.http.get('/api/dashboard/candidates/ROLE_USER/3', { headers })



  }


  estaAutentificadoApi(): boolean{

    if(  this.userToken.length < 2 ){
      return false;
    }
      const expira =  Number(localStorage.getItem('expira'));
      const expiraDate = new Date();
      expiraDate.setTime(expira);


      if( expiraDate > new Date ){
        
        return true;
      }else{
        return false;
      }

  }

}
