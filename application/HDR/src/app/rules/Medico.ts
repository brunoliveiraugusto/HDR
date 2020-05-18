import { InformacoesTrabalho } from './InformacoesTrabalho';

export class Medico {
    IdUsuario: number;
    NomeCompleto: string;
    Crm: string;
    InformacoesTrabalhoMedico: Array<InformacoesTrabalho>;
}