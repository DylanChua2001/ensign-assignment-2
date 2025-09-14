import { useEffect } from "react";

export default function Toast({ message, show, onClose }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="rounded-xl bg-black px-4 py-3 text-sm font-medium text-white shadow-lg animate-slide-up">
        {message}
      </div>
    </div>
  );
}
