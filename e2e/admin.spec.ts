import { test, expect } from '@playwright/test'

test.describe('Admin Portal', () => {
  test('should redirect to login when not authenticated', async ({ page }) => {
    await page.goto('/admin')
    await expect(page).toHaveURL(/\/admin\/login/)
  })

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/admin/login')
    
    await page.fill('input[type="email"]', 'wrong@example.com')
    await page.fill('input[type="password"]', 'wrongpassword')
    await page.click('button[type="submit"]')
    
    await expect(page.locator('text=Invalid email or password')).toBeVisible()
  })

  test('should login with valid credentials and access dashboard', async ({ page }) => {
    await page.goto('/admin/login')
    
    // Use credentials from environment or test defaults
    const email = process.env.ADMIN_EMAIL || 'admin@teamtexasspecialneeds.org'
    const password = process.env.ADMIN_PASSWORD || 'Admin123!@#'
    
    await page.fill('input[type="email"]', email)
    await page.fill('input[type="password"]', password)
    await page.click('button[type="submit"]')
    
    // Should redirect to dashboard
    await expect(page).toHaveURL('/admin')
    await expect(page.locator('h1')).toContainText('Dashboard')
  })
})
