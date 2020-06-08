using HDR.Context;
using HDR.Generics;
using HDR.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HDR.Rules
{
    public struct AnexoArquivo
    {
        public string NomeArquivo { get; set; }
        public string Arquivo { get; set; }
        public DateTime DataCriacao { get; set; }
        public string NomeMedico { get; set; }
        public bool IndicaAprovacaoMedica { get; set; }
        public int? IdUsuarioMedico { get; set; }
        public string Crm { get; set; }
        public List<DadosMedicoModel> InformacoesMedico { get; set; }
    }

    public class Arquivo
    {
        public Arquivo() { }

        public Arquivo(Contexto contexto)
        {
            this.Contexto = contexto;
        }

        [JsonIgnore]
        private Contexto Contexto { get; set; }
        public int IdArquivo { get; set; }
        public string ArquivoAnexado { get; set; }
        public int IdUsuario { get; set; }
        public string NomeArquivo { get; set; }
        public DateTime DataCriacao { get; set; }
        public DateTime? DataExclusao { get; set; }
        public int? IdUsuarioMedico { get; set; }
        public bool IndicaCadastroMedico { get; set; }

        public void SalvarArquivo(Arquivo arquivo)
        {
            this.ValidarInformacoesPreenchidas(arquivo);
            this.Salvar(arquivo);
        }

        public void ValidarInformacoesPreenchidas(Arquivo arq)
        {
            if(arq.ArquivoAnexado.IsNullOrEmpty())
            {
                throw new Exception("Nenhum arquivo pdf foi selecionado.");
            }

            if(arq.IdUsuario <= 0)
            {
                throw new Exception("Problema de Autenticação.");
            }

            if(arq.NomeArquivo.IsNullOrEmpty())
            {
                throw new Exception("O campo NOME ARQUIVO não foi preenchido.");
            }
        }

        public void Salvar(Arquivo arq)
        {
            var arquivo = new ArquivoModel()
            {
                Arquivo = arq.ArquivoAnexado,
                DataCriacao = arq.DataCriacao,
                DataExclusao = null,
                IdUsuario = arq.IdUsuario,
                NomeArquivo = arq.NomeArquivo,
                IdUsuarioMedico = arq.IdUsuarioMedico,
                IndicaAprovacaoMedica = arq.IndicaCadastroMedico
            };

            this.Contexto.Add(arquivo);
            this.Contexto.SaveChanges();
        }

        public List<AnexoArquivo> BuscarArquivosEMedico(List<ArquivoModel> arquivos)
        {
            var arquivosAnexados = new List<AnexoArquivo>();

            foreach(var arquivo in arquivos)
            {
                if(arquivo.IndicaAprovacaoMedica && !arquivo.IdUsuarioMedico.IsNull())
                {
                    var medico = this.Contexto.DadosMedico.Where(usuarioMedico => usuarioMedico.IdUsuario == arquivo.IdUsuarioMedico)
                            .Include(usuario => usuario.Usuario).ToList();

                    arquivosAnexados.Add(new AnexoArquivo()
                    {
                        Arquivo = arquivo.Arquivo,
                        DataCriacao = arquivo.DataCriacao,
                        IndicaAprovacaoMedica = arquivo.IndicaAprovacaoMedica,
                        NomeArquivo = arquivo.NomeArquivo,
                        NomeMedico = medico.FirstOrDefault().Usuario.NomeUsuario,
                        IdUsuarioMedico = arquivo.IdUsuarioMedico,
                        Crm = medico.FirstOrDefault().Usuario.Login,
                        InformacoesMedico = medico  
                    });
                }
                else
                {
                    arquivosAnexados.Add(new AnexoArquivo()
                    {
                        Arquivo = arquivo.Arquivo,
                        DataCriacao = arquivo.DataCriacao,
                        IndicaAprovacaoMedica = arquivo.IndicaAprovacaoMedica,
                        NomeArquivo = arquivo.NomeArquivo,
                        IdUsuarioMedico = null
                    });
                }
            }

            return arquivosAnexados;
        }

        public List<ArquivoModel> CarregarArquivos(int idUsuario)
        {
            return this.Contexto.Arquivos.Where(arquivo => arquivo.IdUsuario == idUsuario).ToList();
        }

        public List<AnexoArquivo> CarregarArquivosSalvo(int idUsuario)
        {
            var arquivos = this.CarregarArquivos(idUsuario);

            return this.BuscarArquivosEMedico(arquivos);
        } 

        public List<ArquivoModel> CarregarSolicitacoes(int idUsuarioMedico)
        {
            return this.Contexto.Arquivos.Where(arquivo => arquivo.IdUsuarioMedico == idUsuarioMedico && arquivo.IndicaAprovacaoMedica == false)
                .Include(usuario => usuario.Usuario).ToList();
        }

        public bool AprovarSolicitacaoDocumento(int idArquivo)
        {
            var arquivo = this.Contexto.Arquivos.FirstOrDefault(arq => arq.IdArquivo == idArquivo);

            if (!arquivo.IsNull())
            {
                arquivo.IndicaAprovacaoMedica = true;

                this.Contexto.Entry(arquivo).State = EntityState.Modified;
                this.Contexto.SaveChanges();

                return true;
            }
            else
            {
                throw new Exception("Houve uma falha ao aprovar a solicitação");
            }
        }
    }
}
