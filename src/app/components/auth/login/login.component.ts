import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../_services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  loginForm!:FormGroup
  formBuilder:FormBuilder = inject(FormBuilder)
  authService:AuthService = inject(AuthService)
  toastrService:ToastrService = inject(ToastrService)
  router:Router = inject(Router)
  errorMessage:string = ''


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['', [Validators.required]]
    })
  }

  onSubmit(){
    this.authService.login(this.loginForm.value).subscribe((data) => {
      this.authService.isConnectedSubject.next(true)
      this.toastrService.success('Connexion réussie !')
      localStorage.setItem('token',data),
      this.router.navigate([''])
    },
    (error) => {
      if(error.status === 400) this.errorMessage = error.error
      else this.errorMessage = 'Une erreur inconnue est survenue.'
    })
  }
  
}
