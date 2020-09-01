import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../models/usuario.models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
// import Swal from 'sweetalert2';
import Swal from 'sweetalert2/src/sweetalert2.js'

import { TranslateService } from '@ngx-translate/core';


import { AuthApiService } from '../services/auth-api.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  forma:FormGroup
  usuario: UsuarioModel;
  aux;
  constructor(   private fb: FormBuilder,
                private auth : AuthService, 
                private router: Router,
                private translate: TranslateService,
                private api:AuthApiService
                ) { 

    this.crearFormulario();
    console.log('camos')  
   
  }

  ngOnInit(): void {
    this.usuario = new UsuarioModel();
    // this.usuario.email = 'atta@anzen.com.mx';
   
  }

  get inputNoValido(){
    return this.forma.get('email').invalid && this.forma.get('email').touched
  }
  get passNoValido(){
    return this.forma.get('password').invalid && this.forma.get('password').touched
  }

  crearFormulario(){
    this.forma = this.fb.group({
      email    :['', [Validators.required,Validators.pattern('[a-z]+\.+[a-z]')   ]],
      password : ['', Validators.required],
    });
  }

  desabilitado(){
    return (this.inputNoValido && this.passNoValido)
  }

  onSubmit( ){
      if( this.forma.invalid){
        return;
      }

      console.log(this.forma);

      Swal.fire({
        allowOutsideClick:false,
        text: 'Loading...',
      })

      this.usuario.email = this.forma.value.email
      this.usuario.password = this.forma.value.password;
      // this.auth.login(this.usuario)
      //     .subscribe( (resp) => {
      //       console.log(resp);
      //       Swal.close();
      //       this.router.navigateByUrl('/dashboard');



      //     }, (err) => {
      //       console.log(err.error.error.message);
      //       // alert(err.error.error.message)
      //       Swal.fire({
      //         allowOutsideClick:false,
      //         icon: 'error',
      //         title: 'Error!',
      //         text: err.error.error.message,
      //         // confirmButtonText: 'Cool'
      //       })
            
      //     } )



      this.api.getLogin2(this.usuario.email,this.usuario.password)
        .subscribe( (resp) => {
          console.log(resp)
          Swal.close();
          this.router.navigateByUrl('/abc-atta');
        },(err) => {
          console.log(err);
          Swal.fire({
                    allowOutsideClick:false,
                    icon: 'error',
                    title: 'Error!',
                    text: 'Campos Invalidos',
                    // confirmButtonText: 'Cool'
                  })

        })

  }
}
