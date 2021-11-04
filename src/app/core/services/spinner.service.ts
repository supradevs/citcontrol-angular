import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  public loading$ = new EventEmitter();

  show(): void
  {
    this.loading$.emit(true);
  }

  hide(): void 
  {
    this.loading$.emit(false);
  }
}
