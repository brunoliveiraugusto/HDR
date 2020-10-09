﻿using HDR.Context;
using HDR.Generics;
using HDR.Interfaces;
using HDR.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HDR.Rules
{
    public class Arquivo
    {
        private readonly IContextRepository _context;

        public Arquivo() { }

        public Arquivo(IContextRepository context)
        {
            _context = context;
        }

        public int IdArquivo { get; set; }
        public string ArquivoAnexado { get; set; }
        public int IdUsuario { get; set; }
        public string NomeArquivo { get; set; }
        public DateTime DataCriacao { get; set; }
        public DateTime? DataExclusao { get; set; }
        public int? IdUsuarioMedico { get; set; }
        public bool IndicaCadastroMedico { get; set; }

        public void SalvarArquivo(Arquivo arquivo)
        {
            this.ValidarArquivo(arquivo);
            new ArquivoModel(_context).Salvar(arquivo);
        }

        public void ValidarArquivo(Arquivo arq)
        {
            if(arq.ArquivoAnexado.IsNullOrEmpty())
            {
                throw new Exception("Nenhum arquivo pdf foi selecionado.");
            }

            if(arq.IdUsuario <= 0)
            {
                throw new Exception("Problema de Autenticação.");
            }

            if(arq.NomeArquivo.IsNullOrEmpty())
            {
                throw new Exception("O campo NOME ARQUIVO não foi preenchido.");
            }
        } 
    }
}
