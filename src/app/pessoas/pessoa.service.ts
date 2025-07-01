import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Pessoa } from "./pessoaModel";
import { environment } from "src/environments/environment";
import { Cidade, Estado } from "../core/model";

export class PeopleFilter {
  nome?: string;
  pagina: number = 0;
  itensPorPagina: number = 5;
  ordenarPor?: string = "";
  ordenacao?: string = "";
}

@Injectable({
  providedIn: "root",
})
export class PessoaService {
  pessoasUrl: string;
  cidadesUrl: string;
  estadosUrl: string;

  constructor(private http: HttpClient) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
    this.cidadesUrl = `${environment.apiUrl}/cidades`
    this.estadosUrl = `${environment.apiUrl}/estados`
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.post<Pessoa>(this.pessoasUrl, pessoa).toPromise();
  }

  listarTodas(): Promise<any> {
    return this.http
      .get(this.pessoasUrl)
      .toPromise()
      .then((response: any) => {
        return response.content;
      });
  }

  pesquisar(filtro: PeopleFilter): Promise<any> {
    let params = new HttpParams()
      .set("page", filtro.pagina)
      .set("size", filtro.itensPorPagina)
      .set("sort", `${filtro.ordenarPor},${filtro.ordenacao}`); // Adicionando a ordenação;

    filtro.nome && (params = params.set("nome", filtro.nome));
    return this.http
      .get(this.pessoasUrl, { params })
      .toPromise()
      .then((response: any) => {
        const pessoas = response.content;
        const resultado = {
          pessoas,
          total: response.totalElements,
        };
        return resultado;
      });
  }

  excluir(codigo: number): Promise<any> {
    return this.http
      .delete(`${this.pessoasUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  mudarStatus(codigo: number, novoStatus: boolean): Promise<any> {
    return this.http
      .put(`${this.pessoasUrl}/${codigo}/ativo`, novoStatus) // body: true ou false
      .toPromise();
  }

  atualizarPessoa(pessoa: Pessoa): Promise<Pessoa> {
    return this.http
      .put<Pessoa>(`${this.pessoasUrl}/${pessoa.codigo}`, pessoa)
      .toPromise()
      .then((response: any) => {
        return response;
      });
  }

  pesquisarPorId(codigo: number): Promise<any> {
    return this.http
      .get<any>(`${this.pessoasUrl}/${codigo}`)
      .toPromise()
      .then((response) => {
        return response;
      });
  }

   listarEstados(): Promise<Estado[]> {
    return this.http.get<Estado[]>(this.estadosUrl).toPromise();
  }

  pesquisarCidades(estadoId: number): Promise<Cidade[]> {
    const params = new HttpParams()
      .set('estado', estadoId);

    return this.http.get<Cidade[]>(this.cidadesUrl, { params }).toPromise();
  }
}
