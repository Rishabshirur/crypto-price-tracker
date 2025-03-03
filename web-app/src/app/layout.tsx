import '../styles/globals.css'; 
import Providers from "../providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="corporate">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
