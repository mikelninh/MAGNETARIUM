from pathlib import Path
import re
root=Path(__file__).parent
html=(root/'index.html').read_text()
css=(root/'styles.css').read_text()
assert 'href="./styles.css"' in html
html=html.replace('<link rel="stylesheet" href="./styles.css"/>', f'<style>\n{css}\n</style>')
js=[]
for part in ['physics.js','render.js','app.js']:
 source=(root/'src'/part).read_text()
 source=re.sub(r'^import [^\n]+;\s*\n','',source,flags=re.MULTILINE)
 source=re.sub(r'\bexport\s+(?=(const|function|class)\s)','',source)
 js.append(source)
bundle_js='\n'.join(js)
html=html.replace('<script type="module" src="./src/app.js"></script>',f'<script>\n{bundle_js}\n</script>')
assert 'type="module"' not in html
assert 'export class' not in html
out=root/'magnetarium-v4.1-standalone.html'
out.write_text(html)
print(f'Wrote standalone {out}: {out.stat().st_size:,} bytes')