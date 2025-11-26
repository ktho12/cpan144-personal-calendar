import "@/styles/globals.css";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
    <Header />
    <Navbar />
      <Component {...pageProps} />
    </>
  );
}

