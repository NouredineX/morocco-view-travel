import os
import json

locales_dir = r"n:\Antigravity\morocco view travel\src\locales"

# Translations to insert
additions = {
    "en": {
        "nav": {
            "fleet": "Our Fleet"
        },
        "destinations": {
            "marrakech": "Marrakech",
            "fes": "Fes",
            "sahara": "Sahara Desert",
            "chefchaouen": "Chefchaouen",
            "essaouira": "Essaouira"
        },
        "tours": {
            "subtitle": "Morocco Sahara Adventures",
            "title": "Best Morocco Desert Tours & Excursions",
            "desc": "Select from our pre-planned curated itineraries or contact us for a customized itinerary designed just for you."
        }
    },
    "fr": {
        "nav": {
            "fleet": "Notre Flotte"
        },
        "destinations": {
            "marrakech": "Marrakech",
            "fes": "Fès",
            "sahara": "Désert du Sahara",
            "chefchaouen": "Chefchaouen",
            "essaouira": "Essaouira"
        },
        "tours": {
            "subtitle": "Aventures au Sahara Marocain",
            "title": "Meilleurs Circuits & Excursions au Désert du Maroc",
            "desc": "Choisissez parmi nos itinéraires organisés ou contactez-nous pour un itinéraire personnalisé conçu juste pour vous."
        }
    },
    "es": {
        "nav": {
            "fleet": "Nuestra Flota"
        },
        "destinations": {
            "marrakech": "Marrakech",
            "fes": "Fez",
            "sahara": "Desierto del Sahara",
            "chefchaouen": "Chefchaouen",
            "essaouira": "Essaouira"
        },
        "tours": {
            "subtitle": "Aventuras en el Sahara Marroquí",
            "title": "Mejores Rutas y Excursiones al Desierto de Marruecos",
            "desc": "Seleccione entre nuestros itinerarios organizados o contáctenos para un itinerario personalizado diseñado solo para usted."
        }
    },
    "it": {
        "nav": {
            "fleet": "La Nostra Flotta"
        },
        "destinations": {
            "marrakech": "Marrakech",
            "fes": "Fes",
            "sahara": "Deserto del Sahara",
            "chefchaouen": "Chefchaouen",
            "essaouira": "Essaouira"
        },
        "tours": {
            "subtitle": "Avventure nel Sahara Marocchino",
            "title": "I Migliori Tour ed Escursioni nel Deserto del Marocco",
            "desc": "Scegli tra i nostri itinerari organizzati o contattaci per un itinerario personalizzato su misura per te."
        }
    },
    "ja": {
        "nav": {
            "fleet": "車両コレクション"
        },
        "destinations": {
            "marrakech": "マラケシュ",
            "fes": "フェズ",
            "sahara": "サハラ砂漠",
            "chefchaouen": "シャウエン",
            "essaouira": "エッサウィラ"
        },
        "tours": {
            "subtitle": "モロッコ・サハラアドベンチャー",
            "title": "モロッコ最高の砂漠ツアーとエクスカーション",
            "desc": "事前に計画された旅程から選択するか、あなたのために設計されたカスタム旅程についてお問い合わせください。"
        }
    },
    "zh": {
        "nav": {
            "fleet": "车队系列"
        },
        "destinations": {
            "marrakech": "马拉喀什",
            "fes": "非斯",
            "sahara": "撒哈拉沙漠",
            "chefchaouen": "舍夫沙万",
            "essaouira": "索维拉"
        },
        "tours": {
            "subtitle": "摩洛哥撒哈拉沙漠探险",
            "title": "最佳摩洛哥沙漠旅游与短途旅行",
            "desc": "从我们精心规划的行程中选择，或联系我们获取专为您设计的定制行程。"
        }
    }
}

def update_json_file(lang, file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # 1. Replace old agency name & old headquarters
    # Convert data to string to do a global replace
    data_str = json.dumps(data, ensure_ascii=False)
    
    # Replace agency name
    data_str = data_str.replace("Travelling Through Morocco", "Morocco View Travel")
    data_str = data_str.replace("Travelling through Morocco", "Morocco View Travel")
    
    # Replace Meknes headquarters with Merzouga
    data_str = data_str.replace("based in Meknes", "based in Rissani, Merzouga")
    data_str = data_str.replace("Based in Meknes", "Based in Rissani, Merzouga")
    data_str = data_str.replace("Basée à Meknès", "Basée à Rissani, Merzouga")
    data_str = data_str.replace("basée à Meknès", "basée à Rissani, Merzouga")
    data_str = data_str.replace("Con sede en Meknes", "Con sede en Rissani, Merzouga")
    data_str = data_str.replace("con sede en Meknes", "con sede en Rissani, Merzouga")
    data_str = data_str.replace("总部位于梅克内斯", "总部位于里萨尼·梅尔祖卡")
    data_str = data_str.replace("位于梅克内斯", "位于里萨尼·梅尔祖卡")
    
    # Load back to dict
    data = json.loads(data_str)
    
    # 2. Insert new additions
    if lang in additions:
        lang_additions = additions[lang]
        for section, keys in lang_additions.items():
            if section not in data:
                data[section] = {}
            for key, val in keys.items():
                data[section][key] = val
                
    # Save back
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"Updated {lang}.json successfully.")

# Run for all active languages
for lang in ["en", "es", "fr", "it", "ja", "zh"]:
    file_path = os.path.join(locales_dir, f"{lang}.json")
    if os.path.exists(file_path):
        update_json_file(lang, file_path)
