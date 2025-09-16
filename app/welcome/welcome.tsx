import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";
import AreasMain from "~/component/AreasMain";
import HeroSection from "~/component/HeroSelection";
import Header from "~/component/Header";
import ClientCarousel from "~/component/ClientCarousel";
import CardVentas from "~/component/CardVentas";



export function Welcome() {
const productosMasVendidos = [
  {
    id: 1,
    nombre: "Dead Bloom (Acid) - Oversized Hoodie (350GSM)",
    tipo: "Oversized Hoodie",
    precio: 119.90,
    colores: 1,
    calificacion: 5,
    reseñas: 2,
    imagen: "https://www.staycoldapparel.com/cdn/shop/files/DeadBloom_Acid_-OversizedHoodie_350GSM_4.jpg"
  },
  {
    id: 2,
    nombre: "Storm (camo) - Shades",
    tipo: "Shades",
    precio: 59.90,
    colores: 1,
    calificacion: 5,
    reseñas: 5,
    imagen: "https://www.staycoldapparel.com/cdn/shop/videos/c/vp/a3dffb6a8e494a72a65ee6d6bab07d55/a3dffb6a8e494a72a65ee6d6bab07d55.HD-1080p-7.2Mbps-57257139.mp4?v=0"
  },
  {
    id: 3,
    nombre: "Think Twice - Oversized T-Shirt",
    tipo: "49.90",
    precio: 49.99,
    colores: 1,
    calificacion: 4.5,
    reseñas: 7,
    imagen: "https://www.staycoldapparel.com/cdn/shop/files/Think_Twice_Oversized_Tee_White_5.jpg"
  },
  {
    id: 4,
    nombre: "Reign of Blood - Heavy Oversized Hoodie 400GSM",
    tipo: "Oversized Hoodie",
    precio: 119.90,
    colores: 2,
    calificacion: 5,
    reseñas: 3,
    imagen: "https://www.staycoldapparel.com/cdn/shop/files/ReignofBloodHoodie__ayleeshyoung5.jpg"
  }
];

  const clientLogos = [ 
  { src: "../assets/company-logos/logo1.png", alt: "Coca-Cola", url: "https://coca-cola.com" },
  { src: "../assets/company-logos/logo2.png", alt: "Coca-Cola", url: "https://coca-cola.com" },
  { src: "../assets/company-logos/logo3.png", alt: "Coca-Cola", url: "https://coca-cola.com" },
  { src: "../assets/company-logos/logo4.png", alt: "Coca-Cola", url: "https://coca-cola.com" },
  { src: "../assets/company-logos/logo5.png", alt: "Coca-Cola", url: "https://coca-cola.com" },
  { src: "../assets/company-logos/logo6.png", alt: "Coca-Cola", url: "https://coca-cola.com" },
  { src: "../assets/company-logos/logo7.png", alt: "Coca-Cola", url: "https://coca-cola.com" },
  { src: "../assets/company-logos/logo8.png", alt: "Coca-Cola", url: "https://coca-cola.com" },
  { src: "../assets/company-logos/logo9.png", alt: "Coca-Cola", url: "https://coca-cola.com" },
  { src: "../assets/company-logos/logo10.png", alt: "Coca-Cola", url: "https://coca-cola.com" },
  { src: "../assets/company-logos/logo11.png", alt: "Coca-Cola", url: "https://coca-cola.com" },
  { src: "../assets/company-logos/logo12.png", alt: "Coca-Cola", url: "https://coca-cola.com" },
  { src: "../assets/company-logos/logo13.png", alt: "Coca-Cola", url: "https://coca-cola.com" },
  { src: "../assets/company-logos/logo14.png", alt: "Coca-Cola", url: "https://coca-cola.com" },
  { src: "../assets/company-logos/logo15.png", alt: "Coca-Cola", url: "https://coca-cola.com" },

];
  return (
	<main className=" relative w-full h-screen overflow-y-auto overflow-x-hidden scroll-smooth">
    <div className="snap-center">
      <HeroSection/>
      </div>
    <div className="snap-center">
      <AreasMain/>
      </div>
    <div className="snap-center">
      <Header/>
      </div>
    <div className="snap-center">
      {/* <ClientCarousel clients={clientLogos}/> */}
      <CardVentas productos={productosMasVendidos} />
      </div>
    <div className="snap-center">
      </div>
    </main>
  );
}