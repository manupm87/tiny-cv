# E2E Testing Guide

## Overview

Comprehensive E2E testing suite for the tiny-cv application using Playwright. Tests cover desktop navigation, mobile interactions, accessibility, error handling, and performance.

## Test Files

### Existing Tests (Enhanced)
- **`ui.spec.js`** - Basic UI and element visibility tests
- **`mobile-navigation.spec.js`** - Mobile swipe navigation and interactions  
- **`mobile-collapse.spec.js`** - Mobile card accordion behavior

### New Test Suites
- **`desktop-navigation.spec.js`** - Desktop scroll navigation, nav dots, keyboard (13 tests)
- **`accessibility.spec.js`** - ARIA labels, keyboard support, screen readers (12 tests)
- **`error-handling.spec.js`** - Error boundaries, edge cases, resilience (14 tests)
- **`performance.spec.js`** - Load times, Core Web Vitals, resource optimization (12 tests)

**Total: 265 tests across 7 files**

---

## Running Tests

### Run All Tests
```bash
npx playwright test
```

### Run Specific Test File
```bash
npx playwright test tests/desktop-navigation.spec.js
npx playwright test tests/accessibility.spec.js
npx playwright test tests/error-handling.spec.js
npx playwright test tests/performance.spec.js
```

### Run Desktop-Only Tests
```bash
npx playwright test --project=chromium --project=firefox --project=webkit
```

### Run Mobile-Only Tests
```bash
npx playwright test --project="Mobile Chrome" --project="Mobile Safari"
```

### Run Tests in UI Mode (Interactive)
```bash
npx playwright test --ui
```

### Run Tests with Debugging
```bash
npx playwright test --debug
```

### Run Specific Test
```bash
npx playwright test -g "should navigate through all timeline sections"
```

### Generate HTML Report
```bash
npx playwright test
npx playwright show-report
```

---

## Test Coverage

### Desktop Navigation (13 tests)
✅ Intro slide display and content  
✅ Scroll-based navigation through all sections  
✅ Navigation dots update on scroll  
✅ Click navigation using dots  
✅ All cards expanded by default  
✅ Background orbs animation  
✅ Location images display  
✅ Keyboard navigation  
✅ Card hover effects  
✅ Scroll position preservation on resize  

### Accessibility (12 tests)
✅ Semantic HTML structure  
✅ Keyboard navigation (Tab key)  
✅ Accessible link labels  
✅ ARIA labels on interactive elements  
✅ Keyboard interaction on cards  
✅ Color contrast verification  
✅ Image alt text  
✅ Focus management  
✅ Screen reader announcements  
✅ No focus traps  
✅ Reduced motion support  

### Error Handling (14 tests)
✅ No JavaScript errors on load  
✅ No console errors  
✅ Graceful handling of missing images  
✅ Network failure handling  
✅ Recovery from temporary failures  
✅ Rapid navigation stress test  
✅ Rapid swipe stress test  
✅ Invalid data robustness  
✅ No sensitive information in errors  
✅ State maintenance after errors  
✅ Error boundary fallback UI  
✅ Browser resize handling  

### Performance (12 tests)
✅ Page load time < 5s  
✅ Largest Contentful Paint (LCP) < 2.5s  
✅ Reasonable bundle size  
✅ No excessive main thread blocking  
✅ Smooth scrolling  
✅ Animation performance  
✅ No memory leaks  
✅ Lazy image loading  
✅ First Input Delay (FID) < 100ms  
✅ Reasonable network requests  
✅ Concurrent animation handling  
✅ Resource caching  

---

## Test Configuration

### Browsers
- **Desktop**: Chrome, Firefox, Safari (WebKit)
- **Mobile**: Pixel 5 (Android), iPhone 12 (iOS)

### Base URL
Development: `http://localhost:5173`

### Auto-start Dev Server
Tests automatically start dev server if not running

### Retries
- CI: 2 retries
- Local: 0 retries

---

## Best Practices

### Writing Tests
1. **Use semantic selectors** - Prefer `getByRole`, `getByText` over CSS selectors
2. **Test user behavior** - Not implementation details
3. **Make tests independent** - Each test should work in isolation
4. **Use beforeEach** - For common setup
5. **Add meaningful assertions** - Check what matters to users

### Debugging Tests
```bash
# Run with headed browser
npx playwright test --headed

# Run single test in debug mode
npx playwright test --debug -g "test name"

# Record new tests
npx playwright codegen http://localhost:5173
```

### CI/CD Integration
```yaml
# .github/workflows/test.yml example
- name: Install dependencies
  run: npm ci

- name: Install Playwright browsers
  run: npx playwright install --with-deps

- name: Run tests
  run: npx playwright test

- name: Upload test report
  if: always()
  uses: actions/upload-artifact@v3
  with:
    name: playwright-report
    path: playwright-report/
```

---

## Common Issues

### Dev server not starting
```bash
# Start manually
npm run dev

# Then run tests
npx playwright test
```

### Tests timing out
Increase timeout in `playwright.config.js`:
```javascript
use: {
  timeout: 30000, // 30 seconds
}
```

### Flaky tests
Add explicit waits:
```javascript
await page.waitForLoadState('networkidle');
await page.waitForTimeout(300);
```

---

## Continuous Improvement

### Adding New Tests
1. Create new `.spec.js` file in `tests/` directory
2. Follow existing patterns
3. Run and verify locally
4. Update this documentation

### Test Maintenance
- Review test failures regularly
- Update selectors when UI changes
- Keep tests fast (< 30s per test)
- Remove outdated tests

### Metrics to Track
- Test execution time
- Test pass rate
- Coverage %
- Flakiness rate

---

## Quick Reference

```bash
# Run all tests
npx playwright test

# Run desktop tests only
npx playwright test --project=chromium

# Run mobile tests only  
npx playwright test --project="Mobile Chrome"

# Run specific file
npx playwright test tests/accessibility.spec.js

# Interactive mode
npx playwright test --ui

# Debug mode
npx playwright test --debug

# Show report
npx playwright show-report
```

---

## Test Results

After running tests, you'll get:
- **Console output** - Pass/fail summary
- **HTML report** - Detailed results with screenshots
- **Trace files** - For debugging failures

View HTML report:
```bash
npx playwright show-report
```

---

## Success Criteria

✅ **All tests pass** on all browsers  
✅ **No flaky tests** (consistent results)  
✅ **Fast execution** (< 5 minutes total)  
✅ **Good coverage** of user journeys  
✅ **Clear error messages** when tests fail  

Your E2E testing suite is now comprehensive and production-ready! 🎉
