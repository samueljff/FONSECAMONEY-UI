export interface Lancamento {
    tipo: string;
    descricao: string;
    dataVencimento: Date;
    dataPagamento: Date | null;
    valor: number;
    pessoa: string;
}
