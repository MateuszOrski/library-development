import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-panel',
  templateUrl: './employee-panel.component.html',
  styleUrls: ['./employee-panel.component.css']
})
export class EmployeePanelComponent implements OnInit {

  tabIndex = 0;

  constructor(private _route: ActivatedRoute) { }

  ngOnInit(): void {
    let tab = this._route.snapshot.paramMap.get('tab');

    if(tab == 'books'){
      this.tabIndex = 2;
    }else if(tab == 'deletereservations'){
      this.tabIndex = 1;
    }else if(tab == 'returnbooks'){
      this.tabIndex = 0;
    }
  }
  
}
