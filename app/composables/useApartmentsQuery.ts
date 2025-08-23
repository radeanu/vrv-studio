export function useApartmentsQuery() {
	const routeQuery = useRouteQuery('/');

	const query = computed<ApartmentsQuery>(() => {
		return {
			page: routeQuery.getNumber('page', 1),
			limit: routeQuery.getNumber('limit', 20),
			fPriceMin: routeQuery.getNumber('fPriceMin', undefined),
			fPriceMax: routeQuery.getNumber('fPriceMax', undefined),
			fAreaMin: routeQuery.getNumber('fAreaMin', undefined),
			fAreaMax: routeQuery.getNumber('fAreaMax', undefined),
			fRooms: routeQuery.getNumber('fRooms', undefined),
			sort: routeQuery.getValue('sort', undefined),
			order: routeQuery.getValue('order', undefined)
		};
	});

	function pushToRoute(queryPartial: Partial<ApartmentsQuery>) {
		routeQuery.pushToRoute(queryPartial);
	}

	function reset() {
		routeQuery.pushToRoute({
			page: 1,
			limit: 20,
			fPriceMin: undefined,
			fPriceMax: undefined,
			fAreaMin: undefined,
			fAreaMax: undefined,
			fRooms: undefined,
			sort: undefined,
			order: undefined
		});
	}

	return {
		query,
		reset,
		pushToRoute
	};
}
