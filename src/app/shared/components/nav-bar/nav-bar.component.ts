import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../_services/auth.service';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  authService:AuthService = inject(AuthService)
  router:Router = inject(Router)
  
logout() {
  this.authService.logout()
  this.router.navigate([''])
}

}
