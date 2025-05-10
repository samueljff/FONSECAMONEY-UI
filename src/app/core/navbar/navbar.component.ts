import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  exibindoMenu: boolean = false;

  constructor(private eRef: ElementRef) {}

  // Detecta cliques em qualquer parte do documento
  @HostListener('document:click', ['$event'])
  handleClick(event: MouseEvent) {
    // Verifica se o clique foi fora do componente
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.exibindoMenu = false;
    }
  }
}
