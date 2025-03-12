import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from './_environments/environment';
import { Observable } from 'rxjs';
import { ListCategories } from '../_interfaces/categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  private apiUrl:string = environment.apiUrl
  httpClient:HttpClient = inject(HttpClient)

  getAllCategories():Observable<ListCategories[]>{
    return this.httpClient.get<ListCategories[]>(this.apiUrl + "categorie")
  }
}
