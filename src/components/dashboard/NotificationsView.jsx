import React from 'react';
import { Bell, CheckCheck, Clock, Award, Info, Sparkles } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import { useBooking } from '../../context/BookingContext';

const NotificationsView = () => {
  const { notifications, markAllNotificationsRead } = useBooking();

  const getIcon = (type) => {
    switch (type) {
      case 'action':
        return <Clock className="w-4 h-4 text-primary-light" />;
      case 'success':
        return <Award className="w-4 h-4 text-emerald-400" />;
      default:
        return <Info className="w-4 h-4 text-secondary" />;
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            Campus Notifications & Alerts
          </h2>
          <p className="text-xs text-space-muted">
            Important booking alerts, check-in reminders, and facility status announcements
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={markAllNotificationsRead}
          leftIcon={CheckCheck}
        >
          Mark all as read
        </Button>
      </div>

      <div className="space-y-3">
        {notifications.map((notif) => (
          <Card
            key={notif.id}
            className={`p-4 sm:p-5 flex items-start gap-4 transition-all ${
              notif.unread
                ? 'border-primary/40 bg-space-card/90 shadow-sm'
                : 'border-space-border/60 bg-space-card/50 opacity-80'
            }`}
          >
            <div className="w-9 h-9 rounded-xl bg-space-sidebar border border-space-border flex items-center justify-center shrink-0 mt-0.5">
              {getIcon(notif.type)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <h4 className="text-sm font-semibold text-white truncate">
                  {notif.title}
                </h4>
                <span className="text-[11px] text-space-dim whitespace-nowrap">
                  {notif.time}
                </span>
              </div>
              <p className="text-xs text-space-muted leading-relaxed">
                {notif.message}
              </p>
            </div>

            {notif.unread && (
              <span className="w-2 h-2 rounded-full bg-primary shrink-0 self-center" />
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NotificationsView;
