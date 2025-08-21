import { defineStore } from 'pinia';

const API_URL = 'http://localhost:3000/api/apartments';

export const useApartmentsStore = defineStore('apartments', () => {
	const floors = ref<number>(0);
	const apartments = ref<Apartment[]>([]);

	const apQuery = useApartmentsQuery();
	const pagination = usePagination('/');

	/*watch(apQuery.query, useDebounce(fetchApartments, 300));*/

	async function fetchApartments() {
		try {
			const query: ApartmentsQuery = apQuery.query.value;
			console.log(query);
			const res = await $fetch<ApartmentsResponse>(API_URL, { query });

			console.log(res.data.apartments.length);

			floors.value = res.data.floors;
			pagination.pagination.value = res.pagination;
			apartments.value = res.data.apartments;
		} catch (err) {
			console.error('Error fetching apartments:', err);
		}
	}

	function reset() {
		floors.value = 0;
		apartments.value = [];
		pagination.reset();
	}

	return {
		floors,
		apartments,
		pagination,

		fetchApartments,
		reset
	};
});
