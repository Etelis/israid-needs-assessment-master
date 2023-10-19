import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const useOnlineStatus = () => {
	const [isOnline, setIsOnline] = useState(navigator.onLine);

	useEffect(() => {
		const handleOnline = () => {
			setIsOnline(true);
			toast.info('Internet Connection Found!');
			toast.success('Synchronizing Now Available');
		};
		const handleOffline = () => {
			setIsOnline(false);
			toast.warning('You Are Now In Offline Mode');
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
