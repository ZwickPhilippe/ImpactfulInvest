'use client';
import '@/app/globals.css'
import AppProvider from '@/context/AppContext';
import NotificationProvider from '@/context/NotificationContext';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className='font-poppins relative min-h-screen	bg-white'>
        <NotificationProvider>
            <AppProvider>
              {/* <ColorProvider> */}
                {/* <RecorderProvider> */}
                  {/* <GA4/>
                  <FacebookPixel/> */}
                  {/* <CookieConsent/> */}
                  {children}
                {/* </RecorderProvider> */}
              {/* </ColorProvider> */}
            </AppProvider>
        </NotificationProvider>
      </body>
    </html>
  )
}