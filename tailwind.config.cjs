const config = {
	darkMode: 'class',

	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		fontFamily: {
			logo: ['Stick No Bills'],
			logo2: ['Architects Daughter']
		},
		extend: {
			keyframes: {
				hop: {
					'0%,100': { transform: 'translate(0px,0px)' },
					'50%': { transform: 'translate(0px, -3px)' }
				},
				flicker: {
					'0%': { color: '#374151' },
					'30%': { color: '#fde68a' },
					'33%': { color: '#374151' },
					'40%': { color: '#374151' },
					'44%': { color: '#fde68a' },
					'69%': { color: '#fde68a' },
					'70%': { color: '#374151' },
					'99%': { color: '#374151' },
					'100%': { color: '#fde68a' }
				}
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
};

module.exports = config;
