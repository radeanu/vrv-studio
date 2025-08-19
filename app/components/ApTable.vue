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
			<li v-for="(item, idx) in apartments" :key="idx" class="grid-row">
				<NuxtImg
					:src="item.image"
					alt="Картинка"
					densities="x1 x2"
					format="webp"
					loading="lazy"
					sizes="360px xs:800px md:1200px xl:408px"
				/>

				<div class="info-row grid-row">
					<div>{{ item.count }}-комнатная №{{ item.number }}</div>
					<div>{{ item.area }}</div>

					<div>
						<span>{{ item.floor }}</span>
						<span> из {{ floors }}</span>
						<span class="d-i-lte-960"> этаж</span>
					</div>

					<div>
						<span>{{ ruFormat.format(item.price) }}</span>
						<span class="d-i-lte-960"> ₽</span>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
defineProps<{
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

.info-row {
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
}

@include desktop {
	.header {
		display: block;
	}
}
</style>
