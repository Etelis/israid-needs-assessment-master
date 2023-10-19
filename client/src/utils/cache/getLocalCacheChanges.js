import { keys, getMany } from 'idb-keyval';
import { cacheUsageKeyTypes } from './cacheKeyTypes';

export const getLocalCacheChangesKeys = async () =>
	(await keys()).filter(
		(key) => !Object.values(cacheUsageKeyTypes).includes(key)
	) ?? [];

const getLocalCacheChanges = async () =>
	getMany(await getLocalCacheChangesKeys()) ?? [];

export default getLocalCacheChanges;