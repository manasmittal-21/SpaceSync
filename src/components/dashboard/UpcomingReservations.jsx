import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, QrCode, CheckCircle2, XCircle, ArrowUpRight, ShieldCheck } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import Modal from '../common/Modal';
import { useBooking } from '../../context/BookingContext';

const UpcomingReservations = () => {
  const { reservations, checkIn, cancelReservation, setActiveModalRoom } = useBooking();
  const [activeQrModal, setActiveQrModal] = useState(null);

  if (!reservations || reservations.length === 0) {
    return (
      <Card className="p-8 text-center border-dashed">
        <div className="w-12 h-12 rounded-full bg-space-sidebar border border-space-border mx-auto flex items-center justify-center text-space-muted mb-3">
          <Calendar className="w-6 h-6 text-space-dim" />
        </div>
        <h3 className="text-base font-semibold text-white">No Active Reservations</h3>
        <p className="text-xs text-space-muted mt-1 max-w-sm mx-auto">
          You don't have any rooms reserved right now. Explore available campus study pods and labs to lock in your next workspace.
        </p>
        <div className="mt-4">
          <Button
            size="sm"
            variant="primary"
            onClick={() => setActiveModalRoom({})}
          >
            Book a Space Now
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-white tracking-tight">
            Upcoming Reservations
          </h2>
          <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary-light border border-primary/20 text-xs font-semibold">
            {reservations.length} Active
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {reservations.map((res) => (
          <Card
            key={res.id}
            className="p-5 flex flex-col justify-between hover:border-space-border-light transition-all"
          >
            <div>
              {/* Top row: Status, QR Code, Code pill */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-semibold text-secondary px-2 py-0.5 rounded bg-[#10121A] border border-space-border">
                    {res.roomCode}
                  </span>
                  {res.isCheckedIn ? (
                    <Badge variant="available" dot size="sm">
                      Checked In
                    </Badge>
                  ) : (
                    <Badge variant="reserved" dot pulse size="sm">
                      {res.status}
                    </Badge>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setActiveQrModal(res)}
                  className="p-1.5 rounded-lg bg-space-sidebar hover:bg-[#202535] text-space-muted hover:text-white border border-space-border/80 transition-colors flex items-center gap-1.5 text-xs font-mono"
                  title="View Contactless QR Access Pass"
                >
                  <QrCode className="w-4 h-4 text-secondary" />
                  <span className="hidden sm:inline">QR Pass</span>
                </button>
              </div>

              {/* Title & Location */}
              <h3 className="text-base font-bold text-white tracking-tight mb-1">
                {res.roomName}
              </h3>
              <p className="text-xs text-space-dim flex items-center gap-1.5 mb-3">
                <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>{res.building}</span>
                <span>•</span>
                <span>{res.floor}</span>
              </p>

              {/* Time slot & Date badge */}
              <div className="p-3 rounded-xl bg-space-sidebar/90 border border-space-border/70 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3">
                <div className="flex items-center gap-2 text-space-text font-medium">
                  <Calendar className="w-4 h-4 text-secondary shrink-0" />
                  <span>{res.date}</span>
                </div>
                <div className="flex items-center gap-2 text-space-muted font-medium">
                  <Clock className="w-4 h-4 text-primary-light shrink-0" />
                  <span>{res.timeSlot} ({res.duration})</span>
                </div>
              </div>

              {/* Purpose & Attendees */}
              <div className="flex items-center justify-between text-xs py-1">
                <span className="text-space-dim italic truncate pr-2">
                  "{res.purpose}"
                </span>
                <div className="flex items-center -space-x-2 shrink-0">
                  {res.attendees && res.attendees.map((a, i) => (
                    <img
                      key={i}
                      src={a.avatar}
                      alt={a.name}
                      title={a.name}
                      className="w-6 h-6 rounded-full border-2 border-space-card object-cover"
                    />
                  ))}
                  {res.attendeesCount > (res.attendees?.length || 0) && (
                    <span className="w-6 h-6 rounded-full bg-space-sidebar border-2 border-space-card text-[10px] text-space-dim flex items-center justify-center font-medium">
                      +{res.attendeesCount - res.attendees.length}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Actions Row */}
            <div className="mt-4 pt-3 border-t border-space-border/50 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => cancelReservation(res.id)}
                className="text-xs text-rose-400 hover:text-rose-300 transition-colors py-1.5 px-2.5 rounded-lg hover:bg-rose-500/10 flex items-center gap-1"
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>Cancel</span>
              </button>

              <div className="flex items-center gap-2">
                {!res.isCheckedIn ? (
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => checkIn(res.id)}
                    leftIcon={CheckCircle2}
                  >
                    Check In Now
                  </Button>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Access Granted</span>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Digital QR Pass Modal */}
      {activeQrModal && (
        <Modal
          isOpen={!!activeQrModal}
          onClose={() => setActiveQrModal(null)}
          title="Digital Campus Room Pass"
          subtitle="Hold against the electronic reader outside the door to unlock."
          maxWidth="max-w-md"
        >
          <div className="text-center space-y-4 py-2">
            <div className="p-6 bg-white rounded-2xl mx-auto w-56 h-56 flex flex-col items-center justify-center shadow-lg relative">
              {/* Simulated QR Pattern */}
              <div className="grid grid-cols-6 gap-2 w-full h-full p-2">
                {Array.from({ length: 36 }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`rounded-sm ${
                      (idx % 2 === 0 || idx % 5 === 0) && idx % 7 !== 0
                        ? 'bg-black'
                        : 'bg-transparent'
                    }`}
                  />
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-2 bg-white rounded-xl shadow border border-gray-200">
                  <QrCode className="w-10 h-10 text-primary" />
                </div>
              </div>
            </div>

            <div>
              <div className="font-mono text-sm font-bold text-secondary tracking-widest">
                {activeQrModal.qrPassCode}
              </div>
              <p className="text-xs text-space-muted mt-1">
                Room: <strong className="text-white">{activeQrModal.roomName}</strong> ({activeQrModal.roomCode})
              </p>
              <p className="text-xs text-space-dim">
                Valid for {activeQrModal.date} • {activeQrModal.timeSlot}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-space-sidebar border border-space-border/60 text-xs text-space-muted flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Auto-revoked if un-scanned 15m after slot start</span>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => setActiveQrModal(null)}
            >
              Close Pass
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UpcomingReservations;
