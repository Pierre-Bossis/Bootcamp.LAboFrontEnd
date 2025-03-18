import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from './_environments/environment';
import { Observable } from 'rxjs';
import { CreateProduit, FullProduit, ListProduits, updateProduit } from '../_interfaces/produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private apiUrl:string = environment.apiUrl
  httpClient:HttpClient = inject(HttpClient)

  GetAllProduits():Observable<ListProduits[]>{
    return this.httpClient.get<ListProduits[]>(this.apiUrl + 'produit')
  }

  createProduit(form:CreateProduit):Observable<FullProduit>{
    return this.httpClient.post<FullProduit>(this.apiUrl + 'produit/create-product', form)
  }

  getProduitById(id:number):Observable<FullProduit>{
    return this.httpClient.get<FullProduit>(this.apiUrl + 'produit/' + id)
  }

  delete(id:number):Observable<string>{
    return this.httpClient.delete<string>(this.apiUrl + 'produit/delete/' + id, {responseType: 'text' as 'json'})
  }

  editProduit(id:number, form:updateProduit):Observable<FullProduit>{
    return this.httpClient.put<FullProduit>(this.apiUrl + 'produit/update/' + id, form)
  }

  getProduitByCategorieName(name:string):Observable<ListProduits[]>{
    return this.httpClient.get<ListProduits[]>(this.apiUrl + 'produit/categorie/nom/' + name)
  }
}
