import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {MatSort} from '@angular/material/sort';
import { Router } from '@angular/router';

import {MatTableDataSource} from '@angular/material/table';
// import {Sort} from '@angular/material/sort';

// paginador
import { MatPaginator } from '@angular/material/paginator';
import {SelectionModel} from '@angular/cdk/collections';



// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})



export class DashboardComponent implements OnInit {
  
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);

  // @ViewChild(MatSort, {static: true}) sort: MatSort;

  parentMessage = "message from parent siiissss";
  activeNav = false;
  filterValues = {};
  displayedColumns: string[] = ['select','id', 'name', 'username', 'email', 'phone', 'website', 'status', 'options'];

  filterSelectObj = [];


  dataSource = new MatTableDataSource<User>(ELEMENT_DATA);

  selection = new SelectionModel<User>(true, []);

  events: string[] = [];
  opened: boolean;
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));



  @ViewChild(MatPaginator) paginator: MatPaginator;





  constructor(private auth: AuthService,
              private router: Router) {
      
                this.filterSelectObj = [
                  {
                    name: 'ID',
                    columnProp: 'id',
                    options: []
                  }, {
                    name: 'NAME',
                    columnProp: 'name',
                    options: []
                  }, {
                    name: 'USERNAME',
                    columnProp: 'username',
                    options: []
                  }, {
                    name: 'EMAIL',
                    columnProp: 'email',
                    options: []
                  }, {
                    name: 'STATUS',
                    columnProp: 'status',
                    options: []
                  }
                ]


      }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {
    // this.dataSource.sort = this.sort;
    this.getRemoteData();

    // Overrride default filter behaviour of Material Datatable
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
  }

  // Called on Filter change
  filterChange(filter, event) {
    //let filterValues = {}
    this.filterValues[filter.columnProp] = event.target.value.trim().toLowerCase()
    this.dataSource.filter = JSON.stringify(this.filterValues)
  }

  // Custom filter method fot Angular Material Datatable
  createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      let isFilterSet = false;
      for (const col in searchTerms) {
        if (searchTerms[col].toString() !== '') {
          isFilterSet = true;
        } else {
          delete searchTerms[col];
        }
      }

      console.log(searchTerms);

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
         console.log(item.id);
        //  selectedFileIds.push(item.fileId);
      }
  }

  public editRecord(recordId) {
    // this.dialog.open(this.editMemberComponent, {
    //   data: {recordId: recordId, idColumn: this.idColumn, paginator: this.paginator, dataSource: this.dataSource}
    // });
    this.parentMessage = recordId;
    this.activeNav = true;

    console.log(recordId);
    
  }


  cambiar(foo){
    this.activeNav =  foo;
    this.selection.clear()
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
      console.log('si...');
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    console.log('no...');
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
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

const ELEMENT_DATA: User[] = [
  { 
    id: '1',
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    status: 'Active'
  },
  {
    id: '2',
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
    phone: '010-692-6593 x09125',
    website: 'anastasia.net',
    status: 'Blocked'
  },
  {
    id: '3',
    name: 'Clementine Bauch',
    username: 'Samantha',
    email: 'Nathan@yesenia.net',
    phone: '1-463-123-4447',
    website: 'ramiro.info',
    status: 'Blocked'
  },
  {
    id: '4',
    name: 'Patricia Lebsack',
    username: 'Karianne',
    email: 'Julianne.OConner@kory.org',
    phone: '493-170-9623 x156',
    website: 'kale.biz',
    status: 'Active'
  },
  {
    id: '5',
    name: 'Chelsey Dietrich',
    username: 'Kamren',
    email: 'Lucio_Hettinger@annie.ca',
    phone: '(254)954-1289',
    website: 'demarco.info',
    status: 'Active'
  },
  {
    id: '6',
    name: 'Mrs. Dennis Schulist',
    username: 'Leopoldo_Corkery',
    email: 'Karley_Dach@jasper.info',
    phone: '1-477-935-8478 x6430',
    website: 'ola.org',
    status: 'In-Active'
  },
  {
    id: '7',
    name: 'Kurtis Weissnat',
    username: 'Elwyn.Skiles',
    email: 'Telly.Hoeger@billy.biz',
    phone: '210.067.6132',
    website: 'elvis.io',
    status: 'Active'
  },
  {
    id: '8',
    name: 'Nicholas Runolfsdottir V',
    username: 'Maxime_Nienow',
    email: 'Sherwood@rosamond.me',
    phone: '586.493.6943 x140',
    website: 'jacynthe.com',
    status: 'In-Active'
  },
  {
    id: '9',
    name: 'Glenna Reichert',
    username: 'Delphine',
    email: 'Chaim_McDermott@dana.io',
    phone: '(775)976-6794 x41206',
    website: 'conrad.com',
    status: 'In-Active'
  },
  {
    id: '10',
    name: 'Clementina DuBuque',
    username: 'Moriah.Stanton',
    email: 'Rey.Padberg@karina.biz',
    phone: '024-648-3804',
    website: 'ambrose.net',
    status: 'Active'
  },
];