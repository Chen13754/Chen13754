"""Inspect the public PDF, including objects and links, and render both pages."""
from pathlib import Path
import re
import sys

root = Path(__file__).resolve().parents[1]
local_packages = root / '.local' / 'python'
if local_packages.exists():
    sys.path.insert(0, str(local_packages))
import pymupdf

path = Path(sys.argv[1]) if len(sys.argv) > 1 else root / 'public/documents/yuyang-chen-cv.pdf'
with pymupdf.open(path) as document:
    assert len(document) == 2, 'Expected two pages'
    text = '\n'.join(page.get_text() for page in document)
    assert 'ychenli@connect.ust.hk' in text
    assert not re.search(r'tel\s*:|\+852|\b852\s+\d', text, re.IGNORECASE)
    for term in ['Education', 'Research Experience', 'Awards', 'Research Interests', 'Skills', '3.8', '3.97', 'Franka', 'Depth Anything']:
        assert term in text, f'Missing original content: {term}'
    for page in document:
        assert not any(link.get('uri', '').lower().startswith('tel:') for link in page.get_links())
    assert any(link.get('uri') == 'mailto:ychenli@connect.ust.hk' for link in document[0].get_links())
    for xref in range(1, document.xref_length()):
        raw = document.xref_object(xref) + (document.xref_stream(xref) or b'').decode('latin1')
        assert not re.search(r'tel:\s*\+?\d', raw, re.IGNORECASE)
    previews = root / 'tmp' / 'cv-review'
    previews.mkdir(parents=True, exist_ok=True)
    for index, page in enumerate(document):
        page.get_pixmap(matrix=pymupdf.Matrix(1.5, 1.5)).save(previews / f'page-{index + 1}.png')
    print(f'PASS: two pages, academic content preserved, email link retained, no telephone text or links. Previews: {previews}')
