export function useApartmentsQuery() {
	const route = useRoute();
	const router = useRouter();
	const routeQuery = useRouteQuery('/');

	const query = computed<ApartmentsQuery>(() => {
		return {
			page: routeQuery.getNumber('page', 1),
			limit: routeQuery.getNumber('limit', 5),
			fPriceMin: routeQuery.getNumber('fPriceMin', undefined),
			fPriceMax: routeQuery.getNumber('fPriceMax', undefined),
			fAreaMin: routeQuery.getNumber('fAreaMin', undefined),
			fAreaMax: routeQuery.getNumber('fAreaMax', undefined),
			fRooms: routeQuery.getNumber('fRooms', undefined)
		};
	});

	function pushToRoute(queryPartial: Partial<ApartmentsQuery>) {
		router.push({ path: '/', query: { ...route.query, ...queryPartial } });
	}

	return {
		query,
		pushToRoute
	};
}
