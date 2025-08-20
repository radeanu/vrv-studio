<template>
	<main>
		<h1>Квартиры</h1>
		<ApTable :apartments="apartments" :floors="floors" />
	</main>
</template>

<script setup lang="ts">
const { apartments, fetchApartments, floors, pagination, query } =
	useApartments();

onMounted(async () => {
	await fetchApartments();
});
</script>

<style lang="scss" scoped>
h1 {
	font-size: 54px;
	font-weight: 700;
	line-height: 55px;
}
</style>
