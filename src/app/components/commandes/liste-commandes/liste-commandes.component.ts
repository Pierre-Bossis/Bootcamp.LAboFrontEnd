import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../_services/auth.service';
import { Commandes } from '../../../_interfaces/commande';

@Component({
  selector: 'app-liste-commandes',
  imports: [],
  templateUrl: './liste-commandes.component.html',
  styleUrl: './liste-commandes.component.scss'
})
export class ListeCommandesComponent implements OnInit{
  authService:AuthService = inject(AuthService)
  commandes:Commandes[] = []

  ngOnInit(){
    this.authService.getAllCommandesByUser().subscribe((data) => {
      this.commandes = data
    })
  }


}
