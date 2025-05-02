import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandlerService } from '../core/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) { }

   categoriasUrl = 'http://localhost:8080/categorias';
  
    listarTodas(): Promise<any>{
      const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
      return this.http.get(this.categoriasUrl, {headers})
      .toPromise()
      .then((response: any) => {
        return response;
      }).catch(erro => {
        this.errorHandlerService.handle(erro);
      });
    }
}
