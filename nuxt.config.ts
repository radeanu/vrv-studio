// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	nitro: {
		preset: 'node-server',
		compressPublicAssets: true,
		minify: true
	},
	vite: {
		build: {
			modulePreload: false,
			assetsInlineLimit: 0,
			cssMinify: true,
			cssCodeSplit: true
		},
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@use "@/styles/mixins.scss" as *;`
				}
			}
		}
	},
	app: {
		baseURL: '/',
		head: {
			title: 'VRV',
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1',
			link: [
				{
					rel: 'shortcut icon',
					href: '/favicon.ico'
				}
			],
			htmlAttrs: {
				lang: 'ru'
			}
		}
	},
	icon: {
		clientBundle: {
			scan: true,
			includeCustomCollections: true,
			sizeLimitKb: 1240
		},
		componentName: 'NuxtIcon',
		customCollections: [
			{
				prefix: 'local',
				dir: './src/public/images/svg'
			}
		]
	},
	router: {
		options: {
			scrollBehaviorType: 'smooth'
		}
	},
	routeRules: {
		'/': {
			prerender: true
		}
	},
	css: ['@/styles/main.scss'],
	compatibilityDate: '2025-07-15',
	devtools: { enabled: false },
	modules: ['@nuxt/eslint', '@nuxt/icon', '@nuxt/image'],
	runtimeConfig: {
		// API_BASE_URL: process.env.API_BASE_URL,
		API_BASE_URL: 'http://localhost:3000/api'
	}
});
