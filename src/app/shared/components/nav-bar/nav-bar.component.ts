import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../_services/auth.service';
import { CommandeService } from '../../../_services/commande.service';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit{
  authService:AuthService = inject(AuthService)
  commandeService:CommandeService = inject(CommandeService)
  router:Router = inject(Router)
  isConnected:boolean = false
  basketCount = 0
  email:string = ''
  
  ngOnInit(): void {
    this.authService.isConnected$.subscribe((state) => {
      this.isConnected = state
      this.email = this.authService.getEmail()
    })
    this.commandeService.basketCount$.subscribe((data) => { this.basketCount = data})
  }
  logout() {
    this.authService.logout()
    this.router.navigate(['auth/login'])
  }

}
