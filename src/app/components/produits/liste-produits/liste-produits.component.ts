import { Component, inject, OnInit } from '@angular/core';
import { ProduitService } from '../../../_services/produit.service';
import { ListProduits } from '../../../_interfaces/produit';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../_services/auth.service';
import { CommandeService } from '../../../_services/commande.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-liste-produits',
  imports: [RouterLink, FormsModule],
  templateUrl: './liste-produits.component.html',
  styleUrl: './liste-produits.component.scss'
})
export class ListeProduitsComponent implements OnInit{
  search!: string;
  produits:ListProduits[] = []
  produitsCopy : ListProduits[] = []
  readonly authService:AuthService = inject(AuthService)
  toastrService:ToastrService = inject(ToastrService)
  produitService:ProduitService = inject(ProduitService)
  commandeService:CommandeService = inject(CommandeService)
  isAdmin:boolean = false
  IsConnected:boolean = false
  quantites: { [key: number]: number } = {};

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin()
    this.IsConnected = this.authService.isConnected()
    this.refreshProduits()
  }

  refreshProduits(){
    this.produitService.GetAllProduits().subscribe((data) => {
      this.produits = data
      this.produitsCopy = data
    })
  }

  onSearchChange() {
    if (this.search.length >= 2){
      this.produitService.getProduitByCategorieName(this.search).subscribe((data) => {
        this.produits = data
      })
    }
    else{
      this.produits = this.produitsCopy
    }
  }
    

  onDelete(id:number){
    this.produitService.delete(id).subscribe((data) => {
      this.toastrService.success(data)
      this.refreshProduits()
    },
  () => this.toastrService.error('Erreur lors de la suppression.'))
  }

  AddToBasket(produitId:number, quantite:number = 1){
    let success = this.commandeService.AddToBasket({produitId, quantite})
    if(success) this.toastrService.success('Produit ajouté au panier.')
    else{
      this.toastrService.error('Erreur lors de l\'ajout du produit au panier.')
    }
  }
}
