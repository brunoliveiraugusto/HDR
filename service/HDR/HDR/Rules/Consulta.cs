using HDR.Context;
using HDR.Generics;
using HDR.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HDR.Rules
{
    public class Consulta
    {
        public Consulta() { }
        public Consulta(Contexto context)
        {
            this.Contexto = context;
        }

        [JsonIgnore]
        public Contexto Contexto { get; set; }
        public int IdConsulta { get; set; }
        public string Crm { get; set; }
        public string NomeMedico { get; set; }
        public string NomeHospital { get; set; }
        public DateTime DataConsulta { get; set; }
        public string Endereco { get; set; }
        public int IdUsuario { get; set; }


        public bool CadastrarConsulta(Consulta consulta)
        {
            this.ValidarDadosConsulta(consulta);

            var consultaModel = new ConsultaModel()
            {
                Crm = consulta.Crm,
                DataConsulta = consulta.DataConsulta,
                Endereco = consulta.Endereco,
                IdUsuario = consulta.IdUsuario,
                NomeHospital = consulta.NomeHospital,
                NomeMedico = consulta.NomeMedico
            };

            this.Contexto.Add(consultaModel);
            this.Contexto.SaveChanges();

            return true;
        }

        public void ValidarDadosConsulta(Consulta consulta)
        {
            if(consulta.NomeMedico.IsNullOrEmpty())
            {
                throw new Exception("O campo NOME MÉDICO não foi preenchido.");
            }

            if (consulta.NomeHospital.IsNullOrEmpty())
            {
                throw new Exception("O campo NOME CLÍNICA não foi preenchido.");
            }

            if (consulta.DataConsulta.IsNull())
            {
                throw new Exception("O campo DATA DA CONSULTA não foi preenchido.");
            }
        }

        public List<ConsultaModel> CarregarConsultas(int idUsuario)
        {
            return this.Contexto.Consultas.Where(consulta => consulta.IdUsuario == idUsuario).ToList();
        }
    }
}
