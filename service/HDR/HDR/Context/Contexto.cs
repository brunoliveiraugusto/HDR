﻿using HDR.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HDR.Context
{
    public class Contexto : DbContext
    {
        public Contexto() { }

        public Contexto(DbContextOptions options) : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=(localdb)\\HDRDB");
        }

        public DbSet<UsuarioModel> Usuarios { get; set; }
        public DbSet<AcessoMedicoModel> AcessoMedicos { get; set; }

    }
}
