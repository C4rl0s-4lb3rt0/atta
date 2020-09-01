import { Component, OnInit, ViewChild, } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {MatSort} from '@angular/material/sort';
import { Router } from '@angular/router';

import {MatTableDataSource} from '@angular/material/table';
// import {Sort} from '@angular/material/sort';

// paginador
import { MatPaginator } from '@angular/material/paginator';
import {SelectionModel} from '@angular/cdk/collections';

import { AuthApiService } from '../services/auth-api.service';


import { UsersService } from '../services/user.service';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-abc-atta-dash',
  templateUrl: './abc-atta-dash.component.html',
  styleUrls: ['./abc-atta-dash.component.scss']
})
export class AbcAttaDashComponent implements OnInit {

  // @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  parentMessage = "message";
  navTitleChange:string;
  activeNav = false;
  filterValues = {};

  displayedColumns: string[] = ['name','level','email','bussinets','recluiterId'];

  filterSelectObj = [];

  dataSource;

  
  selection = new SelectionModel<Recruiter>(true, []);

  events: string[] = [];
  opened: boolean;
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));



 
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  
  // @ViewChild(MatMenuTrigger) triggerMenu: MatMenuTrigger;


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

  constructor(private auth: AuthService,
              private router: Router,
              private _apiServide:AuthApiService
              ) {
      
          this.loading= true;
          this.filterSelectObj = [
                  {
                    name: 'Level',
                    columnProp: 'level',
                    options: []
                  },
                  {
                    name: 'Recluter Id',
                    columnProp: 'id',
                    options: []
                  }
                ]
          
          this._apiServide.getUsers()
              .subscribe( (data:any) => {
                  console.log(data);
                  this.recruiters=data
                  this.loading=false;
                  this.dataSource = new MatTableDataSource<Recruiter>(data);
                  this.getRemoteData();
                  this.dataSource.sort = this.sort;
                  this.dataSource.filterPredicate = this.createFilter();
                  this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    

    
                  }
              )
          
      console.log('debemos ini');
      console.log(this.recruiters);
      console.log('debemos final');
          
          // this.dataSource = new MatTableDataSource<Recruiter>(this._apiServide);


      }

   
      

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {
    // this.dataSource.sort = this.sort;
    
    // Overrride default filter behaviour of Material Datatable
    
    
    this.getRemoteData();
    this.dataSource.filterPredicate = this.createFilter();
    this.dataSource.sort = this.sort;

  }

  salir(){
      this.auth.logout();
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
    if(this.filterSelectObj[0].modelValue == null && this.filterSelectObj[1].modelValue == null){
      this.showChips=false

    }
    

  }

  // Called on Filter change
  filterChange(filter, event) {
    //let filterValues = {}
    // console.log(filter);
    // console.log('vamos');
    console.log(event.target.value.trim().toLowerCase());
    
    // console.log('atras');
    
    this.filterValues[filter.columnProp] = event.target.value.trim().toLowerCase()
    this.dataSource.filter = JSON.stringify(this.filterValues)
    console.log(filter.name);
    
    if(filter.name=='Level'){
      this.varChipIdUser = `Level: ${filter.modelValue}`
   
    }
    if(filter.name=='Recluter Id'){
      this.varChipLevel =`Recluter Id: ${filter.modelValue}`;
    }
      this.showChips=true;
  }


  filterChangeMore(filter,status) {
    if(this.varChipLevel==null){
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
      console.log('!!!!')
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

  removableChipLevel(){
    console.log('remover nivel');
    this.varChipLevel=null;
    this.dataSource.filterPredicate = this.createFilter();
    this.resetFiltersLevel();

    
  }

resetFiltersIdUser() {
  this.filterValues = {}
 
  this.filterSelectObj.forEach((value, key) => {
    // console.log(value.name)
    // console.log('soy que ???......!!!!')
    // debugger
    if(value.name=='Level'){
      value.modelValue = null;
      
    }else{
      this.filterSelectObj.forEach( (value ) => {
        if(value.name!='Level'){
          this.filterChangeMore(value,this.varChipLevel)
        }
      })
    }
    // console.log(this.filterSelectObj); 
    // console.log('this.filterSelectObj----'); 
    // console.log('id Usser');
  this.getRemoteData();
  })
}


resetFiltersLevel() {
  this.filterValues = {}

  this.filterSelectObj.forEach((value, key) => {
    // console.log(value.name)
    // console.log('value......!!!!')
    // debugger
    if(value.name=='Recluter Id'){
      value.modelValue = null;
    }else{
      this.filterSelectObj.forEach( (value ) => {
        if(value.name!='Recluter Id'){
          this.filterChangeMoreID(value,this.varChipIdUser)
        }
      })
    }
    // console.log(this.filterSelectObj); 
    // console.log('this.filterSelectObj----'); 
    // console.log('id Usser');
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

    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
  
  }

   /** Whether the number of selected elements matches the total number of rows. */
   isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.recruiters.length;
    return numSelected === numRows;
  }

  sendFileInterrupt() {
    // let selectedFileIds: string[] = [];
       for (let item of this.selection.selected) {
        //  console.log(item.id);
        //  selectedFileIds.push(item.fileId);
      }
  }

  public moveJAId(recordId) {
   

     console.log(recordId);
    console.log('Se movera a JA');
    // console.log(change);
  }

  
  change_sideBar(data){
    console.log(data)
    console.log('data')
    if(data.saveUser==true){
      this.selection.clear();
      this.removableChipIdUser();
      this.removableChipLevel()
      this.resetFilters();
      // console.log('se guardo y se cierra con reseteo')
    }else{
      if(data.onlyclosed){
        console.log('se debe de dejar filtros')
      }
    }
    this.activeNav = false;

  }

  // cambiar(foo,registro){
  //   this.activeNav =  foo;
  //   if(registro == true){
  //   }
  //   // console.log('se cierra solamente')
  // }



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
  checkboxLabel(row?: Recruiter): string {
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

}





export interface Recruiter {
  id: string,
  name: string
  email: string,
  phone: string,
  level: string,
  username: string,
  website: string,
  status: string
}