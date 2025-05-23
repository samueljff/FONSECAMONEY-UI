import { CategoriaService } from "src/app/categorias/categoria.service";
import { ErrorHandlerService } from "src/app/core/error-handler.service";
import { Pessoa } from "src/app/pessoas/pessoaModel";
import { PessoaService } from "src/app/pessoas/pessoa.service";
import { Lancamento } from "../lancamentoModel";
import { LancamentoService } from "../lancamento.service";

import { MessageService } from "primeng/api";

import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-lancamento-cadastro",
  templateUrl: "./lancamento-cadastro.component.html",
  styleUrls: ["./lancamento-cadastro.component.css"],
})
export class LancamentoCadastroComponent implements OnInit {
  tipos = [
    { label: "Receita", value: "RECEITA" },
    { label: "Despesa", value: "DESPESA" }, // ← corrigido aqui
  ];

  categorias: any[] = [];

  pessoas: Pessoa[] = [];

  lancamento = new Lancamento();

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,

    private messageService: MessageService,
    private errorHandlerService: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {}

  ngOnInit(): void {
    const codigoLancamento = this.route.snapshot.params['codigo'];

    this.title.setTitle('Novo Lançamento');

    if (codigoLancamento && codigoLancamento !== 'novo') {
      this.carregarLancamento(codigoLancamento)
    }
    this.carregarCategorias();
    this.carregarPessoas();
  }

  editarLancamento(){
    this.lancamentoService.atualizarLancamento(this.lancamento)
      .then((lancamento:  Lancamento)=> {
        this.lancamento = lancamento;
        this.messageService.add({
          severity: "success", detail: "Lancamento alterado com sucesso!",
        });
        this.atualizarTituloEdicao();
      })
      .catch((error) => this.errorHandlerService.handle(error));
  }

  adicionar(){
    this.lancamentoService
      .adicionar(this.lancamento)
      .then((lancamentoAdicionado) => {
        this.messageService.add({
          severity: "success",
          detail: "Lancamento salvo com sucesso!",
        });

        //lancamentoForm.reset();
        //this.lancamento = new Lancamento();
        this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
      })
      .catch((error) => this.errorHandlerService.handle(error));
  }

  salvar() {
    if(this.isEditing){
      this.editarLancamento();
    }else{
      this.adicionar();
    }
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService
      .pesquisarPorId(codigo)
      .then((response) => {
        this.lancamento = response;
        this.atualizarTituloEdicao();
      })
      .catch((error) => this.errorHandlerService.handle(error));
  }

  carregarCategorias() {
    return this.categoriaService
      .listarTodas()
      .then((response) => {
        this.categorias = response.map((c: any) => ({
          label: c.nome,
          value: c.codigo,
        }));
      })
      .catch((error) => this.errorHandlerService.handle(error));
  }

  carregarPessoas() {
    return this.pessoaService
      .listarTodas()
      .then((response) => {
        this.pessoas = response.map((c: any) => ({
          label: c.nome,
          value: c.codigo,
        }));
      })
      .catch((error) => {
        this.errorHandlerService.handle(error);
      });
  }

  novo(lancamentoForm: NgForm){
    
    lancamentoForm.reset();
    setTimeout(() =>{
      this.lancamento = new Lancamento();
    }, 1);
    this.router.navigate(['/lancamentos/novo']);
  }
  
  get isEditing (){
    return Boolean(this.lancamento.codigo);
  }

  atualizarTituloEdicao(){
    this.title.setTitle(`Edição de Lancamento: ${this.lancamento.descricao}`);
  }
}
