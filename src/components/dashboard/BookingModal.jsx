import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Input from '../common/Input';
import { useBooking } from '../../context/BookingContext';
import { Calendar, Clock, Users, Sparkles, ShieldCheck, MapPin, AlertCircle, CheckCircle2 } from 'lucide-react';

const BookingModal = () => {
  const { activeModalRoom, setActiveModalRoom, addReservation, rooms, reservations } = useBooking();

  const [selectedRoomId, setSelectedRoomId] = useState('');
  const [selectedDate, setSelectedDate] = useState('Today, Nov 12, 2026');
  const [startTime, setStartTime] = useState('14:00');
  const [durationHours, setDurationHours] = useState(2);
  const [purpose, setPurpose] = useState('Distributed Systems Capstone Sprint');
  const [groupSize, setGroupSize] = useState(2);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (activeModalRoom && activeModalRoom.id) {
      setSelectedRoomId(activeModalRoom.id);
    } else if (rooms.length > 0) {
      setSelectedRoomId(rooms[0].id);
    }
  }, [activeModalRoom, rooms]);

  const currentRoom = rooms.find(r => r.id === selectedRoomId) || rooms[0];

  // Recalculate computed slot string e.g. "14:00 - 16:00"
  const getComputedSlot = (start, duration) => {
    const startHour = parseInt(start.split(':')[0], 10);
    const startMin = start.split(':')[1] || '00';
    const endHour = startHour + duration;
    const formattedEnd = `${endHour < 10 ? '0' : ''}${endHour}:${startMin}`;
    return `${start} - ${formattedEnd}`;
  };

  const computedTimeSlot = getComputedSlot(startTime, durationHours);

  // Check if a given start time slot is already booked for this room on this date
  const isSlotBooked = (time) => {
    if (!currentRoom) return false;
    const slotStr = getComputedSlot(time, durationHours);
    const startH = parseInt(time.split(':')[0], 10);
    const endH = startH + durationHours;

    return reservations.some(res => {
      if (res.roomId !== currentRoom.id || res.date !== selectedDate || res.status === 'Cancelled') {
        return false;
      }
      const existingStart = parseInt(res.timeSlot.split('-')[0].split(':')[0], 10);
      const existingEnd = parseInt(res.timeSlot.split('-')[1].split(':')[0], 10);
      return startH < existingEnd && endH > existingStart;
    });
  };

  const handleClose = () => {
    setValidationError('');
    setActiveModalRoom(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');

    if (!currentRoom) return;

    // Validate Group Size
    if (groupSize > currentRoom.capacity) {
      setValidationError(`Group size (${groupSize}) exceeds room capacity (${currentRoom.capacity} seats).`);
      return;
    }

    if (groupSize < 1) {
      setValidationError('Group size must be at least 1 student.');
      return;
    }

    // Check Operating Hours
    if (currentRoom.operatingHours) {
      const [openStr, closeStr] = currentRoom.operatingHours.split('(')[0].split('-');
      if (openStr && closeStr) {
        const openH = parseInt(openStr.split(':')[0], 10);
        const closeH = parseInt(closeStr.split(':')[0], 10);
        const startH = parseInt(startTime.split(':')[0], 10);
        const endH = startH + durationHours;

        if (startH < openH || (closeH > openH && endH > closeH)) {
          setValidationError(`Selected slot (${computedTimeSlot}) falls outside ${currentRoom.buildingName} operating hours (${currentRoom.operatingHours}).`);
          return;
        }
      }
    }

    // Check Overlapping Bookings
    if (isSlotBooked(startTime)) {
      setValidationError(`Overlap Conflict: ${currentRoom.name} is already reserved for ${computedTimeSlot} on ${selectedDate}. Please select another time.`);
      return;
    }

    try {
      setIsSubmitting(true);
      await new Promise(r => setTimeout(r, 500));

      addReservation({
        roomId: currentRoom.id,
        date: selectedDate,
        timeSlot: computedTimeSlot,
        purpose: purpose,
        attendeesCount: groupSize,
        duration: `${durationHours} ${durationHours === 1 ? 'Hour' : 'Hours'}`
      });

      setIsSubmitting(false);
      handleClose();
    } catch (err) {
      setIsSubmitting(false);
      setValidationError(err.message || 'Booking submission failed. Please verify details.');
    }
  };

  const dates = [
    { label: 'Today', date: 'Today, Nov 12, 2026' },
    { label: 'Tomorrow', date: 'Tomorrow, Nov 13, 2026' },
    { label: 'Fri, Nov 14', date: 'Friday, Nov 14, 2026' },
    { label: 'Sat, Nov 15', date: 'Saturday, Nov 15, 2026' }
  ];

  const timeOptions = [
    '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'
  ];

  if (!activeModalRoom && !currentRoom) return null;

  return (
    <Modal
      isOpen={!!activeModalRoom}
      onClose={handleClose}
      title="Reserve Space at TIET Patiala"
      subtitle="Frictionless student reservation synchronized with your TIET digital pass."
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Selected Room Header Preview */}
        {currentRoom && (
          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-space-sidebar border border-space-border/80">
            <img
              src={currentRoom.image}
              alt={currentRoom.name}
              className="w-16 h-14 rounded-lg object-cover border border-space-border shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-secondary font-bold">
                  {currentRoom.code}
                </span>
                <span className="text-xs text-space-muted flex items-center gap-1">
                  <Users className="w-3 h-3 text-primary" /> Max {currentRoom.capacity} People
                </span>
              </div>
              <h4 className="font-semibold text-sm text-space-text truncate">
                {currentRoom.name}
              </h4>
              <p className="text-xs text-space-dim flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-space-dim shrink-0" />
                <span>{currentRoom.buildingName} • {currentRoom.floor}</span>
              </p>
            </div>
          </div>
        )}

        {/* Validation Error Banner */}
        {validationError && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="leading-snug">{validationError}</span>
          </div>
        )}

        {/* Room Selector dropdown */}
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-space-text">
            Choose Campus Space
          </label>
          <select
            value={selectedRoomId}
            onChange={(e) => {
              setSelectedRoomId(e.target.value);
              setValidationError('');
            }}
            className="w-full bg-[#141724] border border-space-border rounded-lg text-xs text-space-text px-3 py-2.5 focus:outline-none focus:border-primary"
          >
            {rooms.map(room => (
              <option key={room.id} value={room.id} className="bg-space-card">
                {room.buildingCode} - {room.name} ({room.roomType}, max {room.capacity} seats)
              </option>
            ))}
          </select>
        </div>

        {/* Date Selection */}
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-space-text">
            Select Reservation Date
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {dates.map((d, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSelectedDate(d.date);
                  setValidationError('');
                }}
                className={`text-xs p-2 rounded-lg border text-center transition-all ${
                  selectedDate === d.date
                    ? 'border-primary bg-primary/15 text-primary-light font-medium shadow-sm'
                    : 'border-space-border bg-space-sidebar text-space-muted hover:border-space-border-light'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Start Time & Duration */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-space-text">
              Start Time Slot
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
              {timeOptions.map((t) => {
                const booked = isSlotBooked(t);
                return (
                  <button
                    key={t}
                    type="button"
                    disabled={booked}
                    onClick={() => {
                      setStartTime(t);
                      setValidationError('');
                    }}
                    className={`text-xs py-1.5 px-2 rounded-lg border text-center font-mono transition-all ${
                      booked
                        ? 'bg-space-sidebar/40 border-space-border/30 text-space-dim line-through opacity-50 cursor-not-allowed'
                        : startTime === t
                        ? 'border-secondary bg-secondary/15 text-secondary font-bold shadow-sm'
                        : 'border-space-border bg-space-sidebar text-space-muted hover:text-white'
                    }`}
                    title={booked ? 'Slot already reserved' : 'Available slot'}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-space-text">
              Duration
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((hrs) => (
                <button
                  key={hrs}
                  type="button"
                  onClick={() => setDurationHours(hrs)}
                  className={`text-xs py-2 rounded-lg border text-center font-medium transition-all ${
                    durationHours === hrs
                      ? 'border-primary bg-primary/15 text-primary-light font-bold'
                      : 'border-space-border bg-space-sidebar text-space-muted hover:text-white'
                  }`}
                >
                  {hrs} {hrs === 1 ? 'Hour' : 'Hours'}
                </button>
              ))}
            </div>
            <div className="text-[11px] text-space-dim pt-1 flex items-center justify-between">
              <span>Selected Window:</span>
              <strong className="text-secondary font-mono">{computedTimeSlot}</strong>
            </div>
          </div>
        </div>

        {/* Group Size & Purpose */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-space-text mb-1.5">
              Group Size <span className="text-primary">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                min="1"
                max={currentRoom?.capacity || 20}
                value={groupSize}
                onChange={(e) => {
                  setGroupSize(parseInt(e.target.value, 10) || 1);
                  setValidationError('');
                }}
                className={`w-full bg-[#141724] border text-xs text-space-text rounded-lg px-3 py-2.5 focus:outline-none ${
                  groupSize > (currentRoom?.capacity || 20)
                    ? 'border-rose-500 focus:border-rose-500'
                    : 'border-space-border focus:border-primary'
                }`}
              />
            </div>
            <span className="text-[10px] text-space-dim mt-0.5 block">
              Max room limit: {currentRoom?.capacity} seats
            </span>
          </div>

          <div className="sm:col-span-2">
            <Input
              label="Session Purpose / Course Code"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="e.g. Distributed Systems Capstone Sprint"
              required
            />
          </div>
        </div>

        {/* Simulated Demo Disclaimer & Policy */}
        <div className="p-3 rounded-lg bg-space-sidebar/80 border border-space-border/60 text-[11px] text-space-muted space-y-1">
          <div className="flex items-center gap-1.5 text-secondary font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>TIET Campus Policy (15-Minute Auto-Release)</span>
          </div>
          <p className="leading-relaxed text-space-dim">
            Scan your digital QR pass at the entrance terminal within 15 minutes of session start. Rooms without confirmed badge check-in are freed for waitlisted students.
          </p>
          <p className="text-[10px] text-space-dim italic">
            * Note: Capacities and real-time sensor occupancy are simulated demonstration data for TIET Patiala.
          </p>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-space-border/50">
          <Button variant="ghost" size="sm" onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            loading={isSubmitting}
            rightIcon={Sparkles}
          >
            Confirm Reservation
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default BookingModal;
