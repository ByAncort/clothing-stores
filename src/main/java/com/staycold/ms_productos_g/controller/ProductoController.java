package com.staycold.ms_productos_g.controller;

import com.staycold.ms_productos_g.model.Producto;
import com.staycold.ms_productos_g.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {

    @Autowired
    private ProductoService servicio;

    @GetMapping
    public List<Producto> listar() {
        return servicio.listarProductos();
    }

    @PostMapping
    public Producto guardar(@RequestBody Producto producto) {
        return servicio.guardarProducto(producto);
    }

    @GetMapping("/{id}")
    public Producto obtener(@PathVariable Long id) {
        return servicio.obtenerPorId(id);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        servicio.eliminarProducto(id);
    }
}