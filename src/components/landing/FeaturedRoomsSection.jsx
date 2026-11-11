import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Filter } from 'lucide-react';
import RoomCard from '../rooms/RoomCard';
import Button from '../common/Button';
import { useBooking } from '../../context/BookingContext';
import { useAuth } from '../../context/AuthContext';

const FeaturedRoomsSection = () => {
  const { rooms } = useBooking();
  const { isAuthenticated, loginAsDemo } = useAuth();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Quiet Study', 'Group Collab', 'Tech Lab', 'Presentation / Event'];

  const filteredRooms = selectedCategory === 'All'
    ? rooms.slice(0, 6)
    : rooms.filter(r => r.category === selectedCategory);

  const handleViewAll = () => {
    if (!isAuthenticated) {
      loginAsDemo();
    }
    navigate('/dashboard?tab=explore');
  };

  return (
    <section id="featured-rooms" className="py-20 md:py-28 bg-[#10121A] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-space-border/60">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary-light text-xs font-medium mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Campus Live Discovery</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured TIET Campus Spaces
            </h2>
            <p className="mt-2 text-space-muted text-sm sm:text-base max-w-xl">
              Explore specialized TIET engineering labs, Nava Nalanda quiet carrels, and COS tech studios ready for immediate student check-in.
            </p>
          </div>

          <Button
            variant="outline"
            onClick={handleViewAll}
            rightIcon={ArrowRight}
            className="self-start md:self-auto"
          >
            Browse All 48 Spaces
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-medium px-4 py-2 rounded-lg transition-all shrink-0 ${
                selectedCategory === cat
                  ? 'bg-primary text-white shadow-glow-primary'
                  : 'bg-space-sidebar border border-space-border text-space-muted hover:text-white hover:border-space-border-light'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Room Cards Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-space-sidebar via-[#1B1E2A] to-space-sidebar border border-space-border flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-white">Need a specialized lab or GPU computing studio?</h3>
            <p className="text-sm text-space-muted mt-1">
              Connect with your TIET student credentials for access to COS neural compute clusters, STEP Venture Lab hardware, and Nava Nalanda carrels.
            </p>
          </div>
          <Button
            variant="secondary"
            onClick={handleViewAll}
            rightIcon={ArrowRight}
            className="shrink-0"
          >
            Launch Student Portal
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRoomsSection;
