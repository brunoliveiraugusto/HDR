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
    public partial class AutenticacaoController : Controller
    {
        [Route("Autenticacao/AutenticarUsuario")]
        [HttpGet()]
        public int AutenticarUsuario(string login, string password, bool indicaPaciente)
        {
            using (var contexto = new Contexto())
            {
                return new Autenticacao(contexto).AutenticarUsuario(login, password, indicaPaciente);
            }
        }

        [Route("Autenticacao/GerarChaveMedico")]
        [HttpGet()]
        public string GerarChaveMedico(int idUsuario)
        {
            using (var contexto =  new Contexto())
            {
                return new Autenticacao(contexto).GerarChaveMedico(idUsuario);
            }
        }

        [Route("Autenticacao/ValidarChaveAcessoMedico")]
        [HttpGet()]
        public int ValidarChaveAcessoMedico(string chave)
        {
            using (var contexto = new Contexto())
            {
                return new Autenticacao(contexto).ValidarChaveAcesso(chave);
            }
        }
    }
}
