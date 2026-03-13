import { useState } from "react";
import { AdminProvider } from "./contexts/AdminContext";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./components/pages/Home";
import { About } from "./components/pages/About";
import { Courses } from "./components/pages/Courses";
import { Admissions } from "./components/pages/Admissions";
import { Gallery } from "./components/pages/Gallery";
import { Contact } from "./components/pages/Contact";
import { AdminPanel } from "./components/admin/AdminPanel";

// Export the Page type so it can be used in other files to fix TS errors
export type Page = "home" | "about" | "courses" | "admissions" | "gallery" | "contact" | "admin";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home": 
        return <Home onNavigate={setCurrentPage} />;
      case "about": 
        return <About />;
      case "courses": 
        return <Courses onNavigate={setCurrentPage} />;
      case "admissions": 
        return <Admissions />;
      case "gallery": 
        return <Gallery />;
      case "contact": 
        return <Contact />;
      case "admin": 
        return (
          <AdminPanel
            onExitToSite={() => {
              setCurrentPage("home");
              window.scrollTo(0, 0);
            }}
          />
        );
      default: 
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <AdminProvider>
      <div className="flex flex-col min-h-screen">
        {/* Hide main navigation when inside the Admin Panel */}
        {currentPage !== "admin" && (
          <Header currentPage={currentPage} onNavigate={setCurrentPage} />
        )}
        
        <main className="flex-grow">
          {renderPage()}
        </main>

        {currentPage !== "admin" && (
          <Footer />
        )}
      </div>
    </AdminProvider>
  );
}

export default App;