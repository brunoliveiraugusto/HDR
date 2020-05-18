using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HDR.Models
{
    [Table("ARQUIVO")]
    public class ArquivoModel
    {
        [Key, Column("ID_ARQUIVO")]
        public int IdArquivo { get; set; }

        [Column("ARQUIVO")]
        public string Arquivo { get; set; }

        [Column("NOME_ARQUIVO")]
        public string NomeArquivo { get; set; }

        [Column("DATA_CRIACAO")]
        public DateTime DataCriacao { get; set; }

        [Column("DATA_EXCLUSAO")]
        public DateTime? DataExclusao { get; set; }

        [Column("ID_USUARIO_MEDICO")]
        public int? IdUsuarioMedico { get; set; }

        [Column("INDICA_APROVACAO_MEDICA")]
        public bool IndicaAprovacaoMedica { get; set; }

        [Column("ID_USUARIO"), ForeignKey("Usuario")]
        public int IdUsuario { get; set; }

        public virtual UsuarioModel Usuario { get; set; }


    }
}
