import React, { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  return (
    <button
      aria-label="Toggle dark mode"
      className={`ml-auto px-3 py-1 rounded bg-orange text-white font-semibold hover:bg-orange/90 transition`}
      onClick={() => setDark(d => !d)}
      type="button"
    >
      {dark ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
} 