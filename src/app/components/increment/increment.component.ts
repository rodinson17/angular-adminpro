import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-increment',
  templateUrl: './increment.component.html',
  styleUrls: ['./increment.component.css']
})
export class IncrementComponent implements OnInit {

  //@Input('value') progress: number = 50;  renombrar argumento
  @Input() progress: number = 50;
  @Input() btnClass: string = 'btn-primary';
  @Output() outputValue: EventEmitter<number> = new EventEmitter();

  constructor() { }

  onChange(value: number) {
    if (value >= 100) {
      this.progress = 100;
    } else if (value <= 0) {
      this.progress = 0;
    } else {
      this.progress = value;
    }

    this.outputValue.emit(this.progress);
  }

  changeValueProgress(value: number) {
    if ( this.progress >= 100 && value >= 0 ) {
      this.outputValue.emit(100);
      return this.progress = 100;
    }

    if ( this.progress <= 0 && value < 0 ) {
      this.outputValue.emit(0);
      return this.progress = 0;
    }

    this.progress = this.progress + value;
    this.outputValue.emit(this.progress);
  }

  /* get getPorcentage() {
    return `${ this.progress }%`;
  } */

  ngOnInit(): void {
    this.btnClass = `btn ${ this.btnClass }`;
  }

}
