import React from "react";

interface ClientLogo {
  src: string;
  alt: string;
  url?: string;
}

interface Props {
  clients: ClientLogo[];
  logoHeight?: string; // Tailwind class for height, e.g. 'h-20'
}

const ClientCarousel: React.FC<Props> = ({ clients, logoHeight = "h-16" }) => {
  return (
    <>
      {/* <div className="text-center mb-16 pt-32">
        <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight mb-4">
          Principales Clientes
        </h2>
      </div> */}

      <div className="relative w-full  mx-auto py-12 overflow-hidden group">
        {/* Fade masks */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r  to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l  to-transparent z-10"></div>

        {/* Infinite scroll row */}
        <div className="flex whitespace-nowrap">
          {[1, 2].map((_, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-16 px-8 animate-infinite-scroll group-hover:pause"
              style={{ animationDuration: "45s" }}
            >
              {clients.map((client, idx) => (
                <a
                  key={idx}
                  href={client.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block opacity-80 hover:opacity-100 transition-all duration-300 hover:scale-105"
                  aria-label={`Cliente: ${client.alt}`}
                >
                  <img
                    src={client.src}
                    alt={client.alt}
                    className={`${logoHeight} w-auto object-contain grayscale hover:grayscale-0 transition-all duration-500`}
                    loading="lazy"
                    style={{ minWidth: "120px" }}
                  />
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Inline global styles */}
      <style>
        {`
          @keyframes infinite-scroll {
            from { transform: translateX(0); }
            to { transform: translateX(calc(-100% - 4rem)); }
          }

          .animate-infinite-scroll {
            animation: infinite-scroll 45s linear infinite;
          }

          .group-hover\\:pause:hover .animate-infinite-scroll {
            animation-play-state: paused;
          }

          @media (max-width: 1024px) {
            .animate-infinite-scroll {
              animation-duration: 35s !important;
            }
          }

          @media (max-width: 768px) {
            .animate-infinite-scroll {
              animation-duration: 30s !important;
            }
          }
        `}
      </style>
    </>
  );
};

export default ClientCarousel;
