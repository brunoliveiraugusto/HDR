using HDR.Models;
using Microsoft.EntityFrameworkCore;

namespace HDR.Interfaces
{
    public interface IContextRepository
    {
        DbSet<UsuarioModel> Usuarios { get; set; }
        DbSet<ChaveModel> Chaves { get; set; }
        DbSet<ArquivoModel> Arquivos { get; set; }
        DbSet<DadosMedicoModel> DadosMedico { get; set; }
        DbSet<ConsultaModel> Consultas { get; set; }

        void Save<T>(T model, EntityState state) where T : class;
        void Update<T>(T model, EntityState state) where T : class;
        void Delete<T>(T model, EntityState state) where T : class;
    }
}
