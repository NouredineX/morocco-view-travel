import os
import json

locales_dir = r"N:\Antigravity\morocco view travel\src\locales"

translations = {
    "en": {
        "about": {
            "storySubtitle": "Local Expert Morocco Travel Agency",
            "tripAdvisorTitle": "Morocco View Travel TripAdvisor Rating",
            "tripAdvisorDesc": "Based on verified traveler reviews from around the globe. Proud to deliver exceptional service and unforgettable desert adventures.",
            "teamTitle": "Our Team",
            "teamSubtitle": "Local Experts",
            "teamDesc": "The passionate travelers and guides behind Morocco View Travel.",
            "roles": {
                "owner": "Founder & Managing Director",
                "driver": "Professional Driver & Desert Guide",
                "designer": "Customer Relations & Designer"
            },
            "bios": {
                "owner": "Mohamed grew up in Merzouga and has spent over 15 years guiding international travelers through the Sahara desert.",
                "driver": "An expert navigator of the Atlas Mountains and Sahara desert tracks, ensuring your safety and comfort at every turn.",
                "designer": "Noureddine handles customer inquiries and itineraries, crafting tailored experiences for groups and families."
            }
        },
        "contact": {
            "hoursLabel": "Working Hours",
            "hqTitle": "Our Headquarters in Merzouga",
            "hqDesc": "Visit us or reach out to coordinate your custom Morocco adventures starting from Marrakech, Casablanca, Fes, or Tangier."
        },
        "testimonials": {
            "awardsTitle": "TripAdvisor Rating & Awards",
            "awardsDesc": "We are recognized as a premium travel provider on TripAdvisor, with an overall 5.0 rating based on hundreds of verified reviews from international travelers.",
            "viewOnTripAdvisor": "View on TripAdvisor"
        }
    },
    "fr": {
        "about": {
            "storySubtitle": "Agence de Voyage Experte Locale au Maroc",
            "tripAdvisorTitle": "Note TripAdvisor de Morocco View Travel",
            "tripAdvisorDesc": "Basé sur des avis de voyageurs vérifiés du monde entier. Fiers de fournir un service exceptionnel et des aventures inoubliables dans le désert.",
            "teamTitle": "Notre Équipe",
            "teamSubtitle": "Experts Locaux",
            "teamDesc": "Les passionnés et guides derrière Morocco View Travel.",
            "roles": {
                "owner": "Fondateur & Directeur Général",
                "driver": "Chauffeur Professionnel & Guide du Désert",
                "designer": "Relations Clients & Concepteur de Voyages"
            },
            "bios": {
                "owner": "Mohamed a grandi à Merzouga et a passé plus de 15 ans à guider les voyageurs internationaux à travers le désert du Sahara.",
                "driver": "Expert en navigation dans les montagnes de l'Atlas et les pistes du Sahara, garantissant votre sécurité et confort à chaque étape.",
                "designer": "Noureddine gère les demandes des clients et les itinéraires, créant des expériences sur mesure pour groupes et familles."
            }
        },
        "contact": {
            "hoursLabel": "Heures d'Ouverture",
            "hqTitle": "Notre Siège Social à Merzouga",
            "hqDesc": "Visitez-nous ou contactez-nous pour coordonner vos aventures sur mesure au Maroc au départ de Marrakech, Casablanca, Fès ou Tanger."
        },
        "testimonials": {
            "awardsTitle": "Note et Récompenses TripAdvisor",
            "awardsDesc": "Nous sommes reconnus comme un prestataire de voyage haut de gamme sur TripAdvisor, avec une note globale de 5,0 basée sur des centaines d'avis vérifiés.",
            "viewOnTripAdvisor": "Voir sur TripAdvisor"
        }
    },
    "es": {
        "about": {
            "storySubtitle": "Agencia de Viajes Experta Local en Marruecos",
            "tripAdvisorTitle": "Calificación de TripAdvisor de Morocco View Travel",
            "tripAdvisorDesc": "Basado en opiniones verificadas de viajeros de todo el mundo. Orgullosos de ofrecer un servicio excepcional y aventuras inolvidables en el desierto.",
            "teamTitle": "Nuestro Equipo",
            "teamSubtitle": "Expertos Locales",
            "teamDesc": "Los apasionados viajeros y guías detrás de Morocco View Travel.",
            "roles": {
                "owner": "Fundador y Director Ejecutivo",
                "driver": "Conductor Profesional y Guía del Desierto",
                "designer": "Relaciones con Clientes y Diseñador"
            },
            "bios": {
                "owner": "Mohamed creció en Merzouga y ha pasado más de 15 años guiando a viajeros internacionales por el desierto del Sahara.",
                "driver": "Experto navegador en las montañas del Atlas y pistas del Sahara, garantizando su seguridad y comodidad en todo momento.",
                "designer": "Noureddine gestiona las consultas de clientes e itinerarios, creando experiencias a medida para familias y grupos."
            }
        },
        "contact": {
            "hoursLabel": "Horario de Atención",
            "hqTitle": "Nuestra Sede Principal en Merzouga",
            "hqDesc": "Visítenos o contáctenos para coordinar sus aventuras a medida en Marruecos comenzando desde Marrakech, Casablanca, Fez o Tánger."
        },
        "testimonials": {
            "awardsTitle": "Calificación y Premios en TripAdvisor",
            "awardsDesc": "Somos reconocidos como un proveedor de viajes de primera calidad en TripAdvisor, con una calificación general de 5.0 basada en cientos de reseñas verificadas.",
            "viewOnTripAdvisor": "Ver en TripAdvisor"
        }
    },
    "it": {
        "about": {
            "storySubtitle": "Agenzia di Viaggi Esperta Locale in Marocco",
            "tripAdvisorTitle": "Valutazione TripAdvisor di Morocco View Travel",
            "tripAdvisorDesc": "Basato su recensioni verificate di viaggiatori da tutto il mondo. Orgogliosi di offrire un servizio eccezionale e avventure indimenticabili nel deserto.",
            "teamTitle": "Il Nostro Team",
            "teamSubtitle": "Esperti Locali",
            "teamDesc": "I viaggiatori e le guide appassionate dietro Morocco View Travel.",
            "roles": {
                "owner": "Fondatore e Direttore Generale",
                "driver": "Autista Professionista e Guida del Deserto",
                "designer": "Relazioni con i Clienti e Designer"
            },
            "bios": {
                "owner": "Mohamed è cresciuto a Merzouga e ha trascorso oltre 15 anni a guidare viaggiatori internazionali attraverso il deserto del Sahara.",
                "driver": "Esperto navigatore delle montagne dell'Atlas e delle piste del Sahara, garantendo la tua sicurezza e comfort ad ogni curva.",
                "designer": "Noureddine gestisce le richieste dei clienti e gli itinerari, creando esperienze su misura per gruppi e famiglie."
            }
        },
        "contact": {
            "hoursLabel": "Orari di Lavoro",
            "hqTitle": "La Nostra Sede a Merzouga",
            "hqDesc": "Visitaci o contattaci per coordinare le tue avventure su misura in Marocco con partenza da Marrakech, Casablanca, Fes o Tangeri."
        },
        "testimonials": {
            "awardsTitle": "Valutazione e Premi TripAdvisor",
            "awardsDesc": "Siamo riconosciuti come fornitori di viaggi premium su TripAdvisor, con una valutazione complessiva di 5.0 basata su centinaia di recensioni verificate.",
            "viewOnTripAdvisor": "Vedi su TripAdvisor"
        }
    },
    "ja": {
        "about": {
            "storySubtitle": "モロッコ現地専門旅行代理店",
            "tripAdvisorTitle": "Morocco View Travelトリップアドバイザー評価",
            "tripAdvisorDesc": "世界中の検証済み旅行者のレビューに基づいています。優れたサービスと忘れられない砂漠の冒険を提供することを誇りに思っています。",
            "teamTitle": "私たちのチーム",
            "teamSubtitle": "地元のエキスパート",
            "teamDesc": "Morocco View Travelを支える情熱的なガイドとチーム。",
            "roles": {
                "owner": "創業者兼代表取締役",
                "driver": "プロドライバー＆砂漠ガイド",
                "designer": "顧客担当＆プランナー"
            },
            "bios": {
                "owner": "モハメドはメルズーガで育ち、15年以上国際的な旅行者をサハラ砂漠に案内してきました。",
                "driver": "アトラス山脈やサハラ砂漠のルートに精通したエキスパート。常にお客様の安全と快適さを約束します。",
                "designer": "ヌーレディンはお問い合わせや旅程の作成を担当し、お客様に合わせたカスタム体験を提供します。"
            }
        },
        "contact": {
            "hoursLabel": "営業時間",
            "hqTitle": "メルズーガの本部オフィス",
            "hqDesc": "マラケシュ、カサブランカ、フェズ、タンジール出発のカスタム旅行プランをご案内いたします。ぜひお問い合わせください。"
        },
        "testimonials": {
            "awardsTitle": "トリップアドバイザーの評価と受賞歴",
            "awardsDesc": "世界の旅行者からの数百件の認証レビューに基づき、最高評価5.0を獲得したプレミアム旅行会社として認められています。",
            "viewOnTripAdvisor": "トリップアドバイザーで見る"
        }
    },
    "zh": {
        "about": {
            "storySubtitle": "摩洛哥本地专家旅行社",
            "tripAdvisorTitle": "Morocco View Travel 猫途鹰 (TripAdvisor) 评分",
            "tripAdvisorDesc": "基于来自世界各地真实旅行者的验证评价。我们为能够提供卓越的服务和难忘的沙漠冒险而感到自豪。",
            "teamTitle": "我们的团队",
            "teamSubtitle": "本地专家",
            "teamDesc": "Morocco View Travel 背后充满热情的导游与服务团队。",
            "roles": {
                "owner": "创始人兼总经理",
                "driver": "专业司机兼沙漠导游",
                "designer": "客户关系与线路设计师"
            },
            "bios": {
                "owner": "Mohamed 在梅尔祖卡长大，拥有超过15年带领国际游客游览撒哈拉沙漠的经验。",
                "driver": "阿特拉斯山脉和撒哈拉沙漠路线的驾驶专家，确保您旅程每一步的安全与舒适。",
                "designer": "Noureddine 负责客户咨询与行程定制，为团体和家庭打造个性化的摩洛哥体验。"
            }
        },
        "contact": {
            "hoursLabel": "营业时间",
            "hqTitle": "我们位于梅尔祖卡的总部门店",
            "hqDesc": "欢迎联系我们，从马拉喀什、卡萨布兰卡、非斯或丹吉尔出发，为您量身定制专属的摩洛哥旅程。"
        },
        "testimonials": {
            "awardsTitle": "猫途鹰 (TripAdvisor) 评分与荣誉",
            "awardsDesc": "我们被认可为 TripAdvisor 上的顶级旅行服务商，拥有基于数以百计全球真实旅行者评价的 5.0 满分好评。",
            "viewOnTripAdvisor": "在 TripAdvisor 查看评价"
        }
    }
}

def deep_merge(target, source):
    for k, v in source.items():
        if isinstance(v, dict) and k in target and isinstance(target[k], dict):
            deep_merge(target[k], v)
        else:
            target[k] = v

for loc, data in translations.items():
    file_path = os.path.join(locales_dir, f"{loc}.json")
    if os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as f:
            existing = json.load(f)
        deep_merge(existing, data)
        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(existing, f, ensure_ascii=False, indent=2)
        print(f"Updated {loc}.json successfully!")
