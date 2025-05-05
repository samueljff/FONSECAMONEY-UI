import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Pessoa } from 'src/app/pessoas/pessoa';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { Lancamento } from '../lancamentoModel';
import { LancamentoService } from '../lancamento.service';

import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }, // ← corrigido aqui
  ];
  
  categorias: any[] = [];

  pessoas: Pessoa[] = [];

  lancamento = new Lancamento();

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private errorHandlerService: ErrorHandlerService
  ){}

  ngOnInit(): void {
      this.carregarCategorias();
      this.carregarPessoas();
  }

  salvar(lancamentoForm: NgForm){
    this.lancamentoService.adicionar(this.lancamento)
    .then(() => {
      this.messageService.add({severity: 'success', detail: 'Lancamento salvo com sucesso!'});
      
      lancamentoForm.reset();

      this.lancamento = new Lancamento();
    })
    .catch(error => this.errorHandlerService.handle(error));
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas()
      .then(response => {
        this.categorias = response.map((c: any) => ({ label: c.nome, value: c.codigo }));
      })
      .catch(error => this.errorHandlerService.handle(error));
  }
  
  carregarPessoas(){
    return this.pessoaService.listarTodas()
      .then(response => {
        this.pessoas = response.map((c: any) => ({label: c.nome, value: c.codigo}));
      })
      .catch(error => {
        this.errorHandlerService.handle(error);
      });
  }

}
