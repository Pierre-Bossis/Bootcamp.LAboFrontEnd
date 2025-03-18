import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../_services/auth.service';
import { Commandes } from '../../../_interfaces/commande';
import { EtatsCommande } from '../../../_enums/etats-commande';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-liste-commandes',
  imports: [CommonModule, RouterLink],
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

  getEtatLibelle(etatId: number): string {
    return EtatsCommande[etatId] || 'Inconnu';
  }
}
