import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


interface Business {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-form-alta',
  templateUrl: './form-alta.component.html',
  styleUrls: ['./form-alta.component.scss']
})
export class FormAltaComponent implements OnInit {

  forma: FormGroup;

  business: Business[] = [
    {value: 'finance', viewValue: 'Finance'},
    {value: 'health', viewValue: 'Health'},
    {value: 'politic', viewValue: 'Politic'}
  ];
  levels: string[]= ['1','2','3','4'];

  auxtext:Boolean=true;

  constructor( private fb: FormBuilder,
              private router: Router) { 
      this.crearFormulario();
  }
  
  ngOnInit(): void {
  }
  
  crearFormulario(){
    this.forma = this.fb.group({
      user:['', Validators.required],
      firstName:['', Validators.required],
      lastName:['',Validators.required],
      email:['',[Validators.required , Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      business:['',Validators.required],
      level:['',Validators.required] 
    })
  }

  guardar(){
    if(this.forma.invalid){
      this.auxtext= !this.auxtext;
    }else{
    
      console.log(this.forma);
      this.router.navigateByUrl('/dashboard');
    }
  }

}
