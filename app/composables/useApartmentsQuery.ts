export function useApartmentsQuery() {
	const route = useRoute();
	const router = useRouter();

	const query = ref<ApartmentsQuery>({});

	watchEffect(() => {
		router.push({ path: '/', query: query.value });
	});

	watchEffect(() => {
		query.value.page = _getNumber('page', 1);
		query.value.limit = _getNumber('limit', 5);
		query.value.fRooms = _getNumber('fRooms', undefined);
		query.value.fPriceMin = _getNumber('fPriceMin', undefined);
		query.value.fPriceMax = _getNumber('fPriceMax', undefined);
		query.value.fAreaMin = _getNumber('fAreaMin', undefined);
		query.value.fAreaMax = _getNumber('fAreaMax', undefined);
	});

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

	return { query };
}
