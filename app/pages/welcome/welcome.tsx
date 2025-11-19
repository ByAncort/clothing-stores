
import AreasMain from "~/component/AreasMain";
import HeroSection from "~/component/HeroSelection";
import Header from "~/component/Header";
import ClientCarousel from "~/component/ClientCarousel";
import CardVentas from "~/component/CardVentas";
import Footer from "~/component/Footer";

import type { Producto } from "~/types/product";
import Mosaico from "~/component/Mosaico";
import { cartService } from "~/service/CartService";
import { useLocalStorage } from "~/hooks/useLocalStorage";
import { useProducts } from "~/hooks/useProducts";
import { useParams } from "react-router";




export function Welcome() {
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


    const productosMasVendidos = products.map(mapToProducto);

  if (loading) {
    return (
      <main className="relative w-full h-screen overflow-y-auto overflow-x-hidden scroll-smooth bg-gradient-to-br from-neutral-900 to-stone-800">
        <div className="flex justify-center items-center h-full">
          <div className="text-white">Cargando...</div>
        </div>
      </main>
    );
  }

  return (
    
    <main className=" relative w-full h-screen overflow-y-auto overflow-x-hidden scroll-smooth bg-gradient-to-br from-neutral-900 to-stone-800
">
      <div className="snap-center">
        <HeroSection />
      </div>
      <div className="snap-center">
        <AreasMain />
      </div>
      <div className="snap-center">
        <Header />
      </div>
      <div className="snap-center max-w-[1600px] mx-auto">
        <CardVentas productos={productosMasVendidos} />
      </div>
      <div className="snap-center mt-12 max-w-[1600px] mx-auto">
        <Mosaico/>
      </div>
      <div className="snap-center">
      </div>
      <div className="snap-center">
        <Footer />
      </div>
    </main>
  );
}