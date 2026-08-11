import json
import os
import re
import sys
import urllib.request
import urllib.parse
import time

# Ensure UTF-8 output encoding
sys.stdout.reconfigure(encoding='utf-8')

filepath = r"n:\Antigravity\morocco view travel\src\data\blogPosts.ts"

def translate(text, target_lang):
    # Retry logic
    for attempt in range(3):
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
            with urllib.request.urlopen(req, timeout=10) as response:
                result = json.loads(response.read().decode('utf-8'))
                translated_text = "".join([part[0] for part in result[0] if part[0]])
                return translated_text
        except Exception as e:
            print(f"  Attempt {attempt + 1} failed for {target_lang}: {e}")
            time.sleep(1)
    return None

def translate_html(html, target_lang):
    if not html:
        return ""
    parts = re.split(r'(<[^>]+>)', html)
    translated_parts = []
    for part in parts:
        if part.startswith('<') and part.endswith('>'):
            # It's an HTML tag, keep it as is
            # But replace the /en/ locale in links with target_lang
            modified_tag = part.replace('/en/', f'/{target_lang}/')
            translated_parts.append(modified_tag)
        else:
            text = part.strip()
            if text:
                # Retain whitespace prefix/suffix
                lead_space = part[:len(part)-len(part.lstrip())]
                trail_space = part[len(part.rstrip()):]
                
                # Check if it's just numbers, symbols, or very short text
                if not re.search(r'[a-zA-Z]', text):
                    translated_parts.append(part)
                    continue
                
                translated_text = translate(text, target_lang)
                if translated_text:
                    translated_parts.append(lead_space + translated_text + trail_space)
                else:
                    translated_parts.append(part)
            else:
                translated_parts.append(part)
    return "".join(translated_parts)

# Load current blog posts
with open(filepath, 'r', encoding='utf-8') as f:
    text = f.read()

# Parse JS text
json_text = text.replace("import type { BlogPost } from '../types';", "")
json_text = json_text.replace("export const blogPosts: BlogPost[] = ", "")
json_text = json_text.strip().rstrip(';')

posts = json.loads(json_text)
total_posts = len(posts)

langs = ["fr", "es", "it", "ja", "zh"]

print(f"Starting translation for {total_posts} posts...")

# Loop through posts and translate
for idx, post in enumerate(posts):
    slug = post['slug']
    print(f"[{idx+1}/{total_posts}] Translating {slug}...")
    
    for lang in langs:
        field_name = f"content{lang.capitalize()}"
        # Check if the content is empty or default empty string
        current_content = post.get(field_name, "").strip()
        if not current_content or current_content == "":
            print(f"  Translating content to {lang}...")
            translated = translate_html(post['content'], lang)
            post[field_name] = translated
            # Sleep slightly to avoid rate limiting
            time.sleep(0.2)
        else:
            print(f"  Content for {lang} already exists. Skipping.")

# Save back as JS file content
new_content = "import type { BlogPost } from '../types';\n\n"
new_content += "export const blogPosts: BlogPost[] = "
new_content += json.dumps(posts, ensure_ascii=False, indent=2)
new_content += ";\n"

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("All blog post contents translated successfully!")
