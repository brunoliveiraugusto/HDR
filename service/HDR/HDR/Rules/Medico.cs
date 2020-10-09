using HDR.Context;
using HDR.Generics;
using HDR.Interfaces;
using HDR.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HDR.Rules
{
    public class Medico
    {
        private readonly IContextRepository _context;

        public int IdMedico { get; set; }
        public string NomeCompleto { get; set; }
        public string Crm { get; set; }
        public List<InformacoesTrabalho> InformacoesTrabalhoMedico { get; set; }

        public Medico() : this(new Contexto()) { }

        public Medico(IContextRepository context)
        {
            _context = context;
        }

        public List<AnexoArquivo> IncluirMedicosResponsaveis(List<ArquivoModel> arquivos)
        {
            var arquivosAnexados = new List<AnexoArquivo>();

            foreach (var arquivo in arquivos)
            {
                if (arquivo.IndicaAprovacaoMedica && !arquivo.IdUsuarioMedico.IsNull())
                {
                    var medico = this.CarregarDadosMedico(arquivo);

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

        public List<DadosMedicoModel> CarregarDadosMedico(ArquivoModel arquivo)
        {
            return _context.DadosMedico.Where(usuarioMedico => usuarioMedico.IdUsuario == arquivo.IdUsuarioMedico)
                                .Include(usuario => usuario.Usuario).ToList();
        }

        public List<AnexoArquivo> AdicionarMedicosResponsaveisPorArquivo(int idUsuario)
        {
            var arquivos = new Arquivo(_context).CarregarArquivos(idUsuario);
            return this.IncluirMedicosResponsaveis(arquivos);
        }
    }
}
