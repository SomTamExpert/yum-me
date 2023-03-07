import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  @Input() order: any;
  @Output() orderAgain: EventEmitter<any> = new EventEmitter();
  @Output() help: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    console.log('orders ', this.order)
  }

  reorder() {
    this.orderAgain.emit(this.order);
  }

  getHelp() {
    this.help.emit(this.order);
  }
}
