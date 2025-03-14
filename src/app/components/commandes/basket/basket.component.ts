import { Component, inject, OnInit } from '@angular/core';
import { CommandeService } from '../../../_services/commande.service';
import { Commande_Produit } from '../../../_interfaces/commande';

@Component({
  selector: 'app-basket',
  imports: [],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent implements OnInit{
  commandeService:CommandeService = inject(CommandeService)
  basket:Commande_Produit[] = []
  
  
  ngOnInit(): void {
    this.basket =  [...this.commandeService.basket]
  }
}
