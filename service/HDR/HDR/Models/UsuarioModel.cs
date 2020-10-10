using HDR.Context;
using HDR.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HDR.Models
{   
    [Table("USUARIO")]
    public class UsuarioModel : IModel
    {
        private readonly IContextRepository _context;

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

        [Column("INDICA_PACIENTE")]
        public bool IndicaPaciente { get; set; }

        public UsuarioModel() : this(new Contexto()) { }

        public UsuarioModel(IContextRepository context)
        {
            _context = context;
        }

        public UsuarioModel IndicaUsuarioValido(string login, string password, bool indicaPaciente)
        {
            return _context.Usuarios.Where(usuario => usuario.Login == login && usuario.ChaveAcesso == password && usuario.IndicaPaciente == indicaPaciente)
                .FirstOrDefault();
        }

        public void Salvar(IModel model)
        {
            throw new NotImplementedException();
        }
    }
}
