import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  authService:AuthService = inject(AuthService)
  isConnected:boolean = false
  ngOnInit(): void {
    this.isConnected = this.authService.isConnected()
  }
}
