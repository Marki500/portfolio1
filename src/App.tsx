import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PortfolioSection } from './components/PortfolioSection';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MotionProvider } from './components/motion-context';

function App() {
  return (
    <MotionProvider>
      <div className="relative min-h-screen overflow-hidden text-white">
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(152,0,203,0.25),transparent_60%),radial-gradient(circle_at_80%_15%,rgba(0,212,255,0.2),transparent_55%),radial-gradient(circle_at_50%_100%,rgba(152,0,203,0.15),transparent_55%)]" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=200 height=200 viewBox=0 0 200 200 xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' stroke=\'rgba(255,255,255,0.05)\' stroke-width=\'0.5\'%3E%3Cpath d=\'M0 100 Q50 0 100 100 T200 100\'/%3E%3Cpath d=\'M0 140 Q50 40 100 140 T200 140\'/%3E%3C/g%3E%3C/svg%3E')] opacity-60" />
        </div>
        <Header />
        <main className="relative space-y-24">
          <Hero />
          <PortfolioSection />
          <ServicesSection />
          <AboutSection />
          <TestimonialsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </MotionProvider>
  );
}

export default App;
