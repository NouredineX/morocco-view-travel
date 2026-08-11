import re
import urllib.request
import urllib.parse
import json

def translate(text, target_lang):
    try:
        url = "https://translate.googleapis.com/translate_a/single"
        params = {
            "client": "gtx",
            "sl": "en",
            "tl": target_lang,
            "dt": "t",
            "q": text
        }
        query_string = urllib.parse.urlencode(params)
        req = urllib.request.Request(f"{url}?{query_string}", headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode('utf-8'))
            translated_text = "".join([part[0] for part in result[0] if part[0]])
            return translated_text
    except Exception as e:
        print(f"Error: {e}")
        return None

def translate_html(html, target_lang):
    parts = re.split(r'(<[^>]+>)', html)
    translated_parts = []
    for part in parts:
        if part.startswith('<') and part.endswith('>'):
            translated_parts.append(part)
        else:
            text = part.strip()
            if text:
                # Retain whitespace prefix/suffix
                lead_space = part[:len(part)-len(part.lstrip())]
                trail_space = part[len(part.rstrip()):]
                translated_text = translate(text, target_lang)
                if translated_text:
                    translated_parts.append(lead_space + translated_text + trail_space)
                else:
                    translated_parts.append(part)
            else:
                translated_parts.append(part)
    return "".join(translated_parts)

test_html = '<p>This is a <strong>strong</strong> test with <a href="/en/tours">Morocco tours</a>.</p>'
print(translate_html(test_html, "fr"))
