import { ConfirmationService, LazyLoadEvent, MessageService } from "primeng/api";
import { PeopleFilter, PessoaService } from "../pessoa.service";
import { Pessoa } from "./../pessoa";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ErrorHandlerService } from "src/app/core/error-handler.service";
import { CategoriaService } from "src/app/categorias/categoria.service";

@Component({
  selector: "app-pessoas-pesquisa",
  templateUrl: "./pessoas-pesquisa.component.html",
  styleUrls: ["./pessoas-pesquisa.component.css"],
})
export class PessoasPesquisaComponent implements OnInit {
  filtro = new PeopleFilter();
  totalRegistros: number = 0;
  @ViewChild('tabela') grid: any;
  constructor(
    private pessoasService: PessoaService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private errorHandlerService: ErrorHandlerService,
    private cat: CategoriaService
  ) {}

  ngOnInit(): void {
    //this.listarTodas();
  }

  pessoas: Pessoa[] = [];

  listarTodas(): void {
    this.pessoasService.listarTodas().then((response) => {
      this.pessoas = response;
    });
  }

  pesquisar(pagina: number = 0): void {
    this.filtro.pagina = pagina;
    this.pessoasService.pesquisar(this.filtro).then((resultado) => {
      this.totalRegistros = resultado.total;
      this.pessoas = resultado.pessoas;
    });
  }

  aoMudarPagina(event: LazyLoadEvent) {
      const pagina = event!.first! / event!.rows!;
      if (event.sortField) {
        this.filtro.ordenarPor = event.sortField;
        this.filtro.ordenacao = event.sortOrder === 1 ? 'asc' : 'desc';
      }
      this.pesquisar(pagina);
    }

    confirmarExclusao(pessoa: any): void {
      this.confirmationService.confirm({
        message: 'Tem certeza que deseja excluir?',
        accept: () => {
          this.excluir(pessoa);
        }
      });
    }
  
    excluir(pessoa: any){
      this.pessoasService.excluir(pessoa.codigo)
      .then(() => {
        this.grid.reset();
        this.messageService.add({severity: 'success', detail: 'Pessoa excluída com sucesso!'});
      }).catch(erro => {
        this.errorHandlerService.handle(erro);
      });
    }

    mudarStatus(pessoa: any): void {
      const novoStatus = !pessoa.ativo;
      this.pessoasService.mudarStatus(pessoa.codigo, novoStatus)
        .then(() => {
          pessoa.ativo = novoStatus;
          if(pessoa.ativo){
            this.messageService.add({severity: 'success', detail: 'Pessoa Ativada com sucesso!'});
          }else{
            this.messageService.add({severity: 'success', detail: 'Pessoa Desativada com sucesso!'});
          }
        }).catch(erro => {
          this.errorHandlerService.handle(erro);
        });
    }
}
