export function usePagination(path: string) {
	const routeQuery = useRouteQuery(path);

	const pagination = ref<Pagination>(defValues());

	const queryData = computed(() => ({
		page: routeQuery.getNumber('page', 1),
		limit: routeQuery.getNumber('limit', 5)
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
			limit: 5,
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
