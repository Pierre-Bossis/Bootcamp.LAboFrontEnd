import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from './_environments/environment';
import { Observable } from 'rxjs';
import { LoginFormUser, RegisterFormUser } from '../_interfaces/user';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiurl: string = environment.apiUrl
  httpClient: HttpClient = inject(HttpClient)

  login(form: LoginFormUser): Observable<string> {
    return this.httpClient.post<string>(this.apiurl + 'auth/login', form, { responseType: 'text' as 'json' })
  }

  register(form: RegisterFormUser): Observable<string> {
    return this.httpClient.post<string>(this.apiurl + 'auth/register', form, { responseType: 'text' as 'json' })
  }

  isAdmin() {
    const token = localStorage.getItem('token')

    if (token != null && token != '') {
      const decoded: any = jwtDecode(token)
      console.log(decoded)

      let role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
      return role === 'Admin' ? true : false
    }
    return false
  }
  isConnected() {
    const token = localStorage.getItem('token')

    if (token != null && token != '') {
      const decoded: any = jwtDecode(token)

      const exp = decoded['exp'] * 1000

      if (exp > Date.now()) return true
    }
    return false
  }

  logout() {
    localStorage.removeItem('token')
  }
}
