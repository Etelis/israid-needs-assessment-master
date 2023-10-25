import useOnlineStatus from '../../utils/useOnlineStatus';
import SynchronizationPage from '../pages/SynchronizationPage/SynchronizationPage';

const useOnlineRoutes = () => {
	const isOnline = useOnlineStatus();

	const onlineRoutes = [
		{
			path: 'Synchronization',
			element: <SynchronizationPage />,
		},
	];

	return isOnline ? onlineRoutes : [];
};

export default useOnlineRoutes;