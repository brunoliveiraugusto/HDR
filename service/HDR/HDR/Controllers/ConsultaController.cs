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
    public class ConsultaController : Controller
    {
        [Route("Consulta/SalvarConsulta")]
        [HttpPost]
        public bool SalvarConsulta([FromBody] Consulta consulta)
        {
            using (var contexto = new Contexto())
            {
                return new Consulta(contexto).CadastrarConsulta(consulta);
            }
        }

        [Route("Consulta/CarregarConsultas")]
        [HttpGet]
        public List<ConsultaModel> CarregarConsultas(int idUsuario)
        {
            using (var contexto = new Contexto())
            {
                return new Consulta(contexto).CarregarConsultas(idUsuario);
            }
        }
    }
}
