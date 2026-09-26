import { test, expect } from '@playwright/test'

test.describe('Contact Form', () => {
  test('should display contact form', async ({ page }) => {
    await page.goto('/contact')
    
    await expect(page.locator('h1')).toContainText('Get in Touch')
    await expect(page.locator('input[name="name"]')).toBeVisible()
    await expect(page.locator('input[name="email"]')).toBeVisible()
    await expect(page.locator('select[name="interestType"]')).toBeVisible()
    await expect(page.locator('textarea[name="message"]')).toBeVisible()
  })

  test('should validate required fields', async ({ page }) => {
    await page.goto('/contact')
    
    await page.click('button[type="submit"]')
    
    // HTML5 validation should prevent submission
    const nameInput = page.locator('input[name="name"]')
    await expect(nameInput).toHaveAttribute('required', '')
  })

  test('should submit form successfully', async ({ page }) => {
    await page.goto('/contact')
    
    await page.fill('input[name="name"]', 'John Doe')
    await page.fill('input[name="email"]', 'john@example.com')
    await page.fill('input[name="phone"]', '555-123-4567')
    await page.selectOption('select[name="interestType"]', 'general')
    await page.fill('textarea[name="message"]', 'This is a test message')
    
    await page.click('button[type="submit"]')
    
    // Should show success message
    await expect(page.locator('text=Thank you for your message')).toBeVisible({
      timeout: 10000,
    })
  })
})
