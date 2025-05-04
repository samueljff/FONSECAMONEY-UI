import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { Pessoa } from 'src/app/pessoas/pessoa';
import { PessoaService } from 'src/app/pessoas/pessoa.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService
  ){}

  ngOnInit(): void {
      this.carregarCategorias();
      this.carregarPessoas();
  }

  tipos = [
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Receita', value: 'DESPESA'},
  ];

  categorias: any[] = [];

  pessoas: Pessoa[] = [];

  carregarCategorias() {
    return this.categoriaService.listarTodas()
      .then(response => {
        this.categorias = response.map((c: any) => ({ label: c.nome, value: c.codigo }));
      })
      .catch(error => {
        console.error('Erro ao carregar categorias!', error);
      });
  }
  
  carregarPessoas(){
    return this.pessoaService.listarTodas()
      .then(response => {
        this.pessoas = response.map((c: any) => ({label: c.nome, value: c.codigo}));
      })
      .catch(error => {
        console.error('Erro ao carregar pessoas!', error);
      });
  }

}
