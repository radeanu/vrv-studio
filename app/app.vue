<template>
	<div>
		<NuxtLoadingIndicator
			:height="0"
			:throttle="0"
			style="transform: unset"
		>
			<UIRouteLoader />
		</NuxtLoadingIndicator>

		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>
