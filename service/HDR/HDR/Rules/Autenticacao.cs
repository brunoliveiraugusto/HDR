using HDR.Generics;
using HDR.Interfaces;
using HDR.Models;
using System;

namespace HDR.Rules
{
    public class Autenticacao
    {
        private readonly IContextRepository _context;
        private readonly ILogin _login;

        public Autenticacao(IContextRepository context, ILogin login)
        {
            _context = context;
            _login = login;
        }

        public DadosUsuario AutenticarUsuario(string login, string password, bool indicaPaciente)
        {
            _login.ValidarDadosDeLogin(login, password, indicaPaciente);

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
