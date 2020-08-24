import { Component, OnInit, Input , Output, EventEmitter } from '@angular/core';
import { UsersService } from '../services/user.service';
import { User } from '../services/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';


import Swal from 'sweetalert2/src/sweetalert2.js'
import { Router } from '@angular/router';


@Component({
  selector: 'app-right-navbar',
  templateUrl: './right-navbar.component.html',
  styleUrls: ['./right-navbar.component.scss']
})
export class RightNavbarComponent implements OnInit {


  @Input() childMessage: string;
  @Input() activeNav: boolean;
  @Input() childTitle: string;
  panelOpenState = false;

  recluterId=['1232','3224','2354','2432','1276']
  // status=['NO CONTACT','EMAIL SENT','FOLLOW UP','WAITING RESPONSE','NO RESPONSE','SCREENING TO DO','SCREENING PROCESS','SCREENING DONE','NO PROFILE','PAYLOCITY','WHATSAPP']
  contact=['EMAIL','WHATSAPP','FOLLOW UP EMAIL']
  blacklist=['MOVE TO BLACKLIST','MOVE TO JOB APPLICANTS']

  // @Output() seCierra:EventEmitter<boolean>;

  // @Output() updateUser:EventEmitter<boolean>;


  status;  
  
  
  // @Output() data:new EventEmitter<{name:string, age:number}>(); 




  formaContact:FormGroup
  
  constructor( private _usersService: UsersService,
              private fb:FormBuilder,
              private router: Router) { 

   
    // this.auxUser=this._usersService.getUser('1')
   
  }
  
  
  @Output() public data =  
        new EventEmitter<{saveUser:boolean, onlyclosed:boolean}>(); 

  usuario:User[];
  auxUser:User;
  saveUser:boolean=false;
  onlyclosed:boolean=false;
   
  ngOnInit(): void {
    this.auxUser  = this._usersService.getUser('1');
    this.status   = this._usersService.getStatus();

    console.log(this.status);
    // this.recluterId =   this._usersService.getRecluterId();
    // this.contact =  this._usersService.getContact();
    // this.blacklist = this._usersService.getBlacklist();
    
  }

  @Input() categoryId: string; 

  ngOnChanges() { 
    this.auxUser=this._usersService.getUser(this.childMessage)
    if(this.auxUser){
      this.crearFormulario()
    }
    this.status   = this._usersService.getStatus();
   }


  salirNav(onlyclosed){
    this.activeNav=false;
    console.log(onlyclosed);
    this.data.emit({
          saveUser:this.saveUser,
          onlyclosed:onlyclosed
      }
    );
  }
  

  crearFormulario(){
    this.formaContact = this.fb.group({
      idUser :[this.auxUser.id],
      selectIdRecluter:['1232'],
      selectStatus:['NO RESPONSE'],
      selectContact:['WHATSAPP'],
      selectBlacklist:['MOVE TO BLACKLIST'],
    });
  }  
  
  
  onSubmitContacto(){
    if( this.formaContact.invalid){
      return;
    }
    console.log(this.formaContact);
    Swal.fire({
      allowOutsideClick:false,
      icon: 'success',
      title: '',
      text: 'successful change',
      // confirmButtonText: 'Cool'
    })
    this.saveUser=true;
    this.salirNav(true)
    this.router.navigateByUrl('/dashboard');
  }
  
}