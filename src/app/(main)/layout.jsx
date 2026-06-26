import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";

export default function MainLayout({ children }) {
return (
<> <Navbar />


  <main>
    {children}
  </main>

  <Footer />
</>


);
}
