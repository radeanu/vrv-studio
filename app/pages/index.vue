<template>
	<main>
		<div>
			<h1>Квартиры</h1>

			<ApTable />
		</div>

		<div>
			<ApartmentFilter
				:price-min="2000000"
				:price-max="10000000"
				:area-min="30"
				:area-max="120"
				:rooms-min="1"
				:rooms-max="4"
			/>
		</div>
	</main>
</template>

<script setup lang="ts">
const apStore = useApartmentsStore();
// const { query } = useApartmentsQuery();

/*watchEffect(() => {
	if (Object.keys(query.value).length > 0) {
		apStore.fetchApartments(query.value);
	}
});*/

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
