import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss'],
})
 


export class ErrorsComponent implements OnInit {

  @Input()model;
  @Output() retry:EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  retryButton(){
    this.retry.emit(true);
  }

  ngOnInit() {}

}
