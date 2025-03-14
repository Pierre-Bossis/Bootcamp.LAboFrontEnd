import { ListProduits } from "./produit"

export interface Commandes {
    id:number
    etatId: number
    utilisateurId:string
    date:Date
    produits:ListProduits[]
}

export interface Commande_Produit{
    produitId:number
    quantite:number
}
