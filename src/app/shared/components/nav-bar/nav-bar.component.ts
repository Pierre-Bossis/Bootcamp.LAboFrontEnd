import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../_services/auth.service';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit{
  authService:AuthService = inject(AuthService)
  router:Router = inject(Router)
  isConnected:boolean = false
  email:string = ''
  
  ngOnInit(): void {
    this.authService.isConnected$.subscribe((state) => {
      this.isConnected = state
      this.email = this.authService.getEmail()
    })
  }
  logout() {
    this.authService.logout()
    this.router.navigate(['auth/login'])
  }

}
