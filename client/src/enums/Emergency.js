const Emergency = {
	Flood: 'Flood',
	Earthquake: 'Earthquake',
	TropicalStorm: 'Tropical Storm',
	Wildfires: 'Wildfires',
	ForcedDisplacementCrisis: 'Forced Displacement Crisis',
	Volcano: 'Volcano',
	Pandemic: 'Pandemic',
	Typhoon: 'Typhoon',
	Displacement: 'Displacement',
};

export const getEmergencyOptions = () =>
	Object.keys(Emergency).map((key) => ({
		value: key,
		label: Emergency[key],
	}));

export default Emergency;
