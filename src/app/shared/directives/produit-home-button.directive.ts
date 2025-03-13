import { Directive, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[ProduitHomeButton]'
})
export class ProduitHomeButtonDirective {
  constructor(private router:Router) {}

  @HostListener('click')
  onClick(): void {
    this.router.navigate(['produits'])
  }
}
