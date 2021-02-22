import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit {

  toggle:boolean = false;


  constructor() { }

  toggleScheduler(){
    this.toggle = !this.toggle;
  }

  ngOnInit(): void {
  }

}
