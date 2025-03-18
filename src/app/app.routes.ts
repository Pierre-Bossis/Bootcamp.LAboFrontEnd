import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { ErrorPageComponent } from './shared/components/errors/error-page/error-page.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ListeProduitsComponent } from './components/produits/liste-produits/liste-produits.component';
import { CreateProduitComponent } from './components/produits/create-produit/create-produit.component';
import { DetailsProduitComponent } from './components/produits/details-produit/details-produit.component';
import { EditProduitComponent } from './components/produits/edit-produit/edit-produit.component';
import { isAdminGuard } from './shared/guards/is-admin.guard';
import { userIsNotAuthenticatedGuard } from './shared/guards/user-is-not-authenticated.guard';
import { ListeCommandesComponent } from './components/commandes/liste-commandes/liste-commandes.component';
import { userIsAuthenticatedGuard } from './shared/guards/user-is-authenticated.guard';
import { BasketComponent } from './components/commandes/basket/basket.component';
import { AllCommandesAdminComponent } from './components/commandes/all-commandes-admin/all-commandes-admin.component';
import { DetailsCommandeComponent } from './components/commandes/details-commande/details-commande.component';
import { Component } from '@angular/core';
import { CreateCategorieComponent } from './components/categories/create-categorie/create-categorie.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'auth',
        children:[
            {path: '', component: LoginComponent},
            {path: 'login', component: LoginComponent, canActivate: [userIsNotAuthenticatedGuard]},
            {path: 'register', component: RegisterComponent, canActivate: [userIsNotAuthenticatedGuard]}
        ]
    },
    {path: 'produits',
        children:[
            {path: '', component: ListeProduitsComponent},
            {path: 'create', component: CreateProduitComponent, canActivate: [isAdminGuard]},
            {path: 'details/:id', component: DetailsProduitComponent},
            {path: 'edit/:id', component: EditProduitComponent, canActivate: [isAdminGuard]}
        ]

    },
    {path: 'commandes',
        children:[
            {path: '', component: ListeCommandesComponent, canActivate: [userIsAuthenticatedGuard]},
            {path: 'details/:id', component: DetailsCommandeComponent, canActivate: [userIsAuthenticatedGuard]},
            {path: 'basket', component: BasketComponent, canActivate: [userIsAuthenticatedGuard]},
            {path: 'all', component: AllCommandesAdminComponent, canActivate: [isAdminGuard]}
        ]
    },
    {path: 'categories',
        children:[
            {path:'create', component: CreateCategorieComponent, canActivate: [isAdminGuard]}
        ]
    },

    {path: 'error', component: ErrorPageComponent },
    {path: '**', redirectTo: ''}
];
