using HDR.Context;
using HDR.Rules;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HDR.Controllers
{
    public class MedicoController : Controller
    {
        [Route("Medico/CarregarArquivosPorUsuario")]
        [HttpGet]
        public List<AnexoArquivo> CarregarArquivosPorUsuario(int idUsuario)
        {
            using (var contexto = new Contexto())
            {
                return new Medico(contexto).AdicionarMedicosResponsaveisPorArquivo(idUsuario);
            }
        }
    }
}
