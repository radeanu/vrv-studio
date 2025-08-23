<template>
	<div class="apartment-filter">
		<div class="room-buttons">
			<button
				v-for="btn in roomsBtns"
				:key="btn.nr"
				:disabled="btn.disabled"
				:class="btn.class"
				@click="filters.rooms = btn.nr"
			>
				{{ btn.nr }}к
			</button>
		</div>

		<div>
			<label class="filter-label">Стоимость квартиры, ₽</label>

			<div class="range-slider-container">
				<div class="range-values">
					<span class="range-value">
						<span class="label">от</span>
						<span class="value">
							&nbsp;{{
								ruFormat.format(filters.priceMin ?? priceMin)
							}}
						</span>
					</span>
					<span class="range-value">
						<span class="label">до</span>
						<span class="value">
							&nbsp;{{
								ruFormat.format(filters.priceMax ?? priceMax)
							}}
						</span>
					</span>
				</div>

				<UIRangeSlider
					:min-value="priceMin"
					:max-value="priceMax"
					:step="10000"
					v-model:min="filters.priceMin"
					v-model:max="filters.priceMax"
				/>
			</div>
		</div>

		<div>
			<label class="filter-label">Площадь, м²</label>

			<div class="range-slider-container">
				<div class="range-values">
					<span class="range-value">
						<span class="label">от</span>
						<span class="value">
							&nbsp;{{ filters.areaMin ?? areaMin }}
						</span>
					</span>
					<span class="range-value">
						<span class="label">до</span>
						<span class="value">
							&nbsp;{{ filters.areaMax ?? areaMax }}
						</span>
					</span>
				</div>

				<UIRangeSlider
					:min-value="areaMin"
					:max-value="areaMax"
					:step="1"
					v-model:min="filters.areaMin"
					v-model:max="filters.areaMax"
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
	priceMin: number;
	priceMax: number;
	areaMin: number;
	areaMax: number;
	roomsMin: number;
	roomsMax: number;
};

defineProps<FilterProps>();

const apStore = useApartmentsStore();
const apQuery = useApartmentsQuery();

const filters = ref<{
	[key: string]: number | undefined;
}>({
	rooms: undefined,
	priceMin: undefined,
	priceMax: undefined,
	areaMin: undefined,
	areaMax: undefined
});

const maxRoomsCount = computed(() => {
	return Math.max(...apStore.apartments.map((ap) => ap.count), 1);
});

const roomsBtns = computed(() => {
	return Array.from({ length: 4 }, (_, i) => {
		const disabled = filters.value.rooms
			? false
			: i + 1 > maxRoomsCount.value;

		return {
			nr: i + 1,
			active: filters.value.rooms === i + 1,
			disabled,
			class: {
				'room-button': true,
				'room-button__disabled': disabled,
				'room-button__active': filters.value.rooms === i + 1
			}
		};
	});
});

watch(
	() => filters.value,
	() => {
		apQuery.pushToRoute({
			page: 1,
			fPriceMin: filters.value.priceMin,
			fPriceMax: filters.value.priceMax,
			fAreaMin: filters.value.areaMin,
			fAreaMax: filters.value.areaMax,
			fRooms: filters.value.rooms
		});
	},
	{ deep: true }
);

onMounted(() => {
	filters.value.rooms = apQuery.query.value.fRooms;
	filters.value.priceMin = apQuery.query.value.fPriceMin;
	filters.value.priceMax = apQuery.query.value.fPriceMax;
	filters.value.areaMin = apQuery.query.value.fAreaMin;
	filters.value.areaMax = apQuery.query.value.fAreaMax;
});

function resetFilters() {
	filters.value.rooms = undefined;
	filters.value.priceMin = undefined;
	filters.value.priceMax = undefined;
	filters.value.areaMin = undefined;
	filters.value.areaMax = undefined;

	apStore.reset();
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
