import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progess',
  templateUrl: './progess.component.html',
  styleUrls: ['./progess.component.css']
})
export class ProgessComponent implements OnInit {

  progress1: number = 25;
  progress2: number = 75;

  constructor() { }


  get getPorcentage1() {
    return `${ this.progress1 }%`;
  }

  get getPorcentage2() {
    return `${ this.progress2 }%`;
  }

  /* changeValue(value: number) {
    console.log("llega: ", value)
  } */

  ngOnInit(): void {
  }

}
