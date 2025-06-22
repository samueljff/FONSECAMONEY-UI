import { Contato, Endereco } from "../core/model";

export class Pessoa {
    codigo?: number;
    nome?: string;
    endereco = new Endereco();
    contatos = Array<Contato>();
    ativo = true;
}
