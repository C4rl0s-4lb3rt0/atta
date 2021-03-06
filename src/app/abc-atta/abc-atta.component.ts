import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthApiService} from "../services/auth-api.service";
import Swal from 'sweetalert2';

interface Business {
  value: string;
  viewValue: string;
}



@Component({
  selector: 'app-abc-atta',
  templateUrl: './abc-atta.component.html',
  styleUrls: ['./abc-atta.component.scss']
})
export class AbcAttaComponent implements OnInit {

  auxError= false;
  msgError:string;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  language;
  forma: FormGroup;

  business: Business[] = [
    {value: 'Cloud', viewValue: 'Cloud'},
    {value: 'TMX-CAM', viewValue: 'TMX-CAM'},
    {value: 'Digital', viewValue: 'Digital'},
    {value: 'Nearshore', viewValue: 'Nearshore'},
    {value: 'ABU', viewValue: 'ABU'},
    {value: 'Commerce', viewValue: 'Commerce'},
    {value: 'Analytics', viewValue: 'Analytics'},
    {value: 'Corporate', viewValue: 'Corporate'},
    {value: 'TSA', viewValue: 'TSA'},
  ];

  levels: string[] = ['1', '2', '3', '4'];

  auxtext: Boolean = true;

  constructor(private fb: FormBuilder,
              private router: Router,
              private _formBuilder: FormBuilder,
              private api:AuthApiService
  ) {

      this.crearFormulario();
      this.language = localStorage.getItem('lenguaje');
      console.log(this.language);
      console.log(  this.isEnglish() );
      console.log('vamos');
    }

  ngOnInit(): void {

    console.log('ngonit');
    if ( !this.isEnglish() ) {
      console.log('entra a español');
      this.firstFormGroup = this._formBuilder.group({
        user:         ['', [ Validators.required, Validators.pattern('[A-Za-z]+[.]{1}[a-zA-Z]+')]],
        firstName:    ['', [ Validators.required, Validators.maxLength(20) ,Validators.pattern('[a-zA-Z]+[\\s*[a-zA-Z]*]*')]],
        apPaterno:    ['', [ Validators.required, Validators.maxLength(20) ,Validators.pattern('[a-zA-Z]+[\\s*[a-zA-Z]*]*') ]],
        apMaterno:    ['', [ Validators.required, Validators.maxLength(20) ,Validators.pattern('[a-zA-Z]+[\\s*[a-zA-Z]*]*') ]],
        email:        ['', [ Validators.required , Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$')]],
        phone:        ['', [ Validators.required ,Validators.min(1111111111),Validators.max(9999999999)] ],
        business:     ['', Validators.required],
        level:        ['', Validators.required],
        leng:         ['esp']
    });
    } else {
      console.log('entra a ingle');
      this.firstFormGroup = this._formBuilder.group({
          user:        ['', [ Validators.required, Validators.pattern('[A-Za-z]+[.]{1}[a-zA-Z]+')]],
          firstName:   ['', [ Validators.required, Validators.maxLength(20),Validators.pattern('[a-zA-Z]+[\\s*[a-zA-Z]*]*') ]],
          lastName:    ['', [ Validators.required ,Validators.maxLength(20) ,Validators.pattern('[a-zA-Z]+[\\s*[a-zA-Z]*]*') ]],
          email:       ['', [ Validators.required , Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$')]],
          phone:       ['', [ Validators.required ,Validators.min(1111111111),Validators.max(9999999999)] ],
          business:    ['', Validators.required],
          level:       ['', Validators.required],
          leng:        ['eng']
      });
    }



  }

  crearFormulario() {
    // this.forma = this.fb.group({

    // })
  }
  isEnglish() {
    const aux = localStorage.getItem('lenguaje').replace(/['"]+/g, '');
    if (aux == 'en') {
      return true;
    } else {
      return false;
    }
  }

   maxLengthCheck($event)
  {
    console.log($event.target.value.length)
    console.log($event.target.maxLength)
    console.log('$event')
    if ($event.target.value.length > $event.target.maxLength)
    $event.target.value = $event.target.value.slice(0, $event.target.maxLength)
  }

  guardar() {


    this.api.insertUsers(this.firstFormGroup.value).subscribe( data => {
          if(data['resp'] == 'Failed'){
                if(this.firstFormGroup.value.leng == 'eng') {
                  this.msgError = data['descEn'];
                }
                else {
                  this.msgError = data['desc'];
                }


                this.auxError= true
                if( this.msgError.includes('Nombre') || this.msgError.includes('Name')){
                    this.firstFormGroup.controls['firstName'].setErrors({'incorrect': true});
                }
                if( this.msgError.includes('Correo') || this.msgError.includes('Email') ){
                    this.firstFormGroup.controls['email'].setErrors({'incorrect': true});
                }
                if( this.msgError.includes('Telefono') || this.msgError.includes('Phone') ){
                    this.firstFormGroup.controls['phone'].setErrors({'incorrect': true});
                }
                if( this.msgError.includes('IdUser')  ){
                  this.firstFormGroup.controls['user'].setErrors({'incorrect': true});
                }
          }else{
            Swal.fire({
              allowOutsideClick:false,
              icon: 'success',
              title: 'User has been saved',
              showConfirmButton: false,
              timer: 1500
            })
            this.router.navigateByUrl('/abc-atta?resp=success');
          }
        });
  }

}
