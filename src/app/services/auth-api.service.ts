import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {User} from './user.service';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor( private http: HttpClient ) {
    console.log('servicio de api listo');


    this.leerToken();
  }
  usuariosTabla: User[] = [];
  usuarioTable: User;


  userToken: string;
  bea_token: string;



  logout() {
    localStorage.removeItem('token');
  }


  getLogin2(user, pass) {
    console.log(user);
    console.log(pass);


    const headers  = new HttpHeaders({

      Authorization: 'Basic ' + btoa('frontendapp:12345'),
      'Content-Type':  'application/json'

    });

    const params = new HttpParams().set('username', user).set('password', pass).set('grant_type', 'password');
    const httpOptions = {
           headers,
           params
      };

    return this.http.post('/api/security/oauth/token', null , httpOptions ).pipe(
      map( (resp: any) => {
        this.userToken = resp.access_token;
        this.guardarToken( resp.access_token );
        this.bea_token = `Bearer ${resp.access_token}`;
        console.log('2222');
        return resp;
      })
    );
  }

  private guardarToken( idToken: string ) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    const hoy = new Date();
    hoy.setSeconds( 3600 );

    localStorage.setItem('expira', hoy.getTime().toString());



  }

  leerToken() {
    if ( localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }

  getCandidatesbyUsers() {
    const headers  = new HttpHeaders({
      Authorization: 'Bearer ' + this.leerToken(),
    });
    const httpOptions = {
      headers
    };
    return this.http.get('/api/dashboard/candidates/ROLE_USER/3',  httpOptions ).pipe(
      map( (resp: any) => {
        console.log("candidatos por id reclutador 3")
        console.log(resp);
        return resp;
      })
    );
  }

  getUsers() {
    const usuarios = new Array();
    const headers  = new HttpHeaders({
      Authorization: 'Bearer ' + this.leerToken(),
    });
    const httpOptions = {
      headers
    };
    return this.http.get('/api/users/users',  httpOptions ).pipe(
      map( (resp: any) => {
        console.log('============Impresion de usuarios ==================');
        resp._embedded.users.forEach(function(element) {
          console.log(element);
          const nombreCompleto = element.nombre + ' ' + element.apellidoMaterno
            + ' ' + element.apellidoPaterno;
          const user = {
            id: element.id,
            name: nombreCompleto,
            email: element.correo,
            phone: element.telCelular,
            level: element.idNivel,
            username: element.nickName,
            website: element.unidadNegocio,
            status: 'Active'
          };

          usuarios.push(user);


         });
        console.log('usuarios en json**********');
        console.log(usuarios);



        return usuarios;
      })
    );


  }


estaAutentificadoApi(): boolean {

    if (  this.userToken.length < 2 ) {
      return false;
    }
    const expira =  Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);


    if ( expiraDate > new Date ) {

        return true;
      } else {
        return false;
      }

  }



  insertUsers(user) {

    console.log(user);
    /*const usuarios = new Array();
    const headers  = new HttpHeaders({
      Authorization: 'Bearer ' + this.leerToken(),
    });
    const httpOptions = {
      headers
    };
    return this.http.get('/api/users/users',  httpOptions ).pipe(
      map( (resp: any) => {
        console.log('============Impresion de usuarios ==================');
        resp._embedded.users.forEach(function(element) {
          console.log(element);
          const nombreCompleto = element.nombre + ' ' + element.apellidoMaterno
            + ' ' + element.apellidoPaterno;
          const user = {
            id: element.id,
            name: nombreCompleto,
            email: element.correo,
            phone: element.telCelular,
            level: element.idNivel,
            username: element.nickName,
            website: element.unidadNegocio,
            status: 'Active'
          };

          usuarios.push(user);


        });
        console.log('usuarios en json**********');
        console.log(usuarios);



        return usuarios;
      })


    );
*/

  }

}
