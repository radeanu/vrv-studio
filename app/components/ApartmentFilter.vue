<template>
	<div class="apartment-filter">
		<div class="room-buttons">
			<button
				v-for="v in options.roomsMax"
				:key="v"
				:disabled="v > options.roomsMin"
				:class="{
					'room-button': true,
					'room-button__active': roomF === v,
					'room-button__disabled': v > options.roomsMin
				}"
				@click="roomF = v"
			>
				{{ v }}к
			</button>
		</div>

		<div>
			<label class="filter-label">Стоимость квартиры, ₽</label>

			<div class="range-slider-container">
				<div class="range-values">
					<span class="range-value">
						<span class="label">от</span>
						<span class="value"
							>&nbsp;{{ ruFormat.format(priceMinF) }}</span
						>
					</span>
					<span class="range-value">
						<span class="label">до</span>
						<span class="value"
							>&nbsp;{{ ruFormat.format(priceMaxF) }}</span
						>
					</span>
				</div>

				<UIRangeSlider
					:min-value="options.priceMin"
					:max-value="options.priceMax"
					:step="10000"
					v-model:min="priceMinF"
					v-model:max="priceMaxF"
				/>
			</div>
		</div>

		<div>
			<label class="filter-label">Площадь, м²</label>

			<div class="range-slider-container">
				<div class="range-values">
					<span class="range-value">
						<span class="label">от</span>
						<span class="value">&nbsp;{{ areaMinF }}</span>
					</span>
					<span class="range-value">
						<span class="label">до</span>
						<span class="value">&nbsp;{{ areaMaxF }}</span>
					</span>
				</div>

				<UIRangeSlider
					:min-value="options.areaMin"
					:max-value="options.areaMax"
					:step="1"
					v-model:min="areaMinF"
					v-model:max="areaMaxF"
				/>
			</div>
		</div>

		<div>
			<button class="reset-button" @click="resetFilters">
				<span>Сбросить параметры</span>
				<span class="reset-icon">×</span>
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
export type FilterProps = {
	roomsMax: number;
	roomsMin: number;
	priceMin: number;
	priceMax: number;
	areaMin: number;
	areaMax: number;
};

const props = defineProps<{ options: FilterProps }>();

const roomF = defineModel<number>('rooms', { default: 2 });
const priceMinF = defineModel<number>('priceMin', { default: 0 });
const priceMaxF = defineModel<number>('priceMax', { default: 0 });
const areaMinF = defineModel<number>('areaMin', { default: 0 });
const areaMaxF = defineModel<number>('areaMax', { default: 0 });

onMounted(() => {
	resetFilters();
});

function resetFilters() {
	roomF.value = 2;
	const priceRange = props.options.priceMax - props.options.priceMin;
	priceMinF.value = props.options.priceMin + priceRange * 0.1;
	priceMaxF.value = props.options.priceMax - priceRange * 0.2;

	const areaRange = props.options.areaMax - props.options.areaMin;
	areaMinF.value = props.options.areaMin + areaRange * 0.1;
	areaMaxF.value = props.options.areaMax - areaRange * 0.2;
}
</script>

<style scoped lang="scss">
.apartment-filter {
	padding: 20px 19px;
	border-radius: 10px;
	background: linear-gradient(
		135deg,
		rgba(174, 228, 178, 0.3) 0%,
		rgba(149, 208, 161, 0.3) 100%
	);
	display: flex;
	flex-direction: column;
	gap: 24px;
}

.filter-label {
	font-weight: 400;
	line-height: 18px;
	font-size: 13px;
}

.room-buttons {
	display: flex;
	flex-wrap: nowrap;
	gap: 16px;
	align-items: center;
}

.room-button {
	width: 44px;
	height: 44px;
	border-radius: 50%;
	background-color: #ffffff;
	color: var(--color-primary);
	font-size: 16px;
	cursor: pointer;
	transition: all 0.2s ease;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;

	&__active {
		color: #ffffff;
		box-shadow: 0px 6px 20px 0px rgba(149, 208, 161, 1);
		background-color: rgba(62, 181, 124, 1);
	}

	&__disabled {
		color: var(--color-primary-02);
		cursor: not-allowed;
	}
}

.range-slider-container {
	margin-top: 8px;
}

.range-values {
	display: grid;
	grid-template-columns: 1fr 1fr;
	margin-bottom: 8px;
	font-size: 14px;
	line-height: 20px;
	font-weight: 400;
}

.range-value {
	display: flex;
	align-items: center;
	gap: 8px;

	.label {
		color: var(--color-primary-05);
	}

	.value {
		font-weight: 500;
	}
}

.reset-button {
	display: flex;
	align-items: center;
	gap: 8px;
	color: #000000;
	font-size: 14px;
	margin-left: 16px;
	font-weight: 400;
	cursor: pointer;

	&:hover {
		color: var(--color-primary);
	}
}

.reset-icon {
	font-size: 16px;
	font-weight: bold;
}
</style>
