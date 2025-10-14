import React from 'react';


const HeroSection = ({
  title = "BIGGEST GIVEAWAY WE'VE EVER DONE",
  subtitle = "Destaca tu estilo con streetwear de tattoo artists únicos",
  color = "white",
  id = "home",
  logos = [
    { src: "../assets/SAP-partner-logo.png", alt: "SAP partner Logo", className: "h-12" },
    { src: "../assets/Google_Cloud_Partner-2.png", alt: "Google Cloud Partner Logo", className: "h-10" },
    { src: "../assets/oracle-partner-seeklogo.png", alt: "Oracle Partner Logo", className: "h-6" }
  ],
  videoSrc = "/videoplayback.webm"
}) => {
  const textColor = `text-${color}`;

  return (
    <section
      className="landing-section bg-black h-screen w-screen overflow-hidden relative"
      data-header-color={color}
      id={id}
    >
      {/* Video de fondo */}
      <div className="absolute top-0 bottom-0 h-full w-full z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 z-10"></div>
        <video
          className="object-center object-cover h-full w-full"
          autoPlay
          muted
          loop
          playsInline
          src={videoSrc}
        ></video>
      </div>

      {/* Contenido principal */}
      <div className="z-30 relative h-full flex flex-col">
        <div className="container mx-auto px-6 h-full flex flex-col justify-center">
          {/* Texto a la izquierda */}
          <div className="w-full md:w-1/2">
            <h2 className={`${textColor} text-4xl md:text-5xl font-medium mb-4`}>
              {title}
            </h2>
            <p className={`${textColor} text-lg md:text-xl mb-8`}>
              {subtitle}
            </p>
            
            {/* Botón */}
            <div className="mb-12">
              <a
                className="border-2 border-white bg-white/10 backdrop-blur-sm rounded-lg font-medium text-white px-8 py-3 inline-block hover:bg-white hover:text-black transition-colors duration-300"
                href="#"
              >
                Contáctanos
              </a>
            </div>
          </div>

        {/* Logos estáticos alineados horizontalmente */}
        {/* <div className="w-full md:w-1/2 ">
        <div className="flex flex-wrap justify-center gap-8 px-4">
            {logos.map((logo, index) => (
            <img
                key={index}
                src={logo.src}
                alt={logo.alt}
                className={`${logo.className} opacity-80 hover:opacity-100 transition-opacity duration-300`}
            />
            ))}
        </div>
        </div> */}

        </div>
      </div>
    </section>
  );
};

export default HeroSection;