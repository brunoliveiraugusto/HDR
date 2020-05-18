import { InformacoesTrabalho } from './InformacoesTrabalho';

export class Medico {
    idMedico: number;
    nomeCompleto: string;
    crm: string;
    informacoesTrabalhoMedico: Array<InformacoesTrabalho>;
}