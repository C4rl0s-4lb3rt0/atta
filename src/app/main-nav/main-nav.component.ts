import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { CanActivate } from '@angular/router';


@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit{
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
    );
    

    
    constructor(private breakpointObserver: BreakpointObserver, private auth: AuthService) { }
    
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
  


}
