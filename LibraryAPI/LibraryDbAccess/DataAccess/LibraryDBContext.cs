using System;
using System.Collections.Generic;
using LibraryDbAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;

namespace LibraryDbAccess
{
    public partial class LibraryDBContext : DbContext
    {
        public LibraryDBContext()
        {
        }

        public LibraryDBContext(DbContextOptions<LibraryDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Author> Authors { get; set; } = null!;
        public virtual DbSet<Book> Books { get; set; } = null!;
        public virtual DbSet<Borrowing> Borrowings { get; set; } = null!;
        public virtual DbSet<Category> Categories { get; set; } = null!;
        public virtual DbSet<PublishingHouse> PublishingHouses { get; set; } = null!;
        public virtual DbSet<Reservation> Reservations { get; set; } = null!;
        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) 
        {
            if (!optionsBuilder.IsConfigured)
            {
                IConfigurationRoot configuration = new ConfigurationBuilder()
                   .SetBasePath(Directory.GetCurrentDirectory())
                   .AddJsonFile("appsettings.json")
                   .Build();
                var connectionString = configuration.GetConnectionString("connectionString");
                optionsBuilder.UseSqlServer(connectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Author>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.AuthorName).HasMaxLength(30);
            });

            modelBuilder.Entity<Book>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.BookDescription).HasMaxLength(30);

                entity.Property(e => e.IdAuthor).HasColumnName("ID_Author");

                entity.Property(e => e.IdCategory).HasColumnName("ID_Category");

                entity.Property(e => e.IdPublishingHouse).HasColumnName("ID_PublishingHouse");

                entity.Property(e => e.Title).HasMaxLength(30);

                entity.HasOne(d => d.IdAuthorNavigation)
                    .WithMany(p => p.Books)
                    .HasForeignKey(d => d.IdAuthor)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Books__ID_Author__300424B4");

                entity.HasOne(d => d.IdCategoryNavigation)
                    .WithMany(p => p.Books)
                    .HasForeignKey(d => d.IdCategory)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Books__ID_Catego__30F848ED");

                entity.HasOne(d => d.IdPublishingHouseNavigation)
                    .WithMany(p => p.Books)
                    .HasForeignKey(d => d.IdPublishingHouse)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Books__ID_Publis__2F10007B");
            });

            modelBuilder.Entity<Borrowing>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.DateOfBorrowing).HasColumnType("date");

                entity.Property(e => e.DateOfReturning).HasColumnType("date");

                entity.Property(e => e.IdBook).HasColumnName("ID_Book");

                entity.Property(e => e.IdBorrowingEmployee).HasColumnName("ID_BorrowingEmployee");

                entity.Property(e => e.IdClient).HasColumnName("ID_Client");

                entity.Property(e => e.IdPuttingEmployee).HasColumnName("ID_PuttingEmployee");

                entity.HasOne(d => d.IdBookNavigation)
                    .WithMany(p => p.Borrowings)
                    .HasForeignKey(d => d.IdBook)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Borrowing__ID_Bo__34C8D9D1");

                entity.HasOne(d => d.IdBorrowingEmployeeNavigation)
                    .WithMany(p => p.BorrowingIdBorrowingEmployeeNavigations)
                    .HasForeignKey(d => d.IdBorrowingEmployee)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Borrowing__ID_Bo__35BCFE0A");

                entity.HasOne(d => d.IdClientNavigation)
                    .WithMany(p => p.BorrowingIdClientNavigations)
                    .HasForeignKey(d => d.IdClient)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Borrowing__ID_Cl__33D4B598");

                entity.HasOne(d => d.IdPuttingEmployeeNavigation)
                    .WithMany(p => p.BorrowingIdPuttingEmployeeNavigations)
                    .HasForeignKey(d => d.IdPuttingEmployee)
                    .HasConstraintName("FK__Borrowing__ID_Pu__36B12243");
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.CategoryName).HasMaxLength(30);
            });

            modelBuilder.Entity<PublishingHouse>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.PublishingName).HasMaxLength(30);
            });

            modelBuilder.Entity<Reservation>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.BookingDate).HasColumnType("date");

                entity.Property(e => e.IdBook).HasColumnName("ID_Book");

                entity.Property(e => e.IdClient).HasColumnName("ID_Client");

                entity.HasOne(d => d.IdBookNavigation)
                    .WithMany(p => p.Reservations)
                    .HasForeignKey(d => d.IdBook)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Reservati__ID_Bo__398D8EEE");

                entity.HasOne(d => d.IdClientNavigation)
                    .WithMany(p => p.Reservations)
                    .HasForeignKey(d => d.IdClient)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Reservati__ID_Cl__3A81B327");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.RoleName).HasMaxLength(30);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Email).HasMaxLength(30);

                entity.Property(e => e.IdRole).HasColumnName("ID_Role");

                entity.Property(e => e.Passwd).HasMaxLength(30);

                entity.Property(e => e.UserName).HasMaxLength(30);

                entity.HasOne(d => d.IdRoleNavigation)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.IdRole)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Users__ID_Role__267ABA7A");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
