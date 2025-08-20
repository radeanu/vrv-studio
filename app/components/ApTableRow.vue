<template>
	<div class="ap-row">
		<NuxtImg
			:src="payload.image"
			alt="Картинка"
			densities="x1 x2"
			format="webp"
			loading="lazy"
			width="80"
			height="80"
			sizes="80px"
			class="d-block-gt-960"
		/>

		<div class="info">
			<div>{{ apartment.count }}-комнатная №{{ apartment.number }}</div>

			<div class="info-row">
				<div>
					<span>{{ payload.area }}</span>
					<span class="d-i-lte-960"> м²</span>
				</div>

				<div>
					<span>{{ apartment.floor }}</span>
					<span class="text-05">
						<span> из {{ floors }}</span>
						<span class="d-i-lte-960"> этаж</span>
					</span>
				</div>

				<div>
					<span>{{ payload.price }}</span>
					<span class="d-i-lte-960"> ₽</span>
				</div>
			</div>
		</div>

		<NuxtImg
			:src="payload.image"
			alt="Картинка"
			densities="x1 x2"
			format="webp"
			loading="lazy"
			width="80"
			height="80"
			sizes="80px"
			class="d-block-lte-960"
		/>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	apartment: Apartment;
	floors: number;
}>();

const payload = computed(() => ({
	image: `/images/${props.apartment.image}`,
	area: formatDecimalNumber(props.apartment.area),
	price: ruFormat.format(props.apartment.price)
}));
</script>

<style lang="scss" scoped>
.ap-row {
	width: fit-content;
	border: 1px solid var(--border-color);
	border-radius: 8px;
	padding: 16px 24px;
	font-weight: 500;
	display: grid;
	grid-template-columns: minmax(50%, 358px) 80px;
	grid-template-rows: auto;
	column-gap: 20px;
}

.info {
	display: flex;
	flex-direction: column;
	gap: 20px;
}

.info-row {
	display: flex;
	flex-wrap: wrap;
	gap: 20px;
	align-items: center;
}

.text-05 {
	font-weight: 400;
	color: var(--color-primary-05);
}
</style>
