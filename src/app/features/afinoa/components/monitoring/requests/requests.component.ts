import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  constructor() { }

  selectAll: boolean = false;

  ngOnInit(): void {
  }

  get rand(): number
  {
    return 1;
  }

}
