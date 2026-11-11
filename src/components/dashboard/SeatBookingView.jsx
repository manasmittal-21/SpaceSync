import React, { useState } from 'react';
import { Armchair, Zap, Sun, VolumeX, CheckCircle2, Sparkles, MapPin } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { useBooking } from '../../context/BookingContext';

const SeatBookingView = () => {
  const { addReservation, showToast } = useBooking();
  const [selectedSeat, setSelectedSeat] = useState('S-04');
  const [selectedBuilding, setSelectedBuilding] = useState('Nava Nalanda Central Library — 3rd Floor Silent Wing');

  const seats = [
    { id: 'S-01', status: 'busy', power: '65W USB-C', light: 'Window Side (Pond View)', noise: '< 15dB' },
    { id: 'S-02', status: 'available', power: '100W USB-C', light: 'Task Lamp', noise: '< 15dB' },
    { id: 'S-03', status: 'busy', power: '65W USB-C', light: 'Window Side (Pond View)', noise: '< 15dB' },
    { id: 'S-04', status: 'available', power: 'Dual AC + USB-C', light: 'Window Side (Pond View)', noise: '< 15dB', recommended: true },
    { id: 'S-05', status: 'available', power: 'Dual AC', light: 'Task Lamp', noise: '< 15dB' },
    { id: 'S-06', status: 'busy', power: '65W USB-C', light: 'Indirect Daylight', noise: '< 15dB' },
    { id: 'S-07', status: 'available', power: 'Dual AC + Qi', light: 'Indirect Daylight', noise: '< 15dB' },
    { id: 'S-08', status: 'busy', power: '65W USB-C', light: 'Task Lamp', noise: '< 15dB' },
    { id: 'S-09', status: 'available', power: 'Dual AC + USB-C', light: 'Window Side (Pond View)', noise: '< 15dB' },
    { id: 'S-10', status: 'available', power: '100W USB-C', light: 'Window Side (Pond View)', noise: '< 15dB' },
    { id: 'S-11', status: 'busy', power: '65W USB-C', light: 'Task Lamp', noise: '< 15dB' },
    { id: 'S-12', status: 'available', power: 'Dual AC', light: 'Task Lamp', noise: '< 15dB' },
  ];

  const currentSeatObj = seats.find(s => s.id === selectedSeat) || seats[3];

  const handleReserveSeat = () => {
    addReservation({
      roomId: 'room-nnl-301',
      date: 'Today, Nov 12, 2026',
      timeSlot: '17:00 - 20:00',
      purpose: `Individual Silent Carrel Study (Desk ${selectedSeat})`,
      attendeesCount: 1,
      duration: '3 Hours'
    });
    showToast(`Carrel Desk ${selectedSeat} reserved at Nava Nalanda Central Library!`, 'success');
  };

  return (
    <div className="space-y-6">
      <Card className="p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-space-border/60">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-secondary uppercase tracking-wider mb-1">
              <VolumeX className="w-4 h-4" />
              <span>TIET Silent Study Carrels</span>
            </div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Individual Seat & Focus Carrel Discovery
            </h2>
            <p className="text-xs text-space-muted mt-0.5">
              Select an individual sound-isolated desk for dissertation drafting and deep computational focus.
            </p>
          </div>

          <div className="text-xs font-mono bg-space-sidebar border border-space-border px-3 py-1.5 rounded-lg text-emerald-400">
            7 Desks Open Right Now
          </div>
        </div>

        {/* Building Selector */}
        <div className="mt-4">
          <label className="block text-xs font-semibold text-space-muted uppercase tracking-wider mb-1.5">
            Campus Silent Study Wing
          </label>
          <select
            value={selectedBuilding}
            onChange={(e) => setSelectedBuilding(e.target.value)}
            className="w-full bg-[#141724] border border-space-border rounded-lg text-xs text-space-text px-3 py-2.5 focus:outline-none focus:border-primary"
          >
            <option>Nava Nalanda Central Library — 3rd Floor Silent Wing</option>
            <option>COS Complex — 2nd Floor Quiet Computing Loft</option>
            <option>Lecture Hall Complex (TAN) — Mezzanine Study Nook</option>
          </select>
        </div>
      </Card>

      {/* Visual Desk Layout Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-space-border/50 text-xs">
            <span className="font-semibold text-white">Floor Plan: East Silent Bay (Desks S-01 to S-12)</span>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500/80 inline-block" /> Available
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-rose-500/60 inline-block" /> Occupied
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-primary inline-block" /> Selected
              </span>
            </div>
          </div>

          {/* Window Side Indicator */}
          <div className="w-full text-center py-1.5 mb-4 rounded-lg bg-secondary/10 border border-secondary/20 text-[11px] font-mono text-secondary flex items-center justify-center gap-2">
            <Sun className="w-3.5 h-3.5" />
            <span>Nava Nalanda Lotus Pond Facing Window Bay</span>
          </div>

          {/* Seat Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {seats.map((seat) => {
              const isSelected = selectedSeat === seat.id;
              const isBusy = seat.status === 'busy';

              return (
                <button
                  key={seat.id}
                  type="button"
                  disabled={isBusy}
                  onClick={() => setSelectedSeat(seat.id)}
                  className={`
                    p-3.5 rounded-xl border text-center transition-all relative flex flex-col items-center justify-center gap-1
                    ${isSelected
                      ? 'bg-primary border-primary text-white shadow-glow-primary scale-105 z-10'
                      : isBusy
                      ? 'bg-space-sidebar/40 border-space-border/30 opacity-50 cursor-not-allowed text-space-dim'
                      : 'bg-space-card hover:bg-[#202535] border-space-border text-space-text hover:border-emerald-500/50'
                    }
                  `}
                >
                  <Armchair className={`w-5 h-5 ${isSelected ? 'text-white' : isBusy ? 'text-space-dim' : 'text-emerald-400'}`} />
                  <span className="font-mono text-xs font-bold">{seat.id}</span>
                  <span className="text-[10px] opacity-75">{isBusy ? 'Occupied' : 'Open'}</span>

                  {seat.recommended && !isBusy && (
                    <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-secondary rounded-full" title="Highest rated carrel" />
                  )}
                </button>
              );
            })}
          </div>
        </Card>

        {/* Selected Desk Spec Card */}
        <Card className="p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-bold text-secondary">
                Desk {currentSeatObj.id}
              </span>
              <Badge variant="available" dot size="sm">
                Ready for Check-In
              </Badge>
            </div>

            <h3 className="text-base font-bold text-white">
              Nava Nalanda Silent Carrel Station
            </h3>
            <p className="text-xs text-space-muted">
              Equipped with acoustic baffle wings and dedicated circadian LED reading arm.
            </p>

            <div className="space-y-2 pt-2 border-t border-space-border/50 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-space-sidebar">
                <span className="flex items-center gap-1.5 text-space-muted">
                  <Zap className="w-3.5 h-3.5 text-secondary" /> Power Port:
                </span>
                <strong className="text-white font-medium">{currentSeatObj.power}</strong>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-space-sidebar">
                <span className="flex items-center gap-1.5 text-space-muted">
                  <Sun className="w-3.5 h-3.5 text-amber-400" /> Lighting:
                </span>
                <strong className="text-white font-medium">{currentSeatObj.light}</strong>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-space-sidebar">
                <span className="flex items-center gap-1.5 text-space-muted">
                  <VolumeX className="w-3.5 h-3.5 text-primary-light" /> Noise Cap:
                </span>
                <strong className="text-emerald-400 font-medium">{currentSeatObj.noise}</strong>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-space-border/50 space-y-2">
            <Button
              variant="primary"
              className="w-full"
              onClick={handleReserveSeat}
              rightIcon={CheckCircle2}
            >
              Reserve Desk {selectedSeat} (3 Hrs)
            </Button>
            <p className="text-[11px] text-center text-space-dim">
              Points: 10 pts/hr • Free TIET student tier allowance
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SeatBookingView;
