import { Component, OnInit } from '@angular/core';
import { LancamentoService } from '../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styles: [
  ]
})
export class LancamentosPesquisaComponent implements OnInit {

  lancamentos = [];

  constructor(private lancamentoService: LancamentoService){}

  ngOnInit() {
      this.pesquisar();
  }

  pesquisar(){
    this.lancamentoService.pesquisar()
    .then(lancamentos => this.lancamentos=lancamentos)
  }

}
