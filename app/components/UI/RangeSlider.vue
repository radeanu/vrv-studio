<template>
	<div class="range-slider">
		<div class="range-slider__track"></div>
		<div class="range-slider__range" :style="rangeStyle"></div>
		<div
			class="range-slider__thumb range-slider__thumb--left"
			:style="leftThumbStyle"
			@mousedown="startDragging('min')"
			@touchstart="startDragging('min')"
			@mouseup="stopDragging"
			@touchend="stopDragging"
		></div>
		<div
			class="range-slider__thumb range-slider__thumb--right"
			:style="rightThumbStyle"
			@mousedown="startDragging('max')"
			@touchstart="startDragging('max')"
			@mouseup="stopDragging"
			@touchend="stopDragging"
		></div>
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

const minModel = defineModel<number>('min', { default: 0 });
const maxModel = defineModel<number>('max', { default: 100 });

const isDragging = ref(false);
const activeThumb = ref<'min' | 'max' | null>(null);

const minPercent = computed(() => {
	return (
		((minModel.value - props.minValue) /
			(props.maxValue - props.minValue)) *
		100
	);
});

const maxPercent = computed(() => {
	return (
		((maxModel.value - props.minValue) /
			(props.maxValue - props.minValue)) *
		100
	);
});

const rangeWidth = computed(() => {
	return maxPercent.value - minPercent.value;
});

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

onUnmounted(() => {
	stopDragging();
});

function startDragging(thumb: 'min' | 'max') {
	isDragging.value = true;
	activeThumb.value = thumb;

	document.addEventListener('mousemove', handleDrag, { passive: false });
	document.addEventListener('mouseup', stopDragging, { passive: false });
	document.addEventListener('touchmove', handleDrag, { passive: false });
	document.addEventListener('touchend', stopDragging, { passive: false });
}

function handleDrag(e: MouseEvent | TouchEvent) {
	if (!isDragging.value || !activeThumb.value) return;

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

	const slider = document.querySelector('.range-slider');
	if (!slider) return;

	const rect = slider.getBoundingClientRect();
	const percent = Math.max(
		0,
		Math.min(100, ((clientX - rect.left) / rect.width) * 100)
	);

	const value = Math.round(
		(percent / 100) * (props.maxValue - props.minValue) + props.minValue
	);
	const steppedValue = Math.round(value / props.step) * props.step;

	if (activeThumb.value === 'min') {
		const newMin = Math.min(steppedValue, maxModel.value - props.step);
		minModel.value = Math.max(props.minValue, newMin);
	} else {
		const newMax = Math.max(steppedValue, minModel.value + props.step);
		maxModel.value = Math.min(props.maxValue, newMax);
	}
}

function stopDragging() {
	isDragging.value = false;
	activeThumb.value = null;

	document.removeEventListener('mousemove', handleDrag);
	document.removeEventListener('mouseup', stopDragging);
	document.removeEventListener('touchmove', handleDrag);
	document.removeEventListener('touchend', stopDragging);
}
</script>

<style scoped>
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
