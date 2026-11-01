using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ClientesAPI.Models
{
    [Table("clientes")]
    public class Cliente
    {
        [Key]
        [Column("Id_cliente")]
        public int IdCliente { get; set; }

        [Required]
        [StringLength(13)]
        public string CUI { get; set; } = string.Empty;

        [Required]
        [StringLength(15)]
        public string NIT { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string Nombres { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string Apellidos { get; set; } = string.Empty;

        [StringLength(250)]
        [Column("Direccion")]
        public string? Direccion { get; set; }

        [StringLength(20)]
        [Column("Telefono")]
        public string? Telefono { get; set; }

        [Required]
        [Column("Fecha_Nacimiento")]
        public DateTime FechaNacimiento { get; set; }
    }
}