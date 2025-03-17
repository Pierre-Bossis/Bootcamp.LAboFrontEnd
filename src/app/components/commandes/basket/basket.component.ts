import { Component, inject, OnInit } from '@angular/core';
import { CommandeService } from '../../../_services/commande.service';
import { Commande_Produit } from '../../../_interfaces/commande';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basket',
  imports: [],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent implements OnInit{
  commandeService:CommandeService = inject(CommandeService)
  toastrService:ToastrService = inject(ToastrService)
  router:Router = inject(Router)
  basket:Commande_Produit[] = []
  
  ngOnInit(): void {
    this.loadBasket()
  }

  loadBasket(){
    this.basket =  [...this.commandeService.basket]
  }
  onDeleteFromBasket(index:number) {
    this.commandeService.RemoveFromBasket(index)
    this.loadBasket()
  }

  onSubmit() {
    this.commandeService.createCommande(this.basket).subscribe((data) => {
      this.toastrService.success(data)
      this.router.navigate(['commandes'])
    })
  }
}
