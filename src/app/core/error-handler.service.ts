import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { NotAuthenticatedError } from '../seguranca/money-http-interceptor';
import { OauthService } from '../seguranca/oauth.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private messageService: MessageService,
    private authService: OauthService,
  ) { }

  handle(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;

    } else if(errorResponse instanceof NotAuthenticatedError){
      console.log('erro refresh');

      msg = 'Sua sessão expirou!';
      this.authService.login();
    }else if (errorResponse instanceof HttpErrorResponse
        && errorResponse.status >= 400 && errorResponse.status <= 499) {
      msg = 'Ocorreu um erro ao processar a sua solicitação';

       if (errorResponse.status === 403) {
        msg = 'Você não tem permissão para executar esta ação';
      }
      
      try {
        msg = errorResponse.error[0].mensagemUsuario;
      } catch (e) { }

      console.error('Ocorreu um erro: ', errorResponse);

    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      console.error('Ocorreu um erro', errorResponse);
    }

    this.messageService.add({ severity:'error', detail: msg });
  }
}
