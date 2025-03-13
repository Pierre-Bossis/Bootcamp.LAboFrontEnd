import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from './_environments/environment';
import { Observable } from 'rxjs';
import { Categorie } from '../_interfaces/categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  private apiUrl:string = environment.apiUrl
  httpClient:HttpClient = inject(HttpClient)

  getAllCategories():Observable<Categorie[]>{
    return this.httpClient.get<Categorie[]>(this.apiUrl + "categorie")
  }
}
