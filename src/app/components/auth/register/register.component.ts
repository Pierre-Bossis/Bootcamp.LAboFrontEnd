import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../_services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  registerForm!:FormGroup
  formBuilder:FormBuilder = inject(FormBuilder)
  authService:AuthService = inject(AuthService)
  toastrService:ToastrService = inject(ToastrService)
  router:Router = inject(Router)
  errorMessage:string = ''


  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      nom: ['', [Validators.required,Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm: ['', [Validators.required]]
      }, {
      validator: this.passwordMatchValidator
      })
  }

  onSubmit(){
    this.authService.register(this.registerForm.value).subscribe((data) => {
      this.toastrService.success('Success !', data)
      this.router.navigate([''])
    },
    (error) => {
      
      if(error.status === 400) this.errorMessage = error.error
      else this.errorMessage = 'Une erreur inconnue est survenue.'
    })
  }

  private passwordMatchValidator(group: AbstractControl): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirm')?.value;
    return password && confirmPassword && password !== confirmPassword
      ? { 'passwordMismatch': true }
      : null;
  }
}
