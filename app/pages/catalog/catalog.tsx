import { useParams } from "react-router";
import Footer from "~/component/Footer";
import Header from "~/component/Header";
import ProductList from "~/component/ProductList";
import type { Producto } from "~/types/product";
import { useProducts } from "~/hooks/useProducts";

const normalizeCategory = (cat: string) => cat.toLowerCase().replace(/\s+/g, '-');

export default function Catalog() {
    const { products, loading, error } = useProducts();
    const { category } = useParams();


    const mapToProducto = (productoDto: any): Producto => {
        return {
            id: productoDto.id || 0,
            nombre: productoDto.nombre || 'Sin nombre',
            tipo: productoDto.tipo || 'Producto',
            precio: productoDto.precio || 0,
            colores: productoDto.colores?.length || 1,
            calificacion: 4.5,
            reseñas: Math.floor(Math.random() * 20) + 1, 
            imagen: productoDto.imagePrimary || 'https://www.staycoldapparel.com/cdn/shop/files/Jan4_ModernBerlin_Turnaround__2025-11-18T06_28_07.241_01_00.jpg',
            imagenSecundaria: productoDto.imageSecondary || 'https://www.staycoldapparel.com/cdn/shop/files/Jan1_ModernBerlin_2025-11-17T19_39_58.928_01_00.jpg',
            categoria: productoDto.catalogo || 'Sin categoría',
            descripcion: productoDto.descripcion || 'Sin descripción',
            especificaciones: productoDto.especificaciones 
                ? Object.values(productoDto.especificaciones) 
                : ['Especificación no disponible'],
            esVideo: false, 
            videoUrl: undefined
        };
    };

    const productosMapeados = products.map(mapToProducto);

    const productosFiltrados = category
        ? productosMapeados.filter(producto =>
            normalizeCategory(producto.categoria)
                .toLowerCase()
                .includes(normalizeCategory(category).toLowerCase())
          )
        : productosMapeados;

    if (loading) {
        return (
            <main className="relative w-full min-h-screen overflow-y-auto overflow-x-hidden scroll-smooth bg-gradient-to-br from-neutral-900 to-stone-800">
                <Header />
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
                    <span className="ml-3 text-white text-lg">Cargando productos...</span>
                </div>
                <Footer />
            </main>
        );
    }

    if (error) {
        return (
            <main className="relative w-full min-h-screen overflow-y-auto overflow-x-hidden scroll-smooth bg-gradient-to-br from-neutral-900 to-stone-800">
                <Header />
                <div className="flex justify-center items-center py-20">
                    <div className="text-red-400 text-center">
                        <p className="text-xl mb-2">Error al cargar productos</p>
                        <p className="text-sm">{error}</p>
                    </div>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="relative w-full min-h-screen overflow-y-auto overflow-x-hidden scroll-smooth bg-gradient-to-br from-neutral-900 to-stone-800">
            <div className="snap-center">
                <Header/>
            </div>
            <div className="snap-center">
                <ProductList 
                    productos={productosFiltrados}
                    titulo={category ? `Categoría: ${category}` : "No somos solo moda"}
                    subtitulo={category ? `Productos de ${category}` : "Descubre los mejores productos del mercado"}
                />
            </div>
            <div className="snap-center">
                <Footer/>
            </div>
        </main>
    );
}