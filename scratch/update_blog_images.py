import os
import re

gen_file = r"N:\Antigravity\morocco view travel\scratch\generate_blog_posts.py"

with open(gen_file, "r", encoding="utf-8") as f:
    content = f.read()

unique_blog_images = [
    "steptodown.com237343.jpg",
    "steptodown.com283040.jpg",
    "steptodown.com295265.jpg",
    "steptodown.com300879.jpg",
    "steptodown.com350889.jpg",
    "steptodown.com376416.jpg",
    "steptodown.com399630.jpg",
    "steptodown.com400570.jpg",
    "steptodown.com419518_fixed.jpg",
    "steptodown.com422659.jpg",
    "steptodown.com427185.jpg",
    "steptodown.com441847.jpg",
    "steptodown.com454042.jpg",
    "steptodown.com477401.jpg",
    "steptodown.com483735.jpg",
    "steptodown.com499248.jpg",
    "steptodown.com504426.jpg",
    "steptodown.com564210.jpg",
    "steptodown.com598914.jpg",
    "steptodown.com625084.jpg",
    "steptodown.com629036.jpg",
    "steptodown.com631412.jpg",
    "steptodown.com632372.jpg",
    "steptodown.com696946.jpg",
    "steptodown.com779216.jpg",
    "steptodown.com808995.jpg",
    "steptodown.com837323.jpg",
    "steptodown.com862784.jpg",
    "steptodown.com906214.jpg",
    "steptodown.com953984.jpg"
]

# Find blog_configs items and replace their "image": "..."
for i in range(30):
    pattern = rf'("id":\s*"blog-{i}",[\s\S]*?"image":\s*")([^"]+)"'
    content = re.sub(pattern, rf'\g<1>{unique_blog_images[i]}"', content)

with open(gen_file, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated generate_blog_posts.py with 30 unique images successfully!")
