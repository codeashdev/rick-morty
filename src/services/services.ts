const BASE_URL = "https://rickandmortyapi.com/api/";

export const fetchLocations = async (page: number) => {
	try {
		const response = await fetch(`${BASE_URL}location?page=${page}`);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		return response.json();
	} catch (error) {
		throw new Error("Failed to fetch locations");
	}
};

export const fetchCharactersByLocation = async (locationId: number) => {
	try {
		const response = await fetch(`${BASE_URL}location/${locationId}`);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		return response.json();
	} catch (error) {
		throw new Error("Failed to fetch characters by location");
	}
};

export const fetchCharacterDetails = async (characterUrl: string) => {
	try {
		const response = await fetch(characterUrl);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		return response.json();
	} catch (error) {
		throw new Error("Failed to fetch character details");
	}
};
