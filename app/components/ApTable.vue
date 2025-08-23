<template>
	<div class="ap-table">
		<ul class="headers">
			<li
				v-for="header in apStore.HEADERS"
				:key="header.name"
				:class="{ header: true, header__sm: header.sm }"
			>
				<UIButtonSort
					v-if="header.sort"
					:path="'/'"
					:name="header.sort_v"
				>
					<template #label>
						<span>{{ header.name }}</span>
					</template>
				</UIButtonSort>

				<span v-else>{{ header.name }}</span>
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
</script>

<style lang="scss" scoped>
.headers {
	display: flex;
	flex-wrap: nowrap;
	gap: 20px;
	align-items: center;
	height: 36px;
	font-size: 14px;
	line-height: 20px;
	font-weight: 400;
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
	.headers {
		display: grid;
		grid-template-columns: 80px minmax(100px, 1fr) repeat(
				3,
				minmax(80px, 120px)
			);
		column-gap: 20px;
	}

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
