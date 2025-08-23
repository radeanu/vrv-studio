export type ApSort = 'price' | 'area' | 'floor';

export type ApHeader = {
	name: string;
	sm: boolean;
	sort: boolean;
	sort_v: ApSort | null;
};

export type ApartmentsQuery = {
	page?: number;
	limit?: number;
	fRooms?: number;
	fPriceMin?: number;
	fPriceMax?: number;
	fAreaMin?: number;
	fAreaMax?: number;
	sort?: ApSort;
	order?: SortOrder;
};

export type ApartmentsFilters = {
	priceMax: number;
	priceMin: number;
	areaMax: number;
	areaMin: number;
	roomsMax: number;
	roomsMin: number;
};

export type ApartmentsResponse = {
	pagination: Pagination;
	data: {
		floors: number;
		filters: ApartmentsFilters;
		apartments: Apartment[];
	};
};

export type Apartment = {
	number: number;
	count: number;
	price: number;
	area: number;
	floor: number;
	image: string;
};

export type House = {
	floors: number;
	apartments: Apartment[];
};
