import React, { createContext, useContext, useState, useEffect } from 'react';
import { TIET_ROOMS, INITIAL_TIET_RESERVATIONS } from '../data/rooms';
import { CAMPUS_LOCATIONS } from '../data/campusLocations';
import { USER_STATS, INITIAL_NOTIFICATIONS } from '../data/mockData';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [locations] = useState(CAMPUS_LOCATIONS);
  const [rooms, setRooms] = useState(() => {
    try {
      const saved = localStorage.getItem('spacesync_rooms');
      return saved ? JSON.parse(saved) : TIET_ROOMS;
    } catch {
      return TIET_ROOMS;
    }
  });

  const [reservations, setReservations] = useState(() => {
    try {
      const saved = localStorage.getItem('spacesync_reservations');
      return saved ? JSON.parse(saved) : INITIAL_TIET_RESERVATIONS;
    } catch {
      return INITIAL_TIET_RESERVATIONS;
    }
  });

  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [stats, setStats] = useState(USER_STATS);
  const [recentlyViewed, setRecentlyViewed] = useState([TIET_ROOMS[0], TIET_ROOMS[1], TIET_ROOMS[4]]);
  const [toast, setToast] = useState(null);
  
  // Interactive Map & Modal States
  const [activeModalRoom, setActiveModalRoom] = useState(null);
  const [selectedMapLocation, setSelectedMapLocation] = useState(null);
  const [focusedLocationId, setFocusedLocationId] = useState(null);

  // Persist reservations & rooms to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('spacesync_reservations', JSON.stringify(reservations));
    } catch (e) {
      console.error('Failed to save reservations to localStorage', e);
    }
  }, [reservations]);

  useEffect(() => {
    try {
      localStorage.setItem('spacesync_rooms', JSON.stringify(rooms));
    } catch (e) {
      console.error('Failed to save rooms to localStorage', e);
    }
  }, [rooms]);

  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  const closeToast = () => setToast(null);

  // Helper to parse time string like "14:00" to minutes from midnight
  const parseTimeToMinutes = (timeStr) => {
    if (!timeStr) return 0;
    const parts = timeStr.trim().split(':');
    return parseInt(parts[0], 10) * 60 + parseInt(parts[1] || '0', 10);
  };

  // Helper to parse time slot string like "14:00 - 16:00" to { start, end } in minutes
  const parseSlotRange = (slotStr) => {
    if (!slotStr || !slotStr.includes('-')) return { start: 0, end: 0 };
    const [startStr, endStr] = slotStr.split('-');
    return {
      start: parseTimeToMinutes(startStr),
      end: parseTimeToMinutes(endStr)
    };
  };

  // Toggle favorite room
  const toggleFavorite = (roomId) => {
    setRooms(prev =>
      prev.map(r => (r.id === roomId ? { ...r, isFavorite: !r.isFavorite } : r))
    );
    const room = rooms.find(r => r.id === roomId);
    if (room) {
      showToast(
        !room.isFavorite ? `Saved "${room.name}" to favorites` : `Removed "${room.name}" from favorites`,
        'info'
      );
    }
  };

  // Add room to recently viewed
  const addToRecentlyViewed = (room) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(r => r.id !== room.id);
      return [room, ...filtered].slice(0, 5);
    });
  };

  // Validate and Add New Reservation with Strict Checks
  const addReservation = (bookingData) => {
    const room = rooms.find(r => r.id === bookingData.roomId) || rooms[0];

    if (!room) {
      showToast('Selected room not found.', 'error');
      throw new Error('Room not found');
    }

    const attendees = parseInt(bookingData.attendeesCount || 1, 10);
    const date = bookingData.date || 'Today, Nov 12, 2026';
    const timeSlot = bookingData.timeSlot || '14:00 - 16:00';
    const newRange = parseSlotRange(timeSlot);

    // 1. Capacity Validation: Prevent group size exceeding room capacity
    if (attendees > room.capacity) {
      const err = `Group size (${attendees}) exceeds room capacity (${room.capacity} seats). Please choose a larger room or reduce attendees.`;
      showToast(err, 'error');
      throw new Error(err);
    }

    // 2. Operating Hours Validation
    if (room.operatingHours) {
      const [openStr, closeStr] = room.operatingHours.split('(')[0].split('-');
      if (openStr && closeStr) {
        const openMin = parseTimeToMinutes(openStr);
        const closeMin = parseTimeToMinutes(closeStr);
        // If closeMin is e.g. 02:00 (next day, represented as < openMin)
        const adjustedClose = closeMin < openMin ? closeMin + 24 * 60 : closeMin;
        const adjustedEnd = newRange.end < newRange.start ? newRange.end + 24 * 60 : newRange.end;

        if (newRange.start < openMin || adjustedEnd > adjustedClose) {
          const err = `Booking time (${timeSlot}) is outside ${room.buildingName} operating hours (${room.operatingHours}).`;
          showToast(err, 'error');
          throw new Error(err);
        }
      }
    }

    // 3. Overlapping Booking Check: Prevent double-booking same room on same date
    const hasOverlap = reservations.some(res => {
      if (res.roomId !== room.id || res.date !== date || res.status === 'Cancelled') {
        return false;
      }
      const existingRange = parseSlotRange(res.timeSlot);
      // Overlap condition: startA < endB && endA > startB
      return newRange.start < existingRange.end && newRange.end > existingRange.start;
    });

    if (hasOverlap) {
      const err = `Conflict: ${room.name} is already reserved during ${timeSlot} on ${date}. Please select a different time slot or date.`;
      showToast(err, 'error');
      throw new Error(err);
    }

    // Passed all validations! Create confirmed reservation
    const newReservation = {
      id: `res-tiet-${Math.floor(1000 + Math.random() * 9000)}`,
      roomId: room.id,
      locationId: room.locationId,
      roomName: room.name,
      roomCode: room.code,
      building: room.buildingName,
      floor: room.floor,
      date: date,
      timeSlot: timeSlot,
      startTime: timeSlot.split('-')[0].trim(),
      duration: bookingData.duration || '2 Hours',
      status: 'Confirmed',
      purpose: bookingData.purpose || 'Academic Project Collaboration',
      attendeesCount: attendees,
      attendees: [
        { name: 'Alex Rivera (You)', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' }
      ],
      qrPassCode: `TIET-${room.buildingCode || 'NNL'}-${Math.floor(10000 + Math.random() * 90000)}`,
      checkInAvailable: true,
      isCheckedIn: false,
      image: room.image
    };

    setReservations(prev => [newReservation, ...prev]);

    // Update statistics
    setStats(prev => ({
      ...prev,
      activeReservations: prev.activeReservations + 1,
      totalHoursStudied: parseFloat((prev.totalHoursStudied + 2.0).toFixed(1)),
      spacePoints: prev.spacePoints + 25
    }));

    // Add alert notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: 'TIET Space Confirmed',
      message: `Your booking for "${room.name}" (${room.code}) at ${room.buildingName} is locked for ${newReservation.date} at ${newReservation.timeSlot}.`,
      time: 'Just now',
      unread: true,
      type: 'success'
    };
    setNotifications(prev => [newNotif, ...prev]);

    showToast(`Successfully booked ${room.name} at ${room.buildingName}! Digital QR pass generated.`, 'success');
    return newReservation;
  };

  // Cancel reservation
  const cancelReservation = (reservationId) => {
    const res = reservations.find(r => r.id === reservationId);
    setReservations(prev => prev.filter(r => r.id !== reservationId));
    setStats(prev => ({
      ...prev,
      activeReservations: Math.max(0, prev.activeReservations - 1)
    }));
    showToast(`Reservation for "${res?.roomName || 'Room'}" has been cancelled.`, 'info');
  };

  // Check in
  const checkIn = (reservationId) => {
    setReservations(prev =>
      prev.map(r => (r.id === reservationId ? { ...r, isCheckedIn: true, status: 'Checked In' } : r))
    );
    setStats(prev => ({
      ...prev,
      spacePoints: prev.spacePoints + 50
    }));
    showToast('Check-in confirmed! Smart IoT lock unlocked. +50 SpacePoints awarded.', 'success');
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    showToast('All notifications marked as read', 'info');
  };

  // Focus map on a location
  const focusLocationOnMap = (locationId) => {
    setFocusedLocationId(locationId);
    const loc = locations.find(l => l.id === locationId);
    if (loc) {
      setSelectedMapLocation(loc);
    }
  };

  return (
    <BookingContext.Provider
      value={{
        locations,
        rooms,
        reservations,
        notifications,
        stats,
        recentlyViewed,
        toast,
        showToast,
        closeToast,
        toggleFavorite,
        addToRecentlyViewed,
        addReservation,
        cancelReservation,
        checkIn,
        markAllNotificationsRead,
        activeModalRoom,
        setActiveModalRoom,
        selectedMapLocation,
        setSelectedMapLocation,
        focusedLocationId,
        setFocusedLocationId,
        focusLocationOnMap
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
