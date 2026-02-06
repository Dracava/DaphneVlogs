#!/usr/bin/env python3
"""
Importeer vlogs uit daphnevlogs_overzicht_v6.xlsx naar de website.
Plaats het Excel-bestand in Downloads en run: python3 scripts/import_excel.py
"""
import json
import os
import re
import sys

try:
    import openpyxl
except ImportError:
    print("Installeer openpyxl: pip3 install openpyxl")
    sys.exit(1)

COUNTRY_MAP = {
    'Paris': ('fr', 'Frankrijk'),
    'Haarlem': ('nl', 'Nederland'),
    'Ibiza': ('es', 'Spanje'),
    'Dubrovnik': ('hr', 'Kroatië'),
    'America': ('us', 'Verenigde Staten'),
    'Indonesia': ('id', 'Indonesië'),
    'Austria': ('at', 'Oostenrijk'),
    'Camping Bulgaria': ('bg', 'Bulgarije'),
    'Romania': ('ro', 'Roemenië'),
    'Valduggia': ('it', 'Italië'),
    'London': ('gb', 'Verenigd Koninkrijk'),
    'Cambridge': ('gb', 'Verenigd Koninkrijk'),
    'Oxford': ('gb', 'Verenigd Koninkrijk'),
    'Rome': ('it', 'Italië'),
    'Antwerpen': ('be', 'België'),
    'Budapest': ('hu', 'Hongarije'),
    'Gent': ('be', 'België'),
    'IJsselmeer': ('nl', 'Nederland'),
    'Linz': ('at', 'Oostenrijk'),
    'Breda': ('nl', 'Nederland'),
    'Amsterdam': ('nl', 'Nederland'),
    'New Orleans': ('us', 'Verenigde Staten'),
    'Bulgaria': ('bg', 'Bulgarije'),
    'Italy': ('it', 'Italië'),
    'Utrecht': ('nl', 'Nederland'),
    'Volendam': ('nl', 'Nederland'),
    'Berlin': ('de', 'Duitsland'),
    'Lloret de Mar': ('es', 'Spanje'),
    'Singapore': ('sg', 'Singapore'),
    'Madurodam': ('nl', 'Nederland'),
}

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(SCRIPT_DIR)
EXCEL_PATH = os.path.expanduser('~/Downloads/daphnevlogs_overzicht_v6.xlsx')


def get_country(title, sheet_name):
    if sheet_name == 'Mixed_Media':
        return ('nl', 'Nederland')
    title_lower = (title or '').lower()
    for key, (code, name) in COUNTRY_MAP.items():
        if key.lower() in title_lower:
            return (code, name)
    return ('nl', 'Nederland')


def make_id(title, year, sheet_name, idx):
    safe = re.sub(r'[^a-z0-9]+', '-', (title or 'vlog').lower())
    safe = safe.strip('-')[:25]
    prefix = 'mixed' if sheet_name == 'Mixed_Media' else 'vacation'
    return f"{prefix}-{year}-{safe}-{idx}"


def esc_js(s):
    if s is None:
        return ''
    return str(s).replace('\\', '\\\\').replace("'", "\\'").replace('\n', ' ').replace('\r', '')


def main():
    if not os.path.exists(EXCEL_PATH):
        print(f"Excel-bestand niet gevonden: {EXCEL_PATH}")
        sys.exit(1)

    wb = openpyxl.load_workbook(EXCEL_PATH, read_only=True, data_only=True)
    all_vlogs = []

    for sheet_name in wb.sheetnames:
        ws = wb[sheet_name]
        rows = list(ws.iter_rows(values_only=True))
        if not rows:
            continue
        headers = [str(h).lower().replace(' ', '_') if h else f"col_{i}" for i, h in enumerate(rows[0])]

        for idx, row in enumerate(rows[1:], 1):
            if not any(row):
                continue
            d = dict(zip(headers, row))
            year = d.get('year')
            title = d.get('title')
            url = d.get('youtube_link')
            date_raw = d.get('date_raw')

            if not title:
                continue

            year = int(year) if year is not None and str(year).replace('.', '').isdigit() else 2024
            code, name = get_country(title, sheet_name)

            entry = {
                'id': make_id(title, year, sheet_name, idx),
                'title': title,
                'countryCode': code,
                'countryName': name,
                'dateRange': str(date_raw) if date_raw else str(year),
                'duration': '—',
                'url': url or '',
                'year': year,
                'isPopular': False,
                'isFavorite': False,
            }
            if sheet_name == 'Mixed_Media':
                entry['categories'] = ['event']
            if d.get('description'):
                entry['description'] = d['description']

            all_vlogs.append(entry)

    wb.close()
    all_vlogs.sort(key=lambda x: (-x['year'], x['title'] or ''))

    # Genereer JavaScript VLOGS array
    lines = ['// VLOGS uit daphnevlogs_overzicht_v6.xlsx', 'const VLOGS = [']
    for v in all_vlogs:
        parts = [
            f"  {{",
            f"    id: '{esc_js(v['id'])}',",
            f"    title: '{esc_js(v['title'])}',",
            f"    countryCode: '{esc_js(v['countryCode'])}',",
            f"    countryName: '{esc_js(v['countryName'])}',",
            f"    dateRange: '{esc_js(v['dateRange'])}',",
            f"    duration: '{esc_js(v['duration'])}',",
            f"    url: '{esc_js(v['url'])}',",
            f"    year: {v['year']},",
            f"    isPopular: {str(v['isPopular']).lower()},",
            f"    isFavorite: {str(v['isFavorite']).lower()},",
        ]
        if v.get('categories'):
            parts.append(f"    categories: {json.dumps(v['categories'])},")
        if v.get('description'):
            parts.append(f"    description: '{esc_js(v['description'])}',")
        parts[-1] = parts[-1].rstrip(',')
        parts.append("  },")
        lines.append('\n'.join(parts))
    lines.append('];')

    vlogs_block = '\n'.join(lines)

    # Vervang VLOGS array in main.js
    main_js_path = os.path.join(PROJECT_DIR, 'main.js')
    with open(main_js_path, 'r', encoding='utf-8') as f:
        content = f.read()

    start_idx = content.find("const VLOGS = [")
    if start_idx == -1:
        print("VLOGS array niet gevonden in main.js")
        sys.exit(1)

    end_search = content[start_idx:]
    depth = 0
    end_idx = 0
    in_string = False
    escape_next = False
    for i, c in enumerate(end_search):
        if escape_next:
            escape_next = False
            continue
        if in_string:
            if c == '\\':
                escape_next = True
            elif c in '"\'':
                in_string = False
            continue
        if c in '"\'':
            in_string = True
            continue
        if c == '[':
            depth += 1
        elif c == ']':
            depth -= 1
            if depth == 0 and i + 1 < len(end_search) and end_search[i + 1] == ';':
                end_idx = start_idx + i + 2
                break

    if end_idx == 0:
        end_idx = content.find("];", start_idx) + 2

    new_content = content[:start_idx] + vlogs_block + content[end_idx:]
    with open(main_js_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f"Geïmporteerd: {len(all_vlogs)} vlogs naar main.js")


if __name__ == '__main__':
    main()
