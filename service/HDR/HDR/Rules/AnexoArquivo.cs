using HDR.Context;
using HDR.Generics;
using HDR.Interfaces;
using HDR.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HDR.Rules
{
    public class AnexoArquivo
    {
        private readonly IContextRepository _context;

        public string NomeArquivo { get; set; }
        public string Arquivo { get; set; }
        public DateTime DataCriacao { get; set; }
        public string NomeMedico { get; set; }
        public bool IndicaAprovacaoMedica { get; set; }
        public int? IdUsuarioMedico { get; set; }
        public string Crm { get; set; }
        public List<DadosMedicoModel> InformacoesMedico { get; set; }

        public AnexoArquivo() : this(new Contexto()) { }

        public AnexoArquivo(IContextRepository context)
        {
            _context = context;
        }
    }
}
