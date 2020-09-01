import { Component, OnInit } from '@angular/core';
import { AuthApiService, Recruiter } from '../services/auth-api.service';

// export interface Tile {
//   color: string;
//   cols: number;
//   rows: number;
//   text: string;
//   fondo: boolean;
// }


@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})

export class IntroComponent  {
  
  
  // tiles: Tile[] = [
  //   {text: 'One', cols: 3, rows: 1, color: 'white', fondo: false},
  //   {text: 'Two', cols: 9, rows: 1, color: 'lightgreen', fondo: true}
  // ];

  // estadoPositivo: boolean = true;
  // fit:string= '88vh';

    recruiters:any[]= []

  constructor( private _apiServide:AuthApiService) {
  
    console.log('servicio de api listo component');

        this._apiServide.getUsers()
            .subscribe( (data:any) => {
              console.log(data);
              this.recruiters=data
              }
        )
    }

}
