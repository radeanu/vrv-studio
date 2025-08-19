export type ApartmentsQuery = {
	page?: number;
	limit?: number;
	fRooms?: number;
	fPriceMin?: number;
	fPriceMax?: number;
	fAreaMin?: number;
	fAreaMax?: number;
};

export type ApartmentsResponse = {
	pagination: Pagination;
	data: {
		floors: number;
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
