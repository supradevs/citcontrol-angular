import { LoadSpinnerService } from './../../services/load-spinner.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-load-spinner',
  templateUrl: './load-spinner.component.html',
  styleUrls: ['./load-spinner.component.scss']
})
export class LoadSpinnerComponent implements OnInit {

  constructor(public spinnerService: LoadSpinnerService) { }

  ngOnInit(): void {
  }

}
