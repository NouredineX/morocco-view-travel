import os
import json

locales_dir = r"N:\Antigravity\morocco view travel\src\locales"

experience_updates = {
    "en": {
        "about": {
            "story1": "Morocco View Travel is a premium travel company based in Rissani, Merzouga, specializing in authentic Moroccan experiences. With over 5 years of expertise, we craft unforgettable journeys that blend adventure, culture, and comfort.",
            "bios": {
                "owner": "Mohamed grew up in Merzouga and has spent over 5 years guiding international travelers through the Sahara desert."
            }
        }
    },
    "fr": {
        "about": {
            "story1": "Morocco View Travel est une agence de voyage haut de gamme basée à Rissani, Merzouga. Avec plus de 5 ans d'expérience, nous créons des voyages inoubliables.",
            "bios": {
                "owner": "Mohamed a grandi à Merzouga et a passé plus de 5 ans à guider les voyageurs internationaux à travers le désert du Sahara."
            }
        }
    },
    "es": {
        "about": {
            "story1": "Morocco View Travel es una empresa de viajes premium con sede en Rissani, Merzouga. Con más de 5 años de experiencia, diseñamos viajes inolvidables.",
            "bios": {
                "owner": "Mohamed creció en Merzouga y ha pasado más de 5 años guiando a viajeros internacionales por el desierto del Sahara."
            }
        }
    },
    "it": {
        "about": {
            "story1": "Morocco View Travel è un'agenzia di viaggi di primo livello con sede a Rissani, Merzouga. Con oltre 5 anni di esperienza, creiamo viaggi indimenticabili.",
            "bios": {
                "owner": "Mohamed è cresciuto a Merzouga e ha trascorso oltre 5 anni a guidare viaggiatori internazionali attraverso il deserto del Sahara."
            }
        }
    },
    "ja": {
        "about": {
            "story1": "Morocco View Travelはメルズーガに拠点を置く旅行会社です。5年以上の経験と専門知識を活かし、忘れられない旅を提供します。",
            "bios": {
                "owner": "モハメドはメルズーガで育ち、5年以上国際的な旅行者をサハラ砂漠に案内してきました。"
            }
        }
    },
    "zh": {
        "about": {
            "story1": "Morocco View Travel 是一家位于梅尔祖卡的优质旅行社。拥有超过5年的从业经验，我们为您打造难忘的摩洛哥旅程。",
            "bios": {
                "owner": "Mohamed 在梅尔祖卡长大，拥有超过5年带领国际游客游览撒哈拉沙漠的经验。"
            }
        }
    }
}

def deep_merge(target, source):
    for k, v in source.items():
        if isinstance(v, dict) and k in target and isinstance(target[k], dict):
            deep_merge(target[k], v)
        else:
            target[k] = v

for loc, data in experience_updates.items():
    file_path = os.path.join(locales_dir, f"{loc}.json")
    if os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as f:
            existing = json.load(f)
        deep_merge(existing, data)
        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(existing, f, ensure_ascii=False, indent=2)
        print(f"Updated {loc}.json for 5 years experience!")
