import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthApiService } from '../services/auth-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private auth: AuthService,
              private api: AuthApiService,
              private router: Router){

  }
  
  canActivate():boolean  {
    console.log('guard');

    if( this.api.estaAutentificadoApi() ){
      return true;
    }else{
      this.router.navigateByUrl('/login');
      return false;
    }
    
  } 
}
