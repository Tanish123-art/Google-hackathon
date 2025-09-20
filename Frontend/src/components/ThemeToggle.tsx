import React, { useEffect, useRef, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center justify-center w-10 h-10 rounded-lg bg-orange-100 dark:bg-gray-700 hover:bg-orange-200 dark:hover:bg-gray-600 transition-colors duration-200"
        aria-label="Theme menu"
        title="Theme"
      >
        {resolvedTheme === 'light' ? (
          <Moon size={20} className="text-orange-600 dark:text-gray-300" />
        ) : (
          <Sun size={20} className="text-orange-600 dark:text-gray-300" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg z-50 divide-y divide-gray-200 dark:divide-gray-800">
          <button
            className={`w-full text-left px-4 py-2 text-sm rounded-t-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-100 ${theme === 'system' ? 'font-semibold' : ''}`}
            onClick={() => { setTheme('system'); setOpen(false); }}
          >
            System Default(Dark)
          </button>
          <button
            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-100 ${theme === 'light' ? 'font-semibold' : ''}`}
            onClick={() => { setTheme('light'); setOpen(false); }}
          >
            Light Theme
          </button>
          <button
            className={`w-full text-left px-4 py-2 text-sm rounded-b-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-100 ${theme === 'dark' ? 'font-semibold' : ''}`}
            onClick={() => { setTheme('dark'); setOpen(false); }}
          >
            Dark Theme
          </button>
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
