import { HttpClient } from '@angular/common/http';
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
      return this.http.get(this.categoriasUrl)
      .toPromise()
      .then((response: any) => {
        return response;
      }).catch(erro => {
        this.errorHandlerService.handle(erro);
      });
    }
}
