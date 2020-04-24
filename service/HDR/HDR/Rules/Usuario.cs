using HDR.Context;
using HDR.Generics;
using HDR.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HDR.Rules
{
    public class Usuario
    {
        #region Propriedades e Construtor
        public Usuario() { }
        public Usuario(Contexto context)
        {
            this.Contexto = context;
        }

        [JsonIgnore]
        public Contexto Contexto { get; set; }
        public string NomeCompleto { get; set; }
        public string CpfCrm { get; set; }
        public string ChaveAcesso { get; set; }
        public string Email { get; set; }
        public DateTime DataNascimento { get; set; }
        public bool IndicaPaciente { get; set; }
        #endregion
        
        #region Métodos internos
        public bool CriarUsuario(Usuario usuario)
        {
            this.ValidarCamposObrigatoriosUsuario(usuario);

            if (this.IndicaUsuarioExistente(usuario))
            {
                throw new Exception("O CPF/CRM informado já encontra-se cadastrado. Use um novo ou se desejar cadastre uma nova senha.");
            }

            var novoUsuario = new UsuarioModel()
            {
                ChaveAcesso = usuario.ChaveAcesso,
                DataNascimento = usuario.DataNascimento,
                Login = usuario.CpfCrm,
                NomeUsuario = usuario.NomeCompleto,
                IndicaPaciente = usuario.IndicaPaciente
            };

            this.Contexto.Add(novoUsuario);
            this.Contexto.SaveChanges();

            return true;
        }

        public void ValidarCamposObrigatoriosUsuario(Usuario usuario)
        {
            if(usuario.NomeCompleto.IsNullOrEmpty())
            {
                throw new Exception("O campo NOME COMPLETO não foi preenchido.");
            }

            if (usuario.CpfCrm.IsNullOrEmpty())
            {
                throw new Exception("O campo CPF/CRM não foi preenchido.");
            }

            if (usuario.ChaveAcesso.IsNullOrEmpty())
            {
                throw new Exception("O campo SENHA não foi preenchido.");
            }

            if (usuario.Email.IsNullOrEmpty())
            {
                throw new Exception("O campo E-MAIL não foi preenchido.");
            }

            if (usuario.DataNascimento.IsNull())
            {
                throw new Exception("O campo DATA DE NASCIMENTO não foi preenchido.");
            }

            if (usuario.IndicaPaciente.IsNull())
            {
                throw new Exception("O tipo de usuário não foi preenchido.");
            }
        }

        public bool IndicaUsuarioExistente(Usuario usuario)
        {
            return this.Contexto.Usuarios.Any(user => user.Login == usuario.CpfCrm);
        }
        #endregion
    }
}
