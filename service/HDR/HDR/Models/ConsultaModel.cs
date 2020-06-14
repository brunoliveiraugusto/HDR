using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HDR.Models
{
    [Table("CONSULTA")]
    public class ConsultaModel
    {
        [Key, Column("ID_CONSULTA")]
        public int IdConsulta { get; set; }

        [Column("CRM")]
        public string Crm { get; set; }

        [Column("NOME_MEDICO")]
        public string NomeMedico { get; set; }

        [Column("NOME_HOSPITAL")]
        public string NomeHospital { get; set; }

        [Column("DATA_CONSULTA")]
        public DateTime DataConsulta { get; set; }

        [Column("ENDERECO")]
        public string Endereco { get; set; }

        [Column("ID_USUARIO"), ForeignKey("Usuario")]
        public int IdUsuario { get; set; }

        public virtual UsuarioModel Usuario { get; set; }
    }
}
