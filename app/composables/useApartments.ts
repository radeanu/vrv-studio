const API_URL = 'http://localhost:3000/api/apartments';

export function useApartments() {
	const { query } = useApartmentsQuery();

	const floors = ref<number>(0);
	const apartments = ref<Apartment[]>([]);
	const pagination = ref<Pagination>({
		page: 1,
		limit: 5,
		count: 0,
		next: null,
		prev: null,
		pagesCount: 0
	});

	async function fetchApartments() {
		try {
			const res = await fetch(API_URL);
			const jsonRes: ApartmentsResponse = await res.json();

			floors.value = jsonRes.data.floors;
			apartments.value = jsonRes.data.apartments;
			pagination.value = jsonRes.pagination;
		} catch (error) {
			console.log(error);
		}
	}

	return {
		query,
		floors,
		apartments,
		pagination,
		fetchApartments
	};
}
