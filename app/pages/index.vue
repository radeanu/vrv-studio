<template>
	<main>
		<div>
			<h1 ref="title">Квартиры</h1>

			<ApTable />
		</div>

		<div>
			<ApartmentFilter
				class="filter-container"
				:price-min="2000000"
				:price-max="10000000"
				:area-min="30"
				:area-max="120"
				:rooms-min="1"
				:rooms-max="4"
			/>
		</div>

		<ClientOnly>
			<button v-if="dScrollUp" class="btn-scroll-up" @click="scrollUp">
				<NuxtIcon name="local:up" size="20" />
			</button>
		</ClientOnly>
	</main>
</template>

<script setup lang="ts">
const apStore = useApartmentsStore();
const titleRef = useTemplateRef('title');

const dScrollUp = ref(false);

onMounted(async () => {
	await apStore.fetchApartments();
	if (!titleRef.value) return;

	const observer = useIntersectionObserver();

	observer.createObserver(titleRef.value, {
		isIntersecting: {
			handler: () => {
				dScrollUp.value = false;
			}
		},
		isHidden: {
			handler: () => {
				dScrollUp.value = true;
			}
		}
	});
});

function scrollUp() {
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	});
}
</script>

<style lang="scss" scoped>
main {
	display: grid;
	grid-template-columns: 1fr 318px;
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
	top: 48px;
	position: sticky;
}

.results-container {
	background: white;
	border-radius: 12px;
	padding: 24px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.btn-scroll-up {
	position: fixed;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background: #95d0a1;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	color: #ffffff;
	display: flex;
	align-items: center;
	justify-content: center;
	bottom: 32px;
	right: 32px;
	cursor: pointer;
}

@include desktop {
	main {
		grid-template-columns: 1fr minmax(299px, 399px);
		column-gap: 40px;
	}
}

@include desktop-lg {
	main {
		column-gap: 80px;
	}
}
</style>
