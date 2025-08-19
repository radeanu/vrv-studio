<template>
	<div>
		<ul class="grid-row headers">
			<li
				v-for="header in HEADERS"
				:key="header.name"
				:class="{ header: true, header__sm: header.sm }"
			>
				<span>{{ header.name }}</span>
			</li>
		</ul>

		<ul>
			<li v-for="(item, idx) in apartList" :key="idx" class="grid-row">
				<NuxtImg
					:src="item.image"
					alt="Картинка"
					densities="x1 x2"
					format="webp"
					loading="lazy"
					sizes="360px xs:800px md:1200px xl:408px"
				/>

				<div>{{ item._description }}</div>

				<div>{{ item.area }}</div>
				<div>{{ item._floor }}</div>
				<div>{{ item._price }}</div>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	floors: number;
	apartments: Apartment[];
}>();

const HEADERS = [
	{ name: 'Планировка', sort: false, sm: false },
	{ name: 'Квартира', sort: false, sm: false },
	{ name: 'S, м²', sort: true, sm: true },
	{ name: 'Этаж', sort: true, sm: true },
	{ name: 'Цена, ₽', sort: true, sm: true }
];

const apartList = computed(() => {
	return props.apartments.map((item) => {
		return {
			...item,
			_description: `${item.count}-комнатная №${item.number}`,
			_floor: `${item.floor} из ${props.floors}`,
			_price: ruFormat.format(item.price)
		};
	});
});
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
