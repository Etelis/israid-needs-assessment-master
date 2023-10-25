import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const useOnlineStatus = () => {
	const [isOnline, setIsOnline] = useState(navigator.onLine);

	useEffect(() => {
		const handleOnline = () => {
			setIsOnline(true);

			const connectionFoundMessage = 'Internet Connection Found!';
			const synchronizationAvailableMessage =
				'Synchronizing Now Available';

			toast.info(connectionFoundMessage, {
				toastId: connectionFoundMessage,
			});
			toast.success(synchronizationAvailableMessage, {
				toastId: synchronizationAvailableMessage,
			});
		};
		const handleOffline = () => {
			setIsOnline(false);

			const connectionLostMessage = 'You Are Now In Offline Mode';

			toast.warning(connectionLostMessage, {
				toastId: connectionLostMessage,
			});
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
