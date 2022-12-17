import { ReactQueryProvider } from '@/src/context/ReactQueryContext';
import { UIProvider } from '@/src/context/UIContext';
import '@/styles/dist.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head></head>
      <body>
        <ReactQueryProvider>
          <UIProvider>{children}</UIProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
