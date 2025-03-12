import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { ErrorPageComponent } from './shared/components/errors/error-page/error-page.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/auth/register/register.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'auth',
        children:[
            {path: '', component: LoginComponent},
            {path: 'login', component: LoginComponent},
            {path: 'register', component: RegisterComponent}
        ]
    },

    {path: 'error', component: ErrorPageComponent },
    {path: '**', redirectTo: ''}
];
