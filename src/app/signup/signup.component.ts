import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../models/usuario.models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ValidadoresService } from '../services/validadores.service';
import Swal from 'sweetalert2';

import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  usuario: UsuarioModel;

  forma: FormGroup;
  public activeLang='en';

  constructor( private auth:AuthService,  
                private router: Router,
                private fb: FormBuilder,
                private validadores:ValidadoresService,
                private translate: TranslateService  ) { 

    this.crearFormulario(); 
   
  
        this.translate.setDefaultLang(this.activeLang)  


  }

  ngOnInit(): void {
    this.usuario = new UsuarioModel();
    // this.usuario.email= 'carlos@gmail.com';
  }

  get pass2Novalido(){
    const pass1 = this.forma.get('password').value;
    const pass2 = this.forma.get('conf_password').value;

    return ( pass1 === pass2 )? false : true
  }


  crearFormulario(){
      this.forma = this.fb.group({
        user: ['',Validators.required ],
        email: ['',[Validators.required , Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
        password: ['', [Validators.minLength(6),Validators.required]],
        conf_password: ['',[Validators.minLength(6), Validators.required]]
      },{
        validators: this.validadores.passwordsIguales('password', 'conf_password') 
      });
  }

  onSubmit(){
    // console.log(this.forma );
    if(this.forma.invalid){
      return; 
    }

    Swal.fire({
      allowOutsideClick:false,
      text: 'Loading...',
    })
    Swal.showLoading();
    console.log('formualario enviado');

    this.usuario.user = this.forma.value.user;
    this.usuario.email = this.forma.value.email;
    this.usuario.password = this.forma.value.password;



    this.auth.nuevoUsuario( this.usuario )
        .subscribe( resp => {
          console.log(resp);
          Swal.fire({
            allowOutsideClick:false,
            text: 'Usuario registrado',
          })
          this.router.navigateByUrl('/dashboard');
  
  
        }, (err)=> {
          // console.log(err.error.error.message );
          Swal.fire({
            allowOutsideClick:false,
            icon: 'error',
            title: 'Error!',
            text: err.error.error.message,
            // confirmButtonText: 'Cool'
          })
          // alert(err.error.error.message)
    });
  }  

}
