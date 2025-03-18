import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategorieService } from '../../../_services/categorie.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-categorie',
  imports: [ReactiveFormsModule],
  templateUrl: './create-categorie.component.html',
  styleUrl: './create-categorie.component.scss'
})
export class CreateCategorieComponent implements OnInit {
  createCategorieFom!: FormGroup;
  formBuilder: FormBuilder = inject(FormBuilder)
  categorieService:CategorieService = inject(CategorieService)
  toastrService:ToastrService = inject(ToastrService)
  router:Router = inject(Router)

  ngOnInit(): void {
    this.createCategorieFom = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.minLength(2)]]
    })
  }
  onSubmit() {
    this.categorieService.createCategorie(this.createCategorieFom.value).subscribe(() => {
      this.router.navigate([''])
      this.toastrService.success('Catégorie créée avec succès !')
    },
    (error) => {
      this.toastrService.error('Erreur', error)
    })
  }

}
