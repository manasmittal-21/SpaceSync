import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Check, Sparkles, AlertCircle, Compass } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { useBooking } from '../../context/BookingContext';

const RoomBookingView = () => {
  const { rooms, setActiveModalRoom, reservations, focusLocationOnMap } = useBooking();
  const [selectedRoomId, setSelectedRoomId] = useState(rooms[0]?.id || '');
  const [selectedDate, setSelectedDate] = useState('Today, Nov 12');

  const selectedRoom = rooms.find(r => r.id === selectedRoomId) || rooms[0];

  const dates = [
    { label: 'Today', date: 'Today, Nov 12' },
    { label: 'Tomorrow', date: 'Tomorrow, Nov 13' },
    { label: 'Fri, Nov 14', date: 'Fri, Nov 14' },
    { label: 'Sat, Nov 15', date: 'Sat, Nov 15' }
  ];

  const timeSlots = [
    '08:00 - 10:00',
    '10:00 - 12:00',
    '12:00 - 14:00',
    '14:00 - 16:00',
    '16:00 - 18:00',
    '18:00 - 20:00',
    '20:00 - 22:00'
  ];

  // Dynamic slot status check
  const getSlotDetails = (slot) => {
    if (!selectedRoom) return { status: 'available', bookedBy: null };

    const matchingRes = reservations.find(res => {
      if (res.roomId !== selectedRoom.id || res.status === 'Cancelled') return false;
      return res.timeSlot === slot;
    });

    if (matchingRes) {
      return {
        status: 'busy',
        bookedBy: matchingRes.purpose || 'Active Student Reservation'
      };
    }

    return { status: 'available', bookedBy: null };
  };

  const handleSlotClick = (slot, details) => {
    if (details.status === 'busy') return;
    setActiveModalRoom(selectedRoom);
  };

  return (
    <div className="space-y-6">
      {/* Top Selector Panel */}
      <Card className="p-5 sm:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-space-border/60">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              TIET Interactive Room Reservation Matrix
            </h2>
            <p className="text-xs text-space-muted mt-0.5">
              Select room and click any open 2-hour time block to confirm your reservation.
            </p>
          </div>

          {/* Date Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {dates.map((d, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedDate(d.date)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                  selectedDate === d.date
                    ? 'bg-primary text-white shadow-glow-primary'
                    : 'bg-space-sidebar border border-space-border text-space-muted hover:text-white'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Room Picker Horizontal Bar */}
        <div className="mt-5 space-y-2">
          <label className="block text-xs font-semibold text-space-muted uppercase tracking-wider">
            Select Campus Space
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {rooms.slice(0, 4).map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setSelectedRoomId(r.id)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedRoomId === r.id
                    ? 'bg-primary/15 border-primary text-white shadow-sm'
                    : 'bg-space-sidebar border-space-border text-space-muted hover:border-space-border-light hover:text-white'
                }`}
              >
                <div className="font-mono text-[11px] text-secondary font-bold">
                  {r.code}
                </div>
                <div className="text-xs font-semibold truncate mt-0.5 text-white">
                  {r.name}
                </div>
                <div className="text-[11px] text-space-dim mt-0.5 truncate">
                  {r.capacity} seats • {r.buildingCode}
                </div>
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Selected Room Details & Time Slots Schedule */}
      {selectedRoom && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Room Profile Summary */}
          <Card className="p-5 flex flex-col justify-between">
            <div className="space-y-4">
              <img
                src={selectedRoom.image}
                alt={selectedRoom.name}
                className="w-full aspect-video rounded-xl object-cover border border-space-border"
              />
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs text-secondary font-bold">
                    {selectedRoom.code}
                  </span>
                  <Badge variant={selectedRoom.status === 'available' ? 'available' : 'busy'} dot size="sm">
                    {selectedRoom.status === 'available' ? 'Available' : 'Occupied'}
                  </Badge>
                </div>
                <h3 className="font-bold text-base text-white">{selectedRoom.name}</h3>
                <p className="text-xs text-space-dim mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>{selectedRoom.buildingName || selectedRoom.building} • {selectedRoom.floor}</span>
                </p>
              </div>

              <div className="p-3 rounded-lg bg-space-sidebar border border-space-border/60 text-xs space-y-1.5 text-space-muted">
                <div className="flex justify-between">
                  <span>Capacity:</span>
                  <strong className="text-white">{selectedRoom.capacity} People</strong>
                </div>
                <div className="flex justify-between">
                  <span>Noise Rating:</span>
                  <strong className="text-secondary">{selectedRoom.noiseLevel}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Operating Hours:</span>
                  <strong className="text-white">{selectedRoom.operatingHours}</strong>
                </div>
              </div>
            </div>

            <Button
              variant="primary"
              className="w-full mt-4"
              onClick={() => setActiveModalRoom(selectedRoom)}
              rightIcon={Sparkles}
            >
              Open Reservation Modal
            </Button>
          </Card>

          {/* Time Slot Schedule */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between text-xs text-space-muted px-1">
              <span className="font-medium text-white">Daily Time Slot Schedule ({selectedDate})</span>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" /> Open
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" /> Booked
                </span>
              </div>
            </div>

            <div className="space-y-2">
              {timeSlots.map((slot, idx) => {
                const details = getSlotDetails(slot);
                const isAvail = details.status === 'available';

                return (
                  <div
                    key={idx}
                    onClick={() => handleSlotClick(slot, details)}
                    className={`
                      p-3.5 rounded-xl border flex items-center justify-between transition-all
                      ${isAvail
                        ? 'bg-space-card hover:bg-space-card-hover border-space-border hover:border-emerald-500/40 cursor-pointer group'
                        : 'bg-space-sidebar/60 border-space-border/40 opacity-70 cursor-not-allowed'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <Clock className={`w-4 h-4 ${isAvail ? 'text-emerald-400' : 'text-space-dim'}`} />
                      <span className="text-sm font-semibold text-white font-mono">
                        {slot}
                      </span>
                    </div>

                    <div>
                      {isAvail ? (
                        <span className="text-xs text-emerald-400 font-medium group-hover:underline flex items-center gap-1">
                          Reserve Block →
                        </span>
                      ) : (
                        <span className="text-xs text-space-dim italic">
                          {details.bookedBy}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomBookingView;
