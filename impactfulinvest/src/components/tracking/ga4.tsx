import {
	analyticsEnabled,
	setAnalytics,
	marketingEnabled,
	setMarketing,
} from '@/utils/cookies';
import { GOOGLE_ANALYTICS_TRACKING_ID } from '@/utils/const';
import { useEffect } from 'react';

declare global {
  interface Window {
		dataLayer: any
    gtag: any;
  }
}


export default function GA4 () {
	
	useEffect(() => {
		if (!analyticsEnabled()) {
			return;
		}
		// Check if GTM script is already loaded
		if (window.dataLayer) return;

		// Add the GTM script to the DOM
		const gtmScriptTag = document.createElement('script');
		gtmScriptTag.async = true;
		gtmScriptTag.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_TRACKING_ID}`;
		document.head.appendChild(gtmScriptTag);

		// Initialize dataLayer and gtag function
		window.dataLayer = window.dataLayer || [];
		window.gtag = function gtag() {
			window.dataLayer.push(arguments);
		};

		window.gtag('js', new Date());
		window.gtag('config', GOOGLE_ANALYTICS_TRACKING_ID, {
			'page_title': document.title,
			'page_location': window.location.href,
		});
		window.gtag('event', 'pageView');
	}, []);
	
	return null;
}
