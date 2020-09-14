import { Component, OnInit, ViewChild } from '@angular/core';
import { startWith, map } from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {MatChipInputEvent, MatChipList} from '@angular/material/chips';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { AuthApiService } from '../services/auth-api.service';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';




export interface Skill {
  skill: string;
}

const user = {
  firstName: 'Lindsey',
  lastName: 'Broos',
  fruits: [
    ]
};


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SearchComponent implements OnInit {
  
  public userForm:FormGroup;

  public selectable = true;
  public removable = true;
  public addOnBlur = true;
  public user: User;
  public fruits = [
    { id: 1, name: 'lemon' },
    { id: 2, name: 'lime' },
    { id: 3, name: 'orange' },
    { id: 4, name: 'strawberry' },
    { id: 5, name: 'raspberry' }];
  
   

  public filteredFruits$: Observable<Fruit[]>;

    @ViewChild('fruitList') fruitList: MatChipList;


  // tabla
  // dataSource = ELEMENT_DATA;
  // columnsToDisplay = ['name', 'weight', 'symbol', 'position'];
  expandedElement: Applicant | null;
  // tabla
  
  ELEMENT_DATA:Recruiter[];
  dataSource = new MatTableDataSource<Recruiter>(this.ELEMENT_DATA);
  dataSourceEjem= ELEMENT_DATA;


  displayedColumns: string[] = ['select']
  columnsToDisplay=['name','username','email','level'];

  selection = new SelectionModel<Recruiter>(true, []);



  myControl = new FormControl();
  optionsAux:string[] = []
  filteredOptions: Observable<string[]>;


  forma:FormGroup;

 



  constructor(    private api:AuthApiService,
                  private fb: FormBuilder) { 

      this.api.getUsersTableSearch()
        .subscribe( (report:any) => {
            report.forEach(
                element => {
                  this.optionsAux.push(element.nickName);
            })
            console.log(this.optionsAux)
        });

      this.crearFormulario();

      
  }    


  ngOnInit(): void {
    this.user = user;
    this.formularioDetallado();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
   
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.optionsAux.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  crearFormulario(){
    this.forma = this.fb.group({
      skillsPrin: [this.skills, this.validateSkillsPrin],
     
    });
  }

  formularioDetallado(){
    this.userForm = this.fb.group({
      occ:[],
      computrabajo:[],
      linkedIn:[],
      bdAtta:[],
      fruitInput: [null],
      fruits: [this.user.fruits, this.validateFruits],
    });

    this.userForm.get('fruits').statusChanges.subscribe(
      status => this.fruitList.errorState = status === 'INVALID'
    );

    this.filteredFruits$ = this.userForm.get('fruitInput').valueChanges
      .pipe(
        startWith(''),
        map(value => this.fruitFilter(value))
      );
  }



  visible = true;
  // selectable = true;
  // removable = true;
  // addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  panelOpenState = false;
  skills: Skill[] = [] ;

  marked = false;
  theCheckbox = false;

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.skills.push({skill: value.trim()});
      this.forma.controls['skillsPrin'].setValue((this.skills));

      
    }

    if (input) {
      input.value = '';
    }
  }

  removeSkill(skill: Skill): void {
    const index = this.skills.indexOf(skill);

    if (index >= 0) {
      this.skills.splice(index, 1);
      this.forma.get('skillsPrin').setValue(this.skills);
      // this.forma.get('fruitInput').setValue('');
    }
  }

  validateSkillsPrin(skillsPrin: FormControl){
      if (skillsPrin.value && skillsPrin.value.length === 0) {
        return {
          validateFruitsArray: { valid: false }
        };
      }
  
      return null;
    
  }


  toggleVisibility(e){
    this.marked= e.target.checked;
    console.log(this.marked);
  }



  onSubmit( ){
  
    console.log(this.forma.value.skillsPrin);
    this.getAllRecruiters()
  
  
  }

  onSubmitDetallado(){
    console.log(this.userForm);
  }

  public getAllRecruiters(){
    let resp = this.api.getUsersTable();
    resp.subscribe(report => {
      this.dataSource.data = report as Recruiter[]
      console.log(this.dataSource.data)
    } );
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Recruiter): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
 





  public selectFruit(event: MatAutocompleteSelectedEvent): void {
    if (!event.option) {
      return;
    }

    const value = event.option.value;

    if (value && value instanceof Object && !this.user.fruits.includes(value)) {
      this.user.fruits.push(value);
      this.userForm.get('fruits').setValue(this.user.fruits);
      this.userForm.get('fruitInput').setValue('');
    }
  }

  public addFruit(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value).trim()) {
      const matches = this.fruits.filter(fruit =>
        fruit.name.toLowerCase() === value);
      const formValue = this.userForm.get('fruits').value;
      const matchesNotYetSelected = formValue === null ? matches : matches.filter(x =>
        !(formValue.find(y => y.id === x.id)));
      if (matchesNotYetSelected.length === 1) {
        this.user.fruits.push(matchesNotYetSelected[0]);
        this.userForm.get('fruits').setValue(this.user.fruits);
        this.userForm.get('fruitInput').setValue('');
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  public remove(fruit: Fruit) {
    const index = this.user.fruits.indexOf(fruit);
    if (index >= 0) {
      this.user.fruits.splice(index, 1);
      this.userForm.get('fruits').setValue(this.user.fruits);
      this.userForm.get('fruitInput').setValue('');
    }
  } 


  private fruitFilter(value: any): Fruit[] {
    const filterValue = (value === null || value instanceof Object) ? '' : value.toLowerCase();
    const matches = this.fruits.filter(fruit =>
      fruit.name.toLowerCase().includes(filterValue));
    const formValue = this.userForm.get('fruits').value;
    return formValue === null ? matches : matches.filter(x =>
      !(formValue.find(y => y.id === x.id))
    );
  }

  private validateFruits(fruits: FormControl) {
    if (fruits.value && fruits.value.length === 0) {
      return {
        validateFruitsArray: { valid: false }
      };
    }

    return null;
  }




}


export interface User {
  firstName: string;
  lastName: string;
  fruits: Fruit[];
}




export interface Fruit {
  id: number;
  name: string;
}


export interface Recruiter {
  id?: string
  name?: string,
  email?: string,
  unidadNegocio?: string,
  level?: string,
  username?: string,
}


export interface Applicant {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}

const ELEMENT_DATA: Applicant[] = [
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`
  }, {
    position: 2,
    name: 'Helium',
    weight: 4.0026,
    symbol: 'He',
    description: `Helium is a chemical element with symbol He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`
  }, {
    position: 3,
    name: 'Lithium',
    weight: 6.941,
    symbol: 'Li',
    description: `Lithium is a chemical element with symbol Li and atomic number 3. It is a soft,
        silvery-white alkali metal. Under standard conditions, it is the lightest metal and the
        lightest solid element.`
  }, {
    position: 4,
    name: 'Beryllium',
    weight: 9.0122,
    symbol: 'Be',
    description: `Beryllium is a chemical element with symbol Be and atomic number 4. It is a
        relatively rare element in the universe, usually occurring as a product of the spallation of
        larger atomic nuclei that have collided with cosmic rays.`
  }, {
    position: 5,
    name: 'Boron',
    weight: 10.811,
    symbol: 'B',
    description: `Boron is a chemical element with symbol B and atomic number 5. Produced entirely
        by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a
        low-abundance element in the Solar system and in the Earth's crust.`
  }, {
    position: 6,
    name: 'Carbon',
    weight: 12.0107,
    symbol: 'C',
    description: `Carbon is a chemical element with symbol C and atomic number 6. It is nonmetallic
        and tetravalent—making four electrons available to form covalent chemical bonds. It belongs
        to group 14 of the periodic table.`
  }, {
    position: 7,
    name: 'Nitrogen',
    weight: 14.0067,
    symbol: 'N',
    description: `Nitrogen is a chemical element with symbol N and atomic number 7. It was first
        discovered and isolated by Scottish physician Daniel Rutherford in 1772.`
  }, {
    position: 8,
    name: 'Oxygen',
    weight: 15.9994,
    symbol: 'O',
    description: `Oxygen is a chemical element with symbol O and atomic number 8. It is a member of
         the chalcogen group on the periodic table, a highly reactive nonmetal, and an oxidizing
         agent that readily forms oxides with most elements as well as with other compounds.`
  }, {
    position: 9,
    name: 'Fluorine',
    weight: 18.9984,
    symbol: 'F',
    description: `Fluorine is a chemical element with symbol F and atomic number 9. It is the
        lightest halogen and exists as a highly toxic pale yellow diatomic gas at standard
        conditions.`
  }, {
    position: 10,
    name: 'Neon',
    weight: 20.1797,
    symbol: 'Ne',
    description: `Neon is a chemical element with symbol Ne and atomic number 10. It is a noble gas.
        Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about
        two-thirds the density of air.`
  },
];
