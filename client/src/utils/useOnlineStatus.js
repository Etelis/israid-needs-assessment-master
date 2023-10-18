import { useEffect, useState } from 'react';

const useOnlineStatus = () => {
	const [isOnline, setIsOnline] = useState(navigator.onLine);

	useEffect(() => {
		const handleOnline = () => {
			setIsOnline(true);
			console.log('online');
		};
		const handleOffline = () => {
			setIsOnline(false);
			console.log('offline');
		};

		window.addEventListener('online', handleOnline);
		window.addEventListener('offline', handleOffline);

		return () => {
			window.removeEventListener('online', handleOnline);
			window.removeEventListener('offline', handleOffline);
		};
	}, []);

	return isOnline;
};

export default useOnlineStatus;