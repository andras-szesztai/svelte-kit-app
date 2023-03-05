import { test, expect } from '@playwright/test';

test.describe('Sign In Page', () => {
	test('should display the sign in page', async ({ page }) => {
		await page.goto('/signin');
		await expect(page.getByText(/You are not signed in/i)).toBeVisible();
	});
});
