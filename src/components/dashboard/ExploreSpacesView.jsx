import React, { useState } from 'react';
import { Search, MapPin, Volume2, Users, RefreshCw, Compass } from 'lucide-react';
import RoomCard from '../rooms/RoomCard';
import Input from '../common/Input';
import Button from '../common/Button';
import { useBooking } from '../../context/BookingContext';

const ExploreSpacesView = () => {
  const { rooms, locations } = useBooking();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  const categories = ['All', 'Quiet Study', 'Group Collab', 'Tech Lab', 'Presentation / Event'];

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.buildingName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (room.facilities && room.facilities.some(a => a.toLowerCase().includes(searchTerm.toLowerCase())));

    const matchesBuilding =
      selectedBuilding === 'All' || room.locationId === selectedBuilding;

    const matchesCategory =
      selectedCategory === 'All' || room.category === selectedCategory;

    const matchesAvailability = !onlyAvailable || room.status === 'available';

    return matchesSearch && matchesBuilding && matchesCategory && matchesAvailability;
  });

  return (
    <div className="space-y-6">
      {/* Top Filter Bar */}
      <div className="p-5 rounded-2xl bg-space-card border border-space-border space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="flex-1">
            <Input
              placeholder="Search TIET rooms, code (NNL-301, COS-104), equipment (4K, GPU), or lab..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={Search}
            />
          </div>

          {/* Building Dropdown */}
          <div className="w-full md:w-72">
            <select
              value={selectedBuilding}
              onChange={(e) => setSelectedBuilding(e.target.value)}
              className="w-full bg-[#141724] border border-space-border rounded-lg text-xs text-space-text px-3 py-2.5 focus:outline-none focus:border-primary"
            >
              <option value="All">All TIET Campus Hubs ({locations.length})</option>
              {locations.map(b => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.shortCode})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pills & Availability Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-space-border/50">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-primary text-white shadow-glow-primary'
                    : 'bg-space-sidebar border border-space-border text-space-muted hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2 text-xs text-space-muted cursor-pointer select-none">
            <input
              type="checkbox"
              checked={onlyAvailable}
              onChange={(e) => setOnlyAvailable(e.target.checked)}
              className="w-4 h-4 rounded bg-[#141724] border-space-border text-primary focus:ring-primary focus:ring-offset-0"
            />
            <span className="font-medium text-emerald-400">Available right now only</span>
          </label>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-space-muted px-1">
        <span>Showing <strong>{filteredRooms.length}</strong> TIET campus spaces matching criteria</span>
        <button
          type="button"
          onClick={() => {
            setSearchTerm('');
            setSelectedBuilding('All');
            setSelectedCategory('All');
            setOnlyAvailable(false);
          }}
          className="hover:text-white flex items-center gap-1"
        >
          <RefreshCw className="w-3 h-3" /> Reset filters
        </button>
      </div>

      {/* Room Grid */}
      {filteredRooms.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-space-card border border-dashed border-space-border">
          <p className="text-sm font-semibold text-white">No campus rooms match your filters</p>
          <p className="text-xs text-space-muted mt-1">Try broadening your search term or selecting "All Campus Hubs".</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExploreSpacesView;
