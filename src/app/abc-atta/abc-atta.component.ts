import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthApiService} from "../services/auth-api.service";

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

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  language;
  forma: FormGroup;

  business: Business[] = [
    {value: 'nearshore', viewValue: 'Nearshore'},
    {value: 'nearshore/corporate', viewValue: 'Nearshore/Corporate'},
    {value: 'corporate', viewValue: 'Corporate'},
    {value: 'transformation-mx', viewValue: 'Transformation Mx'},
    {value: 'time&materials', viewValue: 'Time & Materials'},
    {value: 'anzen', viewValue: 'Anzen'},
    {value: 'southamerica', viewValue: 'South America'},
    {value: 'cloud', viewValue: 'Cloud'},
    {value: 'hr', viewValue: 'HR'},
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
        user: ['', Validators.required],
        firstName: ['', Validators.required],
        apPaterno: ['', Validators.required],
        apMaterno: ['', Validators.required],
        email: ['', [Validators.required , Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
        phone: ['', Validators.required],
        business: ['', Validators.required],
        level: ['', Validators.required],
        leng: ['esp']
    });
    } else {
      console.log('entra a ingle');
      this.firstFormGroup = this._formBuilder.group({
          user: ['', Validators.required],
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          email: ['', [Validators.required , Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
          phone: ['', Validators.required],
          business: ['', Validators.required],
          level: ['', Validators.required],
          leng: ['eng']
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

  guardar() {
    console.log('entro a guardar');
    if (this.firstFormGroup.invalid) {
      this.auxtext = !this.auxtext;
    } else {

      console.log(this.firstFormGroup);
      this.api.insertUsers(this.firstFormGroup.value);


      // this.router.navigateByUrl('/dashboard');
    }
  }


}
