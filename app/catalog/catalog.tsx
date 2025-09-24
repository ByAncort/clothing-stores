import CatalogMain from "~/component/catalogoMain";
import Footer from "~/component/Footer";
import Header from "~/component/Header";



export function Catalog() {
return(
	<main className=" relative w-full h-screen overflow-y-auto overflow-x-hidden scroll-smooth">
        <div className="snap-center bg-gray-700">
        <Header/>
        </div>
        <div className="snap-center">
            <CatalogMain/>
        </div>
        <div className="snap-center">
        <Footer/>

        </div>
    </main>

);
}
