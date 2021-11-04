import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadSpinnerService {

  display: boolean = false;

  show(): void
  {
    this.display = true;
  }

  hide(): void 
  {
    this.display = false;
  }
}
