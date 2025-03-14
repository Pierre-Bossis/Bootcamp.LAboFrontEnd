import { Injectable } from '@angular/core';
import { Commande_Produit } from '../_interfaces/commande';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  basket:Commande_Produit[] = []
  private readonly basketCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0)

    get basketCount$(): Observable<number> {
      return this.basketCountSubject.asObservable();
    }

  AddToBasket(cp:Commande_Produit){
    if(cp.quantite < 1 || cp.produitId < 1) return false
    const existingProductIndex = this.basket.findIndex(item => item.produitId == cp.produitId);
  
    if (existingProductIndex !== -1) {
      this.basket[existingProductIndex].quantite += cp.quantite
      return true
    }
    else {
      this.basket.push(cp);
      this.basketCountSubject.next(this.basketCountSubject.value + 1)     
      return true
    }
  }

  RemoveFromBasket(index:number){
    this.basket.splice(index,1)
    this.basketCountSubject.next(this.basketCountSubject.value -1)
  }


}