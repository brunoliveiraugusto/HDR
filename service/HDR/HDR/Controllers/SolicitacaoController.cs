using HDR.Context;
using HDR.Models;
using HDR.Rules;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HDR.Controllers
{
    public class SolicitacaoController : Controller
    {
        [Route("Solicitacao/CarregarSolicitacoesArquivo")]
        [HttpGet]
        public List<ArquivoModel> CarregarSolicitacoesArquivo(int idUsuarioMedico)
        {
            using (var contexto = new Contexto())
            {
                return new Solicitacao(contexto).CarregarSolicitacoes(idUsuarioMedico);
            }
        }

        [Route("Solicitacao/AprovarSolicitacaoDocumento")]
        [HttpPost]
        public bool AprovarSolicitacaoDocumento(int idArquivo)
        {
            using (var contexto = new Contexto())
            {
                return new Solicitacao(contexto).AprovarSolicitacaoDocumento(idArquivo);
            }
        }
    }
}
