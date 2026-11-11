import React, { useState } from 'react';
import { Settings, Bell, CalendarSync, Volume2, ShieldCheck, Save } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import { useBooking } from '../../context/BookingContext';

const SettingsView = () => {
  const { showToast } = useBooking();
  const [notifyCheckIn, setNotifyCheckIn] = useState(true);
  const [notifyAutoRelease, setNotifyAutoRelease] = useState(true);
  const [googleCalendarSync, setGoogleCalendarSync] = useState(true);
  const [quietHoursAlert, setQuietHoursAlert] = useState(true);

  const handleSave = () => {
    showToast('Preferences updated and saved to campus student profile!', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-lg font-bold text-white tracking-tight">
          Platform & Space Preferences
        </h2>
        <p className="text-xs text-space-muted">
          Manage how SpaceSync communicates alerts, syncs to calendars, and tracks check-ins.
        </p>
      </div>

      <Card className="p-6 space-y-6">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
            <Bell className="w-4 h-4 text-primary-light" />
            <span>Smart Check-In Notifications</span>
          </h3>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-xl bg-space-sidebar border border-space-border/60 cursor-pointer">
              <div>
                <span className="text-xs font-semibold text-white block">15-Minute Check-In Warning</span>
                <span className="text-[11px] text-space-dim">Sends SMS & push notification before reservation starts</span>
              </div>
              <input
                type="checkbox"
                checked={notifyCheckIn}
                onChange={(e) => setNotifyCheckIn(e.target.checked)}
                className="w-4 h-4 rounded bg-[#141724] border-space-border text-primary focus:ring-primary focus:ring-offset-0"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-space-sidebar border border-space-border/60 cursor-pointer">
              <div>
                <span className="text-xs font-semibold text-white block">Auto-Release Countdown</span>
                <span className="text-[11px] text-space-dim">Alerts 5 minutes before un-checked room is freed to waitlist</span>
              </div>
              <input
                type="checkbox"
                checked={notifyAutoRelease}
                onChange={(e) => setNotifyAutoRelease(e.target.checked)}
                className="w-4 h-4 rounded bg-[#141724] border-space-border text-primary focus:ring-primary focus:ring-offset-0"
              />
            </label>
          </div>
        </div>

        <div className="pt-4 border-t border-space-border/60">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
            <CalendarSync className="w-4 h-4 text-secondary" />
            <span>Calendar Synchronization</span>
          </h3>

          <label className="flex items-center justify-between p-3 rounded-xl bg-space-sidebar border border-space-border/60 cursor-pointer">
            <div>
              <span className="text-xs font-semibold text-white block">Auto-sync with Google Calendar & Outlook</span>
              <span className="text-[11px] text-space-dim">Pushes reservations, room Wi-Fi keys, and door codes directly</span>
            </div>
            <input
              type="checkbox"
              checked={googleCalendarSync}
              onChange={(e) => setGoogleCalendarSync(e.target.checked)}
              className="w-4 h-4 rounded bg-[#141724] border-space-border text-primary focus:ring-primary focus:ring-offset-0"
            />
          </label>
        </div>

        <div className="pt-4 border-t border-space-border/60">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
            <Volume2 className="w-4 h-4 text-emerald-400" />
            <span>Acoustic Sensitivity Preferences</span>
          </h3>

          <label className="flex items-center justify-between p-3 rounded-xl bg-space-sidebar border border-space-border/60 cursor-pointer">
            <div>
              <span className="text-xs font-semibold text-white block">Alert when reserved quiet room exceeds 25 dB</span>
              <span className="text-[11px] text-space-dim">Notifies library staff if quiet pods exceed noise threshold</span>
            </div>
            <input
              type="checkbox"
              checked={quietHoursAlert}
              onChange={(e) => setQuietHoursAlert(e.target.checked)}
              className="w-4 h-4 rounded bg-[#141724] border-space-border text-primary focus:ring-primary focus:ring-offset-0"
            />
          </label>
        </div>

        <div className="pt-4 border-t border-space-border/60 flex justify-end">
          <Button variant="primary" onClick={handleSave} leftIcon={Save}>
            Save Preferences
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SettingsView;
