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

print(translate("Hello world, this is a test.", "fr"))
