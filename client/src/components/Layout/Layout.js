import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
// import "react-toastify/dist/ReactToastify.css";

function Layout({ children, title, desc, keyword, author, className }) {
  return (
    <div className={className}>
      <Helmet>
        <meta charSet="utf-8"></meta>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <meta name="keywords" content={keyword} />
        <meta name="author" content={author} />
      </Helmet>
      <Header />
      <main style={{ minHeight: "80vh" }}>
        <Toaster
          toastOptions={{
            // Define default options
            className: "",
            duration: 5000,
          }}
        />
        {children}
      </main>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: "Eccommerce App -- Shop Now",
  desc: "Shop For Everyone",
  keyword: "Shopping, Fashion, Electronic",
  author: "Anzalasssss",
};
export default Layout;
