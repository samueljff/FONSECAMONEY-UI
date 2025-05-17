import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { OauthService } from '../oauth.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(
    private title: Title,
    private oauthService: OauthService,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Login');
  }

  login(usuario: string, senha: string) {
    this.oauthService.login(usuario, senha)
    .then(() => {
      this.router.navigate(['/lancamentos']);
    })
    .catch(erro => {
      this.errorHandlerService.handle(erro);
    })
  }
}