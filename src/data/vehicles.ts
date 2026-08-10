export interface Vehicle {
  id: string;
  name: string;
  type: string;
  capacity: string;
  image: string;
  features: string[];
  featuresFr: string[];
  featuresEs: string[];
  featuresIt: string[];
  featuresJa: string[];
  featuresZh: string[];
  description: string;
  descriptionFr: string;
  descriptionEs: string;
  descriptionIt: string;
  descriptionJa: string;
  descriptionZh: string;
}

export const vehicles: Vehicle[] = [
  {
    id: 'prado',
    name: 'Land Cruiser Prado',
    type: '4x4 Luxury SUV',
    capacity: '1 - 4 passengers',
    image: '/images/our cars/WhatsApp Image 2026-08-10 at 16.09.11.jpeg',
    features: ['4WD capability', 'Air Conditioning', 'Leather Seats', 'Expert Driver', 'Luggage space (3 bags)'],
    featuresFr: ['Capacité 4x4', 'Climatisation', 'Sièges en cuir', 'Chauffeur expert', 'Espace bagages (3 sacs)'],
    featuresEs: ['Capacidad 4x4', 'Aire acondicionado', 'Asientos de cuero', 'Conductor experto', 'Espacio para equipaje (3 maletas)'],
    featuresIt: ['Trazione integrale', 'Aria condizionata', 'Sedili in pelle', 'Autista esperto', 'Spazio bagagli (3 borse)'],
    featuresJa: ['4WD機能', 'エアコン完備', '革製シート', '専門ドライバー', '荷物スペース（バッグ3個）'],
    featuresZh: ['四驱越野', '空调系统', '真皮座椅', '专业司机', '行李空间（3个大包）'],
    description: 'Perfect for off-road desert tracks, Atlas Mountain roads, and small private groups seeking high-comfort adventure.',
    descriptionFr: 'Parfait pour les pistes du désert, les routes de l\'Atlas et les petits groupes privés à la recherche d\'aventure confortable.',
    descriptionEs: 'Perfecto para pistas del desierto, carreteras del Atlas y pequeños grupos privados que buscan aventura confortable.',
    descriptionIt: 'Perfetto per le piste del deserto, le strade dell\'Atlante e piccoli gruppi privati che cercano un\'avventura confortevole.',
    descriptionJa: 'オフロードの砂漠トラック、アトラス山脈の道路、そして快適な冒険を求める少人数のプライベートグループに最適です。',
    descriptionZh: '非常适合越野沙漠小径、阿特拉斯山路，以及追求高舒适度冒险的私人小团体。'
  },
  {
    id: 'vito',
    name: 'Mercedes Benz Vito',
    type: 'Premium Minivan',
    capacity: '1 - 7 passengers',
    image: '/images/our cars/WhatsApp Image 2026-08-10 at 16.23.05.jpeg',
    features: ['Spacious Interior', 'Dual A/C', 'Adjustable Seats', 'USB Chargers', 'Large Luggage space'],
    featuresFr: ['Intérieur spacieux', 'Double clim', 'Sièges réglables', 'Chargeurs USB', 'Grand espace bagages'],
    featuresEs: ['Interior espacioso', 'Climatizador doble', 'Asientos ajustables', 'Cargadores USB', 'Gran espacio para equipaje'],
    featuresIt: ['Interni spaziosi', 'Doppia aria condizionata', 'Sedili regolabili', 'Caricatori USB', 'Ampio spazio bagagli'],
    featuresJa: ['広々とした室内', 'デュアルエアコン', 'リクライニングシート', 'USB充電ポート', '広い荷物スペース'],
    featuresZh: ['宽敞内饰', '双温区空调', '可调节座椅', 'USB充电口', '超大行李空间'],
    description: 'Highly comfortable minivan for families and groups, offering smooth travel between imperial cities and desert highlights.',
    descriptionFr: 'Monospace très confortable pour les familles et les groupes, offrant un voyage fluide entre les villes impériales et le désert.',
    descriptionEs: 'Monovolumen muy cómodo para familias y grupos, que ofrece un viaje fluido entre las ciudades imperiales y el desierto.',
    descriptionIt: 'Monovolume molto confortevole per famiglie e gruppi, che offre un viaggio fluido tra le città imperiali e il deserto.',
    descriptionJa: 'ファミリーやグループ向けの非常に快適なミニバンで、帝国の都市と砂漠のハイライト間のスムーズな旅を提供します。',
    descriptionZh: '适合家庭和团体的极佳舒适面包车，提供在帝国都市和沙漠景点之间平稳惬意的旅程。'
  },
  {
    id: 'torneo',
    name: 'Ford Torneo',
    type: 'Executive Tourer',
    capacity: '1 - 8 passengers',
    image: '/images/our cars/WhatsApp Image 2026-08-10 at 16.23.34.jpeg',
    features: ['Modern Styling', 'Multi-zone Climate', 'WiFi onboard', 'Privacy Glass', 'Comfort suspension'],
    featuresFr: ['Style moderne', 'Clim multizone', 'WiFi à bord', 'Vitres teintées', 'Suspension confort'],
    featuresEs: ['Estilo moderno', 'Clima multizona', 'WiFi a bordo', 'Cristales de privacidad', 'Suspensión de confort'],
    featuresIt: ['Stile moderno', 'Clima multizona', 'WiFi a bordo', 'Vetri oscurati', 'Sospensioni comfort'],
    featuresJa: ['モダンなスタイリング', 'マルチゾーンエアコン', '車内WiFi', 'プライベートガラス', '快適なサスペンション'],
    featuresZh: ['现代外观', '多温区空调', '车用WiFi', '隐私玻璃', '舒适悬挂'],
    description: 'An excellent choice for business tours or private groups looking for modern amenities and maximum passenger room.',
    descriptionFr: 'Un excellent choix pour les voyages d\'affaires ou les groupes privés recherchant des équipements modernes et un espace maximal.',
    descriptionEs: 'Una excelente opción para viajes de negocios o grupos privados que buscan comodidades modernas y el máximo espacio para pasajeros.',
    descriptionIt: 'Un\'ottima scelta per viaggi d\'affari o gruppi privati che cercano servizi moderni e il massimo spazio per i passeggeri.',
    descriptionJa: '現代的な設備と最大限の客室スペースを求めるビジネスツアーやプライベートグループに最適な選択肢です。',
    descriptionZh: '寻求现代设施和最大乘客空间的商务旅游或私人团体的绝佳选择。'
  },
  {
    id: 'sprinter',
    name: 'Mercedes Sprinter',
    type: 'Luxury Minibus',
    capacity: '10 - 17 passengers',
    image: '/images/our cars/WhatsApp Image 2026-08-10 at 16.09.11 (1).jpeg',
    features: ['High Roof Cabin', 'Individual A/C vents', 'Microphone System', 'Reclining Tourer Seats', 'Massive Luggage capacity'],
    featuresFr: ['Cabine haute', 'Climatisation individuelle', 'Système micro', 'Sièges inclinables', 'Capacité bagages massive'],
    featuresEs: ['Cabina de techo alto', 'Salidas de aire individuales', 'Sistema de micrófono', 'Asientos reclinables', 'Gran espacio de equipaje'],
    featuresIt: ['Tetto alto', 'Bocchette aria individuali', 'Sistema microfono', 'Sedili reclinabili', 'Spazio bagagli immenso'],
    featuresJa: ['ハイルーフキャビン', '個別エアコン吹き出し口', 'マイクシステム', 'リクライニングシート', '超大容量の荷物スペース'],
    featuresZh: ['高顶车舱', '独立空调出风口', '麦克风系统', '豪华旅行靠背座椅', '巨大行李舱'],
    description: 'Perfect for larger group tours, corporate travel, or large families exploring Morocco with full luxury and space.',
    descriptionFr: 'Parfait pour les grands groupes, les voyages d\'affaires ou les familles nombreuses explorant le Maroc dans le confort et l\'espace.',
    descriptionEs: 'Perfecto para grandes grupos, viajes corporativos o familias numerosas que exploran Marruecos con total lujo y espacio.',
    descriptionIt: 'Perfetto per grandi gruppi, viaggi aziendali o famiglie numerose che esplorano il Marocco con il massimo del comfort e dello spazio.',
    descriptionJa: '大人数のグループツアー、社員旅行、または贅沢な空間でモロッコを探索する大家族に最適です。',
    descriptionZh: '非常适合大型团体旅游、商务出行或想要在充足空间和极高豪华感中探索摩洛哥的大家庭。'
  }
];
