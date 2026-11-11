import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  MapPin,
  Compass,
  DoorOpen,
  Armchair,
  CalendarDays,
  Bell,
  User,
  Settings,
  LogOut,
  Layers,
  ChevronRight,
  Sparkles,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useBooking } from '../../context/BookingContext';

const Sidebar = ({ activeTab, onSelectTab, mobileOpen, onCloseMobile }) => {
  const { user, logout } = useAuth();
  const { notifications } = useBooking();
  const navigate = useNavigate();

  const unreadCount = notifications.filter(n => n.unread).length;

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'map', label: 'TIET Campus Map', icon: MapPin, highlight: true },
    { id: 'explore', label: 'Explore Spaces', icon: Compass },
    { id: 'room-booking', label: 'Room Booking', icon: DoorOpen },
    { id: 'seat-booking', label: 'Seat Booking', icon: Armchair },
    { id: 'reservations', label: 'My Reservations', icon: CalendarDays },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      badge: unreadCount > 0 ? unreadCount : null
    },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleNavClick = (id) => {
    onSelectTab(id);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
          fixed top-0 bottom-0 left-0 z-50 w-64 bg-space-sidebar border-r border-space-border
          flex flex-col justify-between transition-transform duration-300 ease-in-out
          lg:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Top: Logo & Close Button for mobile */}
        <div>
          <div className="h-16 px-5 border-b border-space-border/70 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary p-[1px] shadow-glow-primary">
                <div className="w-full h-full bg-[#10121A] rounded-[7px] flex items-center justify-center">
                  <Layers className="w-4 h-4 text-secondary" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-base text-white tracking-tight">SpaceSync</span>
                  <span className="text-[9px] uppercase font-bold text-secondary bg-secondary/15 px-1 py-0.2 rounded border border-secondary/30">
                    TIET
                  </span>
                </div>
                <span className="text-[10px] text-space-dim font-mono leading-none">Patiala Campus</span>
              </div>
            </Link>

            {onCloseMobile && (
              <button
                onClick={onCloseMobile}
                className="lg:hidden p-1.5 rounded-lg text-space-muted hover:text-white hover:bg-space-card"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            <div className="px-3 py-2 text-[11px] font-semibold text-space-dim uppercase tracking-wider">
              Navigation
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`
                    w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium
                    transition-all duration-150 group
                    ${isActive
                      ? 'bg-primary/15 text-white border border-primary/30 shadow-sm'
                      : 'text-space-muted hover:text-white hover:bg-space-card'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isActive
                          ? 'text-primary-light'
                          : item.highlight
                          ? 'text-secondary group-hover:text-secondary'
                          : 'text-space-dim group-hover:text-space-text'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge ? (
                    <span className="px-1.5 py-0.5 text-[11px] font-semibold bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-full">
                      {item.badge}
                    </span>
                  ) : item.highlight && !isActive ? (
                    <span className="text-[9px] font-mono text-secondary bg-secondary/10 border border-secondary/25 px-1.5 py-0.5 rounded">
                      Live GPS
                    </span>
                  ) : isActive ? (
                    <ChevronRight className="w-3.5 h-3.5 text-primary-light" />
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Profile Section */}
        <div className="p-3 border-t border-space-border/70 space-y-2">
          {user && (
            <div className="p-3 rounded-xl bg-space-card/80 border border-space-border/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover border border-space-border shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-white truncate">
                    {user.name}
                  </p>
                  <p className="text-[11px] font-mono text-secondary truncate">
                    {user.studentId}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="p-1.5 rounded-lg text-space-dim hover:text-rose-400 hover:bg-space-sidebar transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Quick status pill */}
          <div className="px-3 py-1.5 rounded-lg bg-space-bg flex items-center justify-between text-[11px] text-space-dim">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
              TIET eduroam Mesh
            </span>
            <span className="font-mono text-primary-light font-medium">850 pts</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
