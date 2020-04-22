using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HDR.Models
{   
    [Table("USUARIO")]
    public class UsuarioModel
    {
        [Key, Column("ID_USUARIO")]
        public int IdUsuario { get; set; }

        [Column("NOME_USUARIO")]
        public string NomeUsuario { get; set; }

        [Column("LOGIN")]
        public string Login { get; set; }

        [Column("CHAVE_ACESSO")]
        public string ChaveAcesso { get; set; }

        [Column("DATA_NASCIMENTO")]
        public DateTime DataNascimento { get; set; }
    }
}
