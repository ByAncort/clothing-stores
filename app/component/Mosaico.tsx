const Mosaico = () => {
  return (
    <div className="mx-auto p-4">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-100">
        About T-Shirts
      </h2>
      <p className="text-white mb-6 mt-6 text-lg leading-relaxed  opacity-90">
        We believe that clothing is more than just fabric; it's an expression of who you are and what you stand for. That's why our Tees are not just ordinary T-Shirts – they are wearable art, created in collaboration with talented artists who share our passion for the unconventional. Made with high-quality 100% cotton material, our Shirts come in regular and oversized fit, with a fabric weight of 180gsm, crafted for comfort and durability. The screen-printed designs are made to last, ensuring that your T-Shirt will be a statement piece in your wardrobe for years to come. Embrace tattoo culture, urban style, and alternative fashion with our T-Shirts, perfect for long walks in the woods or raging in the moshpits. Express yourself with clothing that represents who you are and what you stand for.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Columna 1 */}
        <div className="grid gap-4">
          <div className="h-48 md:h-64 bg-gray-200 rounded-lg overflow-hidden">
            <img 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
              src="https://www.staycoldapparel.com/cdn/shop/files/Lilou14.jpg" 
              alt="Producto StayCold"
            />
          </div>
          <div className="h-32 md:h-40 bg-gray-200 rounded-lg overflow-hidden">
            <img 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
              src="https://www.staycoldapparel.com/cdn/shop/files/ChurchBurnerCrew-CustomizedRegularT-Shirt_grey_200GSM37.jpg?v=1751008588&width=300" 
              alt="Producto StayCold"
            />
          </div>
          <div className="h-56 md:h-72 bg-gray-200 rounded-lg overflow-hidden">
            <img 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
              src="https://www.staycoldapparel.com/cdn/shop/files/Staycold_15Large.jpg?v=1721660594&width=300" 
              alt="Producto StayCold"
            />
          </div>
        </div>
        
        {/* Columna 2 */}
        <div className="grid gap-4">
          <div className="h-40 md:h-52 bg-gray-200 rounded-lg overflow-hidden">
            <img 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
              src="https://www.staycoldapparel.com/cdn/shop/files/OfLife_Death-T-Shirt_3.jpg?v=1723810521&width=300" 
              alt="Producto StayCold"
            />
          </div>
          <div className="h-64 md:h-80 bg-gray-200 rounded-lg overflow-hidden">
            <img 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
              src="https://www.staycoldapparel.com/cdn/shop/files/Staycold_04_667-2_0.5x.jpg?v=1721660731&width=300" 
              alt="Producto StayCold"
            />
          </div>
          <div className="h-36 md:h-44 bg-gray-200 rounded-lg overflow-hidden">
            <img 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
              src="https://www.staycoldapparel.com/cdn/shop/files/Attitude-CustomizedRegularT-Shirt_200GSM_23.jpg?v=1749205167&width=300" 
              alt="Producto StayCold"
            />
          </div>
        </div>
        
        {/* Columna 3 */}
        <div className="grid gap-4">
          <div className="h-52 md:h-64 bg-gray-200 rounded-lg overflow-hidden">
            <img 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
              src="https://www.staycoldapparel.com/cdn/shop/files/Staycold_04-34_0.5x.jpg?v=1718357950&width=300" 
              alt="Producto StayCold"
            />
          </div>
          <div className="h-44 md:h-56 bg-gray-200 rounded-lg overflow-hidden">
            <img 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
              src="https://www.staycoldapparel.com/cdn/shop/files/ChurchBurnerCrew-CustomizedRegularT-Shirt_grey_200GSM42.jpg?v=1751008588&width=300" 
              alt="Producto StayCold"
            />
          </div>
          <div className="h-60 md:h-72 bg-gray-200 rounded-lg overflow-hidden">
            <img 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
              src="https://www.staycoldapparel.com/cdn/shop/files/ChainsOfGod_dirtywash_-OversizedT-Shirt_200GSM_15_7c96a48b-e0eb-48d5-ac38-3d3e807ee1e7.jpg?crop=center&height=800&v=1757663480&width=600" 
              alt="Producto StayCold"
            />
          </div>
        </div>
        
        {/* Columna 4 */}
        <div className="grid gap-4">
          <div className="h-36 md:h-44 bg-gray-200 rounded-lg overflow-hidden">
            <img 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
              src="https://www.staycoldapparel.com/cdn/shop/files/Trinity_Custom_-CropT-Shirt_200GSM_17.jpg?crop=center&height=800&v=1754903974&width=600" 
              alt="Producto StayCold"
            />
          </div>
          <div className="h-64 md:h-80 bg-gray-200 rounded-lg overflow-hidden">
            <img 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
              src="https://www.staycoldapparel.com/cdn/shop/files/SinnersParadise-CustomizedRegularT-Shirt_TieDye_200GSM20.jpg?crop=center&height=800&v=1748946156&width=600" 
              alt="Producto StayCold"
            />
          </div>
          <div className="h-48 md:h-60 bg-gray-200 rounded-lg overflow-hidden">
            <img 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
              src="https://www.staycoldapparel.com/cdn/shop/files/ChamberOfChaos-HeavyOversizedT-Shirt_mentol_250GSM20.jpg?crop=center&height=300&v=1748930486&width=300" 
              alt="Producto StayCold"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mosaico;