
import AreasMain from "~/component/AreasMain";
import HeroSection from "~/component/HeroSelection";
import CardVentas from "~/component/CardVentas";
import type { Producto } from "~/types/product";
import Mosaico from "~/component/Mosaico";
import { useLocalStorage } from "~/hooks/useLocalStorage";




export function Welcome() {


const productosIniciales: Producto[] = [
  {
    id: 1,
    nombre: "Dead Bloom (Acid) - Oversized Hoodie",
    tipo: "Oversized Hoodie",
  precio: 119.9,
    colores: 1,
    calificacion: 5,
    reseñas: 2,
    imagen: "https://www.staycoldapparel.com/cdn/shop/files/DeadBloom_Acid_-OversizedHoodie_350GSM_10.jpg",
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
  precio: 59.9,
    colores: 1,
    calificacion: 5,
    reseñas: 5,
    imagen: "https://www.staycoldapparel.com/cdn/shop/files/NocturnalOath-OversizedT-Shirt_allover_200GSM10.jpg",
    imagenSecundaria: "https://www.staycoldapparel.com/cdn/shop/files/NocturnalOath-OversizedT-Shirt_allover_200GSM1.jpg",
    categoria: "Accesorios",
    descripcion: "Gafas de sol con diseño camo y protección UV",
    especificaciones: ["Protección UV400", "Estilo camo", "Marco durable"],
    esVideo: true,
    videoUrl: "https://player.vimeo.com/video/881847725?h=6c4d2c3d8a"
  },
  {
    id: 3,
    nombre: "Think Twice - Oversized T-Shirt",
    tipo: "Oversized T-Shirt",
  precio: 49.9,
    colores: 3,
    calificacion: 4.5,
    reseñas: 7,
    imagen: "https://www.staycoldapparel.com/cdn/shop/files/ReignOfBloodGreyEdition-HeavyOversizedHoodie_400GSM_2_fcf8ddaa-ac2c-466d-a99b-851f4cc90413.jpg",
    imagenSecundaria: "https://www.staycoldapparel.com/cdn/shop/files/ReignOfBloodGreyEdition-HeavyOversizedHoodie_400GSM_5_b4fb4203-b74f-4fcb-beb0-73b9a6580af9.jpg",
    categoria: "Camisetas",
    descripcion: "Camiseta oversized con estampado minimalista",
    especificaciones: ["200GSM", "Corte oversized", "Estampado duradero"],
    esVideo: false
  },
  {
    id: 4,
    nombre: "Reign of Blood - Heavy Oversized Hoodie",
    tipo: "Oversized Hoodie",
  precio: 119.9,
    colores: 2,
    calificacion: 5,
    reseñas: 3,
    imagen: "https://www.staycoldapparel.com/cdn/shop/files/Grimfall_HalfHalf_-CargoShort_260GSM_3copy-2.jpg",
    imagenSecundaria: "https://www.staycoldapparel.com/cdn/shop/files/Grimfall_HalfHalf_-CargoShort_260GSM_20-2.jpg",
    categoria: "Hoodies",
    descripcion: "Hoodie heavy weight 400GSM edición limitada",
    especificaciones: ["400GSM", "Edición limitada", "Material heavy weight"],
    esVideo: true,
    videoUrl: "https://player.vimeo.com/video/881847726?h=6c4d2c3d8b"
  },
  {
    id: 5,
    nombre: "Nocturnal Oath - All Over Print T-Shirt",
    tipo: "Oversized T-Shirt",
  precio: 54.9,
    colores: 2,
    calificacion: 4.8,
    reseñas: 12,
    imagen: "https://www.staycoldapparel.com/cdn/shop/files/NocturnalOath-OversizedT-Shirt_allover_200GSM10.jpg",
    imagenSecundaria: "https://www.staycoldapparel.com/cdn/shop/files/NocturnalOath-OversizedT-Shirt_allover_200GSM1.jpg",
    categoria: "Camisetas",
    descripcion: "Camiseta all over print con diseño nocturno",
    especificaciones: ["All over print", "200GSM", "Estampado completo"],
    esVideo: false
  },
  {
    id: 6,
    nombre: "Grimfall Half Half - Cargo Short",
    tipo: "Cargo Short",
  precio: 79.9,
    colores: 1,
    calificacion: 4.7,
    reseñas: 8,
    imagen: "https://www.staycoldapparel.com/cdn/shop/files/Grimfall_HalfHalf_-CargoShort_260GSM_3copy-2.jpg",
    imagenSecundaria: "https://www.staycoldapparel.com/cdn/shop/files/Grimfall_HalfHalf_-CargoShort_260GSM_20-2.jpg",
    categoria: "Pantalones",
    descripcion: "Shorts cargo con diseño half half y múltiples bolsillos",
    especificaciones: ["260GSM", "Bolsillos cargo", "Diseño half half"],
    esVideo: true,
    videoUrl: "https://player.vimeo.com/video/881847727?h=6c4d2c3d8c"
  },
  {
    id: 7,
    nombre: "Shadow Realm - Beanie",
    tipo: "Beanie",
  precio: 34.9,
    colores: 4,
    calificacion: 4.9,
    reseñas: 15,
    imagen: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=400",
    imagenSecundaria: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=400",
    categoria: "Accesorios",
    descripcion: "Gorro beanie de lana merino con logo bordado",
    especificaciones: ["Lana merino", "Logo bordado", "Ajuste perfecto"],
    esVideo: false
  },
  {
    id: 8,
    nombre: "Eternal Night - Jogger Pants",
    tipo: "Jogger Pants",
  precio: 89.9,
    colores: 3,
    calificacion: 4.6,
    reseñas: 6,
    imagen: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400",
    imagenSecundaria: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400",
    categoria: "Pantalones",
    descripcion: "Pantalones jogger con cintura elástica y ajuste tapered",
    especificaciones: ["Cintura elástica", "Ajuste tapered", "Tela stretch"],
    esVideo: false
  }
];

  const [productosMasVendidos, , isLoaded] = useLocalStorage<Producto[]>(
    "productosMasVendidos", 
    productosIniciales
  );

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-white">Cargando...</div>
      </div>
    );
  }

  return (
    <>
      <div className="snap-center">
        <HeroSection />
      </div>
      <div className="snap-center">
        <AreasMain />
      </div>
      <div className="snap-center max-w-[1600px] mx-auto">
        <CardVentas productos={productosMasVendidos} />
      </div>
      <div className="snap-center mt-12 max-w-[1600px] mx-auto">
        <Mosaico/>
      </div>
      <div className="snap-center">
      </div>
    </>
  );
}