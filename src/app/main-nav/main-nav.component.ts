import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { CanActivate } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit{
  
  public aux;
  
  
  public activeLang='en';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
    );
    

    
    constructor(private breakpointObserver: BreakpointObserver, private auth: AuthService,private translate: TranslateService) { 
      console.log('aca hay--');
      console.log(this.activeLang);
      console.log('aca hay--');
      if(localStorage.getItem('lenguaje')){
        this.aux=localStorage.getItem('lenguaje')
      }else{
        if(this.activeLang == 'es'){
          localStorage.setItem('lenguaje', JSON.stringify(this.activeLang));this.aux = this.activeLang
        }else{
          this.activeLang = 'en';
          localStorage.setItem('lenguaje', JSON.stringify(this.activeLang));
          this.aux = this.activeLang
        }

      }
      // ver si está en lcal store fin

        this.translate.setDefaultLang(this.activeLang)  


    }
    
    public Islogged:boolean=false;
    ngOnInit(): void {
      this.onCheckUser();
    }
  
  
    onCheckUser():void{
      if(this.auth.getCurrentUser()){
        this.Islogged= true;
      }else{
        this.Islogged= false;
      }
  }
  
  public cambiarLenguaje(lang) {
    this.activeLang = lang;
    this.translate.use(lang);

    localStorage.setItem('lenguaje', JSON.stringify(lang));

  }
  public botonLan = () => {
    let aux = localStorage.getItem('lenguaje').replace(/['"]+/g, '')
    if(aux == 'es'){
      return true
    }else{
      return false
    }
    
  }
}
