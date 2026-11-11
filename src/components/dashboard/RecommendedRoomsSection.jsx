import React, { useState } from 'react';
import { Sparkles, SlidersHorizontal, ArrowRight } from 'lucide-react';
import RoomCard from '../rooms/RoomCard';
import { useBooking } from '../../context/BookingContext';

const RecommendedRoomsSection = ({ onSelectExplore }) => {
  const { rooms } = useBooking();
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Quiet Study', 'Group Collab', 'Tech Lab'];

  const filteredRooms = filter === 'All'
    ? rooms.slice(0, 4)
    : rooms.filter(r => r.category === filter).slice(0, 4);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary-light">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Recommended For You
            </h2>
            <p className="text-xs text-space-dim">
              Tailored to your faculty (Computer Science & AI) and upcoming project deadlines
            </p>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all shrink-0 ${
                filter === cat
                  ? 'bg-primary text-white shadow-glow-primary'
                  : 'bg-space-sidebar border border-space-border text-space-muted hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredRooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedRoomsSection;
