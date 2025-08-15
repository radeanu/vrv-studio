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

export default defineEventHandler(async (event) => {
	const query = getQuery<ApartmentsQuery>(event);
	const house = houseRepo.getHouse();

	const list = house.apartments.filter((ap) => {
		const validR = query.fRooms ? query.fRooms === ap.count : true;

		const validPMin = query.fPriceMin ? ap.price >= query.fPriceMin : true;
		const validPMax = query.fPriceMax ? ap.price <= query.fPriceMax : true;

		const validAMin = query.fAreaMin ? ap.area >= query.fAreaMin : true;
		const validAMax = query.fAreaMax ? ap.area <= query.fAreaMax : true;

		return validR && validPMin && validPMax && validAMin && validAMax;
	});

	const res = paginateData(list, query.page, query.limit);

	const data: ApartmentsResponse = {
		pagination: res.pagination,
		data: {
			floors: house.floors,
			apartments: res.docs
		}
	};

	return data;
});
