import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styleUrls: ['./grafica1.component.css']
})
export class Grafica1Component implements OnInit {

  dataLabels: string[] = ['Hola', 'bebe', 'ok'];
  dataValue: any = [
    [10, 30, 60]
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
