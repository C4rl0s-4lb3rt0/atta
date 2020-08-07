import { Component, OnInit } from '@angular/core';

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


  constructor() {
    // const mq = window.matchMedia( "(min-width: 500px)" );
    // if (mq.matches) {
    //   console.log("1object")
    //   // window width is at least 500px
    // } else {
    //   console.log("2object")
    //   // window width is less than 500px
    //   this.tiles= [
    //     {text: 'One', cols: 12, rows: 1, color: 'white', fondo: false}
    //   ];
    //   }
  }


}
