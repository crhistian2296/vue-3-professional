import { expect, Locator, Page } from '@playwright/test'

export class ModulePage {
  readonly page: Page
  readonly sectionCards: Locator

  constructor(page: Page) {
    this.page = page
    this.sectionCards = page.locator('main .grid >> .cursor-pointer')
  }

  async goToFirstSection() {
    // Expect at least one section card
    await expect(this.sectionCards.first()).toBeVisible()
    await this.sectionCards.first().click()
    await expect(this.page).toHaveURL(/\/modules\/[^/]+\/[^/]+$/)
  }
}
