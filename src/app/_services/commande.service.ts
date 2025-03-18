import { inject, Injectable } from '@angular/core';
import { Commande_Produit, Commandes } from '../_interfaces/commande';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from './_environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  authService: AuthService = inject(AuthService)
  httpClient: HttpClient = inject(HttpClient)
  apiUrl: string = environment.apiUrl
  basket: Commande_Produit[] = []
  private readonly basketCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0)

  constructor() {
    this.initBasket()
  }

  getAllCommandesAdmin(): Observable<Commandes[]> {
    return this.httpClient.get<Commandes[]>(this.apiUrl + 'commande')
  }

  getCommandeById(id: number): Observable<Commandes> {
    return this.httpClient.get<Commandes>(this.apiUrl + 'commande/' + id)
  }

  createCommande(basket: Commande_Produit[]): Observable<string> {
    return this.httpClient.post<string>(this.apiUrl + 'commande/create-commande', basket, { responseType: 'text' as 'json' }).pipe(
      tap(() => {
        this.basket = []
        this.basketCountSubject.next(0)
        localStorage.removeItem('basket' + this.authService.getId())
      })
    )
  }

  updateEtatCommande(id: number, stateId: number): Observable<any> {
    return this.httpClient.put<any>(this.apiUrl + 'commande/update-state/' + id + '?stateId=' + stateId, {})
  }

  get basketCount$(): Observable<number> {
    return this.basketCountSubject.asObservable();
  }







  initBasket() {
    const storedBasket = localStorage.getItem('basket' + this.authService.getId());
    this.basket = storedBasket ? JSON.parse(storedBasket) : []
    this.basketCountSubject.next(this.basket.length)
  }
  AddToBasket(cp: Commande_Produit) {
    if (cp.quantite < 1 || cp.produitId < 1) return false
    const existingProductIndex = this.basket.findIndex(item => item.produitId == cp.produitId);

    if (existingProductIndex !== -1) {
      this.basket[existingProductIndex].quantite += cp.quantite
    }
    else {
      this.basket.push(cp);
      this.basketCountSubject.next(this.basketCountSubject.value + 1)
    }
    localStorage.setItem('basket' + this.authService.getId(), JSON.stringify(this.basket))
    return true
  }

  RemoveFromBasket(index: number) {
    this.basket.splice(index, 1)
    this.basketCountSubject.next(this.basketCountSubject.value - 1)
    localStorage.setItem('basket' + this.authService.getId(), JSON.stringify(this.basket))
  }


}