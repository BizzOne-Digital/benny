import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('should navigate through main pages', async ({ page }) => {
    await page.goto('/')
    
    // Check homepage loads
    await expect(page.locator('h1')).toContainText('Everyone Deserves')
    
    // Navigate to About
    await page.click('text=About')
    await expect(page).toHaveURL('/about')
    await expect(page.locator('h1')).toContainText('Our Story')
    
    // Navigate to Programs
    await page.click('text=Programs')
    await expect(page).toHaveURL('/services')
    
    // Navigate to Contact
    await page.click('text=Contact')
    await expect(page).toHaveURL('/contact')
  })

  test('should have accessible header navigation', async ({ page }) => {
    await page.goto('/')
    
    const nav = page.locator('nav[aria-label="Main navigation"]')
    await expect(nav).toBeVisible()
    
    // Check skip link for accessibility
    const skipLink = page.locator('.skip-link')
    await expect(skipLink).toHaveText('Skip to main content')
  })

  test('should work on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    // Mobile menu button should be visible
    const mobileMenuButton = page.locator('button[aria-label="Toggle menu"]')
    await expect(mobileMenuButton).toBeVisible()
    
    // Open mobile menu
    await mobileMenuButton.click()
    
    // Menu items should be visible
    await expect(page.locator('text=About')).toBeVisible()
  })
})
