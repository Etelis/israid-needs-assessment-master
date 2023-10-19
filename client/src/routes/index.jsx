import { useRoutes } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import useLoadApplicationData from '../utils/online/useLoadApplicationData';
import useOfflineRoutes from './useOfflineRoutes';
import useOnlineRoutes from './useOnlineRoutes';

const Routes = () => {
	const isLoading = useLoadApplicationData();

	const offlineRoutes = useOfflineRoutes();
	const onlineRoutes = useOnlineRoutes();

	const ApplicationRoutes = useRoutes([...onlineRoutes, ...offlineRoutes]);

	return isLoading ? <LoadingSpinner /> : ApplicationRoutes;
};

export default Routes;