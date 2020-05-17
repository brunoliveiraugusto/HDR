import { DadosMedico } from './DadosMedico';

export class Usuario {
    NomeCompleto: string;
    CpfCrm: string;
    ChaveAcesso: string;
    Email: string;
    DataNascimento: Date;
    IndicaPaciente: boolean;
    DadosMedico: Array<DadosMedico>;
}