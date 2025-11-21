package com.staycold.ms_productos_g.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "productos")
@Data               // 1. Crea Getters, Setters, toString, etc. automáticamente
@AllArgsConstructor // 2. Crea el constructor con todos los argumentos
@NoArgsConstructor  // 3. Crea el constructor vacío
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    private String marca;

    @Column(length = 500)
    private String descripcion;

    private Double precio;

    private Integer stock;

    private String categoria;

    @Column(unique = true)
    private String sku;

    // --- TUS IMÁGENES ---

    @Column(name = "imagen_url")
    private String imagenUrl;

    @Column(name = "imagen_secundaria_url")
    private String imagenSecundariaUrl;

    // ¡Y listo! No escribas nada más abajo. Lombok hace el resto.
}