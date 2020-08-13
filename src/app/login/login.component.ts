import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../models/usuario.models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
// import Swal from 'sweetalert2';
import Swal from 'sweetalert2/src/sweetalert2.js'

import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  forma:FormGroup
  usuario: UsuarioModel;
  aux;
  constructor( private fb: FormBuilder,private auth : AuthService, 
                private router: Router,
                private translate: TranslateService
                ) { 

    this.crearFormulario();
   
  }

  ngOnInit(): void {
    this.usuario = new UsuarioModel();
    // this.usuario.email = 'atta@anzen.com.mx';
   
  }

  crearFormulario(){
    this.forma = this.fb.group({
      email    :['', [Validators.required , Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password : ['', Validators.required],
    });
  }


  onSubmit( ){
      if( this.forma.invalid){
        return;
      }

      
      Swal.fire({
        allowOutsideClick:false,
        text: 'Loading...',
      })
      Swal.showLoading();

      this.usuario.email = this.forma.value.email
      this.usuario.password = this.forma.value.password;
      console.log("holas.-----")
      this.auth.login(this.usuario)
          .subscribe( (resp) => {
            console.log(resp);
            Swal.close();
            this.router.navigateByUrl('/dashboard');



          }, (err) => {
            console.log(err.error.error.message);
            // alert(err.error.error.message)
            Swal.fire({
              allowOutsideClick:false,
              icon: 'error',
              title: 'Error!',
              text: err.error.error.message,
              // confirmButtonText: 'Cool'
            })
            
          } )
    console.log(this.forma);

  }
}
