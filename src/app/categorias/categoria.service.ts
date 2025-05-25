import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandlerService } from '../core/error-handler.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
   categoriasUrl: string
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
  ) { this.categoriasUrl = `${environment.apiUrl}/categorias`;}
   
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
