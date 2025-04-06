import { Component, Input } from '@angular/core';
import { Lancamento } from '../lancamento';

@Component({
  selector: 'app-lancamento-grid',
  templateUrl: './lancamento-grid.component.html',
  styleUrls: ['./lancamento-grid.component.css']
})
export class LancamentoGridComponent {

  @Input() lancamentos: Lancamento[] = [];

}
