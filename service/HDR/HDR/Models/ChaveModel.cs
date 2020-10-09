using HDR.Interfaces;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using HDR.Context;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace HDR.Models
{
    [Table("CHAVE")]
    public class ChaveModel : IModel
    {
        private readonly IContextRepository _context;

        [Key, Column("ID_CHAVE")]
        public int IdChave { get; set; }

        [Column("CHAVE_ACESSO")]
        public string ChaveAcesso { get; set; }

        [Column("DATA_CRIACAO")]
        public DateTime DataCriacao { get; set; }

        [Column("DATA_CANCELAMENTO")]
        public DateTime? DataCancelamento { get; set; }

        [Column("ID_USUARIO"), ForeignKey("Usuario")]
        public int IdUsuario { get; set; }

        [Column("INDICA_CHAVE_ATIVA")]
        public bool IndicaChaveAtiva { get; set; }

        public virtual UsuarioModel Usuario { get; set; }

        public ChaveModel() : this(new Contexto()) { }

        public ChaveModel(IContextRepository context)
        {
            _context = context;
        }

        public List<ChaveModel> CarregarChaveAtivaPorUsuario(int idUsuario)
        {
            return _context.Chaves.Where(chaveAcesso => chaveAcesso.IdUsuario == idUsuario && chaveAcesso.IndicaChaveAtiva).ToList();
        }

        public bool IndicaChaveExistente(string chaveGerada)
        {
            return _context.Chaves.Any(chave => chave.ChaveAcesso == chaveGerada);
        }

        public void Salvar(IModel chave)
        {
            _context.Save(chave, EntityState.Added);
        }

        public ChaveModel CarregarChaveAtivaPorChaveDeAcesso(string chave)
        {
            return _context.Chaves.Where(key => key.IndicaChaveAtiva && key.ChaveAcesso == chave).FirstOrDefault();
        }

        public void InativarChave(ChaveModel chave)
        {
            _context.Update(chave, EntityState.Modified);
        }
    }
}
