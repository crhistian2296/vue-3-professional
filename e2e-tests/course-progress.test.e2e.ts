import { test, expect } from '@playwright/test'
import { HomePage } from './page-objects/HomePage'
import { ModulePage } from './page-objects/ModulePage'
import { SectionPage } from './page-objects/SectionPage'
import { ExercisePage } from './page-objects/ExercisePage'

// This test follows the Page Object pattern to navigate through the course UI
// and verifies that solving the first exercise increases the global progress.

test.describe('Course progress', () => {
  test('should increase when solving the first exercise', async ({ page }) => {
    const home = new HomePage(page)

    // 1) Open Home and read current progress
    await home.goto()
    const before = await home.getCompletedCount()

    // 2) Go to Modules (first module is opened from Home CTA)
    await home.clickGoToModules()

    // 3) In Module page, open the first section
    const modulePage = new ModulePage(page)
    await modulePage.goToFirstSection()

    // 4) In Section page, open the first exercise
    const sectionPage = new SectionPage(page)
    await sectionPage.goToFirstExercise()

    // 5) In Exercise page, mark exercise as completed (id is from the route)
    const exercisePage = new ExercisePage(page)
    await exercisePage.markAsCompleted()

    // 6) Go back to Home and check that progress increased by 1
    await page.goto('/')
    const after = await home.getCompletedCount()

    expect(after).toBeGreaterThanOrEqual(before + 1)
  })
})
