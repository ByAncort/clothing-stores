const Mosaico = () => {
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px] py-20">
      <div className="mb-12">
        <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white uppercase tracking-tighter mb-6">
          The Culture
        </h2>
        <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-4xl font-light tracking-wide">
          We believe that clothing is more than just fabric; it's an expression of who you are and what you stand for.
          That's why our Tees are not just ordinary T-Shirts – they are wearable art, created in collaboration with
          talented artists who share our passion for the unconventional. Made with high-quality 100% cotton material,
          our Shirts come in regular and oversized fit, with a fabric weight of 180gsm, crafted for comfort and durability.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Column 1 */}
        <div className="grid gap-4 content-start">
          <div className="aspect-[3/4] bg-gray-900 overflow-hidden group">
            <img
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out grayscale group-hover:grayscale-0"
              src="https://www.staycoldapparel.com/cdn/shop/files/Lilou14.jpg"
              alt="Urban Style"
            />
          </div>
          <div className="aspect-square bg-gray-900 overflow-hidden group">
            <img
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out grayscale group-hover:grayscale-0"
              src="https://www.staycoldapparel.com/cdn/shop/files/ChurchBurnerCrew-CustomizedRegularT-Shirt_grey_200GSM37.jpg?v=1751008588&width=300"
              alt="Urban Style"
            />
          </div>
        </div>

        {/* Column 2 */}
        <div className="grid gap-4 content-start pt-8 md:pt-12">
          <div className="aspect-square bg-gray-900 overflow-hidden group">
            <img
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out grayscale group-hover:grayscale-0"
              src="https://www.staycoldapparel.com/cdn/shop/files/OfLife_Death-T-Shirt_3.jpg?v=1723810521&width=300"
              alt="Urban Style"
            />
          </div>
          <div className="aspect-[3/4] bg-gray-900 overflow-hidden group">
            <img
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out grayscale group-hover:grayscale-0"
              src="https://www.staycoldapparel.com/cdn/shop/files/Staycold_04_667-2_0.5x.jpg?v=1721660731&width=300"
              alt="Urban Style"
            />
          </div>
        </div>

        {/* Column 3 */}
        <div className="grid gap-4 content-start">
          <div className="aspect-[3/4] bg-gray-900 overflow-hidden group">
            <img
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out grayscale group-hover:grayscale-0"
              src="https://www.staycoldapparel.com/cdn/shop/files/Staycold_04-34_0.5x.jpg?v=1718357950&width=300"
              alt="Urban Style"
            />
          </div>
          <div className="aspect-square bg-gray-900 overflow-hidden group">
            <img
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out grayscale group-hover:grayscale-0"
              src="https://www.staycoldapparel.com/cdn/shop/files/ChurchBurnerCrew-CustomizedRegularT-Shirt_grey_200GSM42.jpg?v=1751008588&width=300"
              alt="Urban Style"
            />
          </div>
        </div>

        {/* Column 4 */}
        <div className="grid gap-4 content-start pt-8 md:pt-12">
          <div className="aspect-square bg-gray-900 overflow-hidden group">
            <img
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out grayscale group-hover:grayscale-0"
              src="https://www.staycoldapparel.com/cdn/shop/files/Trinity_Custom_-CropT-Shirt_200GSM_17.jpg?crop=center&height=800&v=1754903974&width=600"
              alt="Urban Style"
            />
          </div>
          <div className="aspect-[3/4] bg-gray-900 overflow-hidden group">
            <img
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out grayscale group-hover:grayscale-0"
              src="https://www.staycoldapparel.com/cdn/shop/files/SinnersParadise-CustomizedRegularT-Shirt_TieDye_200GSM20.jpg?crop=center&height=800&v=1748946156&width=600"
              alt="Urban Style"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mosaico;