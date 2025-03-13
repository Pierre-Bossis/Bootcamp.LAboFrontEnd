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

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'auth',
        children:[
            {path: '', component: LoginComponent},
            {path: 'login', component: LoginComponent},
            {path: 'register', component: RegisterComponent}
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

    {path: 'error', component: ErrorPageComponent },
    {path: '**', redirectTo: ''}
];
