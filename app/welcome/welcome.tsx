import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";
import AreasMain from "~/component/AreasMain";
import HeroSection from "~/component/HeroSelection";
import Header from "~/component/Header";
import ClientCarousel from "~/component/ClientCarousel";
import CardVentas from "~/component/CardVentas";
import Footer from "~/component/Footer";



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
    imagen: "https://www.staycoldapparel.com/cdn/shop/files/DeadBloom_Acid_-OversizedHoodie_350GSM_10.jpg",
    imagenSecundaria: "https://www.staycoldapparel.com/cdn/shop/files/DeadBloom_Acid_-OversizedHoodie_350GSM_4.jpg"
  },
  {
    id: 2,
    nombre: "Storm (camo) - Shades",
    tipo: "Shades",
    precio: 59.90,
    colores: 1,
    calificacion: 5,
    reseñas: 5,
    imagen: "https://www.staycoldapparel.com/cdn/shop/files/NocturnalOath-OversizedT-Shirt_allover_200GSM10.jpg",
    imagenSecundaria: "staycoldapparel.com/cdn/shop/files/NocturnalOath-OversizedT-Shirt_allover_200GSM1.jpg"
  },
  {
    id: 3,
    nombre: "Think Twice - Oversized T-Shirt",
    tipo: "49.90",
    precio: 49.99,
    colores: 1,
    calificacion: 4.5,
    reseñas: 7,
    imagen: "https://www.staycoldapparel.com/cdn/shop/files/ReignOfBloodGreyEdition-HeavyOversizedHoodie_400GSM_2_fcf8ddaa-ac2c-466d-a99b-851f4cc90413.jpg",
    imagenSecundaria: "https://www.staycoldapparel.com/cdn/shop/files/ReignOfBloodGreyEdition-HeavyOversizedHoodie_400GSM_5_b4fb4203-b74f-4fcb-beb0-73b9a6580af9.jpg"
  },
  {
    id: 4,
    nombre: "Reign of Blood - Heavy Oversized Hoodie 400GSM",
    tipo: "Oversized Hoodie",
    precio: 119.90,
    colores: 2,
    calificacion: 5,
    reseñas: 3,
    imagen: "https://www.staycoldapparel.com/cdn/shop/files/Grimfall_HalfHalf_-CargoShort_260GSM_3copy-2.jpg",
    imagenSecundaria: "https://www.staycoldapparel.com/cdn/shop/files/Grimfall_HalfHalf_-CargoShort_260GSM_20-2.jpg"
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
      <Footer/>
      </div>

    </main>
  );
}