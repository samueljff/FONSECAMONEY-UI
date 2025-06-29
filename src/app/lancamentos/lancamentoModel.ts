import { Categoria } from '../core/model';
import { Pessoa } from '../pessoas/pessoaModel';

export class Lancamento {
    codigo?: number;
    tipo = 'RECEITA';
    descricao?: string;
    dataVencimento?: Date;
    dataPagamento?: Date | null;
    valor?: number;
    observacao?: string;
    pessoa = new Pessoa();
    categoria = new Categoria();
    anexo?: string;
    urlAnexo?: string;  
}
