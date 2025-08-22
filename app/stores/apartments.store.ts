import { defineStore } from 'pinia';

const API_URL = 'http://localhost:3000/api/apartments';

export const useApartmentsStore = defineStore('apartments', () => {
	const floors = ref<number>(0);
	const apartments = ref<Apartment[]>([]);
	const prevQuery = ref<ApartmentsQuery>({});

	const apQuery = useApartmentsQuery();
	const pagination = usePagination('/');

	watch(apQuery.query, useDebounce(fetchApartments, 300));

	function loadMore() {
		apQuery.pushToRoute({ page: (apQuery.query.value.page ?? 0) + 1 });
	}

	async function fetchApartments() {
		try {
			const query: ApartmentsQuery = apQuery.query.value;
			if (deepEqual(query, prevQuery.value)) {
				console.log('equal');
				return;
			}

			const res = await $fetch<ApartmentsResponse>(API_URL, { query });

			const list = res.data.apartments ?? [];

			floors.value = res.data.floors;
			pagination.pagination.value = res.pagination;

			apartments.value =
				query.page === 1 ? list : [...apartments.value, ...list];

			prevQuery.value = query;
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
		reset,
		floors,
		loadMore,
		apartments,
		pagination,
		fetchApartments
	};
});
