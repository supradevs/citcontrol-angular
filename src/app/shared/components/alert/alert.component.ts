import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})



export class AlertComponent implements OnInit {

  @Input() color: string = 'info';
  @Input() show: boolean = true;
  @Input() only: boolean = true;
  
  @Output() cancel = new EventEmitter<boolean>();
  @Output() accept = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {

  }

  onCancel(): void 
  {
    this.show = false;
    this.cancel.emit(true);
  }

  onAccept()
  {
    this.show = false;
    this.accept.emit(true);
  }

  get backgroundColor(): string 
  {
    return 'alert-' + this.color;
  }
}
