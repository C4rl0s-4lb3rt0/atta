import { Component, OnInit, ViewChild, } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {MatSort} from '@angular/material/sort';
import { Router , ActivatedRoute, RouterStateSnapshot} from '@angular/router';

import {MatTableDataSource} from '@angular/material/table';
// import {Sort} from '@angular/material/sort';

// paginador
import { MatPaginator } from '@angular/material/paginator';
import {SelectionModel} from '@angular/cdk/collections';

import { AuthApiService } from '../services/auth-api.service';


import { UsersService } from '../services/user.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-abc-atta-dash',
  templateUrl: './abc-atta-dash.component.html',
  styleUrls: ['./abc-atta-dash.component.scss']
})
export class AbcAttaDashComponent implements OnInit {

 
  parentMessage = "message";
  navTitleChange:string;
  activeNav = false;
  filterValues = {};

  filterSelectObj = [];


  events: string[] = [];
  opened: boolean;
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));



 
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  
  

  someMethod() {
    this.trigger.closeMenu(); // <-- put this in your dialog open method
}

  // chips
  showChips=false;
  visible = true;
  selectable = true;
  removable = true;

  varChipIdUser:string=null;
  chipIdUser:string=null;
  
  varChipLevel:string=null;
  chipStatus:string=null;


  // chips


  recruiters:any[]= []
  loading:boolean;
  auxUserCreated:boolean=false;


  forma:FormGroup;

  filtroLevel:boolean=false
  filtroIdRecruiter:boolean=false;

  valueRecuriterId;
  valueLevel


  ELEMENT_DATA:Recruiter[];
  displayedColumnsTable: string[]= ['name','username','unidadNegocio','email','level'];
  dataSource = new MatTableDataSource<Recruiter>(this.ELEMENT_DATA);
  auxData

  noRecruiters=false;


  constructor(private auth: AuthService,
              private router: Router,
              private _apiServide:AuthApiService,
              private fb: FormBuilder
              ) {
      
          this.loading= true;
          this.crearFormulario();
        
          const snapshot: RouterStateSnapshot = router.routerState.snapshot;
          console.log(snapshot.url);  // <-- hope it helps
          
          if( snapshot.url.includes('success') ){
              this.auxUserCreated=true
              console.log(this.auxUserCreated)
          }

      }

   
      

  
  ngOnInit(): void {

       this.getAllRecruiters()
    
  }

  salir(){
      this.auth.logout();
      localStorage.setItem('lenguaje', JSON.stringify('en'));
      this.router.navigateByUrl('/login');
  }

  closeUserCreated(){
    this.auxUserCreated=false;
  }
  
  removableChipIdUser(){
    this.varChipIdUser=null;
    this.forma.controls.recluiterId.reset()
    console.log(this.valueLevel);
    // debugger
    this.valueLevel = this.forma.controls.level.value;
    console.log(this.valueLevel)
    if(this.valueLevel!=null && this.valueLevel){
      this.OnSubmitFilterLevel()
      // this.OnSubmitFilter()
    }else{
      this.getAllRecruiters()
      this.showChips=false
      this.noRecruiters=false;
      
    }
    console.log(this.valueLevel);
    
    
    
  }
  
  removableChipLevel(){
    this.varChipLevel=null;
    this.forma.controls.level.reset()
    this.valueRecuriterId = this.forma.controls.recluiterId.value;
    console.log(this.valueRecuriterId);
    if(this.valueRecuriterId!=null && this.valueRecuriterId){
          this.OnSubmitFilterIdRecruiter()
          console.log("entra")
          
    }else{
      this.getAllRecruiters()
      this.showChips=false
      console.log('todo')
      this.noRecruiters=false;
   
    }
        // console.log(this.valueRecuriterId);
    
  }

  crearFormulario(){
    this.forma = this.fb.group({
      recluiterId : ['', [ Validators.maxLength(10),Validators.pattern('[a-z]+[.]*[a-z]*') ]],
      level : [''],
    });
  }

  OnSubmitFilter(){
    // console.log("Level:");
    // console.log(this.forma.controls.level.value);
    // console.log("RecluiterId");
    // console.log(this.forma.controls.recluiterId.value);
    console.log('prueba ara ver si chips');
    const recruitersFilter = new Array();
    let levelAux;
    let levelAuxChips =false;

    let recluiterIdAux;
    let recluiterIdAuxChips=false;



    if(  !((!(this.forma.controls.level.value != '' ) && this.forma.controls.level.pristine )) && (this.forma.controls.level.value != null)  ){
     
      this.showChips=true;
      this.varChipLevel = `Level: ${this.forma.controls.level.value}`
      levelAux = this.forma.controls.level.value;
      levelAuxChips = this.forma.controls.level.value;
      this.filtroLevel=true
      
    }

    if( !(this.forma.controls.recluiterId.pristine || !(this.forma.controls.recluiterId.value.length > 0 ))  ){
      this.showChips=true;
      this.varChipIdUser = `Recruiter Id: ${this.forma.controls.recluiterId.value}`
      recluiterIdAux = this.forma.controls.recluiterId.value
      recluiterIdAuxChips = this.forma.controls.recluiterId.value
      this.filtroIdRecruiter=true;
    }

      levelAuxChips =this.filtroLevel
      recluiterIdAuxChips= this.filtroIdRecruiter
      

      if(this.forma.controls.level.value==null){
        levelAuxChips=false;
      }
      if(this.forma.controls.recluiterId.value==null){
        recluiterIdAuxChips=false;
      }
      console.log( levelAuxChips);
      console.log(recluiterIdAuxChips);

      console.log(this.dataSource.data)
    this.dataSource.data.forEach(function(element) {
      // console.log(element);

      if( levelAuxChips == true && recluiterIdAuxChips == true){
      
        if(element.level == levelAux &&  element.username.includes(recluiterIdAux)){
          console.log('los dos true')
          recruitersFilter.push(element);
        }
      }


      if( (levelAuxChips == true &&  recluiterIdAuxChips == false)  || (levelAuxChips == true &&  recluiterIdAuxChips == null)){
        console.log('con level')
        if(element.level == levelAux){
            recruitersFilter.push(element);
        }
      }


      if( (levelAuxChips == false &&  recluiterIdAuxChips == true) || (levelAuxChips == null &&  recluiterIdAuxChips == true) || (levelAuxChips == false &&  recluiterIdAuxChips == true)) {
        console.log('con Id')
        if( element.username.includes(recluiterIdAux) ){
            recruitersFilter.push(element);
        }
      }
    });
    console.log(this.dataSource.data) 
    console.log('this.dataSource.data') 
    this.auxData=this.dataSource.data;
    // console.log(this.auxData) 
    console.log('this.auxData') 
    this.dataSource.data = recruitersFilter;
    console.log(this.dataSource.data.length);
    console.log('length.....');
    if(this.dataSource.data.length == 0) {
        this.noRecruiters=true;
    }else{
      this.noRecruiters=false;
    }



    return;
   
  }




  OnSubmitFilterIdRecruiter(){
    // console.log("Level:");
    // console.log(this.forma.controls.level.value);
    // console.log("RecluiterId");
    // console.log(this.forma.controls.recluiterId.value);
    console.log('prueba ara ver si chips');
    const recruitersFilter = new Array();
    let levelAux;
    let levelAuxChips =false;

    let recluiterIdAux;
    let recluiterIdAuxChips=false;



    if(  !((!(this.forma.controls.level.value != '' ) && this.forma.controls.level.pristine )) && (this.forma.controls.level.value != null)  ){
     
      this.showChips=true;
      this.varChipLevel = `Level: ${this.forma.controls.level.value}`
      levelAux = this.forma.controls.level.value;
      levelAuxChips = this.forma.controls.level.value;
      this.filtroLevel=true
      
    }

    if( !(this.forma.controls.recluiterId.pristine || !(this.forma.controls.recluiterId.value.length > 0 ))  ){
      this.showChips=true;
      this.varChipIdUser = `Recruiter Id: ${this.forma.controls.recluiterId.value}`
      recluiterIdAux = this.forma.controls.recluiterId.value
      recluiterIdAuxChips = this.forma.controls.recluiterId.value
      this.filtroIdRecruiter=true;
    }

      levelAuxChips =this.filtroLevel
      recluiterIdAuxChips= this.filtroIdRecruiter
      

      if(this.forma.controls.level.value==null){
        levelAuxChips=false;
      }
      if(this.forma.controls.recluiterId.value==null){
        recluiterIdAuxChips=false;
      }
      console.log( levelAuxChips);
      console.log(recluiterIdAuxChips);

      console.log(this.dataSource.data)
    this.auxData.forEach(function(element) {
      // console.log(element);

      if( levelAuxChips == true && recluiterIdAuxChips == true){
      
        if(element.level == levelAux &&  element.username.includes(recluiterIdAux)){
          console.log('los dos true')
          recruitersFilter.push(element);
        }
      }


      if( (levelAuxChips == true &&  recluiterIdAuxChips == false)  || (levelAuxChips == true &&  recluiterIdAuxChips == null)){
        console.log('con level')
        if(element.level == levelAux){
            recruitersFilter.push(element);
        }
      }


      if( (levelAuxChips == false &&  recluiterIdAuxChips == true) || (levelAuxChips == null &&  recluiterIdAuxChips == true) || (levelAuxChips == false &&  recluiterIdAuxChips == true)) {
        console.log('con Id')
        if( element.username.includes(recluiterIdAux) ){
            recruitersFilter.push(element);
        }
      }
    });
    
    this.dataSource.data = recruitersFilter;
    if(this.dataSource.data.length == 0) {
        this.noRecruiters=true;
    }else{
      this.noRecruiters=false;
    }

    return;
   
  }




  OnSubmitFilterLevel(){
    // console.log("Level:");
    // console.log(this.forma.controls.level.value);
    // console.log("RecluiterId");
    // console.log(this.forma.controls.recluiterId.value);
    console.log('prueba ara ver si chips');
    const recruitersFilter = new Array();
    let levelAux;
    let levelAuxChips =false;

    let recluiterIdAux;
    let recluiterIdAuxChips=false;



    if(  !((!(this.forma.controls.level.value != '' ) && this.forma.controls.level.pristine )) && (this.forma.controls.level.value != null)  ){
     
      this.showChips=true;
      this.varChipLevel = `Level: ${this.forma.controls.level.value}`
      levelAux = this.forma.controls.level.value;
      levelAuxChips = this.forma.controls.level.value;
      this.filtroLevel=true
      
    }

    if( !(this.forma.controls.recluiterId.pristine || !(this.forma.controls.recluiterId.value.length > 0 ))  ){
      this.showChips=true;
      this.varChipIdUser = `Recruiter Id: ${this.forma.controls.recluiterId.value}`
      recluiterIdAux = this.forma.controls.recluiterId.value
      recluiterIdAuxChips = this.forma.controls.recluiterId.value
      this.filtroIdRecruiter=true;
    }

      levelAuxChips =this.filtroLevel
      recluiterIdAuxChips= this.filtroIdRecruiter
      

      if(this.forma.controls.level.value==null){
        levelAuxChips=false;
      }
      if(this.forma.controls.recluiterId.value==null){
        recluiterIdAuxChips=false;
      }
      console.log( levelAuxChips);
      console.log(recluiterIdAuxChips);

      console.log(this.dataSource.data)
    this.auxData.forEach(function(element) {
      // console.log(element);

      if( levelAuxChips == true && recluiterIdAuxChips == true){
      
        if(element.level == levelAux &&  element.username.includes(recluiterIdAux)){
          console.log('los dos true')
          recruitersFilter.push(element);
        }
      }


      if( (levelAuxChips == true &&  recluiterIdAuxChips == false)  || (levelAuxChips == true &&  recluiterIdAuxChips == null)){
        console.log('con level')
        if(element.level == levelAux){
            recruitersFilter.push(element);
        }
      }


      if( (levelAuxChips == false &&  recluiterIdAuxChips == true) || (levelAuxChips == null &&  recluiterIdAuxChips == true) || (levelAuxChips == false &&  recluiterIdAuxChips == true)) {
        console.log('con Id')
        if( element.username.includes(recluiterIdAux) ){
            recruitersFilter.push(element);
        }
      }
    });
    
    this.dataSource.data = recruitersFilter;
    if(this.dataSource.data.length == 0) {
        this.noRecruiters=true;
    }else{
      this.noRecruiters=false;
    }

    return;
   
  }

  public getAllRecruiters(){
    let resp = this._apiServide.getUsersTable();
    resp.subscribe(report => this.dataSource.data=report as Recruiter[] );
  }
  

}





export interface Recruiter {
  id?: string
  name?: string,
  email?: string,
  unidadNegocio?: string,
  level?: string,
  username?: string,
}