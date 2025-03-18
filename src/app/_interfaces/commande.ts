import { FullProduit, ListProduits } from "./produit"

export interface Commandes {
    id:number
    etatId: number
    utilisateurId:string
    date:Date
    produits:FullProduit[]
}

export interface Commande_Produit{
    produitId:number
    quantite:number
}
