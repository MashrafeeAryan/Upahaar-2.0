/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#EC4899",      // Rose Pink – primary actions, main CTA
        secondary: "#F472B6",    // Soft Pink – secondary actions
        accent: "#FB7185",       // Coral Pink – highlights, birthdays, attention

        background: "#FFFFFF",   // White – main app background
        surface: "#FFF1F2",      // Very light pink – cards, sections
        border: "#FBCFE8",       // Soft pink – borders, dividers

        textPrimary: "#111827",  // Almost black – titles, main text
        textSecondary: "#6B7280" // Muted gray – subtitles, helper text
      },
    },
  },
  plugins: [],
};
