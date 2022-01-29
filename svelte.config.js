import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-auto';
import {mdsvex} from 'mdsvex'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		vite: { optimizeDeps: { include: ['lodash.get', 'lodash.isequal', 'lodash.clonedeep'] } }
	},

	extensions: ['.svelte', '.md'],

	preprocess: [
		preprocess({
			postcss: true
		}),
		mdsvex({
      extensions: ['.md']
    })
	]
};

export default config;
