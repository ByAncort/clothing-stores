-- EJEMPLO CORRECTO: Usando las dos columnas separadas por coma

-- Producto 1: Polera (Tiene foto normal y foto para el hover distintas)
INSERT INTO productos (nombre, marca, descripcion, precio, stock, categoria, sku, imagen_url, imagen_secundaria_url)
VALUES ('Urban Tee White', 'StayCold', 'Corte oversize.', 29.99, 50, 'Poleras', 'TEE-001', '/images/polera2.jpg', '/images/polera2-hover.jpg');

-- Producto 2: Chaqueta (Tiene dos fotos distintas)
INSERT INTO productos (nombre, marca, descripcion, precio, stock, categoria, sku, imagen_url, imagen_secundaria_url)
VALUES ('Denim Jacket Pro', 'UrbanStyle', 'Estilo clásico.', 65.00, 20, 'Chaquetas', 'JKT-005', '/images/bomber1.jpg', '/images/bomber1-back.jpg');

-- Producto 3: Hoodie (Si SOLO tienes una foto, repite la misma ruta en ambos campos)
INSERT INTO productos (nombre, marca, descripcion, precio, stock, categoria, sku, imagen_url, imagen_secundaria_url)
VALUES ('Black Hoodie', 'StayCold', 'Cómodo.', 45.50, 30, 'Hoodies', 'HOOD-009', '/images/hoodie-black.jpg', '/images/hoodie-black.jpg');

-- Accesorio
INSERT INTO productos (nombre, marca, descripcion, precio, stock, categoria, sku, imagen_url, imagen_secundaria_url)
VALUES ('Bolso Tatto', 'TattoCo', 'Piel japonesa.', 15.00, 100, 'Accesorios', 'ACC-002', '/images/bag-main.jpg', '/images/bag-side.jpg');