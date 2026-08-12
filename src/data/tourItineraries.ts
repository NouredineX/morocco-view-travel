export interface DetailedItinerary {
  tourId: string;
  focusKeyword: string;
  focusKeywordFr: string;
  focusKeywordEs: string;
  focusKeywordZh?: string;
  focusKeywordPt?: string;
  seoDescription: string;
  seoDescriptionFr: string;
  seoDescriptionEs: string;
  seoDescriptionZh?: string;
  seoDescriptionPt?: string;
  inclusions: string[];
  inclusionsFr: string[];
  inclusionsEs: string[];
  inclusionsZh?: string[];
  inclusionsPt?: string[];
  exclusions: string[];
  exclusionsFr: string[];
  exclusionsEs: string[];
  exclusionsZh?: string[];
  exclusionsPt?: string[];
  days: {
    dayNumber: number;
    title: string;
    titleFr: string;
    titleEs: string;
    titleZh?: string;
    titlePt?: string;
    content: string;
    contentFr: string;
    contentEs: string;
    contentZh?: string;
    contentPt?: string;
  }[];
}

// Database of city/activity descriptions in multiple languages
const cityGuides: Record<string, {
  name: string;
  nameFr: string;
  nameEs: string;
  nameZh: string;
  namePt: string;
  desc: string;
  descFr: string;
  descEs: string;
  descZh: string;
  descPt: string;
}> = {
  'Marrakech': {
    name: 'Marrakech Red City',
    nameFr: 'Marrakech la Ville Rouge',
    nameEs: 'Marrakech la Ciudad Roja',
    nameZh: '红城马拉喀什',
    namePt: 'Marrakech a Cidade Vermelha',
    desc: 'Discover the best things to do in Marrakech Morocco. Explore famous Marrakech points of interest like the Bahia Palace, the Saadian Tombs, and the Jardin Majorelle. For those seeking activities to do in Morocco Marrakech, we offer camel riding, souk tours, and visiting the majestic Jemaa el-Fnaa square in Marrakesh Morocco. Our Morocco Marrakech tours are fully customized to let you see the best things to see in Marrakech.',
    descFr: 'Explorez la ville rouge historique de Marrakech. Visitez le magnifique palais de la Bahia, les tombeaux saadiens et le jardin Majorelle. Le soir, plongez dans l\'ambiance animée de la place Jemaa el-Fnaa.',
    descEs: 'Explore la histórica ciudad roja de Marrakech. Visite el magnífico Palacio de la Bahía, las Tumbas Saadidas y el Jardín Majorelle. Por la noche, sumérjase en el animado ambiente de la plaza Jemaa el-Fnaa.',
    descZh: '探索历史悠久的红色城市马拉喀什。游览雄伟的巴希亚宫、萨阿德王朝陵墓和马约尔花园。傍晚时分，沉浸在杰马夫纳广场的喧嚣活力中，讲故事的人、音乐家和林立的街头美食摊位让这里夜夜生歌。',
    descPt: 'Explore a histórica cidade vermelha de Marrakech. Visite o magnífico Palácio da Bahia, os Túmulos Saadianos e o Jardim Majorelle. À noite, mergulhe na atmosfera vibrante da praça Jemaa el-Fnaa.'
  },
  'Casablanca': {
    name: 'Casablanca Metropolis',
    nameFr: 'Casablanca Métropole',
    nameEs: 'Casablanca Metrópolis',
    nameZh: '大都市卡萨布兰卡',
    namePt: 'Casablanca Metrópole',
    desc: 'Discover Casablanca, Morocco\'s modern economic capital, with top things to do in Casablanca Morocco. Tour the spectacular Hassan II Mosque, one of the largest mosques in the world and a key what to see in Casablanca landmark. Stroll along the scenic Ain Diab Corniche for popular things to see and do in Casablanca Morocco, and find unique places to visit Casablanca.',
    descFr: 'Découvrez Casablanca, la capitale économique moderne du Maroc. Visitez la spectaculaire mosquée Hassan II, l\'une des plus grandes mosquées au monde avec son minaret de 210 mètres surplombant l\'océan Atlantique.',
    descEs: 'Descubra Casablanca, la moderna capital económica de Marruecos. Visite la espectacular Mezquita de Hassan II, una de las mezquitas más grandes del mundo con su alminar de 210 metros sobre el océano Atlántico.',
    descZh: '探索摩洛哥的现代化经济首都卡萨布兰卡。参观壮丽的哈桑二世清真寺，这是世界上最大的清真寺之一，拥有一座俯瞰大西洋的210米高宣礼塔。沿着风景秀丽的艾因迪亚卜海滨大道散步，参观历史悠久的哈布斯街区。',
    descPt: 'Descubra Casablanca, a moderna capital económica de Marrecos. Visite a espetacular Mesquita Hassan II, uma das maiores do mundo com o seu minarete de 210 metros sobre o Oceano Atlântico.'
  },
  'Rabat': {
    name: 'Rabat Capital',
    nameFr: 'Rabat Capitale',
    nameEs: 'Rabat Capital',
    nameZh: '首都拉巴特',
    namePt: 'Rabat Capital',
    desc: 'Explore Rabat, the political capital of Morocco. Walk through the ancient Kasbah of the Udayas with its beautiful blue and white streets. Visit the iconic Hassan Tower and the Mausoleum of Mohammed V, showcasing grand Alaouite architectural heritage.',
    descFr: 'Explorez Rabat, la capitale politique du Maroc. Promenez-vous dans la Kasbah des Oudayas avec ses jolies ruelles bleues et blanches. Visitez la tour Hassan et le mausolée de Mohammed V.',
    descEs: 'Explore Rabat, la capital política de Marruecos. Pasee por la Kasbah de los Udayas con sus hermosas calles azules y blancas. Visite la torre Hassan y el mausoleo de Mohammed V.',
    descZh: '探索摩洛哥的政治首都拉巴特。漫步在古老的乌达雅堡，欣赏美丽的蓝白胡同。游览标志性的哈桑塔和穆罕默德五世陵墓，展示出雄伟的阿拉维王朝建筑遗产。',
    descPt: 'Explore Rabat, a capital política de Marrecos. Caminhe pela antiga Kasbah dos Oudayas, com as suas belas ruas azuis e brancas. Visite a icónica Torre Hassan e o Mausoléu de Mohammed V.'
  },
  'Chefchaouen': {
    name: 'Chefchaouen Blue City',
    nameFr: 'Chefchaouen la Ville Bleue',
    nameEs: 'Chefchaouen la Ciudad Azul',
    nameZh: '蓝色之城舍夫沙万',
    namePt: 'Chefchaouen a Cidade Azul',
    desc: 'Wander through the dreamy blue-washed streets of Chefchaouen Morocco blue city, nestled in the Rif Mountains. Find local crafts and key things to do in Chefchaouen. As you explore Morocco blue city Chefchaouen, relax at Outa el-Hammam square and visit the Spanish Mosque for a panoramic sunset over the blue city Chefchaouen Morocco.',
    descFr: 'Flânez dans les ruelles bleues de Chefchaouen, nichée dans les montagnes du Rif. Visitez la place Outa el-Hammam et la mosquée espagnole pour admirer le coucher du soleil.',
    descEs: 'Pasee por las calles de color azul de Chefchaouen, en las marcos del Rif. Visite la plaza Outa el-Hammam y la mezquita española para admirar el atardecer.',
    descZh: '漫步在里夫山脉环抱的梦幻蓝漆街道舍夫沙万。每一个拐角都呈现出当地手工艺品、皮革制品和纺织作坊的如画风光。在乌塔·哈曼广场放松身心，并前往西班牙清真寺欣赏日落全景。',
    descPt: 'Caminhe pelas ruelas de tom azul de Chefchaouen, aninhada nas Montanhas do Rif. Visite a praça Outa el-Hammam e suba até à Mesquita Espanhola para um pôr do sol panorâmico.'
  },
  'Fes': {
    name: 'Fes Medina',
    nameFr: 'Fès Médina',
    nameEs: 'Fez Medina',
    nameZh: '非斯老城麦地那',
    namePt: 'Fes Medina',
    desc: 'Discover the top things to do in Fes Morocco. Step back in time as you enter Fes el-Bali, visiting the oldest medieval medina in the world and Fes Morocco attractions like the Chouara Tanneries and Al-Qarawiyyin University. If you are wondering what to see in Fes or what to do in Fes Morocco, our guided tours show you the ancient medina\'s hidden treasures.',
    descFr: 'Remontez le temps en entrant dans Fès el-Bali, la plus ancienne médina médiévale du monde. Visitez l\'université Al-Qarawiyyin, la madrasa Bou Inania et les tanneries de Chouara.',
    descEs: 'Retroceda en el tiempo al ingresar a Fez el-Bali, la medina medieval más antigua del mundo. Visite la universidad Al-Qarawiyyin, la madrasa Bou Inania y las curtidurías de Fez.',
    descZh: '步入非斯巴里麦地那，置身于世界上最古老的中世纪老城，仿佛时光倒流。穿行在由9,000条狭窄街道组成的迷宫中，参观卡拉维因大学、布伊纳尼亚神学院以及著名的舒瓦拉皮革染坊（那里依然沿用着传统的皮革染色工艺）。',
    descPt: 'Recue no tempo ao entrar em Fes el-Bali, a medina medieval mais antiga do mundo. Explore o labirinto de ruelas, visite a Universidade Al-Qarawiyyin e os curtumes Chouara.'
  },
  'Meknes': {
    name: 'Meknes Imperial Gates',
    nameFr: 'Meknès Portes Impériales',
    nameEs: 'Meknes Puertas Imperiales',
    nameZh: '帝国之门梅克内斯',
    namePt: 'Meknes Portas Imperiais',
    desc: 'Discover Meknes, the Ismaili capital. Admire the monumental Bab Mansour gate, explore the royal granaries, and visit the Moulay Ismail Mausoleum. Later, visit the nearby ancient Roman ruins of Volubilis, a UNESCO World Heritage site featuring stunning preserved mosaics.',
    descFr: 'Découvrez Meknès, la capitale ismaélienne. Admirez la porte monumentale Bab Mansour, explorez les greniers royaux et visitez les ruines romaines de Volubilis.',
    descEs: 'Descubra Meknes, la capital ismaelita. Admire la monumental puerta Bab Mansour, explore los graneros reales y visite las ruinas romanas de Volubilis.',
    descZh: '探索伊斯玛仪首都梅克内斯。欣赏宏伟的巴布·曼苏尔门，探索皇家粮仓，参观穆莱·伊斯玛仪陵墓。随后前往参观被列入联合国教科文组织世界遗产名录的沃吕比利斯罗马古城遗址，观赏精美且保存完好的马赛克拼贴。',
    descPt: 'Descubra Meknes, a capital Ismaelita. Admire a monumental porta Bab Mansour, explore os celeiros reais e visite as ruínas romanas de Volubilis.'
  },
  'Ouarzazate': {
    name: 'Ouarzazate Kasbahs & Cinema',
    nameFr: 'Ouarzazate Kasbahs & Cinéma',
    nameEs: 'Ouarzazate Kasbahs y Cine',
    nameZh: '瓦尔扎扎特古堡与电影之城',
    namePt: 'Ouarzazate Kasbahs e Cinema',
    desc: 'Explore Ouarzazate, the Hollywood of Morocco. Visit the famous Kasbah Ait Benhaddou, a fortified clay village featured in Gladiator and Game of Thrones. Explore the Atlas Film Studios and learn how this unique desert town became a backdrop for cinematic history.',
    descFr: 'Explorez Ouarzazate, le Hollywood du Maroc. Visitez la célèbre Kasbah Ait Benhaddou, un village d\'argile fortifié classé à l\'UNESCO. Explorez les studios de cinéma Atlas.',
    descEs: 'Explore Ouarzazate, el Hollywood de Marruecos. Visite la famosa Kasbah Ait Benhaddou, un pueblo de arcilla fortificado catalogado por la UNESCO. Explore los estudios cinematográficos.',
    descZh: '探索摩洛哥的“荷里活”瓦尔扎扎特。游览著名的阿伊特·本·哈杜筑垒村，这是一座由红土建成的防御村落，曾作为《角斗士》和《权力的游戏》等多部好莱坞电影 of 电影的背景。参观阿特拉斯电影制片厂，了解这座独特的沙漠小镇如何写入电影史。',
    descPt: 'Explore Ouarzazate, a Hollywood de Marrecos. Visite a famosa Kasbah Ait Benhaddou (Património da UNESCO) e explore os estúdios de cinema Atlas.'
  },
  'Merzouga': {
    name: 'Merzouga Sahara Desert Camp',
    nameFr: 'Merzouga Camp du Désert',
    nameEs: 'Merzouga Campamento en el Desierto',
    nameZh: '梅尔祖卡撒哈拉沙漠营地',
    namePt: 'Merzouga Acampamento no Deserto',
    desc: 'Experience the magic of Merzouga desert tours. Ride camels across the golden dunes of the Merzouga desert in Merzouga Morocco. Spend an unforgettable night in a private luxury desert camp, enjoy a traditional dinner around the campfire, listen to live Berber drumming music, and stargaze under the clear sky.',
    descFr: 'Vivez la magie du désert du Sahara. Randonnez à dos de chameau dans les dunes dorées de l\'Erg Chebbi au coucher du soleil. Passez la nuit dans un camp de luxe avec musique berbère traditionnelle.',
    descEs: 'Viva la magia del desierto del Sahara. Pasee en camello por las dunas de Erg Chebbi al atardecer. Pase la noche en un campamento de lujo con cena y música bereber tradicional.',
    descZh: '体验撒哈拉沙漠的魔力。日落时分骑着骆驼穿过厄格切比的金色沙丘。在私人豪华沙漠营地度过难忘的一夜，围绕营火享受传统晚餐，聆听现场柏柏尔手鼓音乐，并在清澈的星空下观星。',
    descPt: 'Viva a magia do deserto do Saara. Ande de camelo pelas dunas douradas de Erg Chebbi ao pôr do sol. Passe uma noite inesquecível num acampamento de luxo sob as estrelas.'
  },
  'Dades': {
    name: 'Dades & Todra Gorges',
    nameFr: 'Gorges du Dadès & Todra',
    nameEs: 'Gargantas del Dades y Todra',
    nameZh: '达德斯与托德拉峡谷',
    namePt: 'Gargantas do Dades e Todra',
    desc: 'Drive through the dramatic landscapes of the Dades Valley and check out the spectacular monkey fingers rock formations. Hike through the stunning Todra Gorges, where vertical limestone cliffs rise 300 meters high, lining a beautiful palm oasis and running river canyon.',
    descFr: 'Traversez les paysages spectaculaires de la vallée du Dadès. Promenez-vous dans les gorges du Todra, où des falaises de calcaire s\'élèvent à 300 mètres de hauteur.',
    descEs: 'Conduzca a través de los espectaculares paisajes del Valle del Dades. Pasee por las Gargantas del Todra, donde los acantilados de piedra caliza se elevan 300 metros.',
    descZh: '驱车穿过达德斯谷的险峻风光，观赏壮观的“猴手指”岩石构造。徒步穿过令人惊叹的托德拉峡谷，那里直立的石灰岩峭壁高达300米，两旁是美丽的棕榈绿洲和潺潺流经的峡谷河流。',
    descPt: 'Conduza pelas paisagens dramáticas do Vale do Dades. Faça uma caminhada pelas Gargantas do Todra, onde falésias de calcário se elevam a 300 metros de altura.'
  },
  'Essaouira': {
    name: 'Essaouira Coastal Escape',
    nameFr: 'Essaouira Échappée Côtière',
    nameEs: 'Essaouira Escapada Costera',
    nameZh: '索维拉海滨度假胜地',
    namePt: 'Essaouira Escapada Costera',
    desc: 'Visit the coastal gem of Essaouira, an ancient Portuguese fortress city. Walk along the historic stone ramparts, explore the white-and-blue medina, watch fishermen bring in their daily catch at the port, and enjoy a fresh grilled seafood lunch by the ocean.',
    descFr: 'Visitez Essaouira, une ancienne forteresse portugaise. Promenez-vous le long des remparts historiques, explorez la médina et dégustez des poissons grillés frais.',
    descEs: 'Visite Essaouira, una antigua ciudad fortaleza portuguesa. Pasee por las murallas históricas, explore la medina blanca y azul y disfrute de marisco fresco.',
    descZh: '游览沿海明珠索维拉，这是一座古老的葡萄牙防御要塞城市。漫步在古老的石质堡垒城墙上，探索蓝白色调的麦地那老城，在港口观看渔民捕鱼归来，并在海边享用新鲜的烤海鲜午餐。',
    descPt: 'Visite a joia costeira de Essaouira, uma antiga fortaleza portuguesa. Caminhe pelas muralhas de pedra, explore a medina branca e azul e desfrute de marisco fresco.'
  },
  'Ouzoud': {
    name: 'Ouzoud Waterfalls',
    nameFr: 'Cascades d\'Ouzoud',
    nameEs: 'Cascadas de Ouzoud',
    nameZh: '奥祖德瀑布群',
    namePt: 'Quedas de Água de Ouzoud',
    desc: 'Hike through the olive trees down to the bottom of the spectacular Ouzoud Waterfalls. These 110-meter falls are the highest in North Africa. Take a traditional raft boat ride, enjoy a lunch by the rushing waters, and spot the friendly wild Barbary monkeys playing in the trees.',
    descFr: 'Randonnez jusqu\'au pied des cascades d\'Ouzoud, les plus hautes d\'Afrique du Nord (110 mètres). Faites un tour en bateau et observez les singes magots sauvages.',
    descEs: 'Camine hasta el pie de las cascadas de Ouzoud, las más altas del norte de África (110 metros). Disfrute de un paseo en bote y observe los monos salvajes.',
    descZh: '穿过橄榄树林徒步下到壮观的奥祖德瀑布底部。这些高达110米的瀑布是北非最高的瀑布。乘上传统的木筏，在激流旁享用午餐，并寻找在树林间嬉戏的友好野生猕猴。',
    descPt: 'Caminhe pelas oliveiras até à base das espetaculares quedas de água de Ouzoud. Faça um passeio de barco tradicional e veja os macacos selvagens.'
  },
  'Zagora': {
    name: 'Zagora Desert Gateway',
    nameFr: 'Zagora Porte du Désert',
    nameEs: 'Zagora Puerta del Desierto',
    nameZh: '扎古拉沙漠门户',
    namePt: 'Zagora Porta do Deserto',
    desc: 'Travel through the lush Draa Valley, home to millions of date palms and old clay fortresses. Reach the rocky desert dunes of Zagora, take a camel ride at sunset, and spend a peaceful night in a Berber desert camp under the stars.',
    descFr: 'Traversez la vallée du Draa avec ses palmeraies. Rejoignez les dunes du désert de Zagora, faites une balade à dos de chameau et passez la nuit dans un camp berbère.',
    descEs: 'Viaje a través del Valle del Draa. Llegue al desierto de Zagora, disfrute de un paseo en camello al atardecer y pase la noche en un campamento bereber.',
    descZh: '穿行于郁郁葱葱的德拉山谷，这里拥有数以百万计的椰枣树和古老的泥砖城堡。到达扎古拉的岩石荒漠沙丘，在日落时分骑骆驼，并在星空下的柏柏尔沙漠营地度过宁静的夜晚。',
    descPt: 'Viaje pelo Vale do Draa. Chegue às dunas do deserto de Zagora, desfrute de um passeio de camelo ao pôr do sol e passe uma noite calma num acampamento berbere.'
  },
  'Tangier': {
    name: 'Tangier Gateway',
    nameFr: 'Tanger la Porte',
    nameEs: 'Tánger Puerta',
    nameZh: '丹吉尔海峡门户',
    namePt: 'Tânger Porta de Entrada',
    desc: 'Explore Tangier, the gateway to Africa. Walk through the historic Kasbah, visit the legendary Hercules Caves, and stroll along the lively corniche where the Mediterranean meets the Atlantic Ocean.',
    descFr: 'Explorez Tanger, la porte de l\'Afrique. Visitez la kasbah historique, les célèbres grottes d\'Hercule et promenez-vous le long de la corniche où la Méditerranée rencontre l\'Atlantique.',
    descEs: 'Explore Tánger, la puerta de entrada a África. Visite la histórica Kasbah, las legendarias cuevas de Hércules y pasee por el paseo marítimo donde el Mediterráneo se une al Atlántico.',
    descZh: '探索通往非洲的门户丹吉尔。漫步穿过历史悠久的古堡，参观传奇的赫拉克勒斯溶洞，沿着地中海与大西洋交汇的繁华海滨大道散步。',
    descPt: 'Explore Tânger, a porta de entrada para África. Visite a Kasbah histórica, as grutas de Hércules e caminhe pela corniche costeira.'
  },
  'Ifrane': {
    name: 'Ifrane Alpine Town',
    nameFr: 'Ifrane Ville Alpine',
    nameEs: 'Ifrane Ciudad Alpina',
    nameZh: '小瑞士伊芙兰',
    namePt: 'Ifrane Cidade Alpina',
    desc: 'Visit Ifrane, often called the Switzerland of Morocco. Walk through its clean streets, admire the alpine-style architecture, and see the famous stone lion monument carved by local artisans.',
    descFr: 'Découvrez Ifrane, la Suisse du Maroc, connue pour son architecture de style alpin, ses parcs verdoyants et son célèbre monument du lion de pierre sculpté.',
    descEs: 'Descubra Ifrane, la Suiza de Marruecos, conocida por su arquitectura de estilo alpino y el famoso monumento del león de piedra tallado.',
    descZh: '游览常被称为“摩洛哥小瑞士”的伊芙兰。漫步在其干净的街道上，欣赏阿尔卑斯风格的建筑，并参观由当地工匠雕刻的著名石狮雕像。',
    descPt: 'Visite Ifrane, a "Suíça" de Marrecos. Caminhe pelas ruas limpas, admire a arquitetura alpina e veja o famoso monumento do leão de pedra.'
  },
  'Agadir': {
    name: 'Agadir Resort',
    nameFr: 'Agadir Station',
    nameEs: 'Agadir Balneario',
    nameZh: '阿加迪尔度假胜地',
    namePt: 'Agadir Estância',
    desc: 'Explore the best things to do in Agadir, known for beautiful Agadir tourist attractions. Discover Agadir Morocco beaches, enjoy Agadir all inclusive resorts, and visit Agadir city spots like the ancient Kasbah.',
    descFr: 'Explorez Agadir et ses attractions touristiques. Profitez des plages d\'Agadir Maroc et découvrez la kasbah historique.',
    descEs: 'Explore Agadir y sus atracciones turísticas. Disfrute de las playas de Agadir Marruecos y visite la antigua kasbah.',
    descZh: '游览阿加迪尔的知名景点，欣赏迷人的阿加迪尔海滩，体验阿加迪尔度假酒店的惬意生活。',
    descPt: 'Explore Agadir e as suas atrações turísticas. Desfrute das praias de Agadir e visite a antiga Kasbah.'
  }
};

// Travel Advisory text to append to guarantee 815+ words count on every tour details page
export const getTravelAdvisoryText = (focusKeyword: string, lang: string): string => {
  if (lang === 'fr') {
    return `
      <h2>Conseils de Voyage Importants pour votre ${focusKeyword}</h2>
      <p>Pour tirer le meilleur parti de votre voyage au Maroc, voici quelques recommandations de notre agence locale <b>travellingthroughmorocco.com</b>. Préparez vos bagages avec soin, car les températures varient énormément entre le jour et la nuit dans le désert ou en altitude.</p>
      
      <h3>1. Que faut-il emporter dans le désert ?</h3>
      <p>Lorsque vous réservez avec <b>travellingthroughmorocco.com</b>, nous vous conseillons d'apporter des vêtements légers et réservés pour la journée, mais n'oubliez pas des vêtements chauds pour les nuits fraîches dans le désert. Un chapeau, des lunettes de soleil et une crème solaire haute protection sont indispensables pour faire face au soleil du Sahara. Une gourde réutilisable est également recommandée pour rester hydraté.</p>

      <h3>2. Respect et Culture locale au Maroc</h3>
      <p>Le Maroc est un pays musulman accueillant et chaleureux. Pour respecter les coutumes locales, nous vous conseillons de vous habiller de manière pudique, en particulier lors de la visite de villages ruraux ou de sites historiques. Demandez toujours la permission avant de prendre en photo les habitants locaux.</p>

      <h3>3. Monnaie et Pourboires</h3>
      <p>La monnaie officielle est le Dirham marocain (MAD). Bien que les cartes de crédit soient acceptées dans les grands hôtels et restaurants de Marrakech ou Casablanca, le liquide reste indispensable pour les petits achats dans les souks ou dans le désert. Tous les circuits gérés par <b>travellingthroughmorocco.com</b> comprennent des véhicules climatisés privés et des chauffeurs agréés pour assurer votre confort et votre sécurité.</p>
    `;
  }
  
  if (lang === 'es') {
    return `
      <h2>Consejos Importantes para su viaje de ${focusKeyword}</h2>
      <p>Para aprovechar al máximo su experiencia en Marruecos, aquí tiene algunas recomendaciones de nuestra agencia de viajes <b>travellingthroughmorocco.com</b>. Prepare sus maletas con cuidado para disfrutar de una estancia cómoda y segura.</p>

      <h3>1. ¿Qué llevar al Desierto del Sahara?</h3>
      <p>Al planificar su viaje con <b>travellingthroughmorocco.com</b>, recomendamos llevar ropa ligera y cómoda durante el día, pero no olvide abrigarse bien por la noche, ya que la temperatura en el desierto puede bajar drásticamente. Lleve gafas de sol, protector solar de alto factor y un sombrero para protegerse del sol.</p>

      <h3>2. Respeto y Cultura Local</h3>
      <p>Marruecos es un país muy hospitalario. Para respetar la cultura local, vista de manera modesta, especialmente cuando visite áreas rurales o lugares históricos. Siempre es una buena costumbre pedir permiso antes de fotografiar a las personas locales.</p>

      <h3>3. Moneda y Propinas en Marruecos</h3>
      <p>La moneda oficial es el Dirham marroquí (MAD). Aunque se aceptan tarjetas en establecimientos grandes de Marrakech o Casablanca, es necesario llevar dinero en efectivo para compras pequeñas en los mercados locales. Todos los tours operados por <b>travellingthroughmorocco.com</b> incluyen vehículos privados y chóferes profesionales para su tranquilidad.</p>
    `;
  }

  if (lang === 'zh') {
    return `
      <h2>关于您的 ${focusKeyword} 重要旅行建议</h2>
      <p>为了让您的 <b>${focusKeyword}</b> 获得最佳体验，我们 Travelling Through Morocco 的本地导游为您整理了以下核心建议。提前规划能确保您体验到一段安全、舒适且终生难忘的摩洛哥奇幻旅程。</p>

      <h3>1. 撒哈拉沙漠旅行装备清单</h3>
      <p>撒哈拉沙漠日夜温差极大。白天阳光强烈，建议穿着轻便、透气的长袖衣物以防晒。墨镜、宽檐帽和高倍防晒霜是必需品。然而，日落后沙漠温度骤降。请随身携带保暖衣物（如抓绒外套、保暖内衣及毛线帽），以备沙漠帐篷夜宿之需。</p>

      <h3>2. 尊重摩洛哥的当地文化与习俗</h3>
      <p>摩洛哥是一个温和、好客的伊斯兰国家。穿行于古老麦地那或偏远柏柏尔村庄时，举止穿着得体是尊重的表现（男女皆宜覆盖肩膀和膝盖）。在拍摄当地居民或集市商贩前，请务必先征得其同意。</p>

      <h3>3. 货币、支付与小费建议</h3>
      <p>摩洛哥的官方货币是迪拉姆 (MAD)。虽然在马拉喀什、卡萨布兰卡等大城市的手工艺店和酒店可以使用信用卡，但在沙漠、小镇和当地市集，现金依然是主要的支付方式。我们所有的定制行程均提供带空调的私人专用车和专业资质司机，确保旅途舒适安全。</p>
    `;
  }

  if (lang === 'pt') {
    return `
      <h2>Recomendações de Viagem Importantes para o seu ${focusKeyword}</h2>
      <p>Para obter a melhor experiência possível no seu <b>${focusKeyword}</b>, reunimos um conjunto de dicas essenciais preparadas pelos nossos guias da <b>travellingthroughmorocco.com</b>. Planear com antecedência garantirá uma viagem confortável, segura e memorável.</p>

      <h3>1. O que levar para o Deserto do Saara</h3>
      <p>O deserto do Saara é conhecido por temperaturas extremas. Durante o dia, o sol é intenso, pelo que recomendamos camisas de manga comprida leves e calças respiráveis. Óculos de sol, chapéu e protetor solar são essenciais. Contudo, após o pôr do sol, as temperaturas caem rapidamente. Traga sempre agasalhos e roupa térmica para passar a noite no acampamento do deserto.</p>

      <h3>2. Respeito pela Cultura e Costumes Locais</h3>
      <p>Marrocos é um país pacífico e muito acolhedor. Ao viajar por aldeias rurais, medinas históricas ou passagens de montanha, é respeitoso vestir-se de forma modesta (cobrindo ombros e joelhos). Peça sempre permissão antes de tirar fotografias às populações locais.</p>

      <h3>3. Moeda, Pagamentos e Gorjetas</h3>
      <p>A moeda oficial é o Dirham Marroquino (MAD). Embora os cartões de crédito sejam aceites em hotéis e restaurantes em Marrakech ou Casablanca, o dinheiro vivo continua a ser fundamental em pequenas vilas e mercados locais. Todos os circuitos operados pela <b>travellingthroughmorocco.com</b> dispõem de transporte privado e motoristas licenciados.</p>
    `;
  }

  return `
    <h2>Important Travel Advisory for your ${focusKeyword}</h2>
    <p>To get the absolute best experience out of your <b>${focusKeyword}</b>, we have compiled a set of essential tips and guidelines from our local tour guides at <b>travellingthroughmorocco.com</b>. Planning ahead will ensure a comfortable, safe, and truly unforgettable adventure through Morocco's unique landscapes.</p>
    
    <h3>1. What to Pack for the Sahara Desert</h3>
    <p>The Sahara Desert is famous for its extreme temperatures. During the daytime, the sun is intense, so we recommend lightweight, breathable long-sleeve shirts and trousers to protect your skin. Sunglasses, a wide-brimmed hat, and high-factor sunscreen are absolutely essential. However, desert temperatures can drop rapidly after sunset. When planning your custom trip with <b>travellingthroughmorocco.com</b>, always bring warm layers, including a fleece jacket, thermal wear, and a warm beanie for your night in the camp.</p>

    <h3>2. Respecting Moroccan Culture & Customs</h3>
    <p>Morocco is a peaceful, welcoming Islamic country known for its legendary hospitality. When traveling through rural villages, imperial medinas, or mountain passes, it is respectful to dress modestly. Both men and women should cover their shoulders and knees. When taking photos of local people, particularly in busy souks or remote villages, always ask for their permission first.</p>

    <h3>3. Currency, Payments, and Tipping</h3>
    <p>The official currency is the Moroccan Dirham (MAD). While credit cards are widely accepted in major hotels, riads, and upscale restaurants in Marrakech, Casablanca, and Fes, cash is still king in smaller towns, local souks, and desert oasis stations. All tours operated by <b>travellingthroughmorocco.com</b> feature private air-conditioned vehicles and professional drivers to guarantee a smooth and premium travel experience.</p>
  `;
};

// Dynamic helper function to generate the unique itinerary for ALL 16 tours
export const getDetailedItinerary = (_tourId: string, tour: {
  id: string;
  slug: string;
  title: string;
  titleFr: string;
  titleEs: string;
  titleZh?: string;
  titlePt?: string;
  description: string;
  descriptionFr: string;
  descriptionEs: string;
  descriptionZh?: string;
  descriptionPt?: string;
  duration: number;
  departure: string;
  cities: string[];
}): DetailedItinerary => {
  // Generate highly-specific focus keywords dynamically based on tour slug
  let focusKeyword = 'Morocco desert tour';
  let focusKeywordFr = 'circuit désert Maroc';
  let focusKeywordEs = 'tour desierto Marruecos';
  let focusKeywordZh = '摩洛哥沙漠之旅';
  let focusKeywordPt = 'circuito deserto Marrocos';

  if (tour.slug.includes('essaouira')) {
    focusKeyword = 'Marrakech to Essaouira day trip';
    focusKeywordFr = "excursion Marrakech à Essaouira";
    focusKeywordEs = 'excursión Marrakech a Essaouira';
    focusKeywordZh = '马拉喀什至索维拉一日游';
    focusKeywordPt = 'passeio de um dia de Marrakech a Essaouira';
  } else if (tour.slug.includes('ouzoud')) {
    focusKeyword = 'Marrakech to Ouzoud waterfalls day trip';
    focusKeywordFr = "excursion Marrakech aux cascades d'Ouzoud";
    focusKeywordEs = 'excursión Marrakech a cascadas de Ouzoud';
    focusKeywordZh = '马拉喀什至奥祖德瀑布一日游';
    focusKeywordPt = 'passeio de um dia de Marrakech a Ouzoud';
  } else if (tour.slug.includes('chefchaouen') && tour.duration === 1) {
    focusKeyword = 'Fes to Chefchaouen day trip';
    focusKeywordFr = "excursion Fès à Chefchaouen";
    focusKeywordEs = 'excursión Fez a Chefchaouen';
    focusKeywordZh = '非斯至舍夫沙万一日游';
    focusKeywordPt = 'passeio de um dia de Fes a Chefchaouen';
  } else if (tour.slug.includes('ait-benhaddou')) {
    focusKeyword = 'Marrakech to Ait Benhaddou day trip';
    focusKeywordFr = "excursion Marrakech à Aït Benhaddou";
    focusKeywordEs = 'excursión Marrakech a Ait Benhaddou';
    focusKeywordZh = '马拉喀什至阿伊特·本·哈杜一日游';
    focusKeywordPt = 'passeio de um dia de Marrakech a Ait Benhaddou';
  } else if (tour.slug.includes('atlas-mountains')) {
    focusKeyword = 'Marrakech to Atlas Mountains day trip';
    focusKeywordFr = "excursion Marrakech aux montagnes de l'Atlas";
    focusKeywordEs = 'excursión Marrakech a montañas del Atlas';
    focusKeywordZh = '马拉喀什至阿特拉斯山脉一日游';
    focusKeywordPt = 'passeio de um dia de Marrakech a montanhas do Atlas';
  } else if (tour.slug.includes('zagora')) {
    focusKeyword = 'Marrakech to Zagora desert tour';
    focusKeywordFr = "circuit Marrakech au désert de Zagora";
    focusKeywordEs = 'tour Marrakech al desierto de Zagora';
    focusKeywordZh = '马拉喀什至扎古拉沙漠之旅';
    focusKeywordPt = 'circuito de Marrakech ao deserto de Zagora';
  } else if (tour.slug.includes('tangier') && tour.slug.includes('15-days')) {
    focusKeyword = '15 days Morocco grand tour from Tangier';
    focusKeywordFr = "circuit Maroc de 15 jours depuis Tanger";
    focusKeywordEs = 'tour de 15 días por Marruecos desde Tánger';
    focusKeywordZh = '丹吉尔出发15日摩洛哥深度大环线游';
    focusKeywordPt = 'circuito de 15 dias em Marrocos a partir de Tânger';
  } else if (tour.slug.includes('11-days')) {
    focusKeyword = '11 days Morocco desert tour from Casablanca';
    focusKeywordFr = "circuit désert de 11 jours depuis Casablanca";
    focusKeywordEs = 'tour de 11 días al desierto desde Casablanca';
    focusKeywordZh = '卡萨布兰卡出发11日摩洛哥沙漠游';
    focusKeywordPt = 'circuito de 11 dias no deserto a partir de Casablanca';
  } else if (tour.slug.includes('12-days')) {
    focusKeyword = '12 days grand Morocco tour from Tangier';
    focusKeywordFr = "grand tour du Maroc de 12 jours depuis Tanger";
    focusKeywordEs = 'gran tour de 12 días por Marruecos desde Tánger';
    focusKeywordZh = '丹吉尔出发12日摩洛哥大环线游';
    focusKeywordPt = 'circuito de 12 dias em Marrocos a partir de Tânger';
  } else if (tour.slug.includes('10-days')) {
    focusKeyword = '10 days Morocco discovery tour';
    focusKeywordFr = "circuit découverte du Maroc de 10 jours";
    focusKeywordEs = 'tour de descubrimiento de 10 días por Marruecos';
    focusKeywordZh = '10日摩洛哥全景探索游';
    focusKeywordPt = 'circuito de descoberta de 10 dias em Marrocos';
  } else if (tour.slug.includes('7-days')) {
    focusKeyword = '7 days Morocco complete tour';
    focusKeywordFr = "circuit complet du Maroc de 7 jours";
    focusKeywordEs = 'tour completo de 7 días por Marruecos';
    focusKeywordZh = '7日摩洛哥深度全景游';
    focusKeywordPt = 'circuito completo de 7 dias em Marrocos';
  } else if (tour.slug.includes('5-days-off-road')) {
    focusKeyword = '5 days off-road desert tour Marrakech';
    focusKeywordFr = "circuit hors-piste de 5 jours depuis Marrakech";
    focusKeywordEs = 'tour todoterreno de 5 días desde Marrakech';
    focusKeywordZh = '马拉喀什出发5日越野沙漠游';
    focusKeywordPt = 'circuito todo-o-terreno de 5 dias no deserto a partir de Marrakech';
  } else if (tour.slug.includes('5-days')) {
    focusKeyword = '5 days grand Morocco tour';
    focusKeywordFr = "grand tour du Maroc de 5 jours";
    focusKeywordEs = 'gran tour de 5 días por Marruecos';
    focusKeywordZh = '5日摩洛哥经典大环线游';
    focusKeywordPt = 'circuito de 5 dias em Marrocos';
  } else if (tour.slug.includes('4-days-tour-marrakech-fes-desert') || tour.slug.includes('6-days-tour-fes-marrakech-sahara') || tour.slug.includes('4-days')) {
    focusKeyword = 'Marrakech to Fes desert tour';
    focusKeywordFr = "circuit désert de Marrakech à Fès";
    focusKeywordEs = 'tour al desierto de Marrakech a Fez';
    focusKeywordZh = '马拉喀什至非斯沙漠之旅';
    focusKeywordPt = 'circuito no deserto de Marrakech a Fes';
  } else if (tour.slug.includes('3-days')) {
    focusKeyword = '3 days desert tour Marrakech to Merzouga';
    focusKeywordFr = "circuit désert de 3 jours Marrakech à Merzouga";
    focusKeywordEs = 'tour de 3 días al desierto de Marrakech a Merzouga';
    focusKeywordZh = '3日沙漠游马拉喀什至梅尔祖卡';
    focusKeywordPt = 'circuito de 3 dias no deserto de Marrakech a Merzouga';
  } else if (tour.duration === 1) {
    focusKeyword = `${tour.departure} day trip`;
    focusKeywordFr = `excursion d'une journée depuis ${tour.departure}`;
    focusKeywordEs = `excursión de un día desde ${tour.departure}`;
    focusKeywordZh = `${tour.departure}一日游`;
    focusKeywordPt = `passeio de um dia a partir de ${tour.departure}`;
  } else {
    focusKeyword = `${tour.departure} to Sahara desert tour`;
    focusKeywordFr = `circuit désert depuis ${tour.departure}`;
    focusKeywordEs = `tour al desierto desde ${tour.departure}`;
    focusKeywordZh = `${tour.departure}至沙漠游`;
    focusKeywordPt = `circuito de ${tour.departure} ao deserto do Saara`;
  }

  // Custom inclusions/exclusions based on tour type
  const isInDesertTour = tour.cities.includes('Merzouga') || tour.cities.includes('Zagora') || tour.slug.includes('desert');
  const isDayTrip = tour.duration === 1;

  const inclusions = isDayTrip
    ? [
        `Private transportation in comfortable A/C 4x4 or minivan`,
        `Professional local driver speaking English/French/Spanish`,
        `Fuel, road tolls, and parking fees`,
        `Pick up and drop off from your accommodation`,
        `Local guide in the destination (if applicable)`
      ]
    : [
        `Private transportation in comfortable A/C 4x4 or minivan`,
        `Professional local driver speaking English/French/Spanish`,
        `Fuel and road tolls`,
        `Comfortable accommodations in traditional riads/hotels (half board)`,
        isInDesertTour ? `Luxury Sahara Desert camp overnight stay with private tent` : `Hotel stays with breakfast and dinner included`,
        isInDesertTour ? `Camel trek at sunset and sunrise in the dunes` : `Guided city tours of Fes, Marrakech, or Meknes`,
        isInDesertTour ? `Traditional live drumming music around the campfire` : `Entrance fees to royal historical sights`
      ];

  const inclusionsFr = isDayTrip
    ? [
        `Transport privé en 4x4 ou minivan confortable avec climatisation`,
        `Chauffeur local professionnel parlant anglais/français/espagnol`,
        `Carburant, péages et frais de parking`,
        `Prise en charge et retour à votre hébergement`
      ]
    : [
        `Transport privé en 4x4 ou minivan confortable avec climatisation`,
        `Chauffeur local professionnel parlant anglais/français/espagnol`,
        `Carburant et péages routiers`,
        `Hébergements confortables dans des riads/hôtels traditionnels (demi-pension)`,
        isInDesertTour ? `Nuit dans un camp de luxe dans le désert du Sahara` : `Nuits d'hôtel avec dîner et petit-déjeuner`,
        isInDesertTour ? `Balade à dos de chameau dans le désert` : `Visites guidées des médinas historiques`,
        isInDesertTour ? `Musique traditionnelle berbère autour du feu` : `Entrées aux monuments historiques`
      ];

  const inclusionsEs = isDayTrip
    ? [
        `Transporte privado en cómodo 4x4 o minivan con aire acondicionado`,
        `Conductor local profesional de habla inglesa/con habla española`,
        `Combustible, peajes y tasas de aparcamiento`,
        `Recogida y regreso a su alojamiento`
      ]
    : [
        `Transporte privado en cómodo 4x4 o minivan con aire acondicionado`,
        `Conductor local profesional de habla inglesa/con habla española`,
        `Combustible y peajes de carretera`,
        `Alojamientos cómodos en riads/hoteles tradicionales (media pensión)`,
        isInDesertTour ? `Noche en campamento de lujo en el desierto del Sahara` : `Noches de hotel con cena y desayuno`,
        isInDesertTour ? `Paseo en camello en las dunas` : `Visitas guidas de las medinas históricas`,
        isInDesertTour ? `Música bereber tradicional alrededor de la hoguera` : `Entradas a los monumentos históricos`
      ];

  const inclusionsZh = isDayTrip
    ? [
        `带空调的舒适私人越野四驱车或小巴车交通服务`,
        `会说英语/法语/西班牙语的专业本地司机服务`,
        `燃油、路网费及停车费`,
        `您的下榻酒店到景点的往返接送服务`
      ]
    : [
        `带空调的舒适私人越野四驱车或小巴车交通服务`,
        `会说英语/法语/西班牙语的专业本地司机服务`,
        `燃油费和过路费`,
        `包含早晚餐（半包伙食）的传统特色庭院或酒店舒适住宿`,
        isInDesertTour ? `配备独立洗手间的豪华撒哈拉沙漠营地专属帐篷一晚住宿` : `包含早餐和晚餐的优质酒店住宿`,
        isInDesertTour ? `日出和日落时分在沙丘中骑骆驼体验` : `非斯、马拉喀什或梅克内斯等历史名城麦地那的本地专业导览`,
        isInDesertTour ? `围绕篝火进行的传统现场柏柏尔手鼓音乐表演` : `皇家历史景点门票`
      ];

  const inclusionsPt = isDayTrip
    ? [
        `Transporte privado em confortável 4x4 ou minivan com ar condicionado`,
        `Motorista local profissional que fala inglês/francês/espanhol`,
        `Combustível, portagens e taxas de estacionamento`,
        `Recolha e entrega no seu alojamento`
      ]
    : [
        `Transporte privado em confortável 4x4 ou minivan com ar condicionado`,
        `Motorista local profissional que fala inglês/francês/espanhol`,
        `Combustível e portagens rodoviárias`,
        `Alojamentos confortáveis em riads ou hotéis tradicionais (meia pensão)`,
        isInDesertTour ? `Estadia noturna num acampamento de luxo no Saara com tenda privada` : `Estadia em hotéis com pequeno-almoço e jantar incluídos`,
        isInDesertTour ? `Passeio de camelo ao pôr e ao nascer do sol nas dunas` : `Visitas guiadas às medinas de Fes, Marrakech ou Meknes`,
        isInDesertTour ? `Música tradicional berbere ao vivo em redor da fogueira` : `Entradas nos principais monumentos históricos`
      ];

  const exclusions = [
    `Lunches and beverages/drinks`,
    `Tips for the driver and local guides`,
    `Personal travel insurance`,
    `Any optional activities not listed in the program`
  ];

  const exclusionsFr = [
    `Déjeuners et boissons`,
    `Pourboires pour le chauffeur et les guides locaux`,
    `Assurance voyage personnelle`,
    `Activités facultatives non incluses dans le programme`
  ];

  const exclusionsEs = [
    `Almuerzos y bebidas`,
    `Propinas para el conductor y los guías locales`,
    `Seguro de viaje personal`,
    `Cualquier actividad opcional no incluida en el programa`
  ];

  const exclusionsZh = [
    `行程中的午餐、饮料和软饮`,
    `司机和当地导游的小费（自愿）`,
    `个人旅游保险（建议购买）`,
    `行程中未列出的任何自选性消费项目`
  ];

  const exclusionsPt = [
    `Almoços e bebidas/refrigerantes`,
    `Gorjetas para o motorista e guias locais`,
    `Seguro de viagem pessoal`,
    `Quaisquer atividades opcionais não listadas no programa`
  ];

  // Dynamic Day generation algorithm matching the actual cities in the tour
  const days: DetailedItinerary['days'] = [];
  const duration = tour.duration;
  const tourCities = tour.cities.length > 0 ? tour.cities : [tour.departure];

  for (let i = 1; i <= duration; i++) {
    // Determine the current city for this day
    const currentCityIndex = Math.min(i - 1, tourCities.length - 1);
    const nextCityIndex = Math.min(i, tourCities.length - 1);
    
    const city = tourCities[currentCityIndex];
    const nextCity = tourCities[nextCityIndex];
    
    const isLastDay = i === duration;
    const isFirstDay = i === 1;

    let title = '';
    let titleFr = '';
    let titleEs = '';
    let titleZh = '';
    let titlePt = '';
    let content = '';
    let contentFr = '';
    let contentEs = '';
    let contentZh = '';
    let contentPt = '';

    // Custom text building based on city guide templates
    if (isFirstDay) {
      const guide = cityGuides[city] || cityGuides['Marrakech'];
      
      title = `Day 1: Departure from ${tour.departure} to ${nextCity}`;
      titleFr = `Jour 1: Départ de ${tour.departure} vers ${nextCity}`;
      titleEs = `Día 1: Salida de ${tour.departure} hacia ${nextCity}`;
      titleZh = `第 1 天: 从 ${tour.departure} 出发前往 ${nextCity}`;
      titlePt = `Dia 1: Partida de ${tour.departure} em direção a ${nextCity}`;
      
      content = `Your premium ${focusKeyword} starts early today. Our professional driver will pick you up from your riad. We set off on our journey towards ${nextCity}. Along the way, we pass through changing scenery, taking breaks to admire the breathtaking panoramic views. ${guide.desc} Continuing our drive, we arrive in ${nextCity} in the late afternoon, check into our riad, and enjoy a traditional dinner.`;
      contentFr = `Votre voyage commence à ${tour.departure}. Nous prenons la route vers ${nextCity}. En chemin, vous profiterez de magnifiques paysages. ${guide.descFr} Nous arrivons à ${nextCity} en fin d'après-midi.`;
      contentEs = `Su viaje comienza en ${tour.departure}. Conducimos hacia ${nextCity}. En el camino, disfrutará de hermosos paisajes. ${guide.descEs} Llegamos a ${nextCity} por la tarde.`;
      contentZh = `您的优质 ${focusKeywordZh} 将在今天清晨开启。我们的专业司机将从您的酒店接您。我们启程前往 ${nextCity}。一路上，我们穿过变幻的风景，中途停车欣赏令人叹为观止的全景风光。${guide.descZh} 随后继续驱车前行，我们在傍晚前抵达 ${nextCity}，入住我们的特色酒店，并享受地道的当地晚餐。`;
      contentPt = `O seu ${focusKeywordPt} premium começa bem cedo hoje. O nosso motorista profissional irá recolhê-lo no seu riad. Iniciamos a nossa viagem em direção a ${nextCity}. Pelo caminho passamos por paisagens mutáveis, fazendo paragens para admirar as deslumbrantes vistas panorâmicas. ${guide.descPt} Continuando a nossa viagem, chegamos a ${nextCity} ao final da tarde, efetuamos o check-in no hotel e desfrutamos de um jantar tradicional.`;
    } else if (isLastDay) {
      title = `Day ${i}: Final exploration of ${city} and return`;
      titleFr = `Jour ${i}: Exploration finale de ${city} et retour`;
      titleEs = `Día ${i}: Exploración final de ${city} y regreso`;
      titleZh = `第 ${i} 天: ${city} 深度游览与返程`;
      titlePt = `Dia ${i}: Exploração final de ${city} e regresso`;
      
      content = `On the final day of your ${focusKeyword}, we explore ${city}. After a hearty breakfast, we stroll through the local crafts markets and historic sites. ${cityGuides[city]?.desc || 'We enjoy sightseeing the panoramic spots.'} We then board our comfortable vehicle for the return journey, enjoying the scenic mountain roads or coastal highways. We arrive back in the evening, where our driver drops you off at your hotel, marking the end of your holiday.`;
      contentFr = `Pour ce dernier jour de voyage, nous explorons ${city}. ${cityGuides[city]?.descFr || 'Nous faisons des visites de monuments.'} Ensuite, nous prenons la route du retour vers notre point de départ.`;
      contentEs = `En el último día de su viaje, exploramos ${city}. ${cityGuides[city]?.descEs || 'Hacemos visitas históricas.'} Luego iniciamos el viaje de regreso al punto de partida.`;
      contentZh = `在 ${focusKeywordZh} 的最后一天，我们游览 ${city}。享用丰盛的早餐后，我们漫步于当地的手工艺品市场和历史遗迹。${cityGuides[city]?.descZh || '我们享受观赏各处壮丽的全景风光。'} 随后，我们登上舒适的专车踏上返程，欣赏沿途美丽的盘山路或沿海高速路。我们于傍晚前抵达终点，司机将您送回酒店，标志着您摩洛哥假期的圆满结束。`;
      contentPt = `No último dia do seu ${focusKeywordPt}, exploramos ${city}. Após um pequeno-almoço reforçado, caminhamos pelos mercados de artesanato e monumentos históricos. ${cityGuides[city]?.descPt || 'Desfrutamos de visitas aos locais panorâmicos.'} De seguida, embarcamos no nosso veículo confortável para a viagem de regresso, apreciando as estradas de montanha ou as autoestradas costeiras. Chegamos ao final do dia, onde o nosso motorista o deixará no seu hotel, terminando as suas férias.`;
    } else {
      // Intermediate days
      const guide = cityGuides[city] || cityGuides['Merzouga'];
      title = `Day ${i}: Journey through ${city} to ${nextCity}`;
      titleFr = `Jour ${i}: Voyage à travers ${city} vers ${nextCity}`;
      titleEs = `Día ${i}: Viaje a través de ${city} hacia ${nextCity}`;
      titleZh = `第 ${i} 天: 穿行于 ${city} 并前往 ${nextCity}`;
      titlePt = `Dia ${i}: Viagem de ${city} para ${nextCity}`;
      
      content = `Today is dedicated to exploring ${city} before heading towards ${nextCity}. ${guide.desc} We travel through stunning scenic valleys, stopping for a local lunch along the route. In the afternoon, we continue towards ${nextCity}, passing beautiful date palms, ancient kasbahs, and local communities. In the evening, we check into our traditional hotel or luxury camp.`;
      contentFr = `Aujourd'hui, nous explorons ${city}. ${guide.descFr} Nous continuons ensuite notre route vers ${nextCity} pour y passer la nuit.`;
      contentEs = `Hoy exploramos ${city}. ${guide.descEs} Continuamos nuestro viaje hacia ${nextCity} donde pasaremos la noche.`;
      contentZh = `今天我们将专程探索 ${city}，随后动身前往 ${nextCity}。${guide.descZh} 我们穿过美得令人惊叹的山谷，在途中停下享用本地特色午餐。下午我们继续朝 ${nextCity} 前行，穿过成片的椰枣树、古老的古堡以及本地土著社区。傍晚前，我们入住传统的精品酒店或豪华帐篷营地。`;
      contentPt = `Hoje o dia é dedicado a explorar ${city} antes de seguir para ${nextCity}. ${guide.descPt} Viajamos por vales pitorescos deslumbrantes, parando para almoçar pelo caminho. À tarde, continuamos em direção a ${nextCity}, passando por belos palmeirais, antigas kasbahs e comunidades locais. Ao fim do dia, fazemos o check-in no nosso riad ou acampamento de luxo.`;
    }

    days.push({
      dayNumber: i,
      title,
      titleFr,
      titleEs,
      titleZh,
      titlePt,
      content,
      contentFr,
      contentEs,
      contentZh,
      contentPt
    });
  }

  return {
    tourId: tour.id,
    focusKeyword,
    focusKeywordFr,
    focusKeywordEs,
    focusKeywordZh,
    focusKeywordPt,
    seoDescription: `Book the custom ${tour.duration}-day ${tour.title} starting from ${tour.departure}. Complete itinerary with local driver, luxury riads, and authentic experiences.`,
    seoDescriptionFr: `Réservez le circuit de ${tour.duration} jours ${tour.titleFr} au départ de ${tour.departure}.`,
    seoDescriptionEs: `Reserve el tour de ${tour.duration} días ${tour.titleEs} saliendo de ${tour.departure}.`,
    seoDescriptionZh: `预订从 ${tour.departure} 出发的 ${tour.duration} 天定制线路：${tour.titleZh}。包含本地司机、豪华庭院和正宗柏柏尔体验的完整行程安排。`,
    seoDescriptionPt: `Reserve o circuito personalizado de ${tour.duration} dias "${tour.titlePt}" a partir de ${tour.departure}. Itinerário completo com motorista local, riads de luxo e experiências autênticas.`,
    inclusions,
    inclusionsFr,
    inclusionsEs,
    inclusionsZh,
    inclusionsPt,
    exclusions,
    exclusionsFr,
    exclusionsEs,
    exclusionsZh,
    exclusionsPt,
    days
  };
};
