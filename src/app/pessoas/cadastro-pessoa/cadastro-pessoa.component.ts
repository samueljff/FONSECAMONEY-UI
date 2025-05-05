import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { Pessoa } from '../pessoaModel';
import { PessoaService } from '../pessoa.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-cadastro-pessoa',
  templateUrl: './cadastro-pessoa.component.html',
  styleUrls: ['./cadastro-pessoa.component.css']
})
export class CadastroPessoaComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit(): void {
  }

  salvar(cadastroPessoaForm: NgForm){
    this.pessoaService.adicionar(this.pessoa)
      .then(() => {
        this.messageService.add({severity: 'success', detail: 'Pessoa salva com sucesso!'});
        cadastroPessoaForm.reset();
  
        this.pessoa = new Pessoa();
      })
      .catch(error => this.errorHandlerService.handle(error));
  }
}
