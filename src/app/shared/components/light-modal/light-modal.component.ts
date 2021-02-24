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

  constructor() 
  { 

  }

  ngAfterViewInit() 
  {
    this.button = this.modal.nativeElement;
    //console.log(this.modal.nativeElement.click())
  }

  ngOnInit(): void 
  {
    this.id = this.id ?? 'lightModalComponentId';
  }

  ngOnChanges(changes: SimpleChanges) {

    this.openModal(changes.open.currentValue);
    // You can also use categoryId.previousValue and 
    // categoryId.firstChange for comparing old and new values
    
}

openModal(open: boolean): void
{
  if (open) this.button.click();
}

}
