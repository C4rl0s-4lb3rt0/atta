import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }
  
  passwordsIguales( pass1Name: string , pass2Name: string){
    
    return ( formGroup:FormGroup ) => {
    
        const pass1Control = formGroup.controls[pass1Name];
        const pass2Control = formGroup.controls[pass2Name];
        // console.log(pass1Control);
        // console.log(pass2Control);
        // console.log('.....');
        if( pass1Control.value === pass2Control.value){
          pass2Control.setErrors(null);
        }else{
          pass2Control.setErrors({ noEsIgual:true });
        }
    }
  } 


}
