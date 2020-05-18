using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HDR.Models
{
    [Table("DADOS_MEDICO")]
    public class DadosMedicoModel
    {
        [Key, Column("ID_DADOS_MEDICO")]
        public int IdDadosMedico { get; set; }

        [Column("NOME_LOCAL_TRABALHO")]
        public string NomeLocalTrabalho { get; set; }

        [Column("ENDERECO")]
        public string Endereco { get; set; }

        [Column("ESPECIALIDADE")]
        public string Especialidade { get; set; }

        [Column("DATA_CADASTRO")]
        public DateTime DataCadastro { get; set; }

        [Column("ID_USUARIO"), ForeignKey("Usuario")]
        public int IdUsuario { get; set; }

        public virtual UsuarioModel Usuario { get; set; }
    }
}
