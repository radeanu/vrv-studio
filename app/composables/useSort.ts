export function useSort<T extends string | null>(path: string) {
	const route = useRoute();
	const router = useRouter();

	const name = ref<T | null>(null);
	const order = ref<SortOrder>(null);

	watch(
		() => route.query.order,
		() => {
			order.value = route.query.order as SortOrder;
		}
	);

	watch(
		() => route.query.sort,
		() => {
			name.value = route.query.sort ? (route.query.sort as T) : null;
		}
	);

	function _updateQuery() {
		router.push({
			path,
			query: {
				...route.query,
				sort: name.value ?? undefined,
				order: order.value ?? undefined
			}
		});
	}

	function handleSort(s: T | null, o: SortOrder) {
		if (s === null && o === null) {
			order.value = null;
			name.value = null;
			_updateQuery();
			return;
		}

		order.value = name.value !== s ? 'asc' : o;
		name.value = o === null ? null : s;
		_updateQuery();
	}

	return {
		name,
		order,
		handleSort
	};
}
