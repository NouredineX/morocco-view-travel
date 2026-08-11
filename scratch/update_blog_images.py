import re
import os

filepath = r'n:\Antigravity\morocco view travel\src\data\blogPosts.ts'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# === TASK 1: Replace em-dash \u2014 with | in titles ===
# Replace the unicode escape \u2014 with |
content = content.replace('\\u2014', '|')

# === TASK 2: Assign unique images to each blog post ===
# Map slug -> appropriate image based on topic
image_map = {
    'best-destinations-in-morocco': 'steptodown.com237343.jpg',        # Morocco destinations overview
    'best-time-visit-morocco-sahara-desert': 'steptodown.com283040.jpg', # Sahara desert
    'top-10-things-do-marrakech': 'steptodown.com295265.jpg',           # Marrakech
    'moroccan-food-dishes-must-try': 'steptodown.com300879.jpg',        # Moroccan food
    'how-to-pack-morocco-desert-tour': 'steptodown.com350889.jpg',      # Desert tour packing
    'chefchaouen-blue-city-guide': 'new update/,chafchouin.jpg',        # Chefchaouen blue city
    'fes-medina-guide-what-to-see': 'new update/FES.jpg',               # Fes medina
    'morocco-itinerary-10-days-guide': 'steptodown.com376416.jpg',      # Itinerary/route
    'merzouga-dunes-sahara-desert': 'merzoga.webp',                     # Merzouga dunes
    'essaouira-travel-guide': 'new update/essaouira.jpg',               # Essaouira
    'moroccan-culture-and-customs': 'steptodown.com399630.jpg',         # Culture
    'casablanca-travel-guide': 'new update/casablanca.jpg',             # Casablanca
    'atlas-mountains-morocco': 'new update/atlas montagne of morocc travelland.jpg', # Atlas Mountains
    'souks-in-marrakech': 'steptodown.com214173.jpg',                   # Souks/markets
    'morocco-solo-travel': 'steptodown.com477401.jpg',                  # Solo travel
    'moroccan-hammam-experience': 'steptodown.com504426.jpg',           # Hammam
    'ouarzazate-morocco-guide': 'new update/ouarzazate.jpg',            # Ouarzazate
    'ait-benhaddou-travel-guide': 'steptodown.com564210.jpg',           # Ait Benhaddou kasbah
    'moroccan-mint-tea': 'steptodown.com598914.jpg',                    # Mint tea
    'erg-chigaga-sahara-desert': 'steptodown.com631412.jpg',            # Erg Chigaga desert
    'renting-a-car-in-morocco': 'steptodown.com629036.jpg',             # Car rental
    'riad-in-morocco': 'steptodown.com625084.jpg',                      # Riads
    'rabat-travel-guide': 'steptodown.com632372.jpg',                   # Rabat
    'moroccan-architecture': 'steptodown.com696946.jpg',                # Architecture
    'morocco-budget-travel': 'steptodown.com779216.jpg',                # Budget travel
    'todra-gorge-guide': 'steptodown.com808995.jpg',                    # Todra Gorge
    'dades-valley-gorges': 'steptodown.com837323.jpg',                  # Dades Valley
    'moroccan-spices': 'steptodown.com862784.jpg',                      # Spices
    'morocco-travel-requirements': 'steptodown.com906214.jpg',          # Travel requirements
    'volubilis-travel-guide': 'steptodown.com953984.jpg',               # Volubilis ruins
}

# For each blog post, find the slug and replace its image
for slug, new_image in image_map.items():
    # Find the blog post block by its slug
    slug_pattern = f'"slug": "{slug}"'
    slug_pos = content.find(slug_pattern)
    if slug_pos == -1:
        print(f"WARNING: Slug '{slug}' not found!")
        continue
    
    # Find the "image" field after this slug
    image_search_start = slug_pos
    image_pattern = re.compile(r'"image":\s*"([^"]*)"')
    match = image_pattern.search(content, image_search_start)
    if match:
        old_image = match.group(1)
        old_full = match.group(0)
        new_full = f'"image": "{new_image}"'
        # Replace only this specific occurrence
        content = content[:match.start()] + new_full + content[match.end():]
        print(f"  {slug}: {old_image} -> {new_image}")
    else:
        print(f"WARNING: No image field found for slug '{slug}'")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("\nDone! All blog images updated and em-dashes replaced with pipes.")
