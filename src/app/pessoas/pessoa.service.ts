import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

}
