import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'MSS Intelligent Infrastructure Platform | M Synapses Systems',
  description: 'Industrial asset intelligence platform connecting physical infrastructure, telemetry data, and AI-driven operational decisions.',
  openGraph: {
    title: 'MSS Intelligent Infrastructure Platform | M Synapses Systems',
    description: 'Industrial asset intelligence platform connecting physical infrastructure, telemetry data, and AI-driven operational decisions.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MSS Intelligent Infrastructure Platform | M Synapses Systems',
    description: 'Industrial asset intelligence platform connecting physical infrastructure, telemetry data, and AI-driven operational decisions.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#020617] text-slate-100 antialiased font-sans min-h-screen selection:bg-cyan-500/30 selection:text-cyan-200" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
