"""Create the public copy of the supplied CV without telephone information."""
from pathlib import Path
import re
import sys

local_packages = Path(__file__).resolve().parents[1] / '.local' / 'python'
if local_packages.exists():
    sys.path.insert(0, str(local_packages))
import pymupdf


def prepare(source: Path) -> Path:
    root = Path(__file__).resolve().parents[1]
    output = root / 'public' / 'documents' / 'yuyang-chen-cv.pdf'
    document = pymupdf.open(source)
    page = document[0]
    phone_links = [link for link in page.get_links() if link.get('uri', '').lower().startswith('tel:')]
    if len(document) != 2 or len(phone_links) != 1:
        raise ValueError('Unexpected source CV layout; inspect the PDF before editing.')
    private_digits = re.sub(r'\D', '', phone_links[0]['uri'])
    contact_rect = pymupdf.Rect(110, 90, 505, 106)
    row = page.get_textbox(contact_rect)
    if 'ychenli@connect.ust.hk' not in row or 'Hong Kong SAR' not in row:
        raise ValueError('Expected contact row was not found.')
    for link in page.get_links():
        if contact_rect.intersects(link['from']):
            page.delete_link(link)
    page.add_redact_annot(contact_rect, fill=(1, 1, 1))
    page.apply_redactions()
    contact = 'HKUST   |   ychenli@connect.ust.hk   |   Hong Kong SAR'
    fontsize = 9.5
    left = (page.rect.width - pymupdf.get_text_length(contact, fontname='helv', fontsize=fontsize)) / 2
    page.insert_text((left, 101), contact, fontname='helv', fontsize=fontsize, color=(0, 0, 0))
    email = 'ychenli@connect.ust.hk'
    email_left = left + pymupdf.get_text_length('HKUST   |   ', fontname='helv', fontsize=fontsize)
    email_right = email_left + pymupdf.get_text_length(email, fontname='helv', fontsize=fontsize)
    page.insert_link({'kind': pymupdf.LINK_URI, 'from': pymupdf.Rect(email_left, 91, email_right, 104), 'uri': f'mailto:{email}'})
    metadata = document.metadata
    metadata['subject'] = 'Public CV — telephone information removed'
    document.set_metadata(metadata)
    output.parent.mkdir(parents=True, exist_ok=True)
    document.save(output, garbage=4, deflate=True, clean=True)
    document.close()
    with pymupdf.open(output) as checked:
        assert private_digits not in re.sub(r'\D', '', ''.join(page.get_text() for page in checked))
        for checked_page in checked:
            assert not any(link.get('uri', '').lower().startswith('tel:') for link in checked_page.get_links())
        for xref in range(1, checked.xref_length()):
            raw = checked.xref_object(xref) + (checked.xref_stream(xref) or b'').decode('latin1')
            assert private_digits not in re.sub(r'\D', '', raw)
    print(f'Created {output}; telephone text and links removed.')
    return output


if __name__ == '__main__':
    if len(sys.argv) != 2:
        raise SystemExit('Usage: python scripts/prepare_cv.py /private/path/CVChenYuyang.pdf')
    prepare(Path(sys.argv[1]))
