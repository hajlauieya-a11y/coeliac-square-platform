import React, { createContext, useContext, useState } from "react";
import "./toast.css";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = ({ title, message, type = "success" }) => {
    setToast({ title, message, type });
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => setToast(null), 3200);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toast && (
        <div className={`cs-toast cs-toast-${toast.type}`} role="status">
          <button className="cs-toast-close" onClick={() => setToast(null)}>
            x
          </button>
          <strong>{toast.title}</strong>
          {toast.message && <p>{toast.message}</p>}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
