<template>
	<div class="apartment-filter">
		<div class="room-buttons">
			<button
				v-for="v in options.roomsMax"
				:key="v"
				:disabled="v > options.roomsFact"
				:class="{
					'room-button': true,
					'room-button__active': roomF === v,
					'room-button__disabled': v > options.roomsFact
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
						<span>&nbsp;{{ ruFormat.format(priceMinF) }}</span>
					</span>
					<span class="range-value">
						<span class="label">до</span>
						<span>&nbsp;{{ ruFormat.format(priceMaxF) }}</span>
					</span>
				</div>

				<div class="range-slider">
					<input
						type="range"
						:min="options.priceMin"
						:max="options.priceMax"
						v-model.number="priceMinF"
						class="range-input min"
					/>
					<input
						type="range"
						:min="options.priceMin"
						:max="options.priceMax"
						v-model.number="priceMaxF"
						class="range-input max"
					/>
					<div class="range-track"></div>
					<div class="range-progress"></div>
				</div>
			</div>
		</div>

		<div>
			<label class="filter-label">Площадь, м²</label>

			<div class="range-slider-container">
				<div class="range-values">
					<span class="range-value">
						<span class="label">от</span>
						<span>&nbsp;{{ areaMinF }}</span>
					</span>
					<span class="range-value">
						<span class="label">до</span>
						<span>&nbsp;{{ areaMaxF }}</span>
					</span>
				</div>

				<div class="range-slider">
					<input
						type="range"
						:min="options.areaMin"
						:max="options.areaMax"
						v-model.number="areaMinF"
						class="range-input min"
					/>
					<input
						type="range"
						:min="options.areaMin"
						:max="options.areaMax"
						v-model.number="areaMaxF"
						class="range-input max"
					/>
					<div class="range-track"></div>
					<div class="range-progress"></div>
				</div>
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
	roomsFact: number;
	priceMin: number;
	priceMax: number;
	areaMin: number;
	areaMax: number;
};

defineProps<{ options: FilterProps }>();

const roomF = defineModel<number>('rooms', { default: 2 });
const priceMinF = defineModel<number>('priceMin', { default: 0 });
const priceMaxF = defineModel<number>('priceMax', { default: 0 });
const areaMinF = defineModel<number>('areaMin', { default: 0 });
const areaMaxF = defineModel<number>('areaMax', { default: 0 });

function resetFilters() {
	roomF.value = 2;
	priceMinF.value = 0;
	priceMaxF.value = 0;
	areaMinF.value = 0;
	areaMaxF.value = 0;
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
	display: flex;
	justify-content: space-between;
	margin-bottom: 8px;
	font-size: 14px;
	line-height: 20px;
	font-weight: 400;

	.label {
		color: var(--color-primary-05);
	}
}

.range-slider {
	position: relative;
	height: 3px;
	background: var(--color-primary-01);
	border-radius: 1.5px;
}

.range-track {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	height: 100%;
	background: var(--color-primary-01);
	border-radius: 3px;
}

.range-progress {
	position: absolute;
	top: 0;
	height: 100%;
	background: #4caf50;
	border-radius: 3px;
	pointer-events: none;
}

.range-input {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	width: 100%;
	height: 6px;
	background: transparent;
	pointer-events: none;
	appearance: none;
	z-index: 2;

	&::-webkit-slider-thumb {
		appearance: none;
		width: 14px;
		height: 14px;
		border-radius: 50%;
		background: rgba(62, 181, 124, 1);
		cursor: pointer;
		pointer-events: auto;
	}

	&::-moz-range-thumb {
		width: 14px;
		height: 14px;
		border-radius: 50%;
		background: rgba(62, 181, 124, 1);
		cursor: pointer;
		pointer-events: auto;
	}

	&.min {
		z-index: 3;
	}

	&.max {
		z-index: 4;
	}
}

// Reset Button
.reset-button {
	display: flex;
	align-items: center;
	gap: 8px;
	background: none;
	border: none;
	color: #666;
	font-size: 14px;
	cursor: pointer;
	padding: 0;
	transition: color 0.2s ease;

	&:hover {
		color: #333;
	}
}

.reset-icon {
	font-size: 16px;
	font-weight: bold;
}
</style>
