import * as Dialog from '@radix-ui/react-dialog';
import { X, ArrowRight } from 'lucide-react';
import { DATE_GROUPS } from '../dates.js';
import { TYPEFORM_URL } from '../typeform.js';

export default function DateModal({ open, onOpenChange }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-[70]" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[71] w-[calc(100%-3rem)] max-w-md bg-white rounded-2xl p-6 sm:p-8 focus:outline-none">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex flex-col gap-1.5">
              <Dialog.Title className="text-2xl">Become a Founding Instructor</Dialog.Title>
              <Dialog.Description className="text-muted text-sm">
                Choose the date you&rsquo;d like to attend to complete your booking.
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button type="button" aria-label="Close" className="text-black shrink-0 mt-1">
                <X size={22} />
              </button>
            </Dialog.Close>
          </div>

          <div className="flex flex-col gap-3">
            {DATE_GROUPS.map((d) => (
              <a
                key={d.date}
                href={d.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-black text-white px-5 py-4 flex items-center justify-between gap-4 hover:opacity-85 transition-opacity"
              >
                <span className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium">{d.date}</span>
                  <span className="text-xs text-white/70">{d.venue} &middot; {d.time}</span>
                </span>
                <ArrowRight size={18} className="shrink-0" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3 my-5">
            <div className="h-px flex-1 bg-line" />
            <span className="text-xs uppercase tracking-widest text-muted">Or</span>
            <div className="h-px flex-1 bg-line" />
          </div>

          <a
            href={TYPEFORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-line text-black px-5 py-4 flex items-center justify-center gap-2 hover:border-black transition-colors text-sm font-medium"
          >
            Register Your Details
          </a>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
