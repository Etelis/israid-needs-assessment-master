import { createContext, useContext, useMemo, useState } from 'react';

// Initial data for questions, answers, and rnas
// Can Eventually populate the questions from the DB instead of static data
const initialData = {
	breadcrumbs: [],
	setBreadcrumbs: () => {},
	addBreadcrumb: () => {},
	removeBreadcrumb: () => {},
};

const BreadcrumbsContext = createContext(initialData);

export const useBreadcrumbsContext = () => {
	return useContext(BreadcrumbsContext);
};

export const BreadcrumbsProvider = ({ children }) => {
	// each breadcrumb should be an object with 2 fields: { text, routeTo }
	const [breadcrumbs, setBreadcrumbs] = useState([]);

	const addBreadcrumb = (newCrumb) => {
		const crumbExists = breadcrumbs.find(
			(crumb) => crumb.text === newCrumb.text
		);

		if (!crumbExists) {
			setBreadcrumbs((breadcrumbs) => [...breadcrumbs, newCrumb]);
		}
	};

	const removeBreadcrumb = (crumbText) => {
		setBreadcrumbs((breadcrumbs) => [
			...breadcrumbs.filter((crumb) => crumb.text !== crumbText),
		]);
	};

	const value = useMemo(
		() => ({
			breadcrumbs,
			addBreadcrumb,
			removeBreadcrumb,
			setBreadcrumbs,
		}),
		[breadcrumbs]
	);

	return (
		<BreadcrumbsContext.Provider value={value}>
			{children}
		</BreadcrumbsContext.Provider>
	);
};
