import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import '@angular/common/http';
import { DatePipe } from '@angular/common';

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
}
