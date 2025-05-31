import { CategoriaService } from "src/app/categorias/categoria.service";
import { ErrorHandlerService } from "src/app/core/error-handler.service";
import { Pessoa } from "src/app/pessoas/pessoaModel";
import { PessoaService } from "src/app/pessoas/pessoa.service";
import { Lancamento } from "../lancamentoModel";
import { LancamentoService } from "../lancamento.service";

import { MessageService } from "primeng/api";

import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
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
  formulario!: FormGroup;

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,

    private messageService: MessageService,
    private errorHandlerService: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    const codigoLancamento = this.route.snapshot.params['codigo'];

    this.title.setTitle('Novo Lançamento');
    this.configurarFormulario();

    if (codigoLancamento && codigoLancamento !== 'novo') {
      this.carregarLancamento(codigoLancamento)
    }
    this.carregarCategorias();
    this.carregarPessoas();
  }

  configurarFormulario(){
    this.formulario = this.formBuilder.group({
      codigo: [],
      tipo: ['RECEITA', Validators.required],
      dataVencimento: [null, this.validarCamposObrigatorios],
      dataPagamento: [],
      descricao: [null, [this.validarCamposObrigatorios, this.validarTamanhoMinimo(5)]],
      valor: [null, Validators.required],
      pessoa: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: []

      }),
      categoria: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: []

      }),
      observacao: []
    });
  }

  editarLancamento(){
    this.lancamentoService.atualizarLancamento(this.formulario.value)
      .then((lancamento:  Lancamento)=> {
        this.formulario.patchValue(lancamento);
        this.messageService.add({
          severity: "success", detail: "Lancamento alterado com sucesso!",
        });
        this.atualizarTituloEdicao();
      })
      .catch((error) => this.errorHandlerService.handle(error));
  }

  adicionar(){
    this.lancamentoService.adicionar(this.formulario.value)
      .then((lancamentoAdicionado) => {
        this.messageService.add({
          severity: "success",
          detail: "Lancamento salvo com sucesso!",
        });
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
        this.formulario.patchValue(response);
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

  novo(){
    this.formulario.reset();
    this.formulario.patchValue(new Lancamento())
    this.router.navigate(['lancamentos/novo']);
  }
  
  get isEditing (){
    return Boolean(this.formulario!.get('codigo')?.value)
  }

  atualizarTituloEdicao(){
    this.title.setTitle(`Edição de Lancamento: ${this.formulario.get('descricao')?.value}`);
  }

  validarCamposObrigatorios(input: FormControl){
    return (input.value ? null : {campoObrigatorio: true})
  }

    validarTamanhoMinimo(valor: number){
      return (input: FormControl) => {
        return (!input.value || input.value.length >= valor) ? null : {tamanhoMinimo: {tamanho: valor}}
      }
    }
}
