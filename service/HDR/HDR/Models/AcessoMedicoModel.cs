using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HDR.Models
{
    [Table("ACESSO_MEDICO")]
    public class AcessoMedicoModel
    {
        [Key, Column("ID_ACESSO_MEDICO")]
        public int IdAcessoMedico { get; set; }

        [Column("CHAVE_ACESSO")]
        public string ChaveAcesso { get; set; }

        [Column("DATA_CRIACAO")]
        public DateTime DataCriacao { get; set; }

        [Column("DATA_CANCELAMENTO")]
        public DateTime? DataCancelamento { get; set; }

        [Column("ID_USUARIO"), ForeignKey("Usuario")]
        public int IdUsuario { get; set; }

        [Column("INDICA_CHAVE_ATIVA")]
        public bool IndicaChaveAtiva { get; set; }

        public virtual UsuarioModel Usuario { get; set; }
    }
}
