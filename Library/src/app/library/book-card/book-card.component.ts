import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent implements OnInit {

  @Input() title: string;
  @Input() author: string;
  @Input() id: number;

  constructor() { }

  ngOnInit(): void {
   
  }

}
