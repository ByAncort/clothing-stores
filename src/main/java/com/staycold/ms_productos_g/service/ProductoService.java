package com.staycold.ms_productos_g.service;

import com.staycold.ms_productos_g.model.Producto;
import com.staycold.ms_productos_g.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository repositorio;

    public List<Producto> listarProductos() {
        return repositorio.findAll();
    }

    public Producto guardarProducto(Producto producto) {
        return repositorio.save(producto);
    }

    public Producto obtenerPorId(Long id) {
        return repositorio.findById(id).orElse(null);
    }

    public void eliminarProducto(Long id) {
        repositorio.deleteById(id);
    }
}