using HDR.Context;
using HDR.Generics;
using HDR.Interfaces;
using HDR.Models;
using System;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace HDR.Rules
{
    public class Autenticacao
    {
        private readonly IContextRepository _context;

        public Autenticacao(IContextRepository context)
        {
            _context = context;
        }

        public DadosUsuario AutenticarUsuario(string login, string password, bool indicaPaciente)
        {
            Login.ValidarDadosDeLoginPreenchido(login, password, indicaPaciente);

            var usuario = new UsuarioModel(_context).IndicaUsuarioValido(login, password, indicaPaciente);

            if(usuario.IsNull() || (!usuario.IsNull() && usuario.IdUsuario <= 0))
            {
                throw new Exception("Usuário ou senha inválido.");
            }
            else
            {
                return new DadosUsuario()
                {
                    IdUsuario = usuario.IdUsuario,
                    IndicaPaciente = usuario.IndicaPaciente
                };
            }
        }
    }
}
