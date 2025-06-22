export class Categoria {
    codigo?: number;
}

export class Endereco{
    logradouro?: string;
    numero?: number;
    complemento?: string;
    bairro?: string;
    cep?: string;
    cidade?: string;
    estado?: string;
        
}

export class Contato {
  codigo?: number;
  nome?: string;
  email?: string;
  telefone?: string;

  constructor(
    codigo?: number,
    nome?: string,
    email?: string,
    telefone?: string) {

    this.codigo = codigo;
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
  }
}