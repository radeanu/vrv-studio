<template>
	<div>Intro</div>

	<pre>{{ pagination }}</pre>
	<pre>{{ query }}</pre>
</template>

<script setup lang="ts">
const { apartments, fetchApartments, floors, pagination, query } =
	useApartments();

onMounted(async () => {
	await fetchApartments();
});
</script>

<style lang="scss" scoped></style>
