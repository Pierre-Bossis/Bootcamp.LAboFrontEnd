import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categorie } from '../../../_interfaces/categorie';
import { CategorieService } from '../../../_services/categorie.service';
import { ProduitService } from '../../../_services/produit.service';
import { ProduitHomeButtonDirective } from '../../../shared/directives/produit-home-button.directive';

@Component({
  selector: 'app-edit-produit',
  imports: [ReactiveFormsModule, CommonModule, ProduitHomeButtonDirective],
  templateUrl: './edit-produit.component.html',
  styleUrl: './edit-produit.component.scss'
})
export class EditProduitComponent {
  editProduitForm!: FormGroup
  activatedRoute:ActivatedRoute = inject(ActivatedRoute)
  categories: Categorie[] = []
  formBuilder: FormBuilder = inject(FormBuilder)
  produitService: ProduitService = inject(ProduitService)
  categorieService: CategorieService = inject(CategorieService)
  toastrService: ToastrService = inject(ToastrService)
  router: Router = inject(Router)
  loaded:boolean = false

  ngOnInit(): void {
    this.categorieService.getAllCategories().subscribe((data) => this.categories = data)
    this.produitService.getProduitById(this.activatedRoute.snapshot.params['id']).subscribe((data) => {
      this.editProduitForm = this.formBuilder.group({
        id: [data.id, Validators.required],
        nom: [data.nom, [Validators.required, Validators.minLength(2)]],
        prix: [data.prix, [Validators.required, Validators.min(0)]],
        quantite: [data.quantite, [Validators.required, Validators.min(0)]],
        description: [data.description, [Validators.required]],
        categorieId: [data.categorie.id, [Validators.required]]
      })
      this.loaded = true
    })

  }

  onSubmit() {
    this.produitService.editProduit(this.activatedRoute.snapshot.params['id'],this.editProduitForm.value).subscribe((data) => {
      this.toastrService.success('Produit mis à jour !')
      this.router.navigate(['produits', 'details', data.id])
    },
      (error) => {
        console.log(error)
        this.toastrService.error('Erreur lors de la mise à jour.')
      })
  }
}
