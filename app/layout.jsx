import '../styles/globals.css';

export const metadata = {
  title: 'Mooviez 4 Rylee',
  description: 'A dreamy movie picker with a carousel of cult classics.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
