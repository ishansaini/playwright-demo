import { test, expect, type Page } from '@playwright/test';

test.describe("navigation", () => {
  test('has title', async ({ page }) => {
    await page.goto('https://playwright.dev/');
  
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
  });
  
  test('get started link', async ({ page }) => {
    await page.goto('https://playwright.dev/');
  
    // Click the get started link.
    await page.getByRole('link', { name: 'Get started' }).click();
  
    // Expects the URL to contain intro.
    await expect(page).toHaveURL(/.*intro/);
  });
});

test('todo mvc', async ( {page} ) => {
  await page.goto('https://demo.playwright.dev/todomvc');


  const TODO_ITEMS = [
    'buy some cheese',
    'feed the cat',
    'book a doctors appointment'
  ];

  // create a new todo locator
  const newTodo = page.getByPlaceholder('What needs to be done?');

  // Create 1st todo.
  await newTodo.fill(TODO_ITEMS[0]);
  await newTodo.press('Enter');

  // Make sure the list only has one todo .
  await expect(page.getByTestId('todo-title')).toHaveText([
    TODO_ITEMS[0]
  ]);

  // Create 2nd todo.
  await newTodo.fill(TODO_ITEMS[1]);
  await newTodo.press('Enter');

  // Make sure the list now has two todo items.
  await expect(page.getByTestId('todo-title')).toHaveText([
    TODO_ITEMS[0],
    TODO_ITEMS[1]
  ]);

  await checkNumberOfTodosInLocalStorage(page, 2);
});

async function checkNumberOfTodosInLocalStorage(page: Page, expected: number) {
  return await page.waitForFunction(e => {
    return JSON.parse(localStorage['react-todos']).length === e;
  }, expected);
}
