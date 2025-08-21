export function useRouteQuery(path: string) {
	const route = useRoute();
	const router = useRouter();

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

	function pushToRoute<T>(query: T) {
		router.push({ path, query: { ...route.query, ...query } });
	}

	return {
		getNumber,
		pushToRoute
	};
}
