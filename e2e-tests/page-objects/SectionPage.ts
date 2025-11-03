import { expect, Locator, Page } from '@playwright/test'

export class SectionPage {
  readonly page: Page
  readonly exerciseCards: Locator

  constructor(page: Page) {
    this.page = page
    this.exerciseCards = page.locator('main .grid >> .cursor-pointer')
  }

  async goToFirstExercise() {
    await expect(this.exerciseCards.first()).toBeVisible()
    await this.exerciseCards.first().click()
    await expect(this.page).toHaveURL(/\/modules\/[^/]+\/[^/]+\/[^/]+$/)
  }
}
