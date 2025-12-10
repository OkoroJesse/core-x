import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import StatsSection from '../components/StatsSection';
import ServicesSection from '../components/ServicesSection';
import ProjectsSection from '../components/ProjectsSection';
import BlogSection from '../components/BlogSection';
import ReviewsSection from '../components/ReviewsSection';
import FAQSection from '../components/FAQSection';
import ContactSection from '../components/ContactSection';
import FooterSection from '../components/FooterSection';
import BackToTop from '../components/BackToTop';
import WhatsAppFloat from '../components/WhatsAppFloat';

function Home() {
  return (
    <div className="bg-zinc-900 min-h-screen">
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <ServicesSection />
      <ProjectsSection />
      <BlogSection />
      <ReviewsSection />
      <FAQSection />
      <ContactSection />
      <FooterSection />
      <BackToTop />
      <WhatsAppFloat />
    </div>
  );
}

export default Home;
