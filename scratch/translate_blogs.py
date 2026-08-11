import json
import os
import sys

# Ensure UTF-8 output encoding
sys.stdout.reconfigure(encoding='utf-8')

filepath = r"n:\Antigravity\morocco view travel\src\data\blogPosts.ts"

# Pre-defined translations for the 23 posts
translated_data = {
    "morocco-itinerary-10-days-guide": {
        "titleFr": "Itinéraire de 10 Jours au Maroc | Le Planificateur de Route Ultime",
        "titleEs": "Itinerario de 10 Días en Marruecos | El Planificador de Ruta Definitivo",
        "titleIt": "Itinerario di 10 Giorni in Marocco | La Guida di Viaggio Definitiva",
        "titleJa": "モロッコ10日間モデルコース | 究極のルートプランナー",
        "titleZh": "摩洛哥10天经典行程设计||极简游玩路线规划指南",
        "excerptFr": "Découvrez les conseils d'experts pour planifier le meilleur itinéraire de 10 jours au Maroc.",
        "excerptEs": "Descubra los mejores consejos para planificar un itinerario perfecto de 10 días en Marruecos.",
        "excerptIt": "Scopri i migliori consigli per pianificare un itinerario perfetto di 10 giorni in Marocco.",
        "excerptJa": "モロッコを10日間で満喫するモデルコースと観光のヒントをご紹介。",
        "excerptZh": "我们为您整理了摩洛哥10日游的终极旅行路线与省心避坑行程攻略。"
    },
    "merzouga-dunes-sahara-desert": {
        "titleFr": "Dunes de Merzouga et Désert du Sahara | Guide de Randonnée à Chameau",
        "titleEs": "Dunas de Merzouga y Desierto del Sahara | Guía de Paseo en Camello",
        "titleIt": "Dune di Merzouga e Deserto del Sahara | Guida al Trekking in Cammello",
        "titleJa": "メルズーガ砂丘とサハラ砂漠 | ラクダトレッキング完全ガイド",
        "titleZh": "梅尔祖卡撒哈拉沙漠||骑骆驼越野与豪华露营终极指南",
        "excerptFr": "Explorez les dunes de Merzouga. Guide complet pour les randonnées à chameau et les bivouacs sous les étoiles.",
        "excerptEs": "Explore las dunas de Merzouga. Guía completa para paseos en camello y acampadas bajo las estrellas.",
        "excerptIt": "Esplora le dune di Merzouga. Guida completa per i trekking in cammello e i bivacchi sotto le stelle.",
        "excerptJa": "メルズーガ砂丘のサハラ砂漠。ラクダ乗り体験や砂漠の星空キャンプ、夕日スポットをご紹介。",
        "excerptZh": "详细介绍梅尔祖卡大沙丘及撒哈拉沙漠的骑骆驼落日巡礼与野奢帐篷营地攻略。"
    },
    "essaouira-travel-guide": {
        "titleFr": "Guide de Voyage d'Essaouira | Conseils pour la Médina du Vent",
        "titleEs": "Guía de Viaje de Essaouira | Consejos para la Medina Costera",
        "titleIt": "Guida di Viaggio di Essaouira | Consigli per la Medina sul Mare",
        "titleJa": "エッサウィラ観光ガイド | 風の吹く港町メディナの巡り方",
        "titleZh": "索维拉一日游避坑指南||大西洋海风与麦地那老城游玩贴士",
        "excerptFr": "Découvrez Essaouira, la ville du vent. Guide complet sur la médina, le port de pêche et les plages.",
        "excerptEs": "Descubra Essaouira, la ciudad del viento. Guía completa sobre la medina, el puerto y las playas.",
        "excerptIt": "Scopri Essaouira, la città del vento. Guida completa sulla medina, il porto e le spiagge.",
        "excerptJa": "風が心地よい港町エッサウィラ。歴史的なメディナ、新鮮なシーフード、ビーチスポットをご紹介。",
        "excerptZh": "探索拥有迷人海风的大西洋港口小镇索维拉，品味新鲜海鲜并慢游历史悠久的古城。"
    },
    "moroccan-culture-and-customs": {
        "titleFr": "Culture et Coutumes Marocaines | Guide d'Étiquette de Voyage",
        "titleEs": "Cultura y Costumbres Marroquíes | Guía de Etiqueta de Viaje",
        "titleIt": "Cultura e Usanze Marocchine | Guida all'Etichetta di Viaggio",
        "titleJa": "モロッコの文化と習慣 | 旅行マナーとエチケットガイド",
        "titleZh": "摩洛哥民俗风情与禁忌指南||行前必读防坑指南与旅行礼仪",
        "excerptFr": "Comprenez la culture et les coutumes marocaines. Conseils cruciaux sur la tenue vestimentaire et les négociations.",
        "excerptEs": "Comprenda la cultura y las costumbres marroquíes. Consejos sobre vestimenta, propinas y regateo.",
        "excerptIt": "Comprendi la cultura e le usanze marocchine. Consigli importanti su abbigliamento, mance e contrattazioni.",
        "excerptJa": "モロッコの歴史的な文化と習慣。現地の服装ルールやチップのマナー、買い物の交渉テクニック。",
        "excerptZh": "摩洛哥本土文化特色与传统习俗介绍，涵盖日常穿搭指南、小费习惯与集市砍价礼仪。"
    },
    "casablanca-travel-guide": {
        "titleFr": "Guide de Voyage de Casablanca | Médina et Mosquée Hassan II",
        "titleEs": "Guía de Viaje de Casablanca | Medina y Mezquita Hassan II",
        "titleIt": "Guida di Viaggio di Casablanca | Medina e Moschea di Hassan II",
        "titleJa": "カサブランカ観光ガイド | メディナとハッサン2世モスク",
        "titleZh": "卡萨布兰卡城市指南||哈桑二世清真寺与老城麦地那",
        "excerptFr": "Guide de Casablanca. Découvrez la grande mosquée Hassan II, la médina et les points de vue sur la côte.",
        "excerptEs": "Guía de Casablanca. Descubra la gran mezquita Hassan II, la medina y los miradores de la costa.",
        "excerptIt": "Guida di Casablanca. Scopri la moschea Hassan II, la medina e i panorami mozzafiato lungo la costa.",
        "excerptJa": "カサブランカ観光ガイド。圧巻のハッサン2世モスク、歴史ある旧市街、海辺の絶景スポットを紹介。",
        "excerptZh": "卡萨布兰卡旅行指南，为您带来壮观的哈桑二世海上清真寺以及地中海海滨大道行游贴士。"
    },
    "atlas-mountains-morocco": {
        "titleFr": "Montagnes de l'Atlas au Maroc | Guide de Randonnée et Villages Berbères",
        "titleEs": "Montañas del Atlas en Marruecos | Guía de Senderismo y Pueblos Bereberes",
        "titleIt": "Montagne dell'Atlante in Marocco | Guida al Trekking e ai Villaggi Berberi",
        "titleJa": "アトラス山脈（モロッコ） | ハイキングとベルベル人の村巡り",
        "titleZh": "摩洛哥阿特拉斯山脉||徒步旅行与原生态柏柏尔村庄指南",
        "excerptFr": "Randonnez dans les montagnes de l'Atlas. Découvrez les villages berbères et les cols de montagne légendaires.",
        "excerptEs": "Senderismo en las montañas del Atlas. Descubra pueblos bereberes tradicionales y vistas espectaculares.",
        "excerptIt": "Trekking sulle montagne dell'Atlante. Scopri i villaggi berberi tradizionali e i leggendari passi di montagna.",
        "excerptJa": "アトラス山脈のハイキング。壮大な絶景ルートや伝統的なベルベル人の村巡りをご紹介。",
        "excerptZh": "徒步横跨北非脊梁阿特拉斯山脉，走访传统山地柏柏尔人村落并打卡高山公路垭口。"
    },
    "souks-in-marrakech": {
        "titleFr": "Souks de Marrakech | Guide de Négociation et Secrets de Shopping",
        "titleEs": "Zocos de Marrakech | Guía de Negociación y Secretos de Compra",
        "titleIt": "Souk di Marrakech | Guida alla Negoziazione e ai Segreti dello Shopping",
        "titleJa": "マラケシュのマーケット「スーク」 | 値段交渉と買い物のコツ",
        "titleZh": "马拉喀什集市防宰防坑指南||スーク购物秘籍与砍价技巧",
        "excerptFr": "Achetez dans les célèbres souks de Marrakech. Conseils pour négocier et trouver de l'artisanat authentique.",
        "excerptEs": "Compre en los famosos zocos de Marrakech. Consejos para regatear y encontrar artesanía de cuero real.",
        "excerptIt": "Fai acquisti nei famosi souk di Marrakech. Consigli per contrattare e trovare artigianato in pelle reale.",
        "excerptJa": "マラケシュ名物スーク（市場）でのショッピング。賢い値段交渉や本物の革製品の買い方。",
        "excerptZh": "漫游马拉喀什最著名的集市商圈，为您揭秘如何砍价、购买手工皮具以及防坑避堵。"
    },
    "morocco-solo-travel": {
        "titleFr": "Voyager Seul au Maroc | Conseils de Sécurité et Guide du Backpacker",
        "titleEs": "Viajar Solo en Marruecos | Consejos de Seguridad y Guía para Mochileros",
        "titleIt": "Viaggiare da Soli in Marocco | Consigli di Sicurezza e Guida per Backpackers",
        "titleJa": "モロッコ一人旅 | 安全対策とバックパッカー向け完全ガイド",
        "titleZh": "摩洛哥独自旅行生存指南||安全防卫贴士与背包客省钱攻略",
        "excerptFr": "Voyagez seul au Maroc en toute sécurité. Guide complet sur le transport solo et les conseils de sécurité.",
        "excerptEs": "Viaje solo en Marruecos de forma segura. Guía sobre transporte público y normas de seguridad locales.",
        "excerptIt": "Viaggia da solo in Marocco in sicurezza. Guida completa sui trasporti, riad economici e sicurezza personale.",
        "excerptJa": "モロッコ一人旅の安全ガイド。バックパッカー向け格安宿の選び方や現地での防犯トラブル対策。",
        "excerptZh": "独自一人游玩摩洛哥的女性及背包客安全出行指南，涵盖本地公共交通与廉价客栈选择。"
    },
    "moroccan-hammam-experience": {
        "titleFr": "L'Expérience du Hammam Marocain | Guide d'Étiquette du Spa",
        "titleEs": "La Experiencia del Hammam Marroquí | Guía de Etiqueta del Spa",
        "titleIt": "L'Esperienza dell'Hammam Marocchino | Guida all'Etichetta del Centro Benessere",
        "titleJa": "モロッコの伝統風呂「ハマム」 | 持ち物と正しい入り方マナー",
        "titleZh": "摩洛哥传统哈曼浴体验||公共浴室与水疗礼仪洗浴攻略",
        "excerptFr": "Plongez dans l'expérience du Hammam marocain. Étiquette essentielle et déroulement de ce rituel de bien-être.",
        "excerptEs": "Viva la experiencia del Hammam marroquí. Etiqueta básica y qué esperar de este tradicional baño de vapor.",
        "excerptIt": "Vivi l'esperienza dell'Hammam marocchino. Etichetta di base e cosa aspettarsi da questo antico rito di benessere.",
        "excerptJa": "モロッコの伝統スチーム風呂「ハマム」。地元ローカル公衆浴場での入り方マナーと必要アイテム。",
        "excerptZh": "摩洛哥本土哈曼澡堂终极洗浴指南，介绍水疗搓澡流程、收费规范以及必备洗浴袋准备。"
    },
    "ouarzazate-morocco-guide": {
        "titleFr": "Guide d'Ouarzazate au Maroc | Le Hollywood d'Afrique du Nord",
        "titleEs": "Guía de Ouarzazate en Marruecos | El Hollywood del Norte de África",
        "titleIt": "Guida di Ouarzazate in Marocco | La Hollywood del Nord Africa",
        "titleJa": "ワルザザート観光ガイド | 北アフリカのハリウッド映画スタジオ",
        "titleZh": "瓦尔扎扎特城市指南||探秘北非好莱坞电影基地与古堡遗址",
        "excerptFr": "Découvrez Ouarzazate, le Hollywood marocain. Visitez les Studios de cinéma Atlas et les kasbahs historiques.",
        "excerptEs": "Descubra Ouarzazate, el Hollywood marroquí. Visite los estudios de cine Atlas y las kasbahs históricas.",
        "excerptIt": "Scopri Ouarzazate, la Hollywood marocchina. Visita i celebri Atlas Film Studios e le storiche kasbah.",
        "excerptJa": "北アフリカのハリウッドと呼ばれるワルザザート。名作映画が撮影されたスタジオや歴史あるオアシス。",
        "excerptZh": "打卡北非好莱坞瓦尔扎扎特，参观众多影史经典巨制的拍摄场地及雄伟的陶里尔特古堡。"
    },
    "ait-benhaddou-travel-guide": {
        "titleFr": "Guide d'Aït-ben-Haddou | La Kasbah en Terre Cuite de l'UNESCO",
        "titleEs": "Guía de Ait Ben Haddou | La Kasbah de Barro Protegida por la UNESCO",
        "titleIt": "Guida di Ait Benhaddou | La Kasbah di Terra Protetta dall'UNESCO",
        "titleJa": "アイト・ベン・ハドゥ観光ガイド | 世界遺産に登録された粘土造りの城塞",
        "titleZh": "阿伊特·本·哈杜筑垒村指南||探访联合国教科文组织红土古城堡",
        "excerptFr": "Guide d'Aït-ben-Haddou. Découvrez ce village de terre fortifié classé par l'UNESCO.",
        "excerptEs": "Guía de Ait Ben Haddou. Descubra esta famosa kasbah de barro declarada Patrimonio de la Humanidad.",
        "excerptIt": "Guida di Ait Benhaddou. Scopri questo splendido villaggio fortificato di terra tutelato dall'UNESCO.",
        "excerptJa": "世界遺産アイト・ベン・ハドゥ。映画のロケ地としても名高い巨大な粘土製クサールの魅力。",
        "excerptZh": "打卡联合国世界文化遗产阿伊特·本·哈杜红土筑垒村，领略摩洛哥最具代表性的古城要塞。"
    },
    "moroccan-mint-tea": {
        "titleFr": "Thé à la Menthe Marocain | Histoire et Recette Traditionnelle",
        "titleEs": "Té de Menta Marroquí | Historia y Receta Tradicional",
        "titleIt": "Tè alla Menta Marocchino | Storia e Ricetta Tradizionale",
        "titleJa": "モロッコのミントティー | 歴史と伝統的な美味しい作り方レシピ",
        "titleZh": "摩洛哥薄荷茶文化||历史背景与传统手冲煮茶秘籍配方",
        "excerptFr": "Découvrez l'histoire du thé à la menthe marocain, sa signification et la recette traditionnelle.",
        "excerptEs": "Descubra la historia del té de menta marroquí, su valor cultural y la forma tradicional de servirlo.",
        "excerptIt": "Scopri la storia del tè alla menta marocchino, il suo valore culturale e il rituale di preparazione.",
        "excerptJa": "モロッコの国民的ドリンク「ミントティー」。甘いもてなしの歴史と、現地流の美味しい淹れ方。",
        "excerptZh": "揭秘摩洛哥威士忌“薄荷茶”的起源背景、社交礼仪重要性以及如何熬煮出醇厚薄荷茶。"
    },
    "erg-chigaga-sahara-desert": {
        "titleFr": "Erg Chigaga Désert du Sahara | Guide de Camping Sauvage et de Luxe",
        "titleEs": "Erg Chigaga Desierto del Sahara | Guía de Acampada Salvaje y de Lujo",
        "titleIt": "Erg Chigaga Deserto del Sahara | Guida al Campeggio Selvaggio e di Lusso",
        "titleJa": "エルグ・シガガ大砂丘 | 野生の魅力と豪華ラグジュアリーキャンプ",
        "titleZh": "埃尔格希加加撒哈拉荒野||狂野未开发大沙丘与野奢露营地指南",
        "excerptFr": "Explorez l'Erg Chigaga. Des dunes sauvages, des pistes 4x4 isolées et des camps désertiques reculés.",
        "excerptEs": "Explore el Erg Chigaga. Dunas salvajes, pistas 4x4 y campamentos nómadas en el desierto remoto.",
        "excerptIt": "Esplora l'Erg Chigaga. Dune selvagge, piste fuoristrada 4x4 e autentici campamenti nel deserto profondo.",
        "excerptJa": "モロッコ最奥の砂漠エルグ・シガガ。手つかずの広大な砂丘群と4WDで行くサバイバル砂漠キャンプ。",
        "excerptZh": "深入探索未受污染的埃尔格希加加野性大沙丘，为您提供四驱越野探险及户外露营攻略。"
    },
    "renting-a-car-in-morocco": {
        "titleFr": "Louer une Voiture au Maroc | Règles de Route et Guide de Sécurité",
        "titleEs": "Alquilar un Coche en Marruecos | Reglas de Carretera y Guía de Seguridad",
        "titleIt": "Noleggiare un'Auto in Marocco | Regole Stradali e Guida alla Sicurezza",
        "titleJa": "モロッコでのレンタカー | ロードマップ・交通ルール・運転安全ガイド",
        "titleZh": "摩洛哥租车自驾游终极指南||路况交规说明、加油站与行车安全防骗",
        "excerptFr": "Louez une voiture au Maroc. Conseils sur la conduite, les autoroutes, les contrôles de police et la sécurité.",
        "excerptEs": "Alquile un coche en Marruecos. Consejos sobre conducción, peajes, controles policiales y seguridad en carretera.",
        "excerptIt": "Noleggia un'auto in Marocco. Consigli su norme stradali, pedaggi, posti di blocco della polizia e sicurezza.",
        "excerptJa": "モロッコでの車レンタル安全ガイド。山道での運転、警察の検問対策、ハイウェイ料金システムの解説。",
        "excerptZh": "详解在摩洛哥自驾租车的加油规范、公路过路费、常规警察临检点与防御性驾驶注意事项。"
    },
    "riad-in-morocco": {
        "titleFr": "Riad au Maroc | Guide de l'Expérience d'une Maison d'Hôtes Historique",
        "titleEs": "Riad en Marruecos | Guía de la Experiencia en una Casa de Huéspedes Histórica",
        "titleIt": "Riad in Marocco | Guida all'Esperienza in una Storica Casa Ospiti",
        "titleJa": "モロッコの伝統宿「リヤド」 | 歴史的な中庭邸宅ホテルの選び方",
        "titleZh": "摩洛哥传统庭院住宅「里亚德」||百年历史民宿挑选入住指南",
        "excerptFr": "Séjournez dans un Riad traditionnel. Découvrez l'architecture, la piscine intérieure et l'hospitalité unique.",
        "excerptEs": "Alójese en un Riad tradicional. Descubra la arquitectura del patio, la decoración artesanal y el servicio.",
        "excerptIt": "Soggiorna in un Riad tradizionale. Scopri l'architettura con cortile interno, lo stile moresco e l'ospitalità.",
        "excerptJa": "モロッコの伝統宿リヤド。モザイクタイルが施された優美な中庭とパーソナルなおもてなし。",
        "excerptZh": "探访隐藏在老城里的伊斯兰建筑瑰宝庭院民宿，为您详解内部中庭构造与民宿挑选指南。"
    },
    "rabat-travel-guide": {
        "titleFr": "Guide de Voyage de Rabat | Exploration des Monuments de la Capitale",
        "titleEs": "Guía de Viaje de Rabat | Explorando los Monumentos de la Capital",
        "titleIt": "Guida di Viaggio di Rabat | Esplorare i Monumenti della Capitale",
        "titleJa": "ラバト観光ガイド | モロッコの首都と歴史的記念碑巡り",
        "titleZh": "拉巴特城市指南||探索首都古遗迹、哈桑塔与乌达雅堡",
        "excerptFr": "Visitez Rabat, la capitale. La tour Hassan, la Kasbah des Oudayas et les remparts face à l'océan.",
        "excerptEs": "Visite Rabat, la capital. La torre Hassan, la Kasbah de los Udayas y los miradores al océano.",
        "excerptIt": "Visita Rabat, la capitale. La torre Hassan, la Kasbah degli Udayas e le splendide mura a picco sull'oceano.",
        "excerptJa": "首都ラバトの歴史巡り。荘厳なハッサンの塔、青い城塞ウダイヤのカスバ、大西洋のパノラマビュー。",
        "excerptZh": "游历摩洛哥首都拉巴特，打卡地标性建筑哈桑大塔、古朴大方的乌达雅堡及唯美海滨落日。"
    },
    "moroccan-architecture": {
        "titleFr": "Architecture Marocaine | Éléments de l'Art Islamique et Mauresque",
        "titleEs": "Arquitectura Marroquí | Elementos del Arte Islámico y Morisco",
        "titleIt": "Architettura Marocchina | Elementi di Arte Islamica e Moresca",
        "titleJa": "モロッコ建築の特徴 | イスラム美術とムーア様式の美しさ",
        "titleZh": "摩洛哥古建筑美学||伊斯兰精雕、马赛克瓷砖与摩尔艺术风格",
        "excerptFr": "Plongez dans l'architecture marocaine. Le zellige, les stucs sculptés, les arches mauresques et les portes peintes.",
        "excerptEs": "Explore la arquitectura marroquí. El azulejo zellij, los yesos tallados, los arcos de herradura y las puertas decoradas.",
        "excerptIt": "Esplora l'architettura marocchina. Il mosaico zellige, gli stucchi intagliati, gli archi a ferro di cavallo e le porte dipinte.",
        "excerptJa": "魅惑のモロッコ建築学。幾何学模様のタイル「ゼリージュ」、漆喰彫刻、馬蹄形アーチの秘密。",
        "excerptZh": "深入鉴赏摩洛哥独特的建筑风格，探究斑斓的马赛克瓷砖、石膏雕刻与经典的马蹄形拱门设计。"
    },
    "morocco-budget-travel": {
        "titleFr": "Voyage Économique au Maroc | Guide pour Économiser en Backpacker",
        "titleEs": "Viajar Barato en Marruecos | Guía de Ahorro para Mochileros",
        "titleIt": "Viaggiare Economico in Marocco | Guida al Risparmio per Backpackers",
        "titleJa": "安い予算で旅するモロッコ | 費用を抑えるバックパッカー節約ガイド",
        "titleZh": "摩洛哥特价穷游省钱攻略||交通、餐饮、门票与穷游背包客贴士",
        "excerptFr": "Voyagez à petit budget au Maroc. Conseils sur les transports abordables, les restaurants locaux et les astuces.",
        "excerptEs": "Viaje con bajo presupuesto en Marruecos. Consejos sobre transporte barato, comida local y alojamiento económico.",
        "excerptIt": "Viaggia low-cost in Marocco. Consigli su trasporti convenienti, street food locale e ostelli economici.",
        "excerptJa": "予算を抑えてモロッコを旅する。格安の長距離バス、ローカル食堂でのグルメ、無料観光地ガイド。",
        "excerptZh": "背包客摩洛哥低预算省钱指南，带您网罗超便宜长距离客运、街头大排档美食与低成本住宿。"
    },
    "todra-gorge-guide": {
        "titleFr": "Guide des Gorges du Todra | Escalade et Randonnées dans le Canyon",
        "titleEs": "Guía de las Gargantas del Todra | Escalada y Paseos por el Cañón",
        "titleIt": "Guida alle Gole del Todra | Arrampicata e Passeggiate nei Canyon",
        "titleJa": "トドラ渓谷観光ガイド | ロッククライミングと絶景渓谷ウォーク",
        "titleZh": "托德拉峡谷游玩指南||攀岩爱好者天堂与红色绝壁步道探险",
        "excerptFr": "Explorez les Gorges du Todra. Randonnez le long de la rivière entre des falaises géantes de 300 mètres.",
        "excerptEs": "Explore las Gargantas del Todra. Camine junto al río bajo imponentes acantilados de piedra caliza de 300 metros.",
        "excerptIt": "Esplora le Gole del Todra. Cammina lungo il fiume tra pareti di roccia calcarea verticali alte 300 metri.",
        "excerptJa": "巨岩そびえるトドラ渓谷。高さ300mの絶壁に挟まれた川べりハイキングと世界から集まるクライマー。",
        "excerptZh": "游览宏伟的托德拉大峡谷，漫步在高达300米红褐色石灰岩壁的河流峡谷栈道。"
    },
    "dades-valley-gorges": {
        "titleFr": "Gorges de la Vallée du Dadès | Routes Panoramiques et Rocher des Doigts de Singe",
        "titleEs": "Gargantas del Valle del Dades | Rutas Panoramicas y Roca de los Dedos de Mono",
        "titleIt": "Gole della Valle del Dades | Strade Panoramiche e Roccia delle Dita di Scimmia",
        "titleJa": "ダデス渓谷 | つづら折りのワインディングロードと奇岩「サルの指」",
        "titleZh": "达德斯峡谷自驾之旅||九曲十八弯盘山公路与猴指奇岩巨石",
        "excerptFr": "Parcourez la Vallée du Dadès. Ses virages en épingle légendaires, ses rochers atypiques et ses oasis vertes.",
        "excerptEs": "Recorra el Valle del Dades. Sus famosas curvas de montaña, formaciones rocosas únicas y valles fértiles.",
        "excerptIt": "Percorri la Valle del Dades. I suoi leggendari tornanti di montagna, le formazioni rocciose e le verdi oasi.",
        "excerptJa": "奇観ダデス渓谷。九十九折のヘアピンカーブロードと、猿の足跡のような不思議な岩「サルの指」。",
        "excerptZh": "自驾探索达德斯峡谷，穿越令人屏息的陡峭盘山蛇形弯道公路，观赏怪石嶙峋的“猴指”石林。"
    },
    "moroccan-spices": {
        "titleFr": "Épices Marocaines | Guide d'Achat au Souk et Herbes de Cuisine",
        "titleEs": "Especias Marroquíes | Guía de Compra en el Zoco y Hierbas de Cocina",
        "titleIt": "Spezie Marocchine | Guida all'Acquisto nei Souk e Erbe da Cucina",
        "titleJa": "モロッコの香辛料・スパイス | スークでの買い方と代表的ハーブ",
        "titleZh": "摩洛哥香料采购指南||斯ーク调味品挑选与传统塔吉锅香草",
        "excerptFr": "Guide des épices marocaines. Découvrez le Ras el Hanout, le safran, le cumin et comment acheter au souk.",
        "excerptEs": "Guía de las especias marroquíes. Conozca el Ras el Hanout, el azafrán, el comino y cómo comprar en el zoco.",
        "excerptIt": "Guida alle spezie marocchine. Scopri il Ras el Hanout, lo zafferano, il cumino e come fare acquisti nei souk.",
        "excerptJa": "モロッコの香辛料・スパイス | スークでの買い方と代表的ハーブ。ミックス香辛料「ラスエルハヌート」、最高級サフラン、クミン。",
        "excerptZh": "摩洛哥香料调和秘籍，介绍经典调味粉“哈努特”、昂贵藏红花以及地道市集的香料选购指南。"
    },
    "morocco-travel-requirements": {
        "titleFr": "Conditions de Voyage pour le Maroc | Guide des Visas, Passeports et Douanes",
        "titleEs": "Requisitos para Viajar a Marruecos | Guía de Visados, Pasaportes y Aduanas",
        "titleIt": "Requisiti di Viaggio per il Marocco | Guida a Visti, Passaporti e Dogane",
        "titleJa": "モロッコ旅行の入国条件 | ビザ・パスポート有効期限・税関申告ガイド",
        "titleZh": "摩洛哥入境与签证规定||护照有效期、海关申报与最新出行材料清单",
        "excerptFr": "Formalités de voyage pour le Maroc. Validité du passeport, nationalités exemptées de visa et douanes.",
        "excerptEs": "Requisitos de entrada a Marruecos. Validez del pasaporte, nacionalidades exentas de visado y aduana.",
        "excerptIt": "Requisiti d'ingresso in Marocco. Validità del passaporto, nazionalità esenti da visto e regolamenti doganali.",
        "excerptJa": "モロッコ渡航・入国ガイド。ビザ免除国の要件、パスポート残存期間、外貨持ち込み制限について。",
        "excerptZh": "摩洛哥旅行前置审查要求，包含免签国家名单、护照有效期限、禁止入境携带物清单说明。"
    },
    "volubilis-travel-guide": {
        "titleFr": "Guide de Voyage de Volubilis | Ruines Romaines Antiques au Maroc",
        "titleEs": "Guía de Viaje de Volubilis | Ruinas Romanas Antiguas en Marruecos",
        "titleIt": "Guida di Viaggio di Volubilis | Antiche Rovine Romane in Marocco",
        "titleJa": "ヴォルビリス遺跡観光ガイド | モロッコに残る古代ローマの都市遺跡",
        "titleZh": "沃鲁比利斯遗址指南||探访摩洛哥最大的古罗马帝国城市遗迹",
        "excerptFr": "Visitez les ruines romaines de Volubilis. Mosaïques exceptionnelles, arc de triomphe et de la basilique.",
        "excerptEs": "Visite las ruinas romanas de Volubilis. Mosaicos bien conservados, el arco de triunfo y basílicas históricas.",
        "excerptIt": "Visita le rovine romane di Volubilis. Mosaici intatti, l'arco di trionfo, la basilica e la pianta della città antica.",
        "excerptJa": "ローマ帝国の古代遺跡ヴォルビリス。美しく遺るモザイク画、凱旋門、神殿の歴史ロマン。",
        "excerptZh": "探游被列为世界遗产的沃鲁比利斯罗马古城废墟，欣赏保存完好的神殿马赛克地板画。"
    }
}

with open(filepath, 'r', encoding='utf-8') as f:
    text = f.read()

# Parse JS text
json_text = text.replace("import type { BlogPost } from '../types';", "")
json_text = json_text.replace("export const blogPosts: BlogPost[] = ", "")
json_text = json_text.strip().rstrip(';')

posts = json.loads(json_text)

# Apply pre-defined translations
for post in posts:
    slug = post['slug']
    if slug in translated_data:
        t_data = translated_data[slug]
        for key, val in t_data.items():
            post[key] = val

# Save back as JS file content
new_content = "import type { BlogPost } from '../types';\n\n"
new_content += "export const blogPosts: BlogPost[] = "
new_content += json.dumps(posts, ensure_ascii=False, indent=2)
new_content += ";\n"

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Blog translation script successfully executed.")
