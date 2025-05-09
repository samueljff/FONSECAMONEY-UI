import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import '@angular/common/http';
import { DatePipe } from '@angular/common';

import { Lancamento } from './lancamentoModel';


export class LancamentoFiltro {
  descricao?: string;
  dataVencimentoInicio?: Date;
  dataVencimentoFim?: Date;
  ordenarPor?: string = ''; 
  ordenacao?: string = '';
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root',
})
export class LancamentoService {
  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe
  ) {}

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new HttpHeaders()
    .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
    .append('Content-Type', 'application/json');

    return this.http.post<Lancamento>(this.lancamentosUrl, lancamento, { headers }).toPromise();
  }

  atualizarLancamento(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');
    return this.http.put<Lancamento>(`${this.lancamentosUrl}/${lancamento.codigo}`, lancamento, { headers })
    .toPromise()
    .then((response: any) => {
      this.converterStringParaDate([response]);

        return response;
    })
  }

  pesquisarPorId(codigo: number): Promise<any> {
    const headers = new HttpHeaders()
    .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    
    return this.http.get<any>(`${this.lancamentosUrl}/${codigo}`, {headers})
      .toPromise()
      .then(response => {
        this.converterStringParaDate([response]);
        return response;
      });
  }

  private converterStringParaDate(lancamentos: Lancamento[]) {
    lancamentos.forEach(l => {
      let offset = new Date().getTimezoneOffset() * 60000;
      if (l.dataVencimento) {
        l.dataVencimento = new Date(new Date(l.dataVencimento!).getTime() + offset);
      }
  
      if (l.dataPagamento) {
        l.dataPagamento = new Date(new Date(l.dataPagamento!).getTime() + offset);
      }
    });
  }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const headers = new HttpHeaders()
    .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    let params = new HttpParams()
    .set('page', filtro.pagina)
    .set('size', filtro.itensPorPagina)
    .set('sort', `${filtro.ordenarPor},${filtro.ordenacao}`);  // Adicionando a ordenação;

    //semelhante ao if
    filtro.descricao && (params = params.set('descricao', filtro.descricao));  
    
    if (filtro.dataVencimentoInicio) {
      params = params.set('dataVencimentoDe', this.datePipe.transform(filtro.dataVencimentoInicio, 'yyyy-MM-dd')!);
  }
  
  if (filtro.dataVencimentoFim) {
      params = params.set('dataVencimentoAte', this.datePipe.transform(filtro.dataVencimentoFim, 'yyyy-MM-dd')!);
  }
    return this.http.get<any>(`${this.lancamentosUrl}?resumo`, {headers, params})
      .toPromise()
      .then((response: any) => {
        const lancamentos = response.content;
        const resultado = {
          lancamentos,
          total: response.totalElements
        };
        return resultado;
      });
  }

  excluir(codigo: number): Promise<any>{
    const headers = new HttpHeaders()
    .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    return this.http.delete(`${this.lancamentosUrl}/${codigo}`, {headers})
      .toPromise()
      .then(() => null);
  }
}
