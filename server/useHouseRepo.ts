import data from './data.json';

let houseRepo: ReturnType<typeof useHouseRepo> | undefined;

function useHouseRepo() {
	const house: House = data as House;

	function getHouse(): House {
		return house;
	}

	return {
		getHouse
	};
}

export function getHouseRepo() {
	if (houseRepo) return houseRepo;

	houseRepo = useHouseRepo();

	return houseRepo;
}
