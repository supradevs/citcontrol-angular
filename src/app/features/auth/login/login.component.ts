import { LoadSpinnerService } from './../../../shared/services/load-spinner.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  error: boolean = false;

  loginForm = this.formBuilder.group({
    username:['afinoa', Validators.required],
    password:['password', Validators.required],
    remember:[false],
    device_name: ['web']
  });

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private spinner: LoadSpinnerService
  ) {

    if(this.authService.isLogged())
    {
      this.redirect(this.authService.user().role);
    }

  }

  onLogin(): void
  {
    this.spinner.show();

    const {username, password, device_name, remember} = this.loginForm.value;

    this.authService.login({username, password, device_name}, remember).subscribe(
      (role: string) => {
        this.spinner.hide();
        this.redirect(role);
      },
      (error: any) => {
        this.error = true;
        this.spinner.hide();
      }
    );
  }

  private redirect(role: string): void
  {
    this.router.navigateByUrl(`/${role.toLowerCase()}`);
  }

}
