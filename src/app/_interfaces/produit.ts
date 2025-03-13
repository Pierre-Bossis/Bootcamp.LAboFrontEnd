import { Categorie } from "./categorie"

export interface ListProduits {
    id:number
    nom:string
    prix:number
    categorie:Categorie
}

export interface CreateProduit{
    nom: string
    prix: number
    quantite: number
    description: string
    categorieId: number
}

export interface updateProduit{
    id:number
    nom: string
    prix: number
    quantite: number
    description: string
    categorieId: number
}

export interface FullProduit{
    id:number
    nom: string
    prix: number
    quantite: number
    description: string
    categorie: Categorie
}
