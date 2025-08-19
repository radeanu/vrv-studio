<template>
	<ApTable :apartments="apartments" :floors="floors" />

	<pre>{{ pagination }}</pre>
	<pre>{{ query }}</pre>
	<pre>{{ apartments }}</pre>
</template>

<script setup lang="ts">
const { apartments, fetchApartments, floors, pagination, query } =
	useApartments();

onMounted(async () => {
	await fetchApartments();
});
</script>

<style lang="scss" scoped></style>
