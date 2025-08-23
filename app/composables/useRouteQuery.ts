export function useRouteQuery(path: string) {
	const route = useRoute();
	const router = useRouter();

	function getQuery() {
		return route.query;
	}

	function getNumber<T>(name: string, defV: T): T | number {
		try {
			const val = route.query[name];
			if (!val) return defV;

			const res = parseInt(val as string);
			return res;
		} catch (error) {
			return defV;
		}
	}

	function getValue<T>(name: string, defV: T): T | undefined {
		const val = route.query[name];
		if (!val) return defV;

		return val as T | undefined;
	}

	function pushToRoute<T>(query: T) {
		router.push({ path, query: { ...route.query, ...query } });
	}

	return {
		getQuery,
		getValue,
		getNumber,
		pushToRoute
	};
}
