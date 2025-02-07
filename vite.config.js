import { resolve } from "path";
import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";
import VitePluginSvgSpritemap from '@spiriit/vite-plugin-svg-spritemap';

const root = resolve(__dirname, "src");
const outDir = resolve(__dirname, "build");

export default defineConfig({
	root,
	publicDir: "./../public",
	plugins: [
		handlebars({
			partialDirectory: resolve(__dirname, "src/partials"),
			context: {
				siteTitle: "My site",
			},
		}),
		VitePluginSvgSpritemap('./src/icons/*.svg', {
			injectSvgOnDev: true,
		})
	],
	build: {
		outDir,
		emptyOutDir: true,
		rollupOptions: {
			input: {
				main: resolve(root, "index.html"),
				targeting: resolve(root, "targeting", "index.html"),
			},
		},
	},
	resolve: {
		alias: {
			"/images": "/public/images",
		},
	},
});
