import json
import sys

# Set output encoding to UTF-8
sys.stdout.reconfigure(encoding='utf-8')

filepath = r'n:\Antigravity\morocco view travel\src\data\blogPosts.ts'

with open(filepath, 'r', encoding='utf-8') as f:
    text = f.read()

# Strip import and export statement to get pure JSON
json_text = text.replace("import type { BlogPost } from '../types';", "")
json_text = json_text.replace("export const blogPosts: BlogPost[] = ", "")
json_text = json_text.strip().rstrip(';')

try:
    posts = json.loads(json_text)
    print(f"Total posts: {len(posts)}")
    for idx, post in enumerate(posts):
        print(f"Index {idx}: {post['slug']} | titleZh: {post.get('titleZh')}")
except Exception as e:
    print(f"Error parsing: {e}")
