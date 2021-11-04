import { 
  Component, 
  Input, 
  Output, 
  EventEmitter,
  ViewChild, 
} from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @ViewChild('modalRef') modalRef: any;

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
  btnLeftStyle: string = 'btn-secondary';
  
  @Input()
  btnRightStyle: string = 'btn-primary';

  @Input()
  btnRightHidden: boolean = false;

  @Input()
  btnLeftHidden: boolean = false;

  @Input()
  footerHidden: boolean = false;

  @Input()
  btnRightDisable: boolean = false;

  @Output() 
  accept = new EventEmitter<boolean>();

  @Output() 
  leftEvent = new EventEmitter<boolean>();

  @Output() 
  rightEvent = new EventEmitter<boolean>();

  constructor(private modalService: NgbModal) {}

  open() {
    const content = this.modalRef;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log(`Closed with: ${result}`);
      this.emitEvents(result);
      this.emitResult(result);
    }, (reason: any) => {
      this.emitResult(false);
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  emitResult(value: boolean): void 
  {
    this.accept.emit(value);
  }

  emitEvents(value: boolean): void
  {
    if(value)
      this.rightEvent.emit(true);
    else
      this.leftEvent.emit(true)
  }
}
