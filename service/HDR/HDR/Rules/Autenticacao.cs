using HDR.Context;
using HDR.Generics;
using HDR.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HDR.Rules
{
    public struct DadosUsuario
    {
        public int IdUsuario { get; set; }
        public bool IndicaPaciente { get; set; }
    }

    public class Autenticacao
    {
        public Autenticacao(Contexto context)
        {
            this.Contexto = context;
        }

        private static Random random = new Random();
        private Contexto Contexto { get; set; }

        #region Login
        public int AutenticarUsuario(string login, string password, bool indicaPaciente)
        {
            this.ValidarDadosDeLoginPreenchido(login, password, indicaPaciente);

            var usuario = this.IndicaUsuarioValido(login, password, indicaPaciente);

            if(usuario.IdUsuario > 0)
            {
                return usuario.IdUsuario;
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

        public UsuarioModel IndicaUsuarioValido(string login, string password, bool indicaPaciente)
        {
            return this.Contexto.Usuarios.Where(usuario => usuario.Login == login && usuario.ChaveAcesso == password && usuario.IndicaPaciente == indicaPaciente)
                .FirstOrDefault();
        }
        #endregion

        #region Gerar Chave de Acesso Médico
        public string GerarChaveMedico(int idUsuario)
        {
            if(idUsuario <= 0)
            {
                throw new Exception("É necessário realizar a autenticação para usar esse recurso.");
            }

            this.InativarChavesUsuario(idUsuario);
            var chave = this.GerarChave();
            this.SalvarChaveGerada(idUsuario, chave);

            return chave;
        }

        public void InativarChavesUsuario(int idUsuario)
        {
            var chavesAtivas = this.Contexto.Chaves.Where(chaveAcesso => chaveAcesso.IdUsuario == idUsuario && chaveAcesso.IndicaChaveAtiva).ToList();

            if(chavesAtivas.Count() > 0)
            {
                foreach(var chave in chavesAtivas)
                {
                    chave.IndicaChaveAtiva = false;
                    chave.DataCancelamento = DateTime.Now;

                    this.Contexto.Entry(chave).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    this.Contexto.SaveChanges();
                }
            }
        }

        public string GerarChave()
        {
            string chaveGerada = "";
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

            while (true)
            {
                chaveGerada = new string(Enumerable.Repeat(chars, 8)
                .Select(x => x[random.Next(x.Length)]).ToArray());

                var chaveExistente = this.Contexto.Chaves.Any(chave => chave.ChaveAcesso == chaveGerada);

                if (chaveExistente)
                    continue;
                else if(!chaveExistente && chaveGerada.Length == 8)
                    break;
            }

            return chaveGerada;
        }

        public void SalvarChaveGerada(int idUsuario, string chave)
        {
            var chaveModel = new ChaveModel()
            {
                ChaveAcesso = chave,
                DataCriacao = DateTime.Now,
                IdUsuario = idUsuario,
                IndicaChaveAtiva = true,
            };

            this.Contexto.Add(chaveModel);
            this.Contexto.SaveChanges();
        }

        public int ValidarChaveAcesso(string chave)
        {
            if(chave.IsNullOrEmpty())
            {
                throw new Exception("A chave de acesso não foi informada.");
            }

            var chaveAcesso = this.Contexto.Chaves.Where(key => key.IndicaChaveAtiva && key.ChaveAcesso == chave).FirstOrDefault();

            if(!chaveAcesso.IsNull())
            {
                this.InativarChaveAcesso(chaveAcesso);
                return chaveAcesso.IdUsuario;
            }
            else
            {
                throw new Exception("A chave digitada é inválida.");
            }
        }

        public void InativarChaveAcesso(ChaveModel chave)
        {
            chave.IndicaChaveAtiva = false;
            chave.DataCancelamento = DateTime.Now;

            this.Contexto.Entry(chave).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            this.Contexto.SaveChanges();
        }
        #endregion
    }
}
