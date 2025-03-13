import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProduitService } from '../../../_services/produit.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategorieService } from '../../../_services/categorie.service';
import { Categorie } from '../../../_interfaces/categorie';
import { CommonModule } from '@angular/common';
import { ProduitHomeButtonDirective } from '../../../shared/directives/produit-home-button.directive';

@Component({
  selector: 'app-create-produit',
  imports: [ReactiveFormsModule, CommonModule, ProduitHomeButtonDirective],
  templateUrl: './create-produit.component.html',
  styleUrl: './create-produit.component.scss'
})
export class CreateProduitComponent implements OnInit {
  CreateProduitForm!: FormGroup
  categories: Categorie[] = []
  formBuilder: FormBuilder = inject(FormBuilder)
  produitService: ProduitService = inject(ProduitService)
  categorieService: CategorieService = inject(CategorieService)
  toastrService: ToastrService = inject(ToastrService)
  router: Router = inject(Router)

  ngOnInit(): void {
    this.categorieService.getAllCategories().subscribe((data) => this.categories = data)
    this.CreateProduitForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prix: [1, [Validators.required, Validators.min(0)]],
      quantite: [1, [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required]],
      categorieId: ['', [Validators.required]]
    })
  }

  onSubmit() {
    this.produitService.createProduit(this.CreateProduitForm.value).subscribe((data) => {
      this.toastrService.success('Produit créé !')
      this.router.navigate(['produits', 'details', data.id])
    },
      (error) => {
        console.log(error)
        this.toastrService.error('Erreur lors de la création.')
      })
  }
}
