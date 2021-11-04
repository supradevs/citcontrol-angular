import { Router } from '@angular/router';
import { AuthService } from './../../../features/auth/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user: any = {}

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.authService.user();
  }

  onLogout(): void
  {
    this.authService.logout();
    this.router.navigateByUrl('/autenticacion/login');
  }

}
