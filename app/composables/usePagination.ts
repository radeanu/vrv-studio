export function usePagination(path: string) {
	const routeQuery = useRouteQuery(path);
	const defaultV = defValues();

	const pagination = ref<Pagination>(defValues());

	const queryData = computed(() => ({
		page: routeQuery.getNumber('page', defaultV.page),
		limit: routeQuery.getNumber('limit', defaultV.limit)
	}));

	watch(
		queryData,
		() => {
			pagination.value.page = queryData.value.page;
			pagination.value.limit = queryData.value.limit;
		},
		{ immediate: true }
	);

	watch(pagination, () => {
		routeQuery.pushToRoute({
			page: pagination.value.page,
			limit: pagination.value.limit
		});
	});

	function reset() {
		pagination.value = defValues();
	}

	function defValues() {
		return {
			page: 1,
			limit: 20,
			count: 0,
			next: null,
			prev: null,
			pagesCount: 0
		};
	}

	return {
		reset,
		pagination
	};
}
