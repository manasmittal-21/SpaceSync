import React from 'react';
import { Menu, Search, Plus, Bell, Calendar, Sparkles, QrCode } from 'lucide-react';
import Button from '../common/Button';
import { useAuth } from '../../context/AuthContext';
import { useBooking } from '../../context/BookingContext';

const DashboardHeader = ({ onOpenMobile, activeTab, onSelectTab }) => {
  const { user } = useAuth();
  const { setActiveModalRoom, rooms, notifications } = useBooking();

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleQuickBookClick = () => {
    setActiveModalRoom(rooms[0]);
  };

  const getPageTitle = (tab) => {
    switch (tab) {
      case 'overview':
        return 'TIET Student Dashboard';
      case 'map':
        return 'TIET Interactive Campus Map';
      case 'explore':
        return 'Explore Campus Spaces';
      case 'room-booking':
        return 'Room Reservation Matrix';
      case 'seat-booking':
        return 'Individual Seat & Carrel Booking';
      case 'reservations':
        return 'My Active Reservations';
      case 'notifications':
        return 'Campus Notifications';
      case 'profile':
        return 'Student Profile & Digital Badge';
      case 'settings':
        return 'Account & Preference Settings';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-space-bg/85 backdrop-blur-xl border-b border-space-border/70 px-4 sm:px-6 flex items-center justify-between">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobile}
          className="lg:hidden p-2 rounded-lg text-space-muted hover:text-white hover:bg-space-card"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
            {getPageTitle(activeTab)}
          </h1>
          <p className="text-[11px] text-space-dim hidden sm:block">
            Smart IoT Telemetry • Fall Semester 2026
          </p>
        </div>
      </div>

      {/* Right: Search / Quick Book / Notifs / Profile */}
      <div className="flex items-center gap-3">
        {/* Quick Reserve CTA button */}
        <Button
          size="sm"
          variant="primary"
          onClick={handleQuickBookClick}
          leftIcon={Plus}
          className="shadow-glow-primary"
        >
          <span className="hidden sm:inline">Quick Booking</span>
          <span className="sm:hidden">Book</span>
        </Button>

        {/* Notifications Button */}
        <button
          type="button"
          onClick={() => onSelectTab('notifications')}
          className="relative p-2 rounded-lg text-space-muted hover:text-white hover:bg-space-card transition-colors border border-space-border/60"
          title="Campus Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          )}
        </button>

        {/* Profile Avatar trigger */}
        <button
          type="button"
          onClick={() => onSelectTab('profile')}
          className="flex items-center gap-2 p-1 pl-2 rounded-lg hover:bg-space-card transition-colors border border-space-border/40"
        >
          <span className="text-xs font-medium text-space-text hidden md:inline">
            {user?.name?.split(' ')[0] || 'Student'}
          </span>
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
            alt={user?.name || 'User'}
            className="w-7 h-7 rounded-full object-cover border border-space-border"
          />
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
