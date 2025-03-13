import { Component, inject, OnInit } from '@angular/core';
import { ProduitService } from '../../../_services/produit.service';
import { ListProduits } from '../../../_interfaces/produit';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../_services/auth.service';

@Component({
  selector: 'app-liste-produits',
  imports: [RouterLink],
  templateUrl: './liste-produits.component.html',
  styleUrl: './liste-produits.component.scss'
})
export class ListeProduitsComponent implements OnInit{
  produits:ListProduits[] = []
  readonly authService:AuthService = inject(AuthService)
  toastrService:ToastrService = inject(ToastrService)
  produitService:ProduitService = inject(ProduitService)
  isAdmin:boolean = false


  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin()
    this.refreshProduits()
  }

  refreshProduits(){
    this.produitService.GetAllProduits().subscribe((data) => this.produits = data)
  }

  onDelete(id:number){
    this.produitService.delete(id).subscribe((data) => {
      this.toastrService.success(data)
      this.refreshProduits()
    },
  () => this.toastrService.error('Erreur lors de la suppression.'))
  }

}
