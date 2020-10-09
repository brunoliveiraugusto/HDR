using HDR.Context;
using HDR.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace HDR.Models
{
    [Table("ARQUIVO")]
    public class ArquivoModel
    {
        private readonly IContextRepository _context;

        public ArquivoModel() : this(new Contexto()) { }

        public ArquivoModel(IContextRepository context)
        {
            _context = context;
        }

        [Key, Column("ID_ARQUIVO")]
        public int IdArquivo { get; set; }

        [Column("ARQUIVO")]
        public string Arquivo { get; set; }

        [Column("NOME_ARQUIVO")]
        public string NomeArquivo { get; set; }

        [Column("DATA_CRIACAO")]
        public DateTime DataCriacao { get; set; }

        [Column("DATA_EXCLUSAO")]
        public DateTime? DataExclusao { get; set; }

        [Column("ID_USUARIO_MEDICO")]
        public int? IdUsuarioMedico { get; set; }

        [Column("INDICA_APROVACAO_MEDICA")]
        public bool IndicaAprovacaoMedica { get; set; }

        [Column("ID_USUARIO"), ForeignKey("Usuario")]
        public int IdUsuario { get; set; }

        public virtual UsuarioModel Usuario { get; set; }

        public List<ArquivoModel> CarregarArquivosComSolicitacoesNaoAprovadas(int idUsuarioMedico)
        {
            return this._context.Arquivos.Where(arquivo => arquivo.IdUsuarioMedico == idUsuarioMedico && arquivo.IndicaAprovacaoMedica == false)
                .Include(usuario => usuario.Usuario).ToList();
        }

        public ArquivoModel CarregarArquivoEspecifico(int idArquivo)
        {
            return this._context.Arquivos.FirstOrDefault(arq => arq.IdArquivo == idArquivo);
        }
    }
}
