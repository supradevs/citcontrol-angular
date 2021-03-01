import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, SimpleChanges  } from '@angular/core';

@Component({
  selector: 'app-light-modal',
  templateUrl: './light-modal.component.html',
  styleUrls: ['./light-modal.component.scss']
})
export class LightModalComponent implements OnInit, AfterViewInit  {

  @Input() id:string;
  @Input() open:boolean;
  @ViewChild('lightModal') modal:ElementRef;

  button:any;

  ngAfterViewInit()
  {
    this.button = this.modal.nativeElement;
  }

  ngOnInit(): void
  {
    this.id = this.id ?? 'lightModalComponentId';
  }

  openModal(): void
  {
    this.button.click();
  }

}
