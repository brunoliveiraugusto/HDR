using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HDR.Context;
using HDR.Rules;
using Microsoft.AspNetCore.Mvc;

namespace HDR.Controllers
{
    public partial class UsuarioController : Controller
    {
        [Route("Usuario/CriarUsuario")]
        [HttpPost()]
        public bool CriarUsuario(Usuario usuario)
        {
            using (var contexto = new Contexto())
            {
                return new Usuario(contexto).CriarUsuario(usuario);
            }
        }

        [Route("Usuario/Teste")]
        [HttpGet()]
        public string Teste()
        {
            return "teste via postman";
        }
    }
}
