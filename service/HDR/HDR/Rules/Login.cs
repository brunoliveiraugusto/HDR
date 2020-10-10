using HDR.Generics;
using HDR.Interfaces;
using System;

namespace HDR.Rules
{
    public class Login : ILogin
    {
        public Login() { }

        public void ValidarDadosDeLogin(string login, string password, bool indicaPaciente)
        {
            if (login.IsNullOrEmpty())
            {
                throw new Exception("CPF/CRM não foi informado.");
            }

            if (password.IsNullOrEmpty())
            {
                throw new Exception("SENHA não foi informada.");
            }

            if (indicaPaciente.IsNull())
            {
                throw new Exception("Tipo de Usuário não foi informado.");
            }
        }
    }
}
