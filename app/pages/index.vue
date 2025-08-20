<template>
	<main>
		<div>
			<h1>Квартиры</h1>

			<ApTable :apartments="apartments" :floors="floors" />
		</div>

		<div>
			<ApartmentFilter
				:options="fOptions"
				v-model:rooms="filterValues.rooms"
				v-model:priceMin="filterValues.priceMin"
				v-model:priceMax="filterValues.priceMax"
				v-model:areaMin="filterValues.areaMin"
				v-model:areaMax="filterValues.areaMax"
			/>
			<pre>{{ filterValues }}</pre>
		</div>
	</main>
</template>

<script setup lang="ts">
const { apartments, fetchApartments, floors, pagination, query } =
	useApartments();

const fOptions = {
	roomsMax: 4,
	roomsFact: 3,
	priceMin: 5500000,
	priceMax: 18900000,
	areaMin: 33,
	areaMax: 123
};

// Filter state
const filterValues = ref({
	rooms: 2,
	priceMin: 5500000,
	priceMax: 18900000,
	areaMin: 33,
	areaMax: 123
});

// Handle filter changes
const handleFilterChange = (newFilters: any) => {
	console.log('Filter changed:', newFilters);
	// Here you would typically update the query and refetch apartments
	// For now, we'll just log the changes
};

onMounted(async () => {
	await fetchApartments();
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
