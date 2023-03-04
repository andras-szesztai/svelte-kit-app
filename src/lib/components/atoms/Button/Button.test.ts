import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/svelte';

import Button from './Button.svelte';

describe('Button', () => {
	it('should render without error', () => {
		render(Button);
		expect(screen.getByRole('button', { name: /hello/i })).toBeInTheDocument();
	});
});
