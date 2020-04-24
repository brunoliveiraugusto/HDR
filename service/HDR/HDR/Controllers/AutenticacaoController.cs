using HDR.Context;
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
        public bool AutenticarUsuario(string login, string password, bool indicaPaciente)
        {
            using (var contexto = new Contexto())
            {
                return new Autenticacao(contexto).AutenticarUsuario(login, password, indicaPaciente);
            }
        }
    }
}
