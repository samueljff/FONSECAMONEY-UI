export class Endereco{
    logradouro?: string;
    numero?: number;
    complemento?: string;
    bairro?: string;
    cep?: string;
    cidade?: string;
    estado?: string;
        
}

export class Pessoa {
    codigo?: number;
    nome?: string;
    endereco = new Endereco();
    ativo = true;
}
