import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pessoa } from './pessoaModel';

export class PeopleFilter {
  nome?: string;
  pagina: number = 0;
  itensPorPagina: number = 5;
  ordenarPor?: string = ''; 
  ordenacao?: string = '';
}

@Injectable({
  providedIn: 'root'
})

export class PessoaService {

  constructor(
    private http: HttpClient
  ) { }

  pessoasUrl = 'http://localhost:8080/pessoas';

   adicionar(pessoa: Pessoa): Promise<Pessoa> {
      const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');
  
      return this.http.post<Pessoa>(this.pessoasUrl, pessoa, { headers }).toPromise();
    }

  listarTodas(): Promise<any>{
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    return this.http.get(this.pessoasUrl, {headers})
    .toPromise()
    .then((response: any) => {
      return response.content;
    });
  }

  pesquisar(filtro: PeopleFilter): Promise<any>{
    let params = new HttpParams()
      .set('page', filtro.pagina)
      .set('size', filtro.itensPorPagina)
      .set('sort', `${filtro.ordenarPor},${filtro.ordenacao}`);  // Adicionando a ordenação;
    
    filtro.nome && (params = params.set('nome', filtro.nome));

    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    return this.http.get(this.pessoasUrl, {headers, params})
      .toPromise()
      .then((response: any) => {
        const pessoas = response.content;
        const resultado = {
          pessoas,
          total: response.totalElements
        };
        return resultado;
      });
  }

  excluir(codigo: number): Promise<any>{
    const headers = new HttpHeaders()
    .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    return this.http.delete(`${this.pessoasUrl}/${codigo}`, {headers})
      .toPromise()
      .then(() => null);
  }

  mudarStatus(codigo: number, novoStatus: boolean): Promise<any> {
    const headers = new HttpHeaders()
    .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
    .append('Content-Type', 'application/json');
    return this.http.put(
      `${this.pessoasUrl}/${codigo}/ativo`, JSON.stringify(novoStatus), // body: true ou false
      { headers }
    ).toPromise();
  }
  

}
