import Footer from "../ui/footer/Footer";
import HomeAbout from "../ui/home/HomeAbout";
import ServiceHome from "../ui/services/ServiceHome";
import ServiceSecOne from "../ui/services/ServiceSecOne";
import ServiceSecThree from "../ui/services/ServiceSecThree";
import ServiceSecTwo from "../ui/services/ServiceSecTwo";
export default function Home() {
  return (
    <>
      <ServiceHome />
      <ServiceSecOne />
      <ServiceSecTwo />
      <ServiceSecThree />
      <HomeAbout />
      <Footer />
    </>
  );
}