/**
 * 3D Wereldbol – donker thema, land-highlights, informatiekaart
 * Gebruikt globe.gl (Three.js) en Natural Earth GeoJSON
 */

const GLOBE_CONFIG = {
  landColor: 'rgba(24, 16, 48, 0.98)',
  landWithVlogs: 'rgba(109, 40, 217, 0.95)', // Iets lichter/paarsiger voor landen met vlogs
  landHighlight: 'rgba(236, 72, 153, 0.95)',
  landHover: 'rgba(236, 72, 153, 0.55)',
  sideColor: 'rgba(15, 10, 32, 0.9)',
  strokeColor: 'rgba(147, 51, 234, 0.7)',
  atmosphereColor: '#a855f7',
  atmosphereAltitude: 0.25,
  polygonAltitude: 0.015,
  polygonAltitudeHighlight: 0.04,
};

const GEOJSON_URL = 'https://cdn.jsdelivr.net/gh/nvkelso/natural-earth-vector@master/geojson/ne_110m_admin_0_countries.geojson';

// Eenvoudig data-model met al je vlogs
const VLOGS = [
  // 2025
  {
    id: '2025-paris',
    title: 'Paris',
    countryCode: 'fr',
    countryName: 'Frankrijk',
    dateRange: '15–19 augustus 2025',
    duration: '10:00',
    url: 'https://youtu.be/4ZIv4c-9CpI?si=g29YvfF3KEfRfwua',
    year: 2025,
    isPopular: true,
    isFavorite: true,
  },
  {
    id: '2025-haarlem',
    title: 'Haarlem',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '18–20 juli 2025',
    duration: '06:30',
    url: 'https://youtu.be/QCK9zKHXLRU?si=fIgLvBquOLY2BP6V',
    year: 2025,
    isPopular: false,
    isFavorite: true,
  },
  {
    id: '2025-ibiza',
    title: 'Ibiza',
    countryCode: 'es',
    countryName: 'Spanje',
    dateRange: '18–25 juni 2025',
    duration: '11:45',
    url: 'https://youtu.be/binYSej_yVA?si=gK-m9cq-RJ7zCozy',
    year: 2025,
    isPopular: true,
    isFavorite: true,
  },
  {
    id: '2025-dubrovnik',
    title: 'Dubrovnik',
    countryCode: 'hr',
    countryName: 'Kroatië',
    dateRange: '7–14 juni 2025',
    duration: '09:30',
    url: 'https://youtu.be/ytelO8no5lU?si=WuSZSt8BD9fmRKiC',
    year: 2025,
    isPopular: true,
    isFavorite: false,
  },
  {
    id: '2025-america-pt1',
    title: 'America pt. 1',
    countryCode: 'us',
    countryName: 'Verenigde Staten',
    dateRange: '8–17 mei 2025',
    duration: '12:10',
    url: 'https://youtu.be/7j-JbR_DFgw?si=rWN6fmXLZHXIDTXA',
    year: 2025,
    isPopular: true,
    isFavorite: true,
    categories: ['series'],
  },

  // 2024 – trips
  {
    id: '2024-indonesia-trip',
    title: 'Indonesia',
    countryCode: 'id',
    countryName: 'Indonesië',
    dateRange: '29 september – 28 oktober 2024',
    duration: '18:00',
    url: 'https://youtu.be/HAkfAg9oiD0?si=RReBRdxB_LRvTzAg',
    year: 2024,
    isPopular: true,
    isFavorite: true,
  },
  {
    id: '2024-austria',
    title: 'Austria',
    countryCode: 'at',
    countryName: 'Oostenrijk',
    dateRange: '2–8 september 2024',
    duration: '09:00',
    url: 'https://youtu.be/twLQ_0HqDiA?si=xngpd9nT82rvB8JB',
    year: 2024,
    isPopular: false,
    isFavorite: true,
  },
  {
    id: '2024-camping-bulgaria',
    title: 'Camping Bulgaria',
    countryCode: 'bg',
    countryName: 'Bulgarije',
    dateRange: '4–8 augustus 2024',
    duration: '08:30',
    url: 'https://youtu.be/x7AskrBjKDU?si=KgPFREcxjVVWERz1',
    year: 2024,
    isPopular: false,
    isFavorite: false,
  },
  {
    id: '2024-romania',
    title: 'Romania',
    countryCode: 'ro',
    countryName: 'Roemenië',
    dateRange: '24 juli – 2 augustus 2024',
    duration: '10:20',
    url: 'https://youtu.be/4nTYtn0_rG4?si=g7iTELzgJe0WIM_u',
    year: 2024,
    isPopular: true,
    isFavorite: false,
  },
  {
    id: '2024-valduggia',
    title: 'Valduggia',
    countryCode: 'it',
    countryName: 'Italië',
    dateRange: '14–21 juli 2024',
    duration: '07:40',
    url: 'https://youtu.be/BDEjcZJDF5w?si=z-PUmqtEZ5y1JJIo',
    year: 2024,
    isPopular: false,
    isFavorite: true,
  },
  {
    id: '2024-london-cambridge-oxford',
    title: 'London, Cambridge & Oxford',
    countryCode: 'gb',
    countryName: 'Verenigd Koninkrijk',
    dateRange: '1–9 juli 2024',
    duration: '13:15',
    url: 'https://youtu.be/cZEdcKMP4a0?si=HaZG3iZ7U_Cr2mSG',
    year: 2024,
    isPopular: true,
    isFavorite: true,
    categories: ['series'],
  },
  {
    id: '2024-rome',
    title: 'Rome',
    countryCode: 'it',
    countryName: 'Italië',
    dateRange: '29 mei – 4 juni 2024',
    duration: '09:50',
    url: 'https://youtu.be/-EGiYNTaAm4?si=wRXqVePtGNT_Qgah',
    year: 2024,
    isPopular: true,
    isFavorite: true,
  },
  {
    id: '2024-antwerpen',
    title: 'Antwerpen',
    countryCode: 'be',
    countryName: 'België',
    dateRange: '12–14 april 2024',
    duration: '06:10',
    url: 'https://youtu.be/jGqN71yeMII?si=X2_XnWuXHaBEtr0G',
    year: 2024,
    isPopular: false,
    isFavorite: true,
    categories: ['short'],
  },
  {
    id: '2024-budapest',
    title: 'Budapest',
    countryCode: 'hu',
    countryName: 'Hongarije',
    dateRange: '31 maart – 11 april 2024',
    duration: '12:34',
    url: 'https://youtu.be/Ragka69F0R0?si=ew_HMQITPWzpYsIg',
    year: 2024,
    isPopular: true,
    isFavorite: true,
  },

  // 2024 – Indonesia losse vlogs
  {
    id: '2024-indonesia-1-manado',
    title: 'Indonesia #1 Manado',
    countryCode: 'id',
    countryName: 'Indonesië',
    dateRange: '29 september – 5 oktober 2024',
    duration: '08:00',
    url: 'https://youtu.be/6CH3m1CMTc8?si=y8UHcLFS5EtEDkfa',
    year: 2024,
    isPopular: true,
    isFavorite: false,
    categories: ['series'],
  },
  {
    id: '2024-indonesia-2-jakarta',
    title: 'Indonesia #2 Jakarta',
    countryCode: 'id',
    countryName: 'Indonesië',
    dateRange: '5–6 oktober 2024',
    duration: '06:30',
    url: 'https://youtu.be/h85ul6-OA98?si=tA7m59rN1kIeC5PJ',
    year: 2024,
    isPopular: false,
    isFavorite: false,
    categories: ['series'],
  },
  {
    id: '2024-indonesia-3-manado',
    title: 'Indonesia #3 Manado',
    countryCode: 'id',
    countryName: 'Indonesië',
    dateRange: '7–9 oktober 2024',
    duration: '07:10',
    url: 'https://youtu.be/AARTWhsO-rI?si=_UKOThl4WePrjsGB',
    year: 2024,
    isPopular: false,
    isFavorite: false,
    categories: ['series'],
  },
  {
    id: '2024-indonesia-4-jakarta',
    title: 'Indonesia #4 Jakarta',
    countryCode: 'id',
    countryName: 'Indonesië',
    dateRange: '10–13 oktober 2024',
    duration: '07:45',
    url: 'https://youtu.be/gQL7QQCqtO8?si=7JxonsHm9s7ENW-l',
    year: 2024,
    isPopular: false,
    isFavorite: false,
    categories: ['series'],
  },
  {
    id: '2024-indonesia-5-malang',
    title: 'Indonesia #5 Malang',
    countryCode: 'id',
    countryName: 'Indonesië',
    dateRange: '14–18 oktober 2024',
    duration: '08:05',
    url: 'https://youtu.be/p25gRW77NxQ?si=8QK2DawpFqJmnT8l',
    year: 2024,
    isPopular: true,
    isFavorite: false,
    categories: ['series'],
  },
  {
    id: '2024-indonesia-6-bali',
    title: 'Indonesia #6 Bali',
    countryCode: 'id',
    countryName: 'Indonesië',
    dateRange: '19–23 oktober 2024',
    duration: '09:25',
    url: 'https://youtu.be/zfQf6H4SW3k?si=BQTbK8ljualUxuvn',
    year: 2024,
    isPopular: true,
    isFavorite: true,
    categories: ['series'],
  },
  {
    id: '2024-singapore',
    title: 'Singapore',
    countryCode: 'sg',
    countryName: 'Singapore',
    dateRange: '24–27 oktober 2024',
    duration: '08:40',
    url: 'https://youtu.be/s11DRrdHEik?si=a15EhTWDLIjgO4AV',
    year: 2024,
    isPopular: true,
    isFavorite: false,
  },
  {
    id: '2024-mountain-bromo',
    title: 'Mountain Bromo',
    countryCode: 'id',
    countryName: 'Indonesië',
    dateRange: '16 oktober 2024',
    duration: '05:30',
    url: 'https://youtu.be/vIHnslrvkpc?si=qB1zOWAlMWK20Cmg',
    year: 2024,
    isPopular: true,
    isFavorite: false,
  },
  {
    id: '2024-indonesia-overview',
    title: 'Indonesia 2024 (overzicht)',
    countryCode: 'id',
    countryName: 'Indonesië',
    dateRange: '29 september – 28 oktober 2024',
    duration: '14:00',
    url: 'https://youtu.be/GdZtqZUbiHU?si=hhSMMUK6AIs9RK-X',
    year: 2024,
    isPopular: true,
    isFavorite: true,
  },

  // 2023
  {
    id: '2023-gent',
    title: 'Gent',
    countryCode: 'be',
    countryName: 'België',
    dateRange: '2–4 december 2023',
    duration: '06:20',
    url: 'https://youtu.be/VGX8MttZCHA?si=Na9NoY4jFSDl9-WT',
    year: 2023,
    isPopular: false,
    isFavorite: true,
  },
  {
    id: '2023-ijsselmeer',
    title: 'IJsselmeer',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '30 september – 1 oktober 2023',
    duration: '05:45',
    url: 'https://youtu.be/EhLi0_xR5ik?si=FgW6MLWZXj5yY9_v',
    year: 2023,
    isPopular: false,
    isFavorite: false,
  },
  {
    id: '2023-linz',
    title: 'Linz',
    countryCode: 'at',
    countryName: 'Oostenrijk',
    dateRange: '6 september – 1 oktober 2023',
    duration: '09:15',
    url: 'https://youtu.be/TsKS4HkzrHs?si=SySjf_Ig1ZtK7S2-',
    year: 2023,
    isPopular: true,
    isFavorite: false,
  },
  {
    id: '2023-breda',
    title: 'Breda',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '13–14 juli 2023',
    duration: '05:10',
    url: 'https://youtu.be/jW8SEFcpktc?si=AiyT2xKiQedlSCIC',
    year: 2023,
    isPopular: false,
    isFavorite: false,
    categories: ['short'],
  },
  {
    id: '2023-paris',
    title: 'Paris',
    countryCode: 'fr',
    countryName: 'Frankrijk',
    dateRange: '12–15 mei 2023',
    duration: '09:00',
    url: 'https://youtu.be/Ek9kFBQhM1M?si=ewVz6yVVvoONVFj8',
    year: 2023,
    isPopular: true,
    isFavorite: true,
  },

  // 2022
  {
    id: '2022-amsterdam-nov',
    title: 'Amsterdam',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '21–29 november 2022',
    duration: '05:30',
    url: 'https://youtu.be/WWQGv-eeikA?si=YCe6_Q34fQObXAri',
    year: 2022,
    isPopular: false,
    isFavorite: false,
  },
  {
    id: '2022-bulgaria',
    title: 'Bulgaria',
    countryCode: 'bg',
    countryName: 'Bulgarije',
    dateRange: '14–29 augustus 2022',
    duration: '08:50',
    url: 'https://youtu.be/Zbt_7kTFh_I?si=pG7os-eLaGIecFTa',
    year: 2022,
    isPopular: true,
    isFavorite: false,
  },
  {
    id: '2022-italy',
    title: 'Italy',
    countryCode: 'it',
    countryName: 'Italië',
    dateRange: '17–24 juli 2022',
    duration: '09:20',
    url: 'https://youtu.be/DrjUMUB3Xa4?si=7flIMjFTUR1K7s2G',
    year: 2022,
    isPopular: true,
    isFavorite: true,
  },
  {
    id: '2022-amersfoort',
    title: 'Amersfoort',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '8 juli 2022',
    duration: '04:30',
    url: 'https://youtu.be/INn8y_mXGMY?si=4aChlEBqDSCXNB-2',
    year: 2022,
    isPopular: false,
    isFavorite: false,
    categories: ['short'],
  },
  {
    id: '2022-amsterdam-june',
    title: 'Amsterdam',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '17–19 juni 2022',
    duration: '05:10',
    url: 'https://youtu.be/zgEzFUI_VD4?si=Z8CmvewyBEVgd8Vn',
    year: 2022,
    isPopular: false,
    isFavorite: false,
  },
  {
    id: '2022-new-orleans',
    title: 'New Orleans',
    countryCode: 'us',
    countryName: 'Verenigde Staten',
    dateRange: '14–27 mei 2022',
    duration: '10:30',
    url: 'https://youtu.be/xdd8lB1PPHg?si=MwJGco4d30YaIQvE',
    year: 2022,
    isPopular: true,
    isFavorite: true,
  },
  {
    id: '2022-paris',
    title: 'Paris',
    countryCode: 'fr',
    countryName: 'Frankrijk',
    dateRange: '11–13 april 2022',
    duration: '08:10',
    url: 'https://youtu.be/qyhA6QeuDgU?si=dtxybQZY7GLGk_Rh',
    year: 2022,
    isPopular: true,
    isFavorite: false,
  },
  {
    id: '2022-amsterdam-march',
    title: 'Amsterdam',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '23 maart 2022',
    duration: '04:45',
    url: 'https://youtu.be/Wn39HDtJhPY?si=L9cYmj_52KIINSgA',
    year: 2022,
    isPopular: false,
    isFavorite: false,
  },

  // 2021
  {
    id: '2021-antwerpen',
    title: 'Antwerpen',
    countryCode: 'be',
    countryName: 'België',
    dateRange: '28 december 2021',
    duration: '05:00',
    url: 'https://youtu.be/y1yaXv2grqo?si=Myb6WrMNgpfujU6s',
    year: 2021,
    isPopular: false,
    isFavorite: false,
  },
  {
    id: '2021-bulgaria',
    title: 'Bulgaria',
    countryCode: 'bg',
    countryName: 'Bulgarije',
    dateRange: '2–16 augustus 2021',
    duration: '08:30',
    url: 'https://youtu.be/QcvXcszgz7o?si=tMYpsWJbKVxnm2OW',
    year: 2021,
    isPopular: true,
    isFavorite: false,
  },
  {
    id: '2021-italy',
    title: 'Italy',
    countryCode: 'it',
    countryName: 'Italië',
    dateRange: '18–25 juli 2021',
    duration: '09:00',
    url: 'https://youtu.be/Vt5XRJrt--M?si=tWjgwEIBOtDFq576',
    year: 2021,
    isPopular: true,
    isFavorite: false,
  },
  {
    id: '2021-utrecht',
    title: 'Utrecht',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '17 juli 2021',
    duration: '04:20',
    url: 'https://youtu.be/ki-C8NdkvTo?si=Cz5mqqhy96vq5TQd',
    year: 2021,
    isPopular: false,
    isFavorite: false,
    categories: ['short'],
  },
  {
    id: '2021-volendam',
    title: 'Volendam',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '25–26 juni 2021',
    duration: '04:50',
    url: 'https://youtu.be/L0vmB5VaW2k?si=C4ndvrHpSttHGnmd',
    year: 2021,
    isPopular: false,
    isFavorite: false,
    categories: ['short'],
  },

  // 2020
  {
    id: '2020-madurodam',
    title: 'Madurodam',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '23 november 2020',
    duration: '03:40',
    url: 'https://youtu.be/kDPBhf5F5nw?si=YIBOJndCb6bhfYbR',
    year: 2020,
    isPopular: false,
    isFavorite: false,
    categories: ['short'],
  },
  {
    id: '2020-italy',
    title: 'Italy',
    countryCode: 'it',
    countryName: 'Italië',
    dateRange: '3–10 juli 2020',
    duration: '08:30',
    url: 'https://youtu.be/LHvTSgtCz50?si=TNgZSd8ONKtfvEk7',
    year: 2020,
    isPopular: true,
    isFavorite: false,
  },
  {
    id: '2020-bulgaria',
    title: 'Bulgaria',
    countryCode: 'bg',
    countryName: 'Bulgarije',
    dateRange: '24 juli – 7 augustus 2020',
    duration: '08:40',
    url: 'https://youtu.be/nTUFx7xcczA?si=vfCgGnoajYoysJo5',
    year: 2020,
    isPopular: true,
    isFavorite: false,
  },
  {
    id: '2020-berlin',
    title: 'Berlin',
    countryCode: 'de',
    countryName: 'Duitsland',
    dateRange: '26 februari – 1 maart 2020',
    duration: '07:50',
    url: 'https://youtu.be/ysp_mOF-TRU?si=IHIu20HP22Pwx8gk',
    year: 2020,
    isPopular: true,
    isFavorite: false,
  },

  // 2019
  {
    id: '2019-lloret-de-mar',
    title: 'Lloret de Mar',
    countryCode: 'es',
    countryName: 'Spanje',
    dateRange: '23–30 augustus 2019',
    duration: '09:10',
    url: 'https://youtu.be/EWLgtlD83UQ?si=kSS9RQYKS4zEXooZ',
    year: 2019,
    isPopular: true,
    isFavorite: false,
  },

  // 2015
  {
    id: '2015-austria',
    title: 'Austria',
    countryCode: 'at',
    countryName: 'Oostenrijk',
    dateRange: '2015',
    duration: '06:00',
    url: 'https://youtu.be/WhIIeU30Y4U?si=FDjvmLj-Yg-6Y_7J',
    year: 2015,
    isPopular: false,
    isFavorite: false,
  },

  // Events
  {
    id: 'event-graduation-kaloyan',
    title: 'Graduation Kaloyan',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '—',
    duration: '—',
    url: 'https://youtu.be/WQFr_NRJ0QA?si=mvcrG0iMDuhl5ML5',
    year: 2024,
    isPopular: false,
    isFavorite: true,
    categories: ['event'],
  },
  {
    id: 'event-baptism-kaloyan',
    title: 'Baptism Kaloyan',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '—',
    duration: '—',
    url: 'https://youtu.be/Zgx_O3nFhEM?si=03nvbOdeLbCGSdAp',
    year: 2024,
    isPopular: false,
    isFavorite: true,
    categories: ['event'],
  },

  // Extra vlogs (links toegevoegd)
  {
    id: 'extra-vlog-1',
    title: 'Vlog',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '2024',
    duration: '—',
    url: 'https://youtu.be/glgr7P2Oxs4?si=ZSzVmt0l8FpeQjml',
    year: 2024,
    isPopular: false,
    isFavorite: false,
  },
  {
    id: 'extra-vlog-2',
    title: 'Vlog',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '2024',
    duration: '—',
    url: 'https://youtu.be/BKTc5pyBs6I?si=GMVcs6CyMCWHYRcK',
    year: 2024,
    isPopular: false,
    isFavorite: false,
  },
  {
    id: 'extra-vlog-3',
    title: 'Vlog',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '2024',
    duration: '—',
    url: 'https://youtu.be/DbbpRfiMDdo?si=JyA11iTOrM83as5R',
    year: 2024,
    isPopular: false,
    isFavorite: false,
  },
  {
    id: 'extra-vlog-4',
    title: 'Vlog',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '2024',
    duration: '—',
    url: 'https://youtu.be/tIjREqO6l_k?si=i4LaEJTwvj1pV2EU',
    year: 2024,
    isPopular: false,
    isFavorite: false,
  },
  {
    id: 'extra-vlog-5',
    title: 'Vlog',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '2024',
    duration: '—',
    url: 'https://youtu.be/YO_eQlKiOvg?si=2D5AGBDSU_nN0hyc',
    year: 2024,
    isPopular: false,
    isFavorite: false,
  },
  {
    id: 'extra-vlog-6',
    title: 'Vlog',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '2024',
    duration: '—',
    url: 'https://youtu.be/n80vCNxIuWU?si=obaRScFelbGiI-YI',
    year: 2024,
    isPopular: false,
    isFavorite: false,
  },
  {
    id: 'extra-vlog-7',
    title: 'Vlog',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '2024',
    duration: '—',
    url: 'https://youtu.be/Jz41ZOmJK7E?si=ZaA6uSUwuZ70dKln',
    year: 2024,
    isPopular: false,
    isFavorite: false,
  },
  {
    id: 'extra-vlog-8',
    title: 'Vlog',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '2024',
    duration: '—',
    url: 'https://youtu.be/visW5KsSMyU?si=P-EH8L2SC4ogOeoc',
    year: 2024,
    isPopular: false,
    isFavorite: false,
  },
  {
    id: 'extra-vlog-9',
    title: 'Vlog',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '2024',
    duration: '—',
    url: 'https://youtu.be/JNiOaiotqxo?si=jDRHf7AemCZN_bE8',
    year: 2024,
    isPopular: false,
    isFavorite: false,
  },
  {
    id: 'extra-vlog-10',
    title: 'Vlog',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '2024',
    duration: '—',
    url: 'https://youtu.be/6MFOjJiqsbY?si=fFTsj0sswhC1al3W',
    year: 2024,
    isPopular: false,
    isFavorite: false,
  },
  {
    id: 'extra-vlog-11',
    title: 'Vlog',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '2024',
    duration: '—',
    url: 'https://youtu.be/ewCQBQf_NRw?si=ugZnXpGrwVUiGW5G',
    year: 2024,
    isPopular: false,
    isFavorite: false,
  },
  {
    id: 'extra-vlog-12',
    title: 'Vlog',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '2024',
    duration: '—',
    url: 'https://youtu.be/dIONTkAVm0A?si=VmfcJhJiFjX3jcCm',
    year: 2024,
    isPopular: false,
    isFavorite: false,
  },
  {
    id: 'extra-vlog-13',
    title: 'Vlog',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '2024',
    duration: '—',
    url: 'https://youtu.be/m-qMVXKfipw?si=D9_5rmhXpeRxROB4',
    year: 2024,
    isPopular: false,
    isFavorite: false,
  },
  {
    id: 'extra-vlog-14',
    title: 'Vlog',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '2024',
    duration: '—',
    url: 'https://youtu.be/GJOn8Rw7_Lk',
    year: 2024,
    isPopular: false,
    isFavorite: false,
  },
  {
    id: 'extra-vlog-15',
    title: 'Vlog',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '2024',
    duration: '—',
    url: 'https://youtu.be/qV-UASn2PTI',
    year: 2024,
    isPopular: false,
    isFavorite: false,
  },
  {
    id: 'extra-vlog-16',
    title: 'Vlog',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '2024',
    duration: '—',
    url: 'https://youtu.be/iW2sglR2eds',
    year: 2024,
    isPopular: false,
    isFavorite: false,
  },
  {
    id: 'extra-vlog-17',
    title: 'Vlog',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '2024',
    duration: '—',
    url: 'https://youtu.be/jVY379I0cWs',
    year: 2024,
    isPopular: false,
    isFavorite: false,
  },
  {
    id: 'extra-vlog-18',
    title: 'Vlog',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '2024',
    duration: '—',
    url: 'https://youtu.be/qqzmVeDfn30',
    year: 2024,
    isPopular: false,
    isFavorite: false,
  },
  {
    id: 'extra-vlog-19',
    title: 'Roaring Twenties',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '2024',
    duration: '—',
    url: 'https://youtu.be/q-i0Ih_og9A',
    year: 2024,
    isPopular: false,
    isFavorite: false,
  },
];

let globeInstance = null;
let countriesData = null;
let selectedCountry = null;
let playerOverlay = null;
let playerFrame = null;
let playerTitle = null;
let worldSheet = null;
let countriesWithVlogs = null;

function getCountriesWithVlogs() {
  if (countriesWithVlogs) return countriesWithVlogs;
  countriesWithVlogs = new Set(VLOGS.map(v => v.countryCode?.toLowerCase()).filter(Boolean));
  return countriesWithVlogs;
}

function hasVlogs(countryCode) {
  if (!countryCode) return false;
  return getCountriesWithVlogs().has(countryCode.toLowerCase());
}

function getCountryCode(feature) {
  const p = feature?.properties;
  if (!p) return null;
  return (p.ISO_A2 || p.ADM0_A3 || '').toLowerCase();
}

function getCountryName(feature) {
  return feature?.properties?.ADMIN ?? feature?.properties?.name ?? 'Onbekend';
}

function youtubeVideoId(vlog) {
  if (!vlog?.url) return null;
  try {
    const u = new URL(vlog.url);
    if (u.hostname === 'youtu.be') return u.pathname.slice(1).split('?')[0] || null;
    return u.searchParams.get('v') || null;
  } catch {
    return null;
  }
}

function youtubeThumbUrl(vlog) {
  const id = youtubeVideoId(vlog);
  if (!id) return null;
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

function youtubeEmbedUrl(vlog) {
  const id = youtubeVideoId(vlog);
  if (!id) return null;
  const params = new URLSearchParams({ autoplay: '1', rel: '0' });
  return `https://www.youtube.com/embed/${id}?${params.toString()}`;
}

function updateGlobeHighlight() {
  if (!globeInstance || !countriesData) return;
  globeInstance
    .polygonCapColor((d) => {
      if (d === selectedCountry) return GLOBE_CONFIG.landHighlight;
      const code = getCountryCode(d);
      return hasVlogs(code) ? GLOBE_CONFIG.landWithVlogs : GLOBE_CONFIG.landColor;
    })
    .polygonAltitude((d) =>
      d === selectedCountry ? GLOBE_CONFIG.polygonAltitudeHighlight : GLOBE_CONFIG.polygonAltitude
    );
}

function openPlayer(vlog) {
  if (!playerOverlay || !playerFrame || !playerTitle || !vlog) return;
  const embed = youtubeEmbedUrl(vlog);
  if (!embed) {
    window.open(vlog.url, '_blank', 'noopener');
    return;
  }
  playerTitle.textContent = vlog.title;
  playerFrame.src = embed;
  playerOverlay.classList.add('is-open');
  playerOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closePlayer() {
  if (!playerOverlay || !playerFrame) return;
  playerOverlay.classList.remove('is-open');
  playerOverlay.setAttribute('aria-hidden', 'true');
  playerFrame.src = '';
  document.body.style.overflow = '';
}

function setupHoverOverlayButtons(card, vlog) {
  // Voorkom dubbele listeners als we opnieuw renderen
  if (card?.dataset?.hoverBtnsInit === '1') return;
  if (card?.dataset) card.dataset.hoverBtnsInit = '1';

  const playBtns = card.querySelectorAll('.poster-hover-play');
  const infoBtns = card.querySelectorAll('.poster-hover-info');

  playBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (vlog.url) openPlayer(vlog);
    });
  });

  infoBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openInfoModal(vlog);
    });
  });
}

function openInfoModal(vlog) {
  // Maak modal als deze nog niet bestaat
  let infoModal = document.getElementById('info-modal');
  if (!infoModal) {
    infoModal = document.createElement('div');
    infoModal.id = 'info-modal';
    infoModal.className = 'info-modal';
    infoModal.setAttribute('aria-hidden', 'true');
    infoModal.innerHTML = `
      <div class="info-modal-backdrop"></div>
      <div class="info-modal-content">
        <button type="button" class="info-modal-close" aria-label="Sluiten">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
        <div class="info-modal-header">
          <h2 class="info-modal-title"></h2>
          <p class="info-modal-subtitle"></p>
        </div>
        <div class="info-modal-body">
          <div class="info-modal-meta">
            <div class="info-modal-meta-item">
              <svg class="info-modal-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              <span class="info-modal-meta-label">Duur</span>
              <span class="info-modal-meta-value" id="info-duration"></span>
            </div>
            <div class="info-modal-meta-item">
              <svg class="info-modal-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span class="info-modal-meta-label">Jaar</span>
              <span class="info-modal-meta-value" id="info-year"></span>
            </div>
            <div class="info-modal-meta-item">
              <svg class="info-modal-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <span class="info-modal-meta-label">Land</span>
              <span class="info-modal-meta-value" id="info-country"></span>
            </div>
          </div>
          <div class="info-modal-actions">
            <button type="button" class="info-modal-play-btn" id="info-play-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              Afspelen
            </button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(infoModal);
    
    const closeBtn = infoModal.querySelector('.info-modal-close');
    const backdrop = infoModal.querySelector('.info-modal-backdrop');
    
    closeBtn?.addEventListener('click', closeInfoModal);
    backdrop?.addEventListener('click', closeInfoModal);
  }
  
  // Sla huidige vlog op in modal voor play button
  infoModal.setAttribute('data-current-vlog-id', vlog.id);
  
  // Update play button event listener
  const playBtn = infoModal.querySelector('#info-play-btn');
  if (playBtn) {
    // Verwijder oude listener door nieuwe button te maken
    const newPlayBtn = playBtn.cloneNode(true);
    playBtn.parentNode.replaceChild(newPlayBtn, playBtn);
    newPlayBtn.addEventListener('click', () => {
      if (vlog.url) {
        closeInfoModal();
        openPlayer(vlog);
      }
    });
  }
  
  // Vul modal met vlog data
  const titleEl = infoModal.querySelector('.info-modal-title');
  const subtitleEl = infoModal.querySelector('.info-modal-subtitle');
  const durationEl = infoModal.querySelector('#info-duration');
  const yearEl = infoModal.querySelector('#info-year');
  const countryEl = infoModal.querySelector('#info-country');
  
  if (titleEl) titleEl.textContent = vlog.title;
  if (subtitleEl) subtitleEl.textContent = `${vlog.countryName || ''}${vlog.dateRange ? ` · ${vlog.dateRange}` : ''}`;
  if (durationEl) durationEl.textContent = formatDurationToHms(vlog.duration) || '—';
  if (yearEl) yearEl.textContent = vlog.year || '—';
  if (countryEl) countryEl.textContent = vlog.countryName || '—';
  
  infoModal.classList.add('is-open');
  infoModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeInfoModal() {
  const infoModal = document.getElementById('info-modal');
  if (!infoModal) return;
  infoModal.classList.remove('is-open');
  infoModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function selectCountryByCode(iso2) {
  if (!countriesData || !globeInstance) return;
  const match = countriesData.find(
    (feat) => getCountryCode(feat) === iso2.toLowerCase()
  );
  if (!match) {
    renderCountryVlogs(iso2.toLowerCase(), 'Onbekend land');
    return;
  }
  selectedCountry = match;
  updateGlobeHighlight();
  renderCountryVlogs(getCountryCode(match), getCountryName(match));

  const centroid = match.properties && match.properties.LABEL_Y && match.properties.LABEL_X
    ? { lat: match.properties.LABEL_Y, lng: match.properties.LABEL_X }
    : null;

  if (centroid) {
    globeInstance.pointOfView(
      { lat: centroid.lat, lng: centroid.lng, altitude: 2.2 },
      900
    );
  }
}

function getFeaturedVlog() {
  const sorted = [...VLOGS].sort((a, b) => b.year - a.year);
  return sorted[0] || null;
}

function getOtherVlogs() {
  const featured = getFeaturedVlog();
  if (!featured) return VLOGS;
  return VLOGS.filter((v) => v.id !== featured.id);
}

function getVlogsByCategory(categoryKey) {
  return VLOGS.filter((v) => (v.categories || []).includes(categoryKey));
}

function formatDurationToHms(input) {
  if (!input || input === '—') return '—';
  const raw = String(input).trim();

  // Accept "hh:mm:ss", "mm:ss", or "ss"
  const parts = raw.split(':').map((p) => p.trim());
  if (parts.some((p) => p === '' || Number.isNaN(Number(p)))) return raw;

  let h = 0;
  let m = 0;
  let s = 0;

  if (parts.length === 3) {
    h = Number(parts[0]);
    m = Number(parts[1]);
    s = Number(parts[2]);
  } else if (parts.length === 2) {
    m = Number(parts[0]);
    s = Number(parts[1]);
  } else if (parts.length === 1) {
    s = Number(parts[0]);
  } else {
    return raw;
  }

  if ([h, m, s].some((n) => !Number.isFinite(n) || n < 0)) return raw;

  // Normalize overflow just in case
  m += Math.floor(s / 60);
  s = s % 60;
  h += Math.floor(m / 60);
  m = m % 60;

  const out = [];
  if (h > 0) out.push(`${h}h`);
  out.push(`${m}m`);
  out.push(`${s}s`);
  return out.join(' ');
}

function vlogHoverCardHtml({ thumb, indexLabel, title, duration, year }) {
  const safeTitle = (title || '').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  const safeDuration = formatDurationToHms(duration).replace(/</g, '&lt;').replace(/"/g, '&quot;');
  const safeYear = (year || '—').toString().replace(/</g, '&lt;').replace(/"/g, '&quot;');

  return `
    <div class="vlog-hover-card" aria-hidden="true">
      <div class="vlog-hover-thumb" style="${thumb ? `background-image:url(${thumb})` : ''}">
        ${indexLabel ? `<span class="top10-card-number" aria-hidden="true">${indexLabel}</span>` : ''}
      </div>
      <div class="vlog-hover-panel">
        <div class="vlog-hover-actions">
          <button type="button" class="poster-hover-play" aria-label="Afspelen">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          </button>
          <button type="button" class="poster-hover-info" aria-label="Meer informatie">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4M12 8h.01"></path>
            </svg>
          </button>
        </div>
        ${vlogMetaHtml({ title, duration, year })}
      </div>
    </div>
  `.trim();
}

function vlogMetaHtml({ title, duration, year }) {
  const safeTitle = (title || '').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  const safeDuration = formatDurationToHms(duration).replace(/</g, '&lt;').replace(/"/g, '&quot;');
  const safeYear = (year || '—').toString().replace(/</g, '&lt;').replace(/"/g, '&quot;');

  return `
    <div class="vlog-meta">
      <div class="vlog-meta-text">
        <div class="vlog-hover-meta">
          ${
            safeDuration !== '—'
              ? `<span class="vlog-hover-meta-item">
                  <svg class="poster-hover-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  ${safeDuration}
                </span>`
              : ''
          }
          <span class="vlog-hover-meta-item">
            <svg class="poster-hover-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            ${safeYear}
          </span>
        </div>
        <div class="vlog-hover-title">${safeTitle}</div>
      </div>
      <button type="button" class="vlog-meta-play" aria-label="Afspelen">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z"></path>
        </svg>
      </button>
    </div>
  `.trim();
}

function renderCategoryRow(containerId, categoryKey, usePortrait = false) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';

  const list = getVlogsByCategory(categoryKey);
  if (list.length === 0) {
    container.innerHTML = '<p class="stream-row-empty">Nog geen vlogs in deze categorie.</p>';
    return;
  }

  list.forEach((vlog) => {
    const card = document.createElement('article');
    card.className = usePortrait ? 'top10-card' : 'stream-row-poster';
    const thumb = youtubeThumbUrl(vlog);
    const metaHtml = vlogMetaHtml({
      title: vlog.title,
      duration: vlog.duration,
      year: vlog.year,
    });

    card.innerHTML = `
      <div class="vlog-thumb" style="${thumb ? `background-image:url(${thumb})` : ''}"></div>
      ${metaHtml}
    `;
    card.addEventListener('click', (e) => {
      const isPlayButton = (e.target instanceof HTMLElement) && e.target.closest('.vlog-meta-play');
      if (!isPlayButton && vlog.url) {
        openPlayer(vlog);
      }
    });
    const playBtn = card.querySelector('.vlog-meta-play');
    if (playBtn) {
      playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (vlog.url) openPlayer(vlog);
      });
    }
    container.appendChild(card);
  });
}

function renderFeaturedHero() {
  const hero = document.getElementById('stream-hero');
  const bg = document.getElementById('stream-hero-bg');
  const titleEl = document.getElementById('stream-hero-title');
  const metaEl = document.getElementById('stream-hero-meta');
  const playBtn = document.getElementById('stream-hero-play');
  const addBtn = document.getElementById('stream-hero-add');
  if (!hero || !bg || !titleEl || !metaEl) return;

  const vlog = getFeaturedVlog();
  if (!vlog) {
    titleEl.textContent = 'Geen vlogs';
    metaEl.textContent = '';
    return;
  }

  const thumb = youtubeThumbUrl(vlog);
  if (thumb) bg.style.backgroundImage = `url(${thumb})`;
  titleEl.textContent = vlog.title.toUpperCase();
  metaEl.textContent = `${vlog.countryName} · ${vlog.year}`;

  if (playBtn) {
    playBtn.onclick = () => vlog.url && openPlayer(vlog);
  }
  if (addBtn) {
    addBtn.onclick = () => {
        const params = new URLSearchParams();
        params.set('country', vlog.countryCode);
        window.location.href = `map.html?${params.toString()}`;
      };
  }
}

function renderMyList() {
  const container = document.getElementById('stream-mylist');
  if (!container) return;
  container.innerHTML = '';

  const others = getOtherVlogs();
  if (others.length === 0) {
    container.innerHTML = '<p class="mylist-empty">Geen andere vlogs.</p>';
    return;
  }

  others.forEach((vlog) => {
    const card = document.createElement('article');
    card.className = 'mylist-poster';
    const thumb = youtubeThumbUrl(vlog);
    const metaHtml = vlogMetaHtml({
      title: vlog.title,
      duration: vlog.duration,
      year: vlog.year,
    });
    card.innerHTML = `
      <div class="vlog-thumb" style="${thumb ? `background-image:url(${thumb})` : ''}"></div>
      ${metaHtml}
    `;
    card.addEventListener('click', (e) => {
      const isPlayButton = (e.target instanceof HTMLElement) && e.target.closest('.vlog-meta-play');
      if (!isPlayButton && vlog.url) {
        openPlayer(vlog);
      }
    });
    const playBtn = card.querySelector('.vlog-meta-play');
    if (playBtn) {
      playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (vlog.url) openPlayer(vlog);
      });
    }
    container.appendChild(card);
  });
}

function renderCountryVlogs(countryCode, countryNameFallback) {
  const nameEl = document.getElementById('world-country-name');
  const countEl = document.getElementById('world-country-count');
  const listEl = document.getElementById('country-vlog-list');
  if (!nameEl || !countEl || !listEl) return;

  const countryVlogs = VLOGS.filter((v) => v.countryCode === countryCode);
  const countryName = countryVlogs[0]?.countryName || countryNameFallback || 'Onbekend land';

  nameEl.textContent = countryName;
  countEl.textContent = `${countryVlogs.length} vlog${countryVlogs.length === 1 ? '' : 's'}`;

  listEl.innerHTML = '';

  if (!countryVlogs.length) {
    listEl.innerHTML = `<p class="world-empty">Nog geen vlogs voor ${countryName} – maar dat komt vast nog ✨</p>`;
    return;
  }

  const sorted = [...countryVlogs].sort((a, b) => b.year - a.year);

  sorted.forEach((vlog) => {
    const item = document.createElement('article');
    item.className = 'country-vlog-card';

    item.innerHTML = `
      <div class="country-vlog-thumb"></div>
      <div class="country-vlog-meta">
        <h4 class="country-vlog-title">${vlog.title}</h4>
        <p class="country-vlog-sub">${vlog.dateRange || vlog.year}</p>
      </div>
      <span class="country-vlog-duration">${vlog.duration || ''}</span>
    `;

    item.addEventListener('click', () => {
      if (vlog.url) {
        openPlayer(vlog);
      }
    });

    listEl.appendChild(item);
  });

  openWorldSheet();
}

async function initGlobe() {
  const container = document.getElementById('globe-container');
  if (!container) return;

  const { default: Globe } = await import('https://esm.sh/globe.gl@2.31.0');
  const countries = await fetch(GEOJSON_URL).then((r) => r.json());
  countriesData = countries.features.filter((d) => d.properties?.ISO_A2 !== 'AQ');

  globeInstance = new Globe(container)
    .globeImageUrl(null)
    .bumpImageUrl(null)
    .backgroundImageUrl(null)
    .backgroundColor('#000000')
    .showAtmosphere(true)
    .atmosphereColor(GLOBE_CONFIG.atmosphereColor)
    .atmosphereAltitude(GLOBE_CONFIG.atmosphereAltitude)
    .polygonsData(countriesData)
    .polygonCapColor((d) => {
      const code = getCountryCode(d);
      return hasVlogs(code) ? GLOBE_CONFIG.landWithVlogs : GLOBE_CONFIG.landColor;
    })
    .polygonSideColor(() => GLOBE_CONFIG.sideColor)
    .polygonStrokeColor(() => GLOBE_CONFIG.strokeColor)
    .polygonAltitude(GLOBE_CONFIG.polygonAltitude)
    .polygonLabel(({ properties: p }) => (p ? `${p.ADMIN || p.name} (${p.ISO_A2 || ''})` : ''))
    .onPolygonClick((d) => {
      if (!d) return;
      selectedCountry = d;
      updateGlobeHighlight();

      const code = getCountryCode(d);
      const name = getCountryName(d);
      renderCountryVlogs(code, name);
    })
    .onPolygonHover((hoverD) => {
      globeInstance
        .polygonAltitude((d) => {
          if (d === hoverD || d === selectedCountry) return GLOBE_CONFIG.polygonAltitudeHighlight;
          return GLOBE_CONFIG.polygonAltitude;
        })
        .polygonCapColor((d) => {
          if (d === selectedCountry) return GLOBE_CONFIG.landHighlight;
          if (d === hoverD) return GLOBE_CONFIG.landHover;
          const code = getCountryCode(d);
          return hasVlogs(code) ? GLOBE_CONFIG.landWithVlogs : GLOBE_CONFIG.landColor;
        });
    })
    .polygonsTransitionDuration(300);

  globeInstance.controls().autoRotate = true;
  globeInstance.controls().autoRotateSpeed = 0.4;
  globeInstance.pointOfView({ lat: 48, lng: 10, altitude: 2.2 }, 0);

  // Als er een country-parameter in de URL staat (bijv. vanuit DaphneVlogs),
  // selecteer dat land direct op de kaart.
  const params = new URLSearchParams(window.location.search);
  const countryParam = params.get('country');
  if (countryParam) {
    selectCountryByCode(countryParam);
  }
}

function openWorldSheet() {
  if (!worldSheet) return;
  worldSheet.classList.add('is-open');
  worldSheet.setAttribute('aria-hidden', 'false');
}

function toggleWorldSheet() {
  if (!worldSheet) return;
  const isOpen = worldSheet.classList.contains('is-open');
  if (isOpen) {
    worldSheet.classList.remove('is-open');
    worldSheet.setAttribute('aria-hidden', 'true');
  } else {
    openWorldSheet();
  }
}

function initPlayerOverlay() {
  playerOverlay = document.getElementById('player-overlay');
  playerFrame = document.getElementById('player-frame');
  playerTitle = document.getElementById('player-title');

  const closeBtn = document.getElementById('player-close');
  closeBtn?.addEventListener('click', closePlayer);

  playerOverlay?.addEventListener('click', (e) => {
    if (e.target === playerOverlay) {
      closePlayer();
    }
  });
}

function initWorldSheet() {
  worldSheet = document.getElementById('world-sheet');
  const handle = document.getElementById('world-sheet-handle');
  if (!worldSheet) return;
  if (handle) {
    handle.addEventListener('click', toggleWorldSheet);
  }
}

function initStreamPage() {
  initPlayerOverlay();
  initWorldSheet();
  if (document.getElementById('stream-hero')) {
    renderFeaturedHero();
    renderMyList();
    renderCategoryRow('stream-shorts', 'short');
    renderCategoryRow('stream-series', 'series');
    renderCategoryRow('stream-documentaries', 'documentary');
    renderCategoryRow('stream-events', 'event');
  }
  initGlobe().catch((err) => {
  console.error('Globe initialisatie mislukt:', err);
  document.getElementById('globe-container').innerHTML = `
    <div style="display:flex;align-items:center;justify-content:center;height:100%;color:#94a3b8;font-family:sans-serif;text-align:center;padding:1rem;">
      <div>
        <p>De wereldbol kon niet worden geladen.</p>
        <p style="font-size:0.875rem;margin-top:0.5rem;">Controleer je internetverbinding en probeer de pagina te herladen.</p>
      </div>
    </div>
  `;
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initStreamPage);
} else {
  initStreamPage();
}
