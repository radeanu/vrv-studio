<template>
	<button
		class="btn-sort"
		:class="{ 'btn-sort__active': isActive }"
		@click="handleSwitchSort"
	>
		<slot name="label" />

		<span class="icons">
			<NuxtIcon
				name="local:arrow-up"
				:class="{
					icons__up: true,
					icons__active: isAsc
				}"
				size="4"
				@click.stop="handleSortClick('asc')"
			/>
			<NuxtIcon
				name="local:arrow-up"
				:class="{
					icons__down: true,
					icons__active: isDesc
				}"
				size="4"
				@click.stop="handleSortClick('desc')"
			/>
		</span>
	</button>
</template>

<script setup lang="ts" generic="T extends string | null">
const props = defineProps<{
	path: string;
	name: T;
}>();

const sort = useSort<T>(props.path);

const isActive = computed(() => props.name === sort.name.value);
const isAsc = computed(() => isActive.value && sort.order.value === 'asc');
const isDesc = computed(() => isActive.value && sort.order.value === 'desc');

function handleSwitchSort() {
	if (isDesc.value) {
		return sort.handleSort(null, null);
	}

	if (!isActive.value || isDesc.value) {
		return sort.handleSort(props.name, 'asc');
	}

	if (isAsc.value) {
		return sort.handleSort(props.name, 'desc');
	}

	return sort.handleSort(null, null);
}

function handleSortClick(value: SortOrder) {
	sort.handleSort(props.name, value);
}
</script>

<style scoped lang="scss">
.btn-sort {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	height: auto;
	width: fit-content;

	&__active {
		color: #3eb57c;
	}

	&__down {
		color: #0b1739;
		transform: rotate(180deg);
	}
}
.icons {
	display: flex;
	flex-direction: column;
	gap: 2px;
	align-items: center;
	justify-content: center;
	color: #0b1739;

	&__down {
		transform: rotate(180deg);
	}

	&__active {
		color: #3eb57c;
	}
}
</style>
