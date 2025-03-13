import { Component, inject, OnInit } from '@angular/core';
import { ProduitService } from '../../../_services/produit.service';
import { ActivatedRoute } from '@angular/router';
import { FullProduit } from '../../../_interfaces/produit';
import { ProduitHomeButtonDirective } from '../../../shared/directives/produit-home-button.directive';

@Component({
  selector: 'app-details-produit',
  imports: [ProduitHomeButtonDirective],
  templateUrl: './details-produit.component.html',
  styleUrl: './details-produit.component.scss'
})
export class DetailsProduitComponent implements OnInit {
  produitService: ProduitService = inject(ProduitService)
  activatedRoute:ActivatedRoute = inject(ActivatedRoute)
  produit!:FullProduit

  ngOnInit(): void {    
    let id = this.activatedRoute.snapshot.params['id']

    this.produitService.getProduitById(id).subscribe((data) => this.produit = data)
  }

}
