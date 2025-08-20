<template>
	<main>
		<div>
			<h1>Квартиры</h1>

			<ApTable />
		</div>

		<div>
			<ApartmentFilter
				:options="{
					roomsMax: apStore.filters.roomsMax,
					roomsMin: apStore.filters.roomsMin,
					priceMin: apStore.filters.priceMin,
					priceMax: apStore.filters.priceMax,
					areaMin: apStore.filters.areaMin,
					areaMax: apStore.filters.areaMax
				}"
				v-model:rooms="filterValues.rooms"
				v-model:priceMin="filterValues.priceMin"
				v-model:priceMax="filterValues.priceMax"
				v-model:areaMin="filterValues.areaMin"
				v-model:areaMax="filterValues.areaMax"
			/>
			<pre>{{ apStore.filters }}</pre>
		</div>
	</main>
</template>

<script setup lang="ts">
const filterValues = ref({
	rooms: 2,
	priceMin: 5500000,
	priceMax: 18900000,
	areaMin: 33,
	areaMax: 123
});

const apStore = useApartmentsStore();
const { query } = useApartmentsQuery();

watchEffect(() => {
	if (Object.keys(query.value).length > 0) {
		apStore.fetchApartments(query.value);
	}
});

onMounted(async () => {
	await apStore.fetchApartments();
});
</script>

<style lang="scss" scoped>
main {
	max-width: 1200px;
	margin: 0 auto;
	padding: 24px;
	display: grid;
	grid-template-columns: 1fr minmax(318px, 1fr);
	grid-template-rows: auto;
	column-gap: 28px;
}

h1 {
	font-size: 54px;
	font-weight: 700;
	line-height: 55px;
	margin-bottom: 32px;
}

.filter-container {
	margin-bottom: 32px;
}

.results-container {
	background: white;
	border-radius: 12px;
	padding: 24px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
