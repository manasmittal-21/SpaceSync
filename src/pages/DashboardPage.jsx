import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import StatCard from '../components/dashboard/StatCard';
import UpcomingReservations from '../components/dashboard/UpcomingReservations';
import RecommendedRoomsSection from '../components/dashboard/RecommendedRoomsSection';
import RecentlyViewedSection from '../components/dashboard/RecentlyViewedSection';
import ExploreSpacesView from '../components/dashboard/ExploreSpacesView';
import CampusMapView from '../components/dashboard/CampusMapView';
import MiniMapPreview from '../components/dashboard/MiniMapPreview';
import RoomBookingView from '../components/dashboard/RoomBookingView';
import SeatBookingView from '../components/dashboard/SeatBookingView';
import MyReservationsView from '../components/dashboard/MyReservationsView';
import NotificationsView from '../components/dashboard/NotificationsView';
import ProfileView from '../components/dashboard/ProfileView';
import SettingsView from '../components/dashboard/SettingsView';
import BookingModal from '../components/dashboard/BookingModal';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import {
  CalendarDays,
  Clock,
  Sparkles,
  Award,
  Zap,
  DoorOpen,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Compass,
  Building2,
  Activity,
  Flame
} from 'lucide-react';

const DashboardPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'overview';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const { user, isAuthenticated, loginAsDemo } = useAuth();
  const { stats, setActiveModalRoom, rooms, locations, focusLocationOnMap } = useBooking();
  const navigate = useNavigate();

  // If not authenticated, automatically log in as demo student
  useEffect(() => {
    if (!isAuthenticated) {
      loginAsDemo();
    }
  }, [isAuthenticated, loginAsDemo]);

  // Keep activeTab synced with URL param
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && tabParam !== activeTab) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  };

  const handleJumpToBuilding = (locationId) => {
    focusLocationOnMap(locationId);
    handleSelectTab('map');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Campus Welcome Banner */}
            <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-space-card via-[#1A1D2C] to-space-sidebar border border-space-border overflow-hidden shadow-card-elevated">
              {/* Background Ambient Glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-secondary uppercase tracking-wider mb-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span>TIET Patiala Campus Telemetry Live</span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Welcome to SpaceSync at TIET, Patiala!
                  </h1>

                  <p className="mt-1 text-xs sm:text-sm text-space-muted max-w-xl leading-relaxed">
                    Good evening, <strong className="text-white">{user?.name?.split(' ')[0] || 'Alex'}</strong>. You have <strong className="text-white">{stats.activeReservations} reservations</strong>. Nava Nalanda Silent Pod 3A is open for check-in.
                  </p>
                </div>

                {/* Quick Action CTAs */}
                <div className="flex items-center gap-3 shrink-0">
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => handleSelectTab('map')}
                    leftIcon={Compass}
                    rightIcon={ArrowRight}
                  >
                    Explore Campus Map
                  </Button>

                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => setActiveModalRoom(rooms[0])}
                    leftIcon={Sparkles}
                    className="shadow-glow-primary"
                  >
                    Quick Reserve
                  </Button>
                </div>
              </div>
            </div>

            {/* Booking Statistics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                label="Active Reservations"
                value={stats.activeReservations}
                trend="2 this week"
                trendPositive={true}
                icon={CalendarDays}
                accent="primary"
                helper="Nava Nalanda Pod next"
              />

              <StatCard
                label="Study Hours Logged"
                value={`${stats.totalHoursStudied} hrs`}
                trend={stats.hoursTrend}
                trendPositive={true}
                icon={Clock}
                accent="secondary"
                helper="Fall 2026 Term"
              />

              <StatCard
                label="TIET SpacePoints"
                value={`${stats.spacePoints} pts`}
                trend="+50 earned today"
                trendPositive={true}
                icon={Award}
                accent="amber"
                helper="Diamond Scholar Tier"
              />

              <StatCard
                label="Check-In Reliability"
                value={stats.punctualityRate || '98.5%'}
                trend="Top 5% student"
                trendPositive={true}
                icon={ShieldCheck}
                accent="emerald"
                helper="Zero ghost releases"
              />
            </div>

            {/* Interactive Campus Map Preview & Popular TIET Hubs */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left: Mini Map Preview */}
              <div className="lg:col-span-7">
                <MiniMapPreview onOpenFullMap={() => handleSelectTab('map')} />
              </div>

              {/* Right: TIET Campus Occupancy & Popular Locations */}
              <div className="lg:col-span-5 space-y-4">
                <Card className="p-5">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-space-border/60">
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-amber-400" />
                      <h3 className="text-sm font-bold text-white tracking-tight">
                        Popular TIET Study Locations
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400">Live Occupancy</span>
                  </div>

                  <div className="space-y-2.5">
                    {locations.slice(0, 4).map((loc) => {
                      const locRooms = rooms.filter(r => r.locationId === loc.id);
                      const openCount = locRooms.filter(r => r.status === 'available').length;
                      return (
                        <div
                          key={loc.id}
                          onClick={() => handleJumpToBuilding(loc.id)}
                          className="p-3 rounded-xl bg-space-sidebar hover:bg-[#202434] border border-space-border/70 flex items-center justify-between transition-colors cursor-pointer group"
                        >
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono text-[11px] font-bold text-secondary">
                                {loc.shortCode}
                              </span>
                              <h4 className="text-xs font-semibold text-white group-hover:text-primary-light transition-colors truncate max-w-[170px]">
                                {loc.name}
                              </h4>
                            </div>
                            <span className="text-[10px] text-space-dim block mt-0.5">
                              {loc.categoryLabel}
                            </span>
                          </div>

                          <div className="text-right">
                            {loc.isBookable ? (
                              <span className="text-xs text-emerald-400 font-mono font-medium block">
                                {openCount} Open
                              </span>
                            ) : (
                              <span className="text-[11px] text-space-dim italic block">
                                Landmark
                              </span>
                            )}
                            <span className="text-[10px] text-space-dim flex items-center gap-1 justify-end group-hover:text-white">
                              View on map →
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>

                {/* Campus Occupancy Overview */}
                <Card className="p-4 bg-gradient-to-br from-space-card to-[#151926]">
                  <div className="flex items-center justify-between text-xs text-space-muted mb-2">
                    <span className="flex items-center gap-1.5 text-white font-medium">
                      <Activity className="w-3.5 h-3.5 text-secondary" />
                      Campus-Wide Seat Utilization
                    </span>
                    <span className="font-mono text-emerald-400 font-bold">68% Active</span>
                  </div>
                  <div className="w-full h-2 bg-space-sidebar rounded-full overflow-hidden border border-space-border/80">
                    <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full w-[68%]" />
                  </div>
                  <p className="text-[11px] text-space-dim mt-2">
                    Nava Nalanda Library 3rd Floor quiet carrels filling fast for evening study.
                  </p>
                </Card>
              </div>
            </div>

            {/* Upcoming Reservations Section */}
            <UpcomingReservations />

            {/* Recommended Rooms Section */}
            <RecommendedRoomsSection onSelectExplore={() => handleSelectTab('explore')} />

            {/* Recently Viewed Rooms Section */}
            <RecentlyViewedSection />
          </div>
        );

      case 'map':
        return <CampusMapView />;

      case 'explore':
        return <ExploreSpacesView />;

      case 'room-booking':
        return <RoomBookingView />;

      case 'seat-booking':
        return <SeatBookingView />;

      case 'reservations':
        return <MyReservationsView />;

      case 'notifications':
        return <NotificationsView />;

      case 'profile':
        return <ProfileView />;

      case 'settings':
        return <SettingsView />;

      default:
        return <div>Section not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#10121A] text-space-text flex">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        <DashboardHeader
          activeTab={activeTab}
          onSelectTab={handleSelectTab}
          onOpenMobile={() => setMobileSidebarOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {renderTabContent()}
        </main>
      </div>

      {/* Quick Booking Modal */}
      <BookingModal />
    </div>
  );
};

export default DashboardPage;
