import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandeService } from '../../../_services/commande.service';
import { Commandes } from '../../../_interfaces/commande';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details-commande',
  imports: [CommonModule],
  templateUrl: './details-commande.component.html',
  styleUrl: './details-commande.component.scss'
})
export class DetailsCommandeComponent implements OnInit{
  activatedRoute:ActivatedRoute = inject(ActivatedRoute)
  commandeService:CommandeService = inject(CommandeService)
  toastrService:ToastrService = inject(ToastrService)
  router:Router = inject(Router)
  commande!:Commandes
  
  ngOnInit(): void {
    const commandeId = this.activatedRoute.snapshot.params['id']
    if(!commandeId) this.router.navigate(['error'])

    this.commandeService.getCommandeById(commandeId).subscribe((data) => this.commande = data, (error) => this.toastrService.error('Erreur', error))
  }
}
