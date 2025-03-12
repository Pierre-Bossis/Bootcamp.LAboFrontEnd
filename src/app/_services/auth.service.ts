import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from './_environments/environment';
import { Observable } from 'rxjs';
import { LoginFormUser, RegisterFormUser } from '../_interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiurl:string = environment.apiUrl
  httpClient:HttpClient = inject(HttpClient)
  
  login(form:LoginFormUser):Observable<string>{
    return this.httpClient.post<string>(this.apiurl + 'auth/login', form, { responseType: 'text' as 'json'})
  }

  register(form:RegisterFormUser):Observable<string>{
    return this.httpClient.post<string>(this.apiurl + 'auth/register', form, {responseType: 'text' as 'json'})
  }
}
