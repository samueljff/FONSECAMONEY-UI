import { Pessoa } from '../pessoaModel';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pessoas-grid',
  templateUrl: './pessoas-grid.component.html',
  styleUrls: ['./pessoas-grid.component.css']
})
export class PessoasGridComponent {
  @Input() pessoas: Pessoa[] = [];
}
