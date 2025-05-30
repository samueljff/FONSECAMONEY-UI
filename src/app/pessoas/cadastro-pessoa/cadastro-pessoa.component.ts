import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { MessageService } from "primeng/api";

import { Pessoa } from "../pessoaModel";
import { PessoaService } from "../pessoa.service";
import { ErrorHandlerService } from "src/app/core/error-handler.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-cadastro-pessoa",
  templateUrl: "./cadastro-pessoa.component.html",
  styleUrls: ["./cadastro-pessoa.component.css"],
})
export class CadastroPessoaComponent implements OnInit {
  pessoa = new Pessoa();

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private router: Router,
    private errorHandlerService: ErrorHandlerService,
    private title: Title,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Nova Pessoa');
    const codigoPessoa = this.route.snapshot.params['codigo'];
    if (codigoPessoa && codigoPessoa !== 'novo') {
      this.carregarPessoa(codigoPessoa)
    }
  }

  salvar() {
    if(this.isEditing){
      this.editarPessoa();
    }else{
      this.adicionar();
    }
  }

  novo(form: NgForm) {
    form.reset();
    setTimeout(() => {
      this.pessoa = new Pessoa();
    }, 1);
    this.router.navigate(["/pessoas/nova"]);
  }

  editarPessoa(){
      this.pessoaService.atualizarPessoa(this.pessoa)
        .then((pessoa:  Pessoa)=> {
          this.pessoa = pessoa;
          this.messageService.add({
            severity: "success", detail: "Pessoa alterada com sucesso!",
          });
          this.atualizarTituloEdicao();
        })
        .catch((error) => this.errorHandlerService.handle(error));
    }
  
    adicionar(){
       this.pessoaService
      .adicionar(this.pessoa)
      .then((pessoaAdicionada) => {
        this.messageService.add({
          severity: "success",
          detail: "Pessoa salva com sucesso!",
        });
        this.router.navigate(['/pessoas', pessoaAdicionada.codigo]);
      })
      .catch((error) => this.errorHandlerService.handle(error));
    }
   carregarPessoa(codigo: number) {
    this.pessoaService
      .pesquisarPorId(codigo)
      .then((response) => {
        this.pessoa = response;
        this.atualizarTituloEdicao();
      })
      .catch((error) => this.errorHandlerService.handle(error));
  }

  get isEditing (){
    return Boolean(this.pessoa.codigo);
  }

  atualizarTituloEdicao(){
    this.title.setTitle(`Edição de Pessoa: ${this.pessoa.nome}`);
  }
}
