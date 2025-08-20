import { defineStore } from 'pinia';

const API_URL = 'http://localhost:3000/api/apartments';

export const useApartmentsStore = defineStore('apartments', () => {
	const floors = ref<number>(0);
	const apartments = ref<Apartment[]>([]);
	const filters = ref<ApartmentsFilters>({
		priceMax: 0,
		priceMin: 0,
		areaMax: 0,
		areaMin: 0,
		roomsMax: 0,
		roomsMin: 0
	});
	const pagination = ref<Pagination>({
		page: 1,
		limit: 5,
		count: 0,
		next: null,
		prev: null,
		pagesCount: 0
	});

	const getApartments = computed(() => apartments.value);
	const getFloors = computed(() => floors.value);
	const getFilters = computed(() => filters.value);
	const getPagination = computed(() => pagination.value);

	async function fetchApartments(query?: ApartmentsQuery) {
		try {
			const res = await $fetch<ApartmentsResponse>(API_URL, { query });

			floors.value = res.data.floors;
			pagination.value = res.pagination;
			apartments.value = res.data.apartments;
			filters.value = res.data.filters;
		} catch (err) {
			console.error('Error fetching apartments:', err);
		}
	}

	function reset() {
		floors.value = 0;
		apartments.value = [];
		filters.value = {
			priceMax: 0,
			priceMin: 0,
			areaMax: 0,
			areaMin: 0,
			roomsMax: 0,
			roomsMin: 0
		};
		pagination.value = {
			page: 1,
			limit: 5,
			count: 0,
			next: null,
			prev: null,
			pagesCount: 0
		};
	}

	return {
		floors,
		apartments,
		filters,
		pagination,

		getApartments,
		getFloors,
		getFilters,
		getPagination,

		fetchApartments,
		reset
	};
});
