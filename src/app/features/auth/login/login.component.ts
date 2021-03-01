import { Router } from '@angular/router';
import { LightModalComponent } from './../../../shared/components/light-modal/light-modal.component';
import { Credentials } from './../models/credentials.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loading: boolean = false;

  @ViewChild('modal') private modal: LightModalComponent;

  loginForm = this.formBuilder.group({
    username:['afinoa', Validators.required],
    password:['password', Validators.required],
    remember:[false],
    device_name: ['web']
  });

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {

    if(this.authService.isLogged())
    {
      this.redirect(this.authService.user().role);
    }

  }

  onLogin(): void
  {
    this.loading = true;

    const {username, password, device_name, remember} = this.loginForm.value;

    this.authService.login({username, password, device_name}, remember).subscribe(
      (role: string) => {
        this.redirect(role);
      },
      (error: any) => {
        this.modal.openModal()
        this.loading = false;
      }
    );
  }

  private redirect(role)
  {
    this.router.navigateByUrl(this.redirectionPath(role));
  }

  redirectionPath(role: string):string
  {
    const redirectTo = {
      Afinoa: '/monitoreo',
      Productor: '/productor',
      Citcontrol: ''
    }
    return redirectTo[role];
  }

}
