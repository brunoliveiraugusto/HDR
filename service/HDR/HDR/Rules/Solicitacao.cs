using HDR.Generics;
using HDR.Interfaces;
using HDR.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace HDR.Rules
{
    public class Solicitacao
    {
        public readonly IContextRepository _context;

        public Solicitacao(IContextRepository context)
        {
            _context = context;
        }

        public List<ArquivoModel> CarregarSolicitacoes(int idUsuarioMedico)
        {
            return new ArquivoModel(_context).CarregarArquivosComSolicitacoesNaoAprovadas(idUsuarioMedico);
        }

        public bool AprovarSolicitacaoDocumento(int idArquivo)
        {
            var arquivo = new ArquivoModel(_context).CarregarArquivoEspecifico(idArquivo);

            if (!arquivo.IsNull())
            {
                arquivo.IndicaAprovacaoMedica = true;

                this._context.Update(arquivo, EntityState.Modified);
                
                return true;
            }
            else
            {
                throw new Exception("Houve uma falha ao aprovar a solicitação");
            }
        }
    }
}
