import { defineStore } from 'pinia';

const API_URL = 'http://localhost:3000/api/apartments';

const HEADERS: ApHeader[] = [
	{ name: 'Планировка', sort_v: null, sort: false, sm: false },
	{ name: 'Квартира', sort_v: null, sort: false, sm: false },
	{ name: 'S, м²', sort_v: 'area', sort: true, sm: true },
	{ name: 'Этаж', sort_v: 'floor', sort: true, sm: true },
	{ name: 'Цена, ₽', sort_v: 'price', sort: true, sm: true }
];

export const useApartmentsStore = defineStore('apartments', () => {
	const floors = ref<number>(0);
	const apartments = ref<Apartment[]>([]);
	const prevQuery = ref<ApartmentsQuery>({});
	const apQuery = useApartmentsQuery();
	const sort = useSort<ApSort>('/');

	const pagination = usePagination('/');

	watch(apQuery.query, useDebounce(fetchApartments, 300), {
		deep: true
	});

	watch(
		() => [sort.name.value, sort.order.value],
		() => {
			apQuery.pushToRoute({
				page: 1
			});
		}
	);

	function loadMore() {
		apQuery.pushToRoute({
			page: (apQuery.query.value.page ?? 0) + 1
		});
	}

	async function fetchApartments() {
		try {
			if (deepEqual(apQuery.query.value, prevQuery.value)) return;

			const res = await $fetch<ApartmentsResponse>(API_URL, {
				query: apQuery.query.value
			});

			const list = res.data.apartments ?? [];

			floors.value = res.data.floors;
			pagination.pagination.value = res.pagination;

			apartments.value =
				apQuery.query.value.page === 1
					? list
					: [...apartments.value, ...list];

			prevQuery.value = apQuery.query.value;
		} catch (err) {
			console.error('Error fetching apartments:', err);
		}
	}

	function reset() {
		floors.value = 0;
		apartments.value = [];
		apQuery.reset();
	}

	return {
		reset,
		floors,
		loadMore,
		apartments,
		pagination,
		fetchApartments,
		HEADERS: readonly(HEADERS)
	};
});
