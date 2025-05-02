import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  constructor(
    private categoriaService: CategoriaService,
    private errorHandlerService: ErrorHandlerService
  ){}

  ngOnInit(): void {
      this.carregarCategorias();
  }

  tipos = [
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Receita', value: 'DESPESA'},
  ];

  categorias: any[] = [];

  pessoas = [
    { label: 'João da Silva', value: 4 },
    { label: 'Sebastião Souza', value: 9 },
    { label: 'Maria Abadia', value: 3 },
  ];

  carregarCategorias() {
    return this.categoriaService.listarTodas()
      .then(response => {
        this.categorias = response.map((c: any) => ({ label: c.nome, value: c.codigo }));
      })
      .catch(error => {
        console.error('Erro ao carregar categorias', error);
      });
  }  

}
