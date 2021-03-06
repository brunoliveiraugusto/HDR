﻿using HDR.Context;
using HDR.Models;
using HDR.Rules;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HDR.Controllers
{
    public class ArquivoController : Controller
    {
        [Route("Arquivo/SalvarArquivo")]
        [HttpPost]
        public bool SalvarArquivo([FromBody] Arquivo arquivo)
        {
            using (var contexto = new Contexto())
            {
                new Arquivo(contexto).SalvarArquivo(arquivo);
                return true;
            }
        }

        [Route("Arquivo/CarregarArquivosPorUsuario")]
        [HttpGet]
        public List<AnexoArquivo>CarregarArquivosPorUsuario(int idUsuario)
        {
            using (var contexto = new Contexto())
            {
                return new Arquivo(contexto).CarregarArquivosSalvo(idUsuario);
            } 
        }

        [Route("Arquivo/CarregarSolicitacoesArquivo")]
        [HttpGet]
        public List<ArquivoModel> CarregarSolicitacoesArquivo(int idUsuarioMedico)
        {
            using (var contexto = new Contexto())
            {
                return new Arquivo(contexto).CarregarSolicitacoes(idUsuarioMedico);
            }
        }

        [Route("Arquivo/AprovarSolicitacaoDocumento")]
        [HttpPost]
        public bool AprovarSolicitacaoDocumento(int idArquivo)
        {
            using (var contexto = new Contexto())
            {
                return new Arquivo(contexto).AprovarSolicitacaoDocumento(idArquivo);
            }
        }
    }
}
