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
  
 
  // 


  logout(){
    localStorage.removeItem('token');
  }


  getLogin2(user, pass){
    console.log(user);
    console.log(pass);
    // const headers = new HttpHeaders({
  
    //   'Authorization': Basic 'ZnJvbnRlbmRhcHA6MTIzNDU='

      
    // })

    // let headers= new HttpHeaders({
    //   'Authorization' : 'Basic ZnJvbnRlbmRhcHA6MTIzNDU='

    // })

    const headers  = new HttpHeaders({
    
      "Authorization": "Basic " + btoa("frontendapp:12345"),
      "Content-Type":  "application/json"

    })

   let params = new HttpParams().set("username",user).set("password", pass).set("grant_type",'password');

    // const params = new HttpParams {
    //   'username': user,
    //   'password': '12345',
    //   'grant_type': 'password'
    // }



    // let headers= new HttpParams().set("Authorization" , 'Basic ZnJvbnRlbmRhcHA6MTIzNDU=');

      // .set('password', '12345');
      const httpOptions = {
           headers : headers,
           params: params
      };

    // const body = JSON.stringify({username: user,
    //   password: pass});
    // console.log(headers);
    // console.log('headers');

    // let params = new HttpParams().set("username",user).set("password", pass).set("grant_type",'password');
    
    //Create new HttpParams
    
    debugger
console.log(user);
console.log(pass);


// console.log(httpHeaders);

  //  this.http.get('http://13.64.68.213:3000/dashboard/candidates/ROLE_USER/3', { headers }).subscribe(data => {console.log(data) })
  //  this.http.post('/api/security/oauth/token', { headers }, { params }).subscribe(data => {console.log(data) })

    console.log('peticion')


  
  
    //  let headers = new HttpHeaders();
    // headers = headers.append("Authorization", "Basic " + btoa("frontendapp:12345"));
    // headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
    // // const body = JSON.stringify({username: user,
    // //   password: pass});
    // // console.log(headers);
    // // console.log('headers');
    // const body = JSON.stringify({username: user, password: pass});

    // let params = new HttpParams().set("username","frontendapp").set("password", "12345")


    




    return this.http.post('/api/security/oauth/token', null , httpOptions ).pipe(
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
