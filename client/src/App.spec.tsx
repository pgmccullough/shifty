import { test, expect } from '@playwright/experimental-ct-react';
import { App } from './App';

test.use({ viewport: { width: 500, height: 500 } });

test('Timer exists', async ({ mount }) => {
    const component = await mount(<App></App>);
    const timer = component.locator("h1");
    expect(timer).toBeTruthy();
});

test('Board exists', async ({ mount }) => {
    const component = await mount(<App></App>);
    const board = component.locator(".board");
    expect(board).toBeTruthy();
});