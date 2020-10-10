using HDR.Generics;
using HDR.Interfaces;
using System;

namespace HDR.Rules
{
    public class Arquivo
    {
        private readonly IContextRepository _context;
        private readonly IArquivoModel _arquivo;
        public int IdArquivo { get; set; }
        public string ArquivoAnexado { get; set; }
        public int IdUsuario { get; set; }
        public string NomeArquivo { get; set; }
        public DateTime DataCriacao { get; set; }
        public DateTime? DataExclusao { get; set; }
        public int? IdUsuarioMedico { get; set; }
        public bool IndicaCadastroMedico { get; set; }

        public Arquivo(IContextRepository context, IArquivoModel arquivo)
        {
            _context = context;
            _arquivo = arquivo;
        }

        public void SalvarArquivo(Arquivo arquivo)
        {
            this.ValidarArquivo(arquivo);
            _arquivo.Salvar(arquivo);
        }

        public void ValidarArquivo(Arquivo arquivo)
        {
            if(arquivo.ArquivoAnexado.IsNullOrEmpty())
            {
                throw new Exception("Nenhum arquivo pdf foi selecionado.");
            }

            if(arquivo.IdUsuario <= 0)
            {
                throw new Exception("Problema de Autenticação.");
            }

            if(arquivo.NomeArquivo.IsNullOrEmpty())
            {
                throw new Exception("O campo NOME ARQUIVO não foi preenchido.");
            }
        } 
    }
}
