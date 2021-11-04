import { Router } from '@angular/router';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  @ViewChild('modal') modal: any;

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
    private spinner: SpinnerService
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
        this.spinner.hide();
        this.modal.open();
      }
    );
  }

  private redirect(role: string): void
  {
    this.router.navigateByUrl(`/${role.toLowerCase()}`);
  }

}
