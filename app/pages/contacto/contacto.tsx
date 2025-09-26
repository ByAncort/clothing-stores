import Contact from "~/component/contact";
import Footer from "~/component/Footer";
import Header from "~/component/Header";


export default function Contacto() {

    return (
        <main className="relative w-full min-h-screen overflow-y-auto overflow-x-hidden scroll-smooth bg-gradient-to-br from-neutral-900 to-stone-800">
            <div className="snap-center">
                <Header />
            </div>
            <div className="snap-center">
                <Contact />
            </div>
            <div className="snap-center">
                <Footer />
            </div>
        </main>
    );
}