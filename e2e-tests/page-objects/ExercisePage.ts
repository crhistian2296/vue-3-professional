import { expect, Locator, Page } from '@playwright/test'

export class ExercisePage {
  readonly page: Page
  readonly completionRow: Locator
  readonly toggleButton: Locator
  readonly statusText: Locator

  constructor(page: Page) {
    this.page = page
    // The completion status row contains the text 'Marcar como completado' or 'Completado'
    this.completionRow = page.locator('div').filter({ hasText: /Marcar como completado|Completado/ }).first()
    this.toggleButton = this.completionRow.getByRole('button').first()
    this.statusText = this.completionRow.locator('span.font-medium')
  }

  async ensureLoaded() {
    await expect(this.completionRow).toBeVisible()
  }

  async isCompleted(): Promise<boolean> {
    const text = (await this.statusText.textContent())?.trim() || ''
    return /Completado/i.test(text)
  }

  async markAsCompleted() {
    await this.ensureLoaded()
    if (!(await this.isCompleted())) {
      await this.toggleButton.click()
      await expect(this.statusText).toHaveText(/Completado/i)
    }
  }
}
