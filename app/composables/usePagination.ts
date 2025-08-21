export function usePagination(path: string) {
	const routeQuery = useRouteQuery(path);
	const apQuery = useApartmentsQuery();

	const defValues = () => ({
		page: 1,
		limit: 5,
		count: 0,
		next: null,
		prev: null,
		pagesCount: 0
	});

	const queryData = computed(() => ({
		page: routeQuery.getNumber('page', 1),
		limit: routeQuery.getNumber('limit', 5)
	}));

	const pagination = ref<Pagination>(defValues());

	watch(
		queryData,
		() => {
			pagination.value.page = queryData.value.page;
			pagination.value.limit = queryData.value.limit;
		},
		{ immediate: true }
	);

	watch(pagination, () => {
		apQuery.pushToRoute({
			page: pagination.value.page,
			limit: pagination.value.limit
		});
	});

	function reset() {
		pagination.value = defValues();
	}

	return {
		reset,
		pagination
	};
}
