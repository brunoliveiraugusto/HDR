using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HDR.Interfaces
{
    public interface ILogin
    {
        void ValidarDadosDeLogin(string login, string password, bool indicaPaciente);
    }
}
