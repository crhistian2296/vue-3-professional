import { expect, Locator, Page } from '@playwright/test'

export class HomePage {
  readonly page: Page
  readonly goToModulesButton: Locator
  readonly progressText: Locator

  constructor(page: Page) {
    this.page = page
    this.goToModulesButton = page.getByRole('button', { name: 'Ir a los módulos' })
    // The widget displays: "Ejercicios completados: X / Y"
    this.progressText = page.locator('text=Ejercicios completados:')
  }

  async goto() {
    await this.page.goto('/')
    await expect(this.goToModulesButton).toBeVisible()
  }

  async clickGoToModules() {
    await this.goToModulesButton.click()
    await expect(this.page).toHaveURL(/\/modules\//)
  }

  async getCompletedCount(): Promise<number> {
    const text = await this.progressText.locator('xpath=..').textContent()
    // Fallback: locate the strong number in the same row
    const row = this.progressText.locator('xpath=..')
    const numberText = await row.locator('text=/\\d+ \/ \\d+/').first().textContent()
    const match = numberText?.match(/(\d+)\s*\/\s*(\d+)/)
    if (!match) throw new Error(`Unable to parse progress from: ${numberText}`)
    const current = Number(match[1])
    return current
  }
}
