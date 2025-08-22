import { getHouseRepo } from '../useHouseRepo';

const houseRepo = getHouseRepo();

function paginateData<T>(
	docs: T[],
	page = 1,
	limit = 5
): { docs: T[]; pagination: Pagination } {
	const skip = page ? page - 1 : 0;
	const offset = skip * limit;

	const count = docs.length;
	const currentPage = Math.ceil((offset + 1) / limit);
	const pagesCount = limit > 0 ? Math.ceil(count / limit) || 1 : 0;

	const slicedDocs = limit < 0 ? docs : docs.slice(offset, offset + limit);

	return {
		docs: slicedDocs,
		pagination: {
			limit,
			count,
			pagesCount,
			page: currentPage,
			prev: currentPage > 1 ? currentPage - 1 : null,
			next: currentPage < pagesCount ? currentPage + 1 : null
		}
	};
}

function getFilters(list: Apartment[]): ApartmentsFilters {
	let priceMax = 0;
	let priceMin = 0;
	let areaMax = 0;
	let areaMin = 0;
	let roomsMax = 0;
	let roomsMin = 0;

	list.forEach((ap) => {
		if (ap.price > priceMax) priceMax = ap.price;
		if (ap.price < priceMin) priceMin = ap.price;
		if (ap.area > areaMax) areaMax = ap.area;
		if (ap.area < areaMin) areaMin = ap.area;
		if (ap.count > roomsMax) roomsMax = ap.count;
		if (ap.count < roomsMin) roomsMin = ap.count;
	});

	return {
		priceMax,
		priceMin,
		areaMax,
		areaMin,
		roomsMax,
		roomsMin
	};
}

export default defineEventHandler(async (event) => {
	const query =
		getQuery<{ [key in keyof ApartmentsQuery]: string | undefined }>(event);
	const house = houseRepo.getHouse();

	const queryV = {
		page: query.page ? Number(query.page) : undefined,
		limit: query.limit ? Number(query.limit) : undefined,
		rooms: query.fRooms ? Number(query.fRooms) : undefined,
		priceMin: query.fPriceMin ? Number(query.fPriceMin) : undefined,
		priceMax: query.fPriceMax ? Number(query.fPriceMax) : undefined,
		areaMin: query.fAreaMin ? Number(query.fAreaMin) : undefined,
		areaMax: query.fAreaMax ? Number(query.fAreaMax) : undefined
	};

	const list = house.apartments.filter((ap) => {
		const validR = queryV.rooms ? queryV.rooms === ap.count : true;
		const validPMin = queryV.priceMin ? ap.price >= queryV.priceMin : true;
		const validPMax = queryV.priceMax ? ap.price <= queryV.priceMax : true;
		const validAMin = queryV.areaMin ? ap.area >= queryV.areaMin : true;
		const validAMax = queryV.areaMax ? ap.area <= queryV.areaMax : true;

		return validR && validPMin && validPMax && validAMin && validAMax;
	});

	const res = paginateData(list, queryV.page, queryV.limit);
	const filters = getFilters(list);

	const data: ApartmentsResponse = {
		pagination: res.pagination,
		data: {
			filters,
			floors: house.floors,
			apartments: res.docs
		}
	};

	return data;
});
