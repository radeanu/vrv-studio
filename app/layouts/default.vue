<template>
	<div class="default">
		<slot />
	</div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.default {
	width: 100%;
	height: 100%;
	max-width: 1440px;
	margin-inline: auto;
	padding-inline: 54px;
	padding-block: 48px;
}

@include desktop {
	.default {
		max-width: 1440px;
		padding-inline: 80px;
		padding-block: 96px;
	}
}
</style>
