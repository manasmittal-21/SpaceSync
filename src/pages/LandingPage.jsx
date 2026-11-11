import React from 'react';
import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import HowItWorksSection from '../components/landing/HowItWorksSection';
import FeaturedRoomsSection from '../components/landing/FeaturedRoomsSection';
import BenefitsSection from '../components/landing/BenefitsSection';
import Footer from '../components/landing/Footer';
import BookingModal from '../components/dashboard/BookingModal';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#10121A] text-space-text flex flex-col selection:bg-primary selection:text-white">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <HowItWorksSection />
        <FeaturedRoomsSection />
        <BenefitsSection />
      </main>
      <Footer />
      {/* Global Booking Modal */}
      <BookingModal />
    </div>
  );
};

export default LandingPage;
