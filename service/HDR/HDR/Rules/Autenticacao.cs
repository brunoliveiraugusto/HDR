using HDR.Context;
using HDR.Generics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HDR.Rules
{
    public class Autenticacao
    {
        public Autenticacao(Contexto context)
        {
            this.Contexto = context;
        }

        private Contexto Contexto { get; set; }

        public bool AutenticarUsuario(string login, string password, bool indicaPaciente)
        {
            this.ValidarDadosDeLoginPreenchido(login, password, indicaPaciente);

            if(this.IndicaUsuarioValido(login, password, indicaPaciente))
            {
                return true;
            }
            else
            {
                throw new Exception("Usuário ou senha inválido.");
            }
        }

        public void ValidarDadosDeLoginPreenchido(string login, string password, bool indicaPaciente)
        {
            if(login.IsNullOrEmpty())
            {
                throw new Exception("CPF/CRM não foi informado.");
            }

            if (password.IsNullOrEmpty())
            {
                throw new Exception("SENHA não foi informada.");
            }

            if(indicaPaciente.IsNull())
            {
                throw new Exception("Tipo de Usuário não foi informado.");
            }
        }

        public bool IndicaUsuarioValido(string login, string password, bool indicaPaciente)
        {
            return this.Contexto.Usuarios.Any(usuario => usuario.Login == login && usuario.ChaveAcesso == password && usuario.IndicaPaciente == indicaPaciente);
        }
    }
}
