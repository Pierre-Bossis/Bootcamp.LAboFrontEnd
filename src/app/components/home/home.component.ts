import { Component, inject } from '@angular/core';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  authService:AuthService = inject(AuthService)

  constructor(){
    
  }
}
