import { Categoria } from '../core/model';
import { Pessoa } from '../pessoas/pessoa';

export class Lancamento {
    codigo?: number;
    tipo?: string;
    descricao = 'RECEITA';
    dataVencimento?: Date;
    dataPagamento?: Date | null;
    valor?: number;
    observacao?: string;
    pessoa = new Pessoa();
    categoria = new Categoria();
}
