from playwright.sync_api import sync_playwright
from pathlib import Path
import time, json, shutil
PROJECT=Path(__file__).resolve().parent.parent
ROOT=(PROJECT/'magnetarium-v4-standalone.html').read_text()
OUT=PROJECT/'tests'/'screenshots';OUT.mkdir(exist_ok=True)
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path=shutil.which('chromium') or shutil.which('google-chrome') or None,args=['--no-sandbox','--disable-dev-shm-usage'])
 for device in ['desktop','mobile']:
  page=browser.new_page(viewport={'width':1440,'height':1000} if device=='desktop' else {'width':390,'height':844},device_scale_factor=1,is_mobile=device=='mobile',has_touch=device=='mobile')
  errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  page.set_content(ROOT,wait_until='domcontentloaded');page.wait_for_timeout(500)
  print(device,'page','set_content','title',page.title(),'canvas',page.locator('#stageCanvas').evaluate('(el)=>[el.width,el.height]'),'horizontalOverflow',page.evaluate('document.documentElement.scrollWidth>innerWidth'))
  page.screenshot(path=str(OUT/f'{device}-magnet.png'),full_page=True)
  for scene in ['wire','solenoid','toroid','geometry','compass']:
   page.locator(f'[data-scene="{scene}"]').click()
   page.wait_for_timeout(200)
   print(' ',scene,'title',page.locator('#chapterTitle').inner_text(),'canvas',page.locator('#stageCanvas').evaluate('(el)=>[el.width,el.height]'),'errors',errors[-1:] or None)
   if device=='desktop' and scene in ['toroid','geometry']:
    page.screenshot(path=str(OUT/f'desktop-{scene}.png'),full_page=True)
  if device=='desktop':
   page.locator('[data-scene="toroid"]').click();page.locator('#turns').fill('190');page.locator('#turns').dispatch_event('input');print(' toroid reading:',page.locator('#canvasEquation').inner_text())
   page.locator('#whyButton').click();print(' Why visible?',page.locator('#whyPanel').is_visible())
   page.locator('#motionBtn').click();print(' Paused?',page.locator('#activityLabel').inner_text())
  print('errors',errors)
  page.close()
 browser.close()