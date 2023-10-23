import { createContext, useContext, useMemo, useState } from 'react';

const initialData = [];

const NavbarButtonsContext = createContext(initialData);

export const useNavbarButtonsContext = () => {
	return useContext(NavbarButtonsContext);
};

export const NavbarButtonsProvider = ({ children }) => {
	const [navbarButtons, setNavbarButtons] = useState(initialData);

	const value = useMemo(
		() => ({
			navbarButtons,
			setNavbarButtons,
		}),
		[navbarButtons]
	);

	return (
		<NavbarButtonsContext.Provider value={value}>
			{children}
		</NavbarButtonsContext.Provider>
	);
};
