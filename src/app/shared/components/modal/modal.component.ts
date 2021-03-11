import { 
  Component, 
  OnInit, 
  Input, 
  Output, 
  EventEmitter, 
  SimpleChanges, 
  ViewChild,
  AfterViewInit,
  ElementRef 
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @ViewChild('btnRight') someInput: ElementRef;

  @Input()
  show: boolean = false;

  @Input()
  title: string = 'Modal';

  @Input()
  btnLeftText: string = 'Cancelar';

  @Input()
  btnRightText: string = 'Guardar cambios';

  @Output() 
  leftClick = new EventEmitter<boolean>();

  @Output() 
  rightClick = new EventEmitter<boolean>();

  private first: boolean = false;

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {   
    
    if(this.first || changes.show.currentValue)
    {
      this.first = true;
      document.getElementById("openModalButton").click();
    }

  }

  onLeftClick(): void 
  {
    this.leftClick.emit(true);
  }

  onRightClick(): void 
  {
    this.rightClick.emit(true);
  }
}
