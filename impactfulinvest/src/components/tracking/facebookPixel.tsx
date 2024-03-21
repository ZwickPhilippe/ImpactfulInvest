import { FACEBOOK_PIXEL_ID } from '@/utils/const';
import { marketingEnabled } from '@/utils/cookies';
import React, { useEffect } from 'react';

// Define a type for the props

declare global {
  interface Window {
    fbq: any;
  }
}

const FacebookPixel: React.FC = () => {
  const pixelId = FACEBOOK_PIXEL_ID;
  useEffect(() => {
    // Load the Facebook Pixel script
    if (!marketingEnabled()) {
      return;
    }
    (function(f: any, b: any, e: any, v: any, n?: any , t?: any, s? : any) {
      if (f.fbq) return;
      n = f.fbq = function() {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    // Initialize the Facebook Pixel
    window.fbq('init', pixelId);
    window.fbq('track', 'PageView');
  }, []);

  if (!marketingEnabled()) {
    return;
  }
  return (
    <noscript>
      <img
        height='1'
        width='1'
        style={{ display: 'none' }}
        alt='facebook pixel'
        src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
      />
    </noscript>
  );
};

export default FacebookPixel;
