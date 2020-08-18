import { Component, OnInit, Input , Output, EventEmitter } from '@angular/core';
import { UsersService } from '../services/user.service';
import { User } from '../services/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-right-navbar',
  templateUrl: './right-navbar.component.html',
  styleUrls: ['./right-navbar.component.scss']
})
export class RightNavbarComponent implements OnInit {


  @Input() childMessage: string;
  @Input() activeNav: boolean;

  @Output() seCierra:EventEmitter<boolean>;

  forma:FormGroup

  constructor( private _usersService: UsersService,
              private fb:FormBuilder) { 

    this.seCierra = new EventEmitter()
   
    this.auxUser=this._usersService.getUser('1')
    this.crearFormulario();

  }

  usuario:User[];
  auxUser:User;
  
  ngOnInit(): void {
    this.auxUser=this._usersService.getUser('1')
    
  }

  @Input() categoryId: string; 

  ngOnChanges() { 
    this.auxUser=this._usersService.getUser(this.childMessage)
   }


  salirNav(){
    this.activeNav=false;
    this.seCierra.emit( this.activeNav )
  }
  
  crearFormulario(){
    this.forma= this.fb.group({
      name:[this.auxUser.name],
      reclutadorId:[],
      status:[],
    });
  }
  guardar(){
    console.log(this.forma);
  }

}