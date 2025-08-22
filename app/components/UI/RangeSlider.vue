<template>
	<div class="range-slider" ref="sliderRef">
		<div class="range-slider__track" />
		<div class="range-slider__range" :style="rangeStyle" />
		<div
			class="range-slider__thumb range-slider__thumb--left"
			:style="leftThumbStyle"
			@mousedown="startDragging('min')"
			@touchstart="startDragging('min')"
			@mouseup="stopDragging"
			@touchend="stopDragging"
		/>
		<div
			class="range-slider__thumb range-slider__thumb--right"
			:style="rightThumbStyle"
			@mousedown="startDragging('max')"
			@touchstart="startDragging('max')"
			@mouseup="stopDragging"
			@touchend="stopDragging"
		/>
	</div>
</template>

<script setup lang="ts">
interface Props {
	minValue?: number;
	maxValue?: number;
	step?: number;
}

const props = withDefaults(defineProps<Props>(), {
	minValue: 0,
	maxValue: 100,
	step: 1
});

const minModel = defineModel<number | undefined>('min', { required: true });
const maxModel = defineModel<number | undefined>('max', { required: true });

let rafId: number | null = null;
const rangeMin = ref(minModel.value);
const rangeMax = ref(maxModel.value);

const isDragging = ref(false);
const sliderRect = ref<DOMRect>();
const activeThumb = ref<'min' | 'max' | null>(null);
const sliderRef = useTemplateRef<HTMLElement>('sliderRef');

const range = computed(() => props.maxValue - props.minValue);

const minPercent = computed(() => {
	if (!rangeMin.value) return 0;
	const val = ((rangeMin.value - props.minValue) / range.value) * 100;
	return Math.max(0, val);
});
const maxPercent = computed(() => {
	if (!rangeMax.value) return 100;
	const val = ((rangeMax.value - props.minValue) / range.value) * 100;
	return Math.max(0, val);
});
const rangeWidth = computed(() => maxPercent.value - minPercent.value);
const rangeStyle = computed(() => ({
	left: `${minPercent.value}%`,
	width: `${rangeWidth.value}%`
}));
const leftThumbStyle = computed(() => ({
	left: `${minPercent.value}%`
}));
const rightThumbStyle = computed(() => ({
	left: `${maxPercent.value}%`
}));

watch(
	() => rangeMin.value,
	() => (minModel.value = rangeMin.value)
);

watch(
	() => rangeMax.value,
	() => (maxModel.value = rangeMax.value)
);

watch(
	() => [minModel.value, maxModel.value],
	() => {
		rangeMin.value = minModel.value;
		rangeMax.value = maxModel.value;
	},
	{ immediate: true }
);

onUnmounted(() => {
	stopDragging();
	if (rafId) {
		cancelAnimationFrame(rafId);
	}
});

function throttledHandleDrag(e: MouseEvent | TouchEvent) {
	if (rafId) return;

	rafId = requestAnimationFrame(() => {
		handleDrag(e);
		rafId = null;
	});
}

function startDragging(thumb: 'min' | 'max') {
	isDragging.value = true;
	activeThumb.value = thumb;

	if (sliderRef.value) {
		sliderRect.value = sliderRef.value.getBoundingClientRect();
	}

	document.addEventListener('mousemove', throttledHandleDrag, {
		passive: false
	});
	document.addEventListener('mouseup', stopDragging, { passive: false });
	document.addEventListener('touchmove', throttledHandleDrag, {
		passive: false
	});
	document.addEventListener('touchend', stopDragging, { passive: false });
}

function handleDrag(e: MouseEvent | TouchEvent) {
	if (!isDragging.value || !activeThumb.value || !sliderRect.value) return;

	e.preventDefault();

	let clientX: number;
	if ('touches' in e && e.touches && e.touches.length > 0) {
		const touch = e.touches[0];
		if (!touch) return;
		clientX = touch.clientX;
	} else if ('clientX' in e) {
		clientX = e.clientX;
	} else {
		return;
	}

	const percent = Math.max(
		0,
		Math.min(
			100,
			((clientX - sliderRect.value.left) / sliderRect.value.width) * 100
		)
	);

	const value = Math.round((percent / 100) * range.value + props.minValue);
	const steppedValue = Math.round(value / props.step) * props.step;

	if (activeThumb.value === 'min') {
		const max = rangeMax.value ?? props.maxValue;
		const newMin = Math.min(steppedValue, max - props.step);
		rangeMin.value = Math.max(props.minValue, newMin);
		return;
	}

	if (activeThumb.value === 'max') {
		const min = rangeMin.value ?? props.minValue;
		const newMax = Math.max(steppedValue, min + props.step);
		rangeMax.value = Math.min(props.maxValue, newMax);
		return;
	}
}

function stopDragging() {
	isDragging.value = false;
	activeThumb.value = null;
	sliderRect.value = undefined;

	document.removeEventListener('mousemove', throttledHandleDrag);
	document.removeEventListener('mouseup', stopDragging);
	document.removeEventListener('touchmove', throttledHandleDrag);
	document.removeEventListener('touchend', stopDragging);
}
</script>

<style lang="scss" scoped>
.range-slider {
	position: relative;
	width: 100%;
	height: 3px;
	background: var(--color-primary-01);
	border-radius: 1.5px;
}

.range-slider__track {
	position: absolute;
	width: 100%;
	height: 100%;
	border-radius: 3px;
}

.range-slider__range {
	position: absolute;
	height: 100%;
	background: rgba(62, 181, 124, 1);
	border-radius: 3px;
	transition: all 0.1s ease;
	will-change: transform, width;
}

.range-slider__thumb {
	position: absolute;
	width: 14px;
	height: 14px;
	background: rgba(62, 181, 124, 1);
	border-radius: 50%;
	cursor: pointer;
	transform: translateX(-50%) translateY(-50%);
	top: 50%;
	transition: all 0.1s ease;
	will-change: transform;
}

.range-slider__thumb--left {
	z-index: 2;
}

.range-slider__thumb--right {
	z-index: 2;
}

.range-values {
	display: flex;
	justify-content: space-between;
	margin-top: 10px;
}

.range-value {
	font-size: 14px;
	color: #666;
}

.range-value label {
	font-weight: 500;
}

@media (hover: none) {
	.range-slider__thumb:hover {
		transform: translateX(-50%) translateY(-50%);
	}
}
</style>
