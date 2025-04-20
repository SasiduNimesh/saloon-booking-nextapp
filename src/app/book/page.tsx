import BookContact from "../ui/book/BookContact";
import BookHome from "../ui/book/BookHome";
import BookSecOne from "../ui/book/BookSecOne";
import Footer from "../ui/footer/Footer";
export default function Home() {
  return (
    <>
      <BookHome />
      <BookSecOne />
      <BookContact />
      <Footer />
    </>
  );
}