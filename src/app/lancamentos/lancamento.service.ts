import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import '@angular/common/http';
import { DatePipe } from '@angular/common';

import { environment } from './../../environments/environment';
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
  
  lancamentosUrl: string;

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe
  ) {this.lancamentosUrl = `${environment.apiUrl}/lancamentos`}

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    return this.http.post<Lancamento>(this.lancamentosUrl, lancamento).toPromise();
  }

  atualizarLancamento(lancamento: Lancamento): Promise<Lancamento> {
    return this.http.put<Lancamento>(`${this.lancamentosUrl}/${lancamento.codigo}`, lancamento)
    .toPromise()
    .then((response: any) => {
      this.converterStringParaDate([response]);

        return response;
    })
  }

  pesquisarPorId(codigo: number): Promise<any> {    
    return this.http.get<any>(`${this.lancamentosUrl}/${codigo}`)
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
    return this.http.get<any>(`${this.lancamentosUrl}?resumo`, { params})
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
    return this.http.delete(`${this.lancamentosUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }
}
