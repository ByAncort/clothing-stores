import React from 'react';
import { useNavigate } from 'react-router-dom';

const slides = [
  {
    title: 'New Drops',
    subtitle: 'From $100',
    url: 'https://www.staycoldapparel.com/cdn/shop/files/MarrowofEden_black_-OversizedT-Shirt_200GSM_1.jpg'
    , ref: '/Model-3'
  },
  {
    title: 'Hoodies',
    subtitle: 'From $100',
    url: 'https://www.staycoldapparel.com/cdn/shop/files/DeadBloom_Acid_-OversizedHoodie_350GSM_7.jpg',
    ref: '/Model-X'
  },
  {
    title: 'Jackets',
    subtitle: 'From $200',
    url: 'https://www.staycoldapparel.com/cdn/shop/files/Grimfall_HalfHalf_-CargoShort_260GSM_3copy-2.jpg',
    ref: '/Model-S'
  },
];

export default function AreasMain() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [transitionDirection, setTransitionDirection] = React.useState('right');

  const nextSlide = () => {
    setTransitionDirection('right');
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };
  const navigate = useNavigate();
  return (
    <div className="max-w-[1400px] h-[780px] w-full m-auto py-16 px-4 relative overflow-hidden">
      {/* Contenedor principal */}
      <div className="w-full h-full flex relative">
        {/* Slide principal con animación de deslizamiento */}
        <div
          key={currentIndex}
          style={{ 
            backgroundImage: `url(${slides[currentIndex].url})`,
            transform: transitionDirection === 'right' 
              ? 'translateX(0)' 
              : 'translateX(0)',
          }}
          className={`
            w-5/6 h-full rounded-2xl bg-center bg-cover mr-3
            transition-transform duration-500 ease-in-out
            ${transitionDirection === 'right' ? 'animate-slide-in' : ''}
          `}
        >
          <div className="absolute bottom-20 left-20 text-white">
            <h2 className="text-4xl font-bold">{slides[currentIndex].title}</h2>
            <p className="text-xl">{slides[currentIndex].subtitle}</p>
            <button onClick={()=> navigate( `${slides[currentIndex].ref} `)} className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce">
            More
            </button>

          </div>
        </div>

        {/* Preview de siguiente slide */}
        <div
          onClick={nextSlide}
          style={{ 
            backgroundImage: `url(${slides[(currentIndex + 1) % slides.length].url})`,
          }}
          className={`
            w-1/6 h-full rounded-2xl bg-center bg-cover cursor-pointer
            relative overflow-hidden transition-all duration-300
            opacity-70 hover:opacity-90
          `}
        >
          {/* Overlay con indicador de click */}
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="bg-white/80 p-3 rounded-full">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-8 w-8 text-black" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                  clipRule="evenodd" 
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    
    </div>
  );
}