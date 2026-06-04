import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-transparent text-slate-800">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
