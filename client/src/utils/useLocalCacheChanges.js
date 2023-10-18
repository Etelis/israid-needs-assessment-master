import { entries } from 'idb-keyval';

const useLocalCacheChanges = async () =>
	(await entries()).filter(
		(entry) => entry[0] !== import.meta.env.VITE_REACT_QUERY_KEY
	);

export default useLocalCacheChanges;