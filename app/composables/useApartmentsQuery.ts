export function useApartmentsQuery() {
	const route = useRoute();
	const router = useRouter();

	const query = computed(() => {
		return {
			priceMin: _getNumber('fPriceMin', 0),
			priceMax: _getNumber('fPriceMax', 0),
			areaMin: _getNumber('fAreaMin', 0),
			areaMax: _getNumber('fAreaMax', 0),
			rooms: _getNumber('fRooms', 0)
		};
	});

	function pushToRoute(queryPartial: Partial<ApartmentsQuery>) {
		router.push({ path: '/', query: { ...route.query, ...queryPartial } });
	}

	function _getNumber<T>(name: string, defV: T): T | number {
		try {
			const val = route.query[name];
			if (!val) return defV;

			const res = parseInt(val as string);
			return res;
		} catch (error) {
			return defV;
		}
	}

	return {
		query,
		pushToRoute
	};
}
