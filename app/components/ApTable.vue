<template>
	<div class="ap-table">
		<ul class="headers">
			<li
				v-for="header in HEADERS"
				:key="header.name"
				:class="{ header: true, header__sm: header.sm }"
			>
				<span>{{ header.name }}</span>
			</li>
		</ul>

		<div>
			<ApTableRow
				v-for="(item, idx) in apStore.apartments"
				:key="idx"
				:apartment="item"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
const apStore = useApartmentsStore();

const HEADERS = [
	{ name: 'Планировка', sort: false, sm: false },
	{ name: 'Квартира', sort: false, sm: false },
	{ name: 'S, м²', sort: true, sm: true },
	{ name: 'Этаж', sort: true, sm: true },
	{ name: 'Цена, ₽', sort: true, sm: true }
];
</script>

<style lang="scss" scoped>
.headers {
	display: flex;
	flex-wrap: nowrap;
	gap: 20px;
	align-items: center;
	height: 36px;
}

.header {
	display: none;

	&__sm {
		display: block;
	}
}

@include desktop {
	.header {
		display: block;
	}
}
</style>
