import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { OauthService } from 'src/app/seguranca/oauth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  exibindoMenu: boolean = false;
   usuarioLogado: string = '';

   ngOnInit(){
    this.usuarioLogado = this.auth.jwtPayload?.nome;
   }

  constructor(
    private eRef: ElementRef,
    private auth: OauthService
  ) {}

  // Detecta cliques em qualquer parte do documento
  @HostListener('document:click', ['$event'])
  handleClick(event: MouseEvent) {
    // Verifica se o clique foi fora do componente
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.exibindoMenu = false;
    }
  }

  haspermission(permission: string){
    return this.auth.haspermission(permission);
  }

   criarNovoAccessToken() {
    this.auth.obterRefreshToken();
  }

}
