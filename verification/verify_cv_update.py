from playwright.sync_api import sync_playwright
import time

def verify_timeline():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1280, 'height': 800})

        # Navigate to the app
        page.goto("http://localhost:3000")
        time.sleep(2) # Wait for animations

        # Check Intro Slide
        page.screenshot(path="verification/intro_slide.png")
        print("Captured intro_slide.png")

        # Verify Intro Content
        intro_text = page.locator("h1").inner_text()
        print(f"Intro Title: {intro_text}")
        if "Manuel Pérez Martínez" not in intro_text:
            print("ERROR: Intro title mismatch")

        # Scroll to Education (Gijon & Bologna)
        # Using hash navigation to ensure we hit the section
        page.goto("http://localhost:3000/#education")
        time.sleep(2) # Wait for scroll and animation

        page.screenshot(path="verification/education_slide.png")
        print("Captured education_slide.png")

        # Verify Education Content
        education_title = page.locator("#education .section-title").inner_text()
        print(f"Education Title: {education_title}")
        if "The Foundation" not in education_title:
             print("ERROR: Education title mismatch")

        # Scroll to London
        page.goto("http://localhost:3000/#london")
        time.sleep(2)
        page.screenshot(path="verification/london_slide.png")
        print("Captured london_slide.png")

        browser.close()

if __name__ == "__main__":
    verify_timeline()
