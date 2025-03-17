import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from './_environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginFormUser, RegisterFormUser } from '../_interfaces/user';
import { jwtDecode } from "jwt-decode";
import { Commandes } from '../_interfaces/commande';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiurl: string = environment.apiUrl
  httpClient: HttpClient = inject(HttpClient)
  private readonly isConnectedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isConnected());


  login(form: LoginFormUser): Observable<string> {
    return this.httpClient.post<string>(this.apiurl + 'auth/login', form, { responseType: 'text' as 'json' }).pipe(
      tap((token) => {
        localStorage.setItem('token', token)
        this.isConnectedSubject.next(true)
      })
    )
  }

  register(form: RegisterFormUser): Observable<string> {
    return this.httpClient.post<string>(this.apiurl + 'auth/register', form, { responseType: 'text' as 'json' })
  }

  isAdmin() {
    const token = localStorage.getItem('token')

    if (token != null && token != '') {
      const decoded: any = jwtDecode(token)

      let role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
      return role === 'Admin' ? true : false
    }
    return false
  }

  get isConnected$(): Observable<boolean> {
    return this.isConnectedSubject.asObservable();
  }
  
  isConnected() {
    const token = localStorage.getItem('token')

    if (token != null && token != '') {
      const decoded: any = jwtDecode(token)
      
      const exp = decoded['exp'] * 1000

      if (exp > Date.now()) return true
    }
    localStorage.removeItem('token')
    return false
  }

  getEmail(){
    const token = localStorage.getItem('token')

    if (this.isConnected() && token != null) {
      const decoded: any = jwtDecode(token)
      return decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']
    }
  }

  getId(){
    const token = localStorage.getItem('token')

    if (this.isConnected() && token != null) {
      const decoded: any = jwtDecode(token)
      return decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid']
    }
  }

  logout() {
    localStorage.removeItem('token')
    this.isConnectedSubject.next(false)
  }

  getAllCommandesByUser():Observable<Commandes[]>{
    return this.httpClient.get<Commandes[]>(this.apiurl + 'auth/getcommandes')
  }
}
