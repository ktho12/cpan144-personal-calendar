import "@/styles/globals.css";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
    <Header />
    <Navbar />
      <main>
          <Component {...pageProps} />
      </main>
    <Footer />
    </>
  );
}

