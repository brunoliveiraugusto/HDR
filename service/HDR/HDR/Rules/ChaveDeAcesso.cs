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
    public class ChaveDeAcesso
    {
        private readonly IContextRepository _context;
        private static Random random = new Random();

        public ChaveDeAcesso() : this(new Contexto()) { }

        public ChaveDeAcesso(IContextRepository context)
        {
            _context = context;
        }

        public string GerarChaveMedico(int idUsuario)
        {
            if (idUsuario <= 0)
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
            var chavesAtivas = new ChaveModel(_context).CarregarChaveAtivaPorUsuario(idUsuario);

            if (chavesAtivas.Count() > 0)
            {
                foreach (var chave in chavesAtivas)
                {
                    chave.IndicaChaveAtiva = false;
                    chave.DataCancelamento = DateTime.Now;

                    _context.Update(chave, EntityState.Modified);
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

                var chaveExistente = new ChaveModel(_context).IndicaChaveExistente(chaveGerada);

                if (chaveExistente)
                    continue;
                else if (!chaveExistente && chaveGerada.Length == 8)
                    break;
            }

            return chaveGerada;
        }

        public void SalvarChaveGerada(int idUsuario, string chaveGerada)
        {
            var chave = new ChaveModel()
            {
                IdUsuario = idUsuario,
                ChaveAcesso = chaveGerada,
                DataCriacao = DateTime.Now,
                IndicaChaveAtiva = true
            };

            chave.Salvar(chave);
        }

        public int ValidarChaveAcesso(string chave)
        {
            if (chave.IsNullOrEmpty())
            {
                throw new Exception("A chave de acesso não foi informada.");
            }

            var chaveAcesso = new ChaveModel(_context).CarregarChaveAtivaPorChaveDeAcesso(chave);

            if (!chaveAcesso.IsNull())
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
            chave.InativarChave(chave);
        }
    }
}
