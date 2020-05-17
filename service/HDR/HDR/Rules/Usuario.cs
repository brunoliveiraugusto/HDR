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
        public List<DadosMedico> DadosMedico { get; set; }
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

            if(!usuario.IndicaPaciente)
            {
                this.CriarMedico(usuario.DadosMedico, novoUsuario.IdUsuario);
            }

            return true;
        }

        public void CriarMedico(List<DadosMedico> dadosMedico, int idUsuarioMedico)
        {
            foreach(var dadoMedico in dadosMedico)
            {
                var medico = new DadosMedicoModel()
                {
                    NomeLocalTrabalho = dadoMedico.NomeLocalTrabalho,
                    Endereco = dadoMedico.Endereco,
                    Especialidade = dadoMedico.Especialidade,
                    IdUsuario = idUsuarioMedico,
                    DataCadastro = DateTime.Now
                };

                this.Contexto.Add(medico);
                this.Contexto.SaveChanges();
            }
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

            if(!usuario.IndicaPaciente)
            {
                this.ValidarEspecialidadesMedica(usuario.DadosMedico) ;
            }
        }

        public void ValidarEspecialidadesMedica(List<DadosMedico> especialidades)
        {
            if(especialidades.Count() <= 0)
            {
                throw new Exception("Nenhuma especialidade médica foi informada. Por favor, informe no mínimo uma.");
            }

            foreach(var especialidade in especialidades)
            {
                if(especialidade.NomeLocalTrabalho.IsNullOrEmpty())
                {
                    throw new Exception("O campo NOME LOCAL DE TRABALHO não foi preenchido.");
                }

                if (especialidade.Endereco.IsNullOrEmpty())
                {
                    throw new Exception("O campo ENDEREÇO não foi preenchido.");
                }

                if (especialidade.Especialidade.IsNullOrEmpty())
                {
                    throw new Exception("O campo ESPECIALIDADE não foi preenchido.");
                }
            }
        }

        public bool IndicaUsuarioExistente(Usuario usuario)
        {
            return this.Contexto.Usuarios.Any(user => user.Login == usuario.CpfCrm);
        }
        #endregion
    }
}
