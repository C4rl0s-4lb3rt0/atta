import { Component, OnInit, ViewChild,  } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {MatSort} from '@angular/material/sort';
import { Router } from '@angular/router';

import {MatTableDataSource} from '@angular/material/table';
// import {Sort} from '@angular/material/sort';

// paginador
import { MatPaginator } from '@angular/material/paginator';
import {SelectionModel} from '@angular/cdk/collections';



import { UsersService } from '../services/user.service';
import { MatMenuTrigger } from '@angular/material/menu';


import { AuthApiService } from '../services/auth-api.service';


import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

import {MatCardModule} from '@angular/material/card';

import { of, interval } from 'rxjs';
import { map, tap } from 'rxjs/operators';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  
})





export class DashboardComponent implements OnInit {
  

  // @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  parentMessage = "message";
  navTitleChange:string;
  activeNav = false;
  filterValues = {};
  // displayedColumns: string[] = ['select','id', 'name', 'username', 'email', 'phone', 'website', 'status', 'options'];
  displayedColumns: string[] = ['select','name', 'id', 'status','options'];
  // status=['Saab', 'Volvo', 'BMW'];


  filterSelectObj = [];

  dataSource;

  usersData:User[];

  selection = new SelectionModel<User>(true, []);

  events: string[] = [];
  opened: boolean;
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  apiUsers:any;

 
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  
  // @ViewChild(MatMenuTrigger) triggerMenu: MatMenuTrigger;


  someMethod() {
    this.trigger.closeMenu(); // <-- put this in your dialog open method
}

  // chips
  visible = true;
  selectable = true;
  removable = true;

  varChipIdUser:string=null;
  chipIdUser:string=null;
  
  varChipStatus:string=null;
  chipStatus:string=null;


  // chips


  recluterId;
  contact;
  status;





  constructor(
              private router: Router,
              private _usersService: UsersService,
              private api:AuthApiService
              ) {
      
          this.filterSelectObj = [
                  {
                    name: 'ID',
                    columnProp: 'id',
                    options: []
                  },
                  {
                    name: 'STATUS',
                    columnProp: 'status',
                    options: []
                  }
                ]
          this.usersData=this._usersService.getUsers()
          
          this.dataSource = new MatTableDataSource<User>(this.usersData);

          this.apiUsers = this.api.getUsers().subscribe(resp=>{
            this.apiUsers=resp
            console.log(this.apiUsers)
          })
      }

   
      

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {
    // this.dataSource.sort = this.sort;
    this.getRemoteData();

    // Overrride default filter behaviour of Material Datatable
    this.dataSource.filterPredicate = this.createFilter();
    this.dataSource.sort = this.sort;

    // this.status   = this._usersService.getStatus();
    // this.recluterId =   this._usersService.getRecluterId();
    // // // this.contact =  this._usersService.getContact();

    this.status = this._usersService.getStatus();

    console.log(this.status)

  }

  salir(){
      this.api.logout();
      localStorage.setItem('lenguaje', JSON.stringify('en'));
      this.router.navigateByUrl('/login');
  }

  
  // Get Uniqu values from columns to build filter
  getFilterObject(fullObj, key) {
    const uniqChk = [];
    fullObj.filter((obj) => {
      if (!uniqChk.includes(obj[key])) {
        uniqChk.push(obj[key]);
      }
      return obj;
    });
    return uniqChk;
  }

  

  // Get remote serve data using HTTP call
  getRemoteData() {

    
    
    this.filterSelectObj.filter((o) => {
      o.options = this.getFilterObject(this.dataSource.data, o.columnProp);
    });
  }

  // Called on Filter change
  filterChange(filter, event) {
    //let filterValues = {}
    // console.log(filter);
    // console.log('vamos');
    console.log(event.target.value.trim().toLowerCase());
    
    // console.log('atras');
    this.filterValues[filter.columnProp] = event.target.value.trim().toLowerCase()
    console.log(this.filterValues);
    console.log('qey');
    this.dataSource.filter = JSON.stringify(this.filterValues)
    console.log(this.dataSource.filter);
    console.log('filter');
    
    if(filter.name=='ID'){
      this.varChipIdUser = `Id recluter: ${filter.modelValue}`
    }
    if(filter.name=='STATUS'){
      this.varChipStatus =`Status: ${filter.modelValue}`;
    }

  }

  

  filterChangeMore(filter,status) {
    if(this.varChipStatus==null){
      this.filterValues[filter.columnProp] = '';
    }else{
      this.filterValues[filter.columnProp] = status;
    }
    this.dataSource.filter = JSON.stringify(this.filterValues)
  }

  filterChangeMoreID(filter,status){
    
    if(this.varChipIdUser==null){
      this.filterValues[filter.columnProp] = '';
    }else{
      this.filterValues[filter.columnProp] = status;
    }
    this.dataSource.filter = JSON.stringify(this.filterValues)
  }




  // Custom filter method fot Angular Material Datatable
  createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      console.log(searchTerms)
      console.log('searchTerms')
      let isFilterSet = false;
      for (const col in searchTerms) {
        if (searchTerms[col].toString() !== '') {
          isFilterSet = true;
                  } else {
          delete searchTerms[col];
        }
      }
      
      let nameSearch = () => {
        let found = false;
        if (isFilterSet) {
          for (const col in searchTerms) {
            searchTerms[col].trim().toLowerCase().split(' ').forEach(word => {
              if (data[col].toString().toLowerCase().indexOf(word) != -1 && isFilterSet) {
                found = true
              }
            });
          }
          return found
        } else {
          return true;
        }
      }
      return nameSearch()
    }
    return filterFunction
  }


  removableChipIdUser(){
    this.varChipIdUser=null;
    this.dataSource.filterPredicate = this.createFilter();
    this.resetFiltersIdUser();
  
  }

  removableChipStatus(){
    this.varChipStatus=null;
    this.dataSource.filterPredicate = this.createFilter();
    this.resetFiltersStatus();

    
  }

resetFiltersIdUser() {
  this.filterValues = {}
  this.filterSelectObj.forEach((value, key) => {
    if(value.name=='ID'){
      value.modelValue = undefined;
    }else{
      this.filterSelectObj.forEach( (value ) => {
        if(value.name!='ID'){
          this.filterChangeMore(value,this.varChipStatus)
        }
      })
    }
  this.getRemoteData();
  })
}


resetFiltersStatus() {
  this.filterValues = {}
  this.filterSelectObj.forEach((value, key) => {
    if(value.name=='STATUS'){
      value.modelValue = undefined;
    }else{
      this.filterSelectObj.forEach( (value ) => {
        if(value.name!='status'){
          this.filterChangeMoreID(value,this.varChipIdUser)
        }
      })
    }
  this.getRemoteData();
  })
}




  // Reset table filters
  resetFilters() {
    this.filterValues = {}
    this.filterSelectObj.forEach((value, key) => {
      value.modelValue = undefined;
    })
    this.dataSource.filter = "";
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

   /** Whether the number of selected elements matches the total number of rows. */
   isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  sendFileInterrupt() {
    // let selectedFileIds: string[] = [];
       for (let item of this.selection.selected) {
        //  console.log(item.id);
        //  selectedFileIds.push(item.fileId);
      }
  }

  public editRecord(recordId, change) {
    this.parentMessage = recordId;
    this.navTitleChange = change;
    this.activeNav = true;

    // console.log(recordId);
    // console.log('...');
    // console.log(change);
  }

  
  change_sideBar(data){
    console.log(data)
    console.log('data')
    if(data.saveUser==true){
      this.selection.clear();
      this.removableChipIdUser();
      this.removableChipStatus()
      this.resetFilters();
      // console.log('se guardo y se cierra con reseteo')
    }else{
      if(data.onlyclosed){
        console.log('se debe de dejar filtros')
      }
    }
    this.activeNav = false;

  }



/** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      this.isAllSelected() ?
          this.selection.clear() :
          this.dataSource.data.forEach(row => {
            this.selection.select(row)
            // console.log(row);
          });
    }
  
    /** The label for the checkbox on the passed row */
  checkboxLabel(row?: User): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }


  ngChanges() { 
    console.log('todos sele')
      

  
      if(this.isAllSelected()== true){
      }

  }



// cuando todos esten selecionados

moveToBlackList(){
  console.log("se moveran a blacklist");
  console.log(this.dataSource.filter);    
  
}



}



export interface User {
  id: string,
  name: string,
  username: string,
  email: string,
  phone: string,
  website: string,
  status: string,
}

