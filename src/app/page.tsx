import Footer from "./ui/footer/Footer";
import Hero from "./ui/home/Hero";
import HomeAbout from "./ui/home/HomeAbout";
import HomeService from "./ui/home/HomeService";
import HomeTestimonial from "./ui/home/HomeTestimonial";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeService />
      <HomeTestimonial />
      <HomeAbout />
      <Footer />
    </>
  );
}
