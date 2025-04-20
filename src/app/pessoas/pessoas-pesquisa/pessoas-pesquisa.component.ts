import { LazyLoadEvent } from "primeng/api";
import { PeopleFilter, PessoaService } from "../pessoa.service";
import { Pessoa } from "./../pessoa";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-pessoas-pesquisa",
  templateUrl: "./pessoas-pesquisa.component.html",
  styleUrls: ["./pessoas-pesquisa.component.css"],
})
export class PessoasPesquisaComponent implements OnInit {
  filtro = new PeopleFilter();
  totalRegistros: number = 0;
  constructor(private pessoasService: PessoaService) {}

  ngOnInit(): void {
    this.listarTodas();
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
}
