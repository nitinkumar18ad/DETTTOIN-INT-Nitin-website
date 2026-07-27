import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CaretDown, Check } from "@phosphor-icons/react";

/**
 * CustomSelect - A brand-matching, accessible custom dropdown component.
 * Replaces default browser OS select elements across the website.
 *
 * @param {Object} props
 * @param {string|number} props.value - Currently selected value
 * @param {Function} props.onChange - Callback function receiving selected value
 * @param {Array<{value: string|number, label: string}>} props.options - Select options
 * @param {string} [props.placeholder] - Fallback placeholder text
 * @param {string} [props.ariaLabel] - Accessibility label
 * @param {string} [props.className] - Additional wrapper class names
 */
export default function CustomSelect({
  value,
  onChange,
  options = [],
  placeholder = "Select...",
  ariaLabel,
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const selectedOption = options.find((opt) => String(opt.value) === String(value)) || options[0];

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen]);

  const handleSelect = (val) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel || placeholder}
        className="inline-flex items-center justify-between gap-2.5 rounded-xl border border-sandstone-300/90 bg-white px-3.5 py-1.5 text-xs font-semibold text-ink-900 shadow-xs hover:border-maroon-400 hover:bg-sandstone-50/80 focus:outline-none focus:ring-2 focus:ring-maroon-500 transition-all duration-200 cursor-pointer min-w-[110px]"
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <CaretDown
          size={14}
          weight="bold"
          className={`text-maroon-700 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Custom Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 right-0 z-50 mt-1 max-h-56 min-w-[130px] overflow-y-auto rounded-xl border border-sandstone-200/90 bg-white/95 p-1.5 shadow-2xl backdrop-blur-md focus:outline-none no-scrollbar"
          >
            {options.map((opt) => {
              const isSelected = String(opt.value) === String(value);
              return (
                <li
                  key={String(opt.value)}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(opt.value)}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold cursor-pointer transition-all duration-150 select-none ${
                    isSelected
                      ? "bg-maroon-900 text-white font-bold shadow-xs"
                      : "text-ink-800 hover:bg-sandstone-100 hover:text-maroon-900"
                  }`}
                >
                  <span className="truncate">{opt.label}</span>
                  {isSelected && <Check size={14} weight="bold" className="text-white shrink-0 ml-1.5" />}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
