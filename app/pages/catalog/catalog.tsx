import { useParams } from "react-router";
import Footer from "~/component/Footer";
import Header from "~/component/Header";
import ProductList from "~/component/ProductList";
import type { Producto } from "~/types/product";

export default function Catalog() { // Cambié export function Catalog por export default
    const todosLosProductos: Producto[] = [
      {
        id: 1,
        nombre: "Dead Bloom (Acid) - Oversized Hoodie",
        tipo: "Oversized Hoodie",
        precio: 119.90,
        colores: 1,
        calificacion: 5,
        reseñas: 2,
        imagen: "https://www.staycoldapparel.com/cdn/shop/files/DeadBloom_Acid_-OversizedHoodie_350GSM_7.jpg?v=1740387119&width=600",
        imagenSecundaria: "https://www.staycoldapparel.com/cdn/shop/files/DeadBloom_Acid_-OversizedHoodie_350GSM_4.jpg",
        categoria: "Hoodies",
        descripcion: "Hoodie oversized de alta calidad 350GSM con diseño acid wash",
        especificaciones: ["350GSM", "Algodón premium", "Corte oversized"],
        esVideo: false
      },
      {
        id: 2,
        nombre: "Storm (Camo) - Shades",
        tipo: "Shades",
        precio: 59.90,
        colores: 1,
        calificacion: 5,
        reseñas: 5,
        imagen: "https://www.staycoldapparel.com/cdn/shop/files/NocturnalOath-OversizedT-Shirt_allover_200GSM10.jpg",
        imagenSecundaria: "https://www.staycoldapparel.com/cdn/shop/files/NocturnalOath-OversizedT-Shirt_allover_200GSM1.jpg",
        categoria: "Accessories",
        descripcion: "Gafas de sol con diseño camo y protección UV",
        especificaciones: ["Protección UV400", "Estilo camo", "Marco durable"],
        esVideo: true,
        videoUrl: "https://www.staycoldapparel.com/cdn/shop/videos/c/vp/b4beec1ab7a94300af9bf9f6d8dcbed0/b4beec1ab7a94300af9bf9f6d8dcbed0.HD-1080p-7.2Mbps-54540614.mp4?v=0"
      },
      {
        id: 3,
        nombre: "Think Twice - Oversized T-Shirt",
        tipo: "Oversized T-Shirt",
        precio: 49.90,
        colores: 3,
        calificacion: 4.5,
        reseñas: 7,
        imagen: "https://www.staycoldapparel.com/cdn/shop/files/ReignOfBloodGreyEdition-HeavyOversizedHoodie_400GSM_2_fcf8ddaa-ac2c-466d-a99b-851f4cc90413.jpg",
        imagenSecundaria: "https://www.staycoldapparel.com/cdn/shop/files/ReignOfBloodGreyEdition-HeavyOversizedHoodie_400GSM_5_b4fb4203-b74f-4fcb-beb0-73b9a6580af9.jpg",
        categoria: "T-Shirts",
        descripcion: "Camiseta oversized con estampado minimalista",
        especificaciones: ["200GSM", "Corte oversized", "Estampado duradero"],
        esVideo: false
      },
      {
        id: 4,
        nombre: "Reign of Blood - Heavy Oversized Hoodie",
        tipo: "Oversized Hoodie",
        precio: 119.90,
        colores: 2,
        calificacion: 5,
        reseñas: 3,
        imagen: "https://www.staycoldapparel.com/cdn/shop/files/Grimfall_HalfHalf_-CargoShort_260GSM_3copy-2.jpg",
        imagenSecundaria: "https://www.staycoldapparel.com/cdn/shop/files/Grimfall_HalfHalf_-CargoShort_260GSM_20-2.jpg",
        categoria: "Hoodies",
        descripcion: "Hoodie heavy weight 400GSM edición limitada",
        especificaciones: ["400GSM", "Edición limitada", "Material heavy weight"],
        esVideo: true,
        videoUrl: "https://www.staycoldapparel.com/cdn/shop/videos/c/vp/b4beec1ab7a94300af9bf9f6d8dcbed0/b4beec1ab7a94300af9bf9f6d8dcbed0.HD-1080p-7.2Mbps-54540614.mp4?v=0"
      },
      {
        id: 5,
        nombre: "Nocturnal Oath - All Over Print T-Shirt",
        tipo: "Oversized T-Shirt",
        precio: 54.90,
        colores: 2,
        calificacion: 4.8,
        reseñas: 12,
        imagen: "https://www.staycoldapparel.com/cdn/shop/files/NocturnalOath-OversizedT-Shirt_allover_200GSM10.jpg",
        imagenSecundaria: "https://www.staycoldapparel.com/cdn/shop/files/NocturnalOath-OversizedT-Shirt_allover_200GSM1.jpg",
        categoria: "T-Shirts",
        descripcion: "Camiseta all over print con diseño nocturno",
        especificaciones: ["All over print", "200GSM", "Estampado completo"],
        esVideo: false
      },
      {
        id: 6,
        nombre: "Grimfall Half Half - Cargo Short",
        tipo: "Cargo Short",
        precio: 79.90,
        colores: 1,
        calificacion: 4.7,
        reseñas: 8,
        imagen: "https://www.staycoldapparel.com/cdn/shop/files/Grimfall_HalfHalf_-CargoShort_260GSM_3copy-2.jpg",
        imagenSecundaria: "https://www.staycoldapparel.com/cdn/shop/files/Grimfall_HalfHalf_-CargoShort_260GSM_20-2.jpg",
        categoria: "Shorts",
        descripcion: "Shorts cargo con diseño half half y múltiples bolsillos",
        especificaciones: ["260GSM", "Bolsillos cargo", "Diseño half half"],
        esVideo: true,
        videoUrl: "https://www.staycoldapparel.com/cdn/shop/videos/c/vp/5a6bbbf2c809463f951eff003385883d/5a6bbbf2c809463f951eff003385883d.HD-1080p-7.2Mbps-55013587.mp4?v=0"
      },
      {
        id: 7,
        nombre: "Shadow Realm - Beanie",
        tipo: "Beanie",
        precio: 34.90,
        colores: 4,
        calificacion: 4.9,
        reseñas: 15,
        imagen: "https://www.staycoldapparel.com/cdn/shop/files/EternalConquestBag3.jpg?crop=center&height=800&v=1731339655&width=600",
        imagenSecundaria: "https://www.staycoldapparel.com/cdn/shop/files/EternalConquestBag8.jpg?v=1731339655&width=600",
        categoria: "Accessories",
        descripcion: "Gorro beanie de lana merino con logo bordado",
        especificaciones: ["Lana merino", "Logo bordado", "Ajuste perfecto"],
        esVideo: false
      },
      {
        id: 8,
        nombre: "Eternal Night - Jogger Pants",
        tipo: "Jogger Pants",
        precio: 89.90,
        colores: 3,
        calificacion: 4.6,
        reseñas: 6,
        imagen: "https://www.staycoldapparel.com/cdn/shop/files/DoomDrifterRealtree-DistressedBaseballCap_camo_11.jpg?crop=center&height=800&v=1758526548&width=600",
        imagenSecundaria: "https://www.staycoldapparel.com/cdn/shop/files/DoomDrifterRealtree-DistressedBaseballCap_camo_22.jpg?v=1758526548&width=600",
        categoria: "Jackets",
        descripcion: "Pantalones jogger con cintura elástica y ajuste tapered",
        especificaciones: ["Cintura elástica", "Ajuste tapered", "Tela stretch"],
        esVideo: false
      },
      {
        id: 9,
        nombre: "Urban Classic - T-Shirt",
        tipo: "Oversized T-Shirt",
        precio: 39.90,
        colores: 3,
        calificacion: 4.6,
        reseñas: 6,
        imagen: "https://www.staycoldapparel.com/cdn/shop/files/DoomDrifterRealtree-DistressedBaseballCap_camo_11.jpg?crop=center&height=800&v=1758526548&width=600",
        imagenSecundaria: "https://www.staycoldapparel.com/cdn/shop/files/DoomDrifterRealtree-DistressedBaseballCap_camo_22.jpg?v=1758526548&width=600",
        categoria: "T-Shirts",
        descripcion: "Camiseta clásica urbana con diseño moderno",
        especificaciones: ["Algodón 100%", "Corte regular", "Calidad premium"],
        esVideo: false
      },
      {
        id: 10,
        nombre: "Winter King - Heavy Hoodie",
        tipo: "Oversized Hoodie",
        precio: 129.90,
        colores: 2,
        calificacion: 4.8,
        reseñas: 9,
        imagen: "https://www.staycoldapparel.com/cdn/shop/files/DoomDrifterRealtree-DistressedBaseballCap_camo_11.jpg?crop=center&height=800&v=1758526548&width=600",
        imagenSecundaria: "https://www.staycoldapparel.com/cdn/shop/files/DoomDrifterRealtree-DistressedBaseballCap_camo_22.jpg?v=1758526548&width=600",
        categoria: "Hoodies",
        descripcion: "Hoodie heavy para invierno con protección térmica",
        especificaciones: ["450GSM", "Forro polar", "Protección térmica"],
        esVideo: false
      },
      {
        id: 1,
        nombre: "Dead Bloom (Acid) - Oversized Hoodie",
        tipo: "Oversized Hoodie",
        precio: 119.90,
        colores: 1,
        calificacion: 5,
        reseñas: 2,
        imagen: "https://www.staycoldapparel.com/cdn/shop/files/DeadBloom_Acid_-OversizedHoodie_350GSM_7.jpg?v=1740387119&width=600",
        imagenSecundaria: "https://www.staycoldapparel.com/cdn/shop/files/DeadBloom_Acid_-OversizedHoodie_350GSM_4.jpg",
        categoria: "Hoodies",
        descripcion: "Hoodie oversized de alta calidad 350GSM con diseño acid wash",
        especificaciones: ["350GSM", "Algodón premium", "Corte oversized"],
        esVideo: false
      },
      {
        id: 2,
        nombre: "Storm (Camo) - Shades",
        tipo: "Shades",
        precio: 59.90,
        colores: 1,
        calificacion: 5,
        reseñas: 5,
        imagen: "https://www.staycoldapparel.com/cdn/shop/files/NocturnalOath-OversizedT-Shirt_allover_200GSM10.jpg",
        imagenSecundaria: "https://www.staycoldapparel.com/cdn/shop/files/NocturnalOath-OversizedT-Shirt_allover_200GSM1.jpg",
        categoria: "Accessories",
        descripcion: "Gafas de sol con diseño camo y protección UV",
        especificaciones: ["Protección UV400", "Estilo camo", "Marco durable"],
        esVideo: true,
        videoUrl: "https://www.staycoldapparel.com/cdn/shop/videos/c/vp/b4beec1ab7a94300af9bf9f6d8dcbed0/b4beec1ab7a94300af9bf9f6d8dcbed0.HD-1080p-7.2Mbps-54540614.mp4?v=0"
      },
      {
        id: 3,
        nombre: "Think Twice - Oversized T-Shirt",
        tipo: "Oversized T-Shirt",
        precio: 49.90,
        colores: 3,
        calificacion: 4.5,
        reseñas: 7,
        imagen: "https://www.staycoldapparel.com/cdn/shop/files/ReignOfBloodGreyEdition-HeavyOversizedHoodie_400GSM_2_fcf8ddaa-ac2c-466d-a99b-851f4cc90413.jpg",
        imagenSecundaria: "https://www.staycoldapparel.com/cdn/shop/files/ReignOfBloodGreyEdition-HeavyOversizedHoodie_400GSM_5_b4fb4203-b74f-4fcb-beb0-73b9a6580af9.jpg",
        categoria: "T-Shirts",
        descripcion: "Camiseta oversized con estampado minimalista",
        especificaciones: ["200GSM", "Corte oversized", "Estampado duradero"],
        esVideo: false
      },
      {
        id: 4,
        nombre: "Reign of Blood - Heavy Oversized Hoodie",
        tipo: "Oversized Hoodie",
        precio: 119.90,
        colores: 2,
        calificacion: 5,
        reseñas: 3,
        imagen: "https://www.staycoldapparel.com/cdn/shop/files/Grimfall_HalfHalf_-CargoShort_260GSM_3copy-2.jpg",
        imagenSecundaria: "https://www.staycoldapparel.com/cdn/shop/files/Grimfall_HalfHalf_-CargoShort_260GSM_20-2.jpg",
        categoria: "Hoodies",
        descripcion: "Hoodie heavy weight 400GSM edición limitada",
        especificaciones: ["400GSM", "Edición limitada", "Material heavy weight"],
        esVideo: true,
        videoUrl: "https://www.staycoldapparel.com/cdn/shop/videos/c/vp/b4beec1ab7a94300af9bf9f6d8dcbed0/b4beec1ab7a94300af9bf9f6d8dcbed0.HD-1080p-7.2Mbps-54540614.mp4?v=0"
      },
      {
        id: 5,
        nombre: "Nocturnal Oath - All Over Print T-Shirt",
        tipo: "Oversized T-Shirt",
        precio: 54.90,
        colores: 2,
        calificacion: 4.8,
        reseñas: 12,
        imagen: "https://www.staycoldapparel.com/cdn/shop/files/NocturnalOath-OversizedT-Shirt_allover_200GSM10.jpg",
        imagenSecundaria: "https://www.staycoldapparel.com/cdn/shop/files/NocturnalOath-OversizedT-Shirt_allover_200GSM1.jpg",
        categoria: "T-Shirts",
        descripcion: "Camiseta all over print con diseño nocturno",
        especificaciones: ["All over print", "200GSM", "Estampado completo"],
        esVideo: false
      },
      {
        id: 6,
        nombre: "Grimfall Half Half - Cargo Short",
        tipo: "Cargo Short",
        precio: 79.90,
        colores: 1,
        calificacion: 4.7,
        reseñas: 8,
        imagen: "https://www.staycoldapparel.com/cdn/shop/files/Grimfall_HalfHalf_-CargoShort_260GSM_3copy-2.jpg",
        imagenSecundaria: "https://www.staycoldapparel.com/cdn/shop/files/Grimfall_HalfHalf_-CargoShort_260GSM_20-2.jpg",
        categoria: "Shorts",
        descripcion: "Shorts cargo con diseño half half y múltiples bolsillos",
        especificaciones: ["260GSM", "Bolsillos cargo", "Diseño half half"],
        esVideo: true,
        videoUrl: "https://www.staycoldapparel.com/cdn/shop/videos/c/vp/5a6bbbf2c809463f951eff003385883d/5a6bbbf2c809463f951eff003385883d.HD-1080p-7.2Mbps-55013587.mp4?v=0"
      },
      {
        id: 7,
        nombre: "Shadow Realm - Beanie",
        tipo: "Beanie",
        precio: 34.90,
        colores: 4,
        calificacion: 4.9,
        reseñas: 15,
        imagen: "https://www.staycoldapparel.com/cdn/shop/files/EternalConquestBag3.jpg?crop=center&height=800&v=1731339655&width=600",
        imagenSecundaria: "https://www.staycoldapparel.com/cdn/shop/files/EternalConquestBag8.jpg?v=1731339655&width=600",
        categoria: "Accessories",
        descripcion: "Gorro beanie de lana merino con logo bordado",
        especificaciones: ["Lana merino", "Logo bordado", "Ajuste perfecto"],
        esVideo: false
      },
      {
        id: 8,
        nombre: "Eternal Night - Jogger Pants",
        tipo: "Jogger Pants",
        precio: 89.90,
        colores: 3,
        calificacion: 4.6,
        reseñas: 6,
        imagen: "https://www.staycoldapparel.com/cdn/shop/files/DoomDrifterRealtree-DistressedBaseballCap_camo_11.jpg?crop=center&height=800&v=1758526548&width=600",
        imagenSecundaria: "https://www.staycoldapparel.com/cdn/shop/files/DoomDrifterRealtree-DistressedBaseballCap_camo_22.jpg?v=1758526548&width=600",
        categoria: "Jackets",
        descripcion: "Pantalones jogger con cintura elástica y ajuste tapered",
        especificaciones: ["Cintura elástica", "Ajuste tapered", "Tela stretch"],
        esVideo: false
      },
      {
        id: 9,
        nombre: "Urban Classic - T-Shirt",
        tipo: "Oversized T-Shirt",
        precio: 39.90,
        colores: 3,
        calificacion: 4.6,
        reseñas: 6,
        imagen: "https://www.staycoldapparel.com/cdn/shop/files/DoomDrifterRealtree-DistressedBaseballCap_camo_11.jpg?crop=center&height=800&v=1758526548&width=600",
        imagenSecundaria: "https://www.staycoldapparel.com/cdn/shop/files/DoomDrifterRealtree-DistressedBaseballCap_camo_22.jpg?v=1758526548&width=600",
        categoria: "T-Shirts",
        descripcion: "Camiseta clásica urbana con diseño moderno",
        especificaciones: ["Algodón 100%", "Corte regular", "Calidad premium"],
        esVideo: false
      },
      {
        id: 10,
        nombre: "Winter King - Heavy Hoodie",
        tipo: "Oversized Hoodie",
        precio: 129.90,
        colores: 2,
        calificacion: 4.8,
        reseñas: 9,
        imagen: "https://www.staycoldapparel.com/cdn/shop/files/DoomDrifterRealtree-DistressedBaseballCap_camo_11.jpg?crop=center&height=800&v=1758526548&width=600",
        imagenSecundaria: "https://www.staycoldapparel.com/cdn/shop/files/DoomDrifterRealtree-DistressedBaseballCap_camo_22.jpg?v=1758526548&width=600",
        categoria: "Hoodies",
        descripcion: "Hoodie heavy para invierno con protección térmica",
        especificaciones: ["450GSM", "Forro polar", "Protección térmica"],
        esVideo: false
      }
    ];

    const { category } = useParams();
    
    // Función para normalizar categorías (evitar problemas de mayúsculas/minúsculas)
    const normalizeCategory = (cat: string) => cat.toLowerCase().replace(/\s+/g, '-');
    const productosFiltrados = category
    ? todosLosProductos.filter(producto =>
        normalizeCategory(producto.categoria)
            .toLowerCase()
            .includes(normalizeCategory(category).toLowerCase())
        )
    : todosLosProductos;
 

    return (
        <main className="relative w-full min-h-screen overflow-y-auto overflow-x-hidden scroll-smooth bg-gradient-to-br from-neutral-900 to-stone-800">
            <div className="snap-center">
                <Header/>
            </div>
            <div className="snap-center">
                <ProductList 
                    productos={productosFiltrados}
                    titulo="No somos solo moda"
                    subtitulo="Descubre los mejores productos del mercado"
                />
            </div>
            <div className="snap-center">
                <Footer/>
            </div>
        </main>
    );
}