/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', 'class'],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				'50': '#E5F0FF',
  				'100': '#CDE0FF',
  				'200': '#A0C3FF',
  				'300': '#66A3FF',
  				'400': '#3385FF',
  				'500': '#1A62FF',
  				'600': '#034AE8',
  				'700': '#043CB9',
  				'800': '#002266',
  				'900': '#05205D',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				'100': '#FFE2DF',
  				'300': '#FFB3AA',
  				'500': '#FF877A',
  				'700': '#CC5C52',
  				'900': '#B21100',
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			info: '#2B7FFF',
  			error: '#EF4444',
  			warning: '#F59E0B',
  			success: '#22C55E',
  			'view-switcher-active': '#f0f5ef',
  			ct: {
  				neutral: {
  					'0': '#FFFFFF',
  					'50': '#FAFAFA',
  					'200': '#E5E5E5',
  					'300': '#D4D4D4',
  					'400': '#A3A3A3',
  					'500': '#737373',
  					'700': '#404040',
  					'900': '#171717'
  				}
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'Inter',
  				'system-ui',
  				'sans-serif'
  			],
  			mono: [
  				'Geist Mono',
  				'monospace'
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
  			full: 'var(--radius-full)',

        // Semantic radii
        control: 'var(--radius-control)',
        surface: 'var(--radius-surface)',
        card: 'var(--radius-card)',
        panel: 'var(--radius-panel)',
        pill: 'var(--radius-pill)',
        sheet: 'var(--radius-sheet)',
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
