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
import { random } from '../../helpers/random.function';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @ViewChild('btnRight') someInput: ElementRef;

  @Input()
  show: any;

  @Input()
  title: string = 'Modal';

  @Input()
  btnLeftText: string = 'Cancelar';

  @Input()
  btnRightText: string = 'Guardar cambios';

  @Input()
  btnLeftDisable: boolean = false;

  @Input()
  btnRightDisable: boolean = false;

  @Output() 
  leftClick = new EventEmitter<boolean>();

  @Output() 
  rightClick = new EventEmitter<boolean>();

  public randomId: number;

  constructor()
  {
    this.randomId = random(1000,9000);
  }

  ngOnChanges(changes: SimpleChanges): void {   

    if(('show' in changes) && (!changes.show.firstChange))
    {
      setTimeout(() => {
        document.getElementById("openModalButton" + this.randomId).click();
      }, 50)
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
