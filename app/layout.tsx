import type { Metadata } from 'next';
import Providers from './providers';
import IntroGif from './components/IntroGif';
import './globals.css';

export const metadata: Metadata = {
  title: 'RAUS CMS',
  description: 'This is a RAUS CMS application.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <IntroGif>
          <Providers>{children}</Providers>
        </IntroGif>
      </body>
    </html>
  );
}
