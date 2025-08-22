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

		<div class="ap-table__body">
			<ApTableRow
				v-for="(item, idx) in apStore.apartments"
				:key="idx"
				:apartment="item"
			/>
		</div>

		<button
			v-if="apStore.pagination.pagination.next"
			class="btn-load-more"
			@click="apStore.loadMore"
		>
			Загрузить еще
		</button>
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

.ap-table__body {
	display: flex;
	flex-direction: column;
	gap: 4px;
}

.btn-load-more {
	display: flex;
	align-items: center;
	justify-content: center;
	width: fit-content;
	padding: 8px 24px;
	font-size: 15px;
	font-weight: 400;
	line-height: 22px;
	border-radius: 25px;
	border: 1px solid #0b173933;
	cursor: pointer;
	margin-top: 24px;
}

@include desktop {
	.header {
		display: block;
	}

	.ap-table__body {
		margin-top: 16px;
	}

	.btn-load-more {
		margin-top: 48px;
		font-size: 16px;
		line-height: 24px;
	}
}
</style>
