import { X } from "@phosphor-icons/react";
import { useCallback, useState } from "react";
import useFocusTrap from "../hooks/useFocusTrap.js";

export default function LoginModal({ isOpen, onClose }) {
  const [mode, setMode] = useState("student");
  const closeLogin = useCallback(() => onClose(), [onClose]);
  const dialogRef = useFocusTrap(isOpen, closeLogin);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-ink-900/35 px-4 py-6 sm:py-10" role="presentation">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
        className="mx-auto max-w-md rounded-heritage bg-sandstone-50 p-5 shadow-soft"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="login-title" className="text-3xl">
              Login
            </h2>
            <p className="mt-1 text-ink-700">Choose the portal you want to access.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-heritage text-maroon-700 hover:bg-maroon-50"
            aria-label="Close login"
          >
            <X size={22} weight="bold" />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-2 rounded-heritage border border-sandstone-200 bg-white p-1">
          {["student", "parent"].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setMode(item)}
              className={`rounded-heritage px-4 py-2 font-semibold capitalize ${
                mode === item ? "bg-maroon-700 text-white" : "text-maroon-700 hover:bg-maroon-50"
              }`}
              aria-pressed={mode === item}
            >
              {item}
            </button>
          ))}
        </div>

        <form className="mt-6 grid gap-4" onSubmit={(event) => event.preventDefault()}>
          <div>
            <label htmlFor="login-id" className="block font-semibold text-ink-900">
              {mode === "student" ? "Student ID" : "Parent ID"}
            </label>
            <input
              id="login-id"
              className="mt-2 w-full rounded-heritage border border-sandstone-200 bg-white px-4 py-3"
              placeholder={mode === "student" ? "Enter student ID" : "Enter parent ID"}
            />
          </div>
          <div>
            <label htmlFor="login-password" className="block font-semibold text-ink-900">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              className="mt-2 w-full rounded-heritage border border-sandstone-200 bg-white px-4 py-3"
              placeholder="Enter password"
            />
          </div>
          <button
            type="submit"
            className="rounded-heritage bg-maroon-700 px-6 py-3 font-semibold text-white shadow-soft hover:bg-maroon-500"
          >
            Continue to {mode === "student" ? "Student" : "Parent"} Portal
          </button>
        </form>
      </div>
    </div>
  );
}
