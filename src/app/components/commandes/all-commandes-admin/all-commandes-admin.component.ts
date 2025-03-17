import { Component, inject, OnInit } from '@angular/core';
import { Commandes } from '../../../_interfaces/commande';
import { CommandeService } from '../../../_services/commande.service';
import { CommonModule } from '@angular/common';
import { EtatsCommande } from '../../../_enums/etats-commande';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-commandes-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './all-commandes-admin.component.html',
  styleUrl: './all-commandes-admin.component.scss'
})
export class AllCommandesAdminComponent implements OnInit {
  commandes: Commandes[] = []
  commandeService: CommandeService = inject(CommandeService)
  toastrService:ToastrService = inject(ToastrService)

  ngOnInit(): void {
    this.commandeService.getAllCommandesAdmin().subscribe((data) => this.commandes = data)
  }

  getEtatLibelle(etatId: number): string {
    return EtatsCommande[etatId] || 'Inconnu';
  }

  getEtatLibelleArray(etatId: number) {
    return Object.keys(EtatsCommande)
      .filter(key => isNaN(Number(key)))
      .filter(key => EtatsCommande[key as keyof typeof EtatsCommande] !== etatId)
      .map(key => ({ id: EtatsCommande[key as keyof typeof EtatsCommande], libelle: key }));
  }
  onEtatChange(commande: Commandes) {
    this.commandeService.updateEtatCommande(commande.id, commande.etatId).subscribe(() => {
      this.toastrService.success('Etat changé avec succès.')
    },
    (data) => {
      this.toastrService.error('Erreur lors du changement d\'état.')
    })
  }
}
