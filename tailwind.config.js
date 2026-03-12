/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', 'class'],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				'50': 'var(--primary-50)',
  				'100': 'var(--primary-100)',
  				'200': 'var(--primary-200)',
  				'300': 'var(--primary-300)',
  				'400': 'var(--primary-400)',
  				'500': 'var(--primary-500)',
  				'600': 'var(--primary-600)',
  				'700': 'var(--primary-700)',
  				'800': 'var(--primary-800)',
  				'900': 'var(--primary-900)',
  				DEFAULT: 'var(--primary)',
  				foreground: 'var(--primary-foreground)'
  			},
  			secondary: {
  				'100': 'var(--secondary-100)',
  				'300': 'var(--secondary-300)',
  				'500': 'var(--secondary-500)',
  				'700': 'var(--secondary-700)',
  				'900': 'var(--secondary-900)',
  				DEFAULT: 'var(--secondary)',
  				foreground: 'var(--secondary-foreground)'
  			},
  			info: '#2B7FFF',
  			error: '#EF4444',
  			warning: '#F59E0B',
  			success: '#22C55E',
  			'view-switcher-active': 'var(--view-switcher-active)',
  			background: 'var(--background)',
  			foreground: 'var(--foreground)',
  			card: {
  				DEFAULT: 'var(--card)',
  				foreground: 'var(--card-foreground)'
  			},
  			popover: {
  				DEFAULT: 'var(--popover)',
  				foreground: 'var(--popover-foreground)'
  			},
  			muted: {
  				DEFAULT: 'var(--muted)',
  				foreground: 'var(--muted-foreground)'
  			},
  			accent: {
  				DEFAULT: 'var(--accent)',
  				foreground: 'var(--accent-foreground)'
  			},
  			destructive: {
  				DEFAULT: 'var(--destructive)',
  				foreground: 'var(--destructive-foreground)'
  			},
  			border: 'var(--border)',
  			input: 'var(--input)',
  			ring: 'var(--ring)',
  			chart: {
  				'1': 'var(--chart-1)',
  				'2': 'var(--chart-2)',
  				'3': 'var(--chart-3)',
  				'4': 'var(--chart-4)',
  				'5': 'var(--chart-5)'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'var(--font-sans)'
  			],
  			mono: [
  				'var(--font-mono)'
  			]
  		},
  		spacing: {
  			'13': '52px',
  			'15': '60px',
  			'18': '72px',
  			'22': '88px',
  			'4.5': '18px'
  		},
  		borderRadius: {
  			sm: 'var(--radius-sm)',
  			md: 'var(--radius-md)',
  			lg: 'var(--radius-lg)',
  			xl: 'var(--radius-xl)',
  			'2xl': 'var(--radius-2xl)',
  			full: 'var(--radius-full)'
  		},
  		fontSize: {
  			// Tailwind default scale (min 12px, all even)
  			xs: ['12px', { lineHeight: '16px' }],
  			sm: ['14px', { lineHeight: '20px' }],
  			base: ['16px', { lineHeight: '24px' }],
  			lg: ['18px', { lineHeight: '26px' }],
  			xl: ['20px', { lineHeight: '28px' }],
  			'2xl': ['22px', { lineHeight: '30px' }],
  			'3xl': ['26px', { lineHeight: '34px' }],
  			'4xl': ['30px', { lineHeight: '38px' }],
  			// Custom tokens
  			'heading-1': [
  				'26px',
  				{
  					lineHeight: '34px',
  					letterSpacing: '-0.01em',
  					fontWeight: '600'
  				}
  			],
  			'heading-2': [
  				'22px',
  				{
  					lineHeight: '30px',
  					letterSpacing: '0',
  					fontWeight: '600'
  				}
  			],
  			'heading-3': [
  				'20px',
  				{
  					lineHeight: '28px',
  					letterSpacing: '0',
  					fontWeight: '600'
  				}
  			],
  			'heading-4': [
  				'18px',
  				{
  					lineHeight: '26px',
  					letterSpacing: '0',
  					fontWeight: '600'
  				}
  			],
  			'body-large': [
  				'18px',
  				{
  					lineHeight: '26px',
  					letterSpacing: '-0.01em',
  					fontWeight: '500'
  				}
  			],
  			body: [
  				'16px',
  				{
  					lineHeight: '24px',
  					letterSpacing: '0',
  					fontWeight: '400'
  				}
  			],
  			'body-small': [
  				'12px',
  				{
  					lineHeight: '18px',
  					letterSpacing: '0',
  					fontWeight: '400'
  				}
  			],
  			label: [
  				'16px',
  				{
  					lineHeight: '22px',
  					letterSpacing: '-0.01em',
  					fontWeight: '500'
  				}
  			],
  			'label-small': [
  				'12px',
  				{
  					lineHeight: '16px',
  					letterSpacing: '0',
  					fontWeight: '500'
  				}
  			],
  			button: [
  				'16px',
  				{
  					lineHeight: '22px',
  					letterSpacing: '-0.01em',
  					fontWeight: '600'
  				}
  			],
  			'button-small': [
  				'12px',
  				{
  					lineHeight: '16px',
  					letterSpacing: '-0.01em',
  					fontWeight: '600'
  				}
  			],
  			data: [
  				'12px',
  				{
  					lineHeight: '16px',
  					letterSpacing: '0',
  					fontWeight: '400'
  				}
  			]
  		}
  	}
  },
  plugins: [require('tailwindcss-animate')],
}
