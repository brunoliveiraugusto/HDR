using HDR.Interfaces;
using HDR.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HDR.Context
{
    public class Contexto : DbContext, IContextRepository
    {
        private readonly DbContext _context;

        public Contexto() : this(new Contexto()) { }

        public Contexto(DbContext context)
        {
            _context = context;
        }

        public Contexto(DbContextOptions options) : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=(localdb)\\HDRDB");
        }

        public DbSet<UsuarioModel> Usuarios { get; set; }
        public DbSet<ChaveModel> Chaves { get; set; }
        public DbSet<ArquivoModel> Arquivos { get; set; }
        public DbSet<DadosMedicoModel> DadosMedico { get; set; }
        public DbSet<ConsultaModel> Consultas { get; set; }

        public void Save<T>(T model, EntityState state) where T : class
        {
            if(state == EntityState.Added)
            {
                _context.Add(model);
                _context.SaveChanges();
            } 
            else
            {
                throw new ArgumentException("Estado de entidade inválido para a função invocada.");
            }
        }

        public void Update<T>(T model, EntityState state) where T : class
        {
            if (state == EntityState.Modified)
            {
                _context.Add(model).State = state;
                _context.SaveChanges();
            }
            else
            {
                throw new ArgumentException("Estado de entidade inválido para a função invocada.");
            }
        }

        public void Delete<T>(T model, EntityState state) where T : class
        {
            if (state == EntityState.Deleted)
            {
                _context.Remove(model);
                _context.SaveChanges();
            }
            else
            {
                throw new ArgumentException("Estado de entidade inválido para a função invocada.");
            }
        }
    }
}
