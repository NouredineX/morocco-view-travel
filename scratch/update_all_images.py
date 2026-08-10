import os
import re

# 1. Update Destinations
destinations_file = r"N:\Antigravity\morocco view travel\src\data\destinations.ts"
with open(destinations_file, "r", encoding="utf-8") as f:
    dest_content = f.read()

dest_replacements = {
    "marrakech": "new update/marrakech.jpg",
    "fes": "new update/FES.jpg",
    "casablanca": "new update/casablanca.jpg",
    "tangier": "Tanger.webp",
    "agadir": "steptodown.com255948.jpg",
    "ouarzazate": "new update/ouarzazate.jpg",
    "chefchaouen": "new update/,chafchouin.jpg",
    "merzouga": "merzoga.webp"
}

for slug, img in dest_replacements.items():
    # Replace image field for this destination slug
    pattern = rf"(slug:\s*'{slug}',[\s\S]*?image:\s*')([^']+)'"
    dest_content = re.sub(pattern, rf"\g<1>{img}'", dest_content)

with open(destinations_file, "w", encoding="utf-8") as f:
    f.write(dest_content)

print("Updated destinations.ts successfully!")

# 2. Update Tours with Unique Images
tours_file = r"N:\Antigravity\morocco view travel\src\data\tours.ts"
with open(tours_file, "r", encoding="utf-8") as f:
    tours_content = f.read()

tour_images = [
    ("tour-1", "steptodown.com109557.jpg"),
    ("tour-2", "steptodown.com115120.jpg"),
    ("tour-3", "steptodown.com133895.jpg"),
    ("tour-4", "steptodown.com149651.jpg"),
    ("tour-5", "steptodown.com178618.jpg"),
    ("tour-6", "steptodown.com182821.jpg"),
    ("tour-7", "steptodown.com214173.jpg"),
    ("tour-8", "steptodown.com221267.jpg"),
    ("tour-9", "new update/essaouira.jpg"),
    ("tour-10", "steptodown.com223101.jpg"),
    ("tour-11", "new update/,chafchouin.jpg"),
    ("tour-12", "steptodown.com224129.jpg"),
    ("tour-13", "new update/ouarzazate.jpg"),
    ("tour-14", "steptodown.com237320.jpg"),
    ("tour-15", "new update/casablanca.jpg"),
    ("tour-16", "new update/atlas montagne of morocc travelland.jpg")
]

for tour_id, img in tour_images:
    pattern = rf"(id:\s*'{tour_id}',[\s\S]*?image:\s*')([^']+)'"
    tours_content = re.sub(pattern, rf"\g<1>{img}'", tours_content)

with open(tours_file, "w", encoding="utf-8") as f:
    f.write(tours_content)

print("Updated tours.ts with 16 unique images successfully!")
