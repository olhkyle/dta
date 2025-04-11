import { css } from '@emotion/react';

const GlobalStyle = css`
	:root {
		font-weight: 400;
		font-synthesis: none;
		text-rendering: optimizeLegibility;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		-webkit-text-size-adjust: 100%;
		text-size-adjust: 100%;

		--color-black: #191a20;
		--color-white: #fff;

		--color-gray-50: #f9fafb;
		--color-gray-100: #f2f4f6;
		--color-gray-200: #e5e8eb;
		--color-gray-300: #d1d6db;
		--color-gray-400: #b0b8c1;
		--color-gray-500: #8b95a1;
		--color-gray-600: #6b7684;
		--color-gray-700: #4e5968;
		--color-gray-800: #333d4b;
		--color-gray-900: #191f28;
		--color-gray-opacity-50: rgba(0, 23, 51, 0.02);
		--color-gray-opacity-100: rgba(2, 32, 71, 0.05);
		--color-gray-opacity-200: rgba(0, 27, 55, 0.1);
		--color-gray-opacity-300: rgba(0, 29, 58, 0.18);
		--color-gray-opacity-400: rgba(0, 25, 54, 0.31);
		--color-gray-opacity-500: rgba(3, 24, 50, 0.46);
		--color-gray-opacity-600: rgba(0, 19, 43, 0.58);
		--color-gray-opacity-700: rgba(3, 18, 40, 0.7);
		--color-gray-opacity-800: rgba(0, 12, 30, 0.8);
		--color-gray-opacity-900: rgba(2, 9, 19, 0.91);
		--color-transparent-bgColor-hover: #b1bac41f;

		--color-green-10: #46df8e60;
		--color-green-50: #46df8e;
		--color-green-100: #76e4b8;
		--color-green-200: #3fd599;
		--color-green-300: #15c47e;
		--color-green-400: #0e7b6c;

		--color-blue-100: #0687f0;
		--color-blue-200: #2272eb;
		--color-blue-300: #0164e6;

		--color-purple: #6466f1;

		--color-yellow: #ffd644;

		--color-orange-100: #ffa927;
		--color-orange-200: #fe9800;

		--color-red: #ff4545;
		--color-dark: #090b16;

		--nav-height: 80px;
		--footer-height: 60px;

		--padding-lg: 32px;
		--padding-md: 16px;
		--padding-sm: 8px;

		--line-height-base: 1.5;
		--fz-2xl: 96px;
		--fz-xl: 72px;
		--fz-h1: 56px;
		--fz-h2: 48px;
		--fz-h3: 36px;
		--fz-h4: 32px;
		--fz-h5: 24px;
		--fz-h6: 20px;
		--fz-h7: 17px;
		--fz-rp: 16px;
		--fz-p: 15px;
		--fz-m: 14px;
		--fz-sm: 13px;
		--fz-xs: 11px;

		--fw-regular: 400;
		--fw-medium: 500;
		--fw-semibold: 600;
		--fw-bold: 700;
		--fw-black: 900;

		--radius: 8px;
		--radius-extra: 9999px;

		/* z-index */
		--nav-index: 50;
		--sideNav-index: 999;
		--modal-index: 9990;
		--toast-index: 9999;

		--transition-duration: 0.2;

		--toastify-color-success: var(--color-green-50);
		--toastify-color-error: var(--color-red);
		--toastify-font-family: 'Pretendard';
	}

	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		border: 0;
		vertical-align: baseline;
		font-family: 'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Mona-Sans',
			'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
			sans-serif;
		word-break: keep-all;
		-webkit-tap-highlight-color: rgba(255, 255, 255, 0);
	}

	body {
		width: 100%;
		height: 100%;
		font-size: var(--fz-p);
		line-height: var(--line-height-base);
	}

	body[data-theme='light'] {
		--position-left: 2px;
		--text-color: var(--color-dark);
		--disabled-text-color: var(--color-gray-600);
		--bg-color: var(--color-white);
		--btn-text-color: var(--color-white);
		--btn-bg-color: var(--color-dark);
		--btn-light-bg-color: var(--color-gray-100);
		--btn-hover-color: var(--color-gray-700);
		--btn-hover-bg-color: var(--color-gray-900);
		--btn-hover-light-bg-color: var(--color-gray-100);
		--border-color: var(--color-gray-100);
		--border-light-color: var(--color-gray-opacity-200);
		--outline-light-color: var(--color-gray-opacity-200);
		--table-border-color: var(--color-gray-opacity-200);
		--overlay-bg-color: rgb(0 0 0 / 0.15);
		--skeleton-bg-color: var(--color-gray-opacity-50);

		color: var(--color-dark);
		background-color: var(--color-white);
	}

	body[data-theme='dark'] {
		--position-left: 26px;
		--text-color: var(--color-white);
		--disabled-text-color: var(--color-gray-300);
		--bg-color: var(--color-dark);
		--btn-text-color: var(--color-dark);
		--btn-bg-color: var(--color-white);
		--btn-light-bg-color: var(--color-gray-900);
		--btn-hover-color: var(--color-gray-200);
		--btn-hover-bg-color: var(--color-gray-100);
		--btn-hover-light-bg-color: var(--color-gray-900);
		--border-color: var(--color-gray-800);
		--border-light-color: var(--color-gray-600);
		--outline-light-color: var(--color-gray-600);
		--table-border-color: var(--color-gray-600);
		--overlay-bg-color: rgb(0 0 0/ 0.4);
		--skeleton-bg-color: var(--color-gray-opacity-800);

		color: var(--color-white);
		background-color: var(--color-dark);
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		margin: 0;
		font-size: 1em;
		font-weight: normal;
	}

	ul,
	ol,
	li {
		padding-left: 0;
		list-style-type: none;
	}

	a {
		text-decoration: none;
		color: inherit;
	}

	a,
	button {
		cursor: pointer;
	}

	button,
	input,
	select,
	textarea {
		background-color: transparent;
		border: 0;
		&:focus {
			outline: none;
			box-shadow: none;
		}
	}

	select {
		appearance: none;
		-moz-appearance: none;
		-webkit-appearance: none;
	}

	::-moz-selection {
		background: var(--color-green-10);
	}

	::selection {
		background: var(--color-green-10);
	}

	.underlined {
		position: relative;
		text-decoration: none !important;
		white-space: nowrap;
	}

	.underlined:focus {
		outline: none;
		text-decoration: none !important;
	}

	.underlined:after {
		content: '';
		height: 2px;
		transform: scaleX(0);
		transition: transform 0.25s ease;
		transform-origin: left;
		left: 0;
		bottom: -6px;
		width: 100%;
		display: block;
		position: absolute;
	}

	.underlined:hover:after,
	.underlined:focus:after,
	.active.underlined:after {
		background-color: currentColor;
		transform: scaleX(1);
	}

	.clip-path-button {
		clip-path: polygon(0 0, 100% 0, 100% 70%, 88% 100%, 0 100%);
	}

	@media (prefers-reduced-motion) {
		.underlined:after {
			opacity: 0;
			transition: opacity 0.25s ease;
		}

		.underlined:hover:after,
		.underlined:focus:after,
		.active.underlined:after {
			opacity: 1;
		}
	}

	.report {
		break-after: page;
	}

	@media print {
		margin: 0;
		padding: 0;

		.report + .report {
			margin-top: 0;
		}

		.page-break {
			page-break-inside: avoid;
			page-break-after: auto;
		}
	}

	@page {
		size: A4;
		margin: 15mm 20mm;
	}
`;

export default GlobalStyle;
