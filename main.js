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

// VLOGS uit daphnevlogs_overzicht_v6.xlsx (Vacation_Vlogs + Mixed_Media)
const VLOGS = [
  {
    id: 'vacation-2025-america-pt-1-5',
    title: 'America pt. 1',
    countryCode: 'us',
    countryName: 'Verenigde Staten',
    dateRange: '8 May 2025 - 17 May 2024',
    duration: '—',
    url: 'https://youtu.be/7j-JbR_DFgw?si=jr_1DwTbWb-iW3F5',
    year: 2025,
    isPopular: false,
    isFavorite: false,
    description: 'Hopping off a plane at LAX to drive through California, Arizona and Nevada while visiting beautiful Nationals Parks in the USA.'
  },
  {
    id: 'mixed-2025-concert-damiano-david-1',
    title: 'Concert Damiano David',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '2025',
    duration: '—',
    url: 'https://youtu.be/6CH3m1CMTc8?si=aDyQDcabo_TBN4RX',
    year: 2025,
    isPopular: false,
    isFavorite: false,
    categories: ["event"],
    description: 'DAMIANO DAVID - Funny Little Fears (World Tour) in AFAS Live'
  },
  {
    id: 'vacation-2025-dubrovnik-4',
    title: 'Dubrovnik',
    countryCode: 'hr',
    countryName: 'Kroatië',
    dateRange: '7 June 2025 - 14 June 2024',
    duration: '—',
    url: 'https://youtu.be/ytelO8no5lU?si=uRjWj0KQsWaq78fT',
    year: 2025,
    isPopular: false,
    isFavorite: false,
    description: 'With my brothers, my mom and Aleks we go to the place were Game of Thrones is filmed.'
  },
  {
    id: 'vacation-2025-haarlem-2',
    title: 'Haarlem',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '18 July 2025 - 20 July 2024',
    duration: '—',
    url: 'https://youtu.be/QCK9zKHXLRU?si=0UTArDYnzOfZvHEY',
    year: 2025,
    isPopular: false,
    isFavorite: false,
    description: 'A weekend in Haarlem with Jolijn, filled with shopping sprees and indulging in the best Social Deals.'
  },
  {
    id: 'vacation-2025-ibiza-3',
    title: 'Ibiza',
    countryCode: 'es',
    countryName: 'Spanje',
    dateRange: '18 June 2025 - 25 June 2024',
    duration: '—',
    url: 'https://youtu.be/binYSej_yVA?si=Kv05kvKC8NQD16PN',
    year: 2025,
    isPopular: false,
    isFavorite: false,
    description: 'Come along as Melinde and I escape to Ibiza for a girls’ getaway filled with beach vibes and fun nights out.'
  },
  {
    id: 'mixed-2025-master-graduation-2',
    title: 'Master Graduation',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '2025',
    duration: '—',
    url: 'https://youtu.be/h85ul6-OA98?si=3bH_IneJhEbbouYF',
    year: 2025,
    isPopular: false,
    isFavorite: false,
    categories: ["event"],
    description: 'Graduation day of my masters degree Media Technology in Leiden'
  },
  {
    id: 'mixed-2025-paint-sip-4',
    title: 'Paint & Sip',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '2025',
    duration: '—',
    url: 'https://youtu.be/gQL7QQCqtO8?si=cYLn0t2w2pUv3X7L',
    year: 2025,
    isPopular: false,
    isFavorite: false,
    categories: ["event"],
    description: 'Creating some art on a Tuesday evening at Badhuisstraat.'
  },
  {
    id: 'vacation-2025-paris-1',
    title: 'Paris',
    countryCode: 'fr',
    countryName: 'Frankrijk',
    dateRange: '15-19 August',
    duration: '—',
    url: 'https://youtu.be/4ZIv4c-9CpI?si=2JBrX73FdhhmTp7T',
    year: 2025,
    isPopular: false,
    isFavorite: false,
    description: 'Going to Disneyland in Paris for Maria\'s 10th birthday.'
  },
  {
    id: 'mixed-2025-super-saturday-3',
    title: 'Super Saturday',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '2025',
    duration: '—',
    url: 'https://youtu.be/AARTWhsO-rI?si=CWdOtSIwJ0dJyD5B',
    year: 2025,
    isPopular: false,
    isFavorite: false,
    categories: ["event"],
    description: 'All teams of DSZ WAVE played at home on the same day.'
  },
  {
    id: 'mixed-2024-aleks-25th-birthday-8',
    title: 'Aleks\' 25th birthday',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '2024',
    duration: '—',
    url: '',
    year: 2024,
    isPopular: false,
    isFavorite: false,
    categories: ["event"],
    description: 'A good balkan birthday at the crack house.'
  },
  {
    id: 'vacation-2024-antwerpen-13',
    title: 'Antwerpen',
    countryCode: 'be',
    countryName: 'België',
    dateRange: '12 April 2024 - 14 April 2024',
    duration: '—',
    url: 'https://youtu.be/jGqN71yeMII?si=rjDNvb_EekoRjdoD',
    year: 2024,
    isPopular: false,
    isFavorite: false,
    description: 'Excursion with the master Media Technology to the exhibit of the Verbeke Foundation near Antwerpen, Belgium.'
  },
  {
    id: 'vacation-2024-austria-7',
    title: 'Austria',
    countryCode: 'at',
    countryName: 'Oostenrijk',
    dateRange: '2 September 2024 - 8 September 2024',
    duration: '—',
    url: 'https://youtu.be/twLQ_0HqDiA?si=tYs3fXIlxRpPVpno',
    year: 2024,
    isPopular: false,
    isFavorite: false,
    description: 'Sightseeing Vienna in two days with Chiini, and then visit the Ars Electronica festival with classmates from my MSc Media Technology.'
  },
  {
    id: 'mixed-2024-baptism-of-kaloyan-7',
    title: 'Baptism of Kaloyan',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '2024',
    duration: '—',
    url: 'https://youtu.be/s11DRrdHEik?si=bz8HtoCeVHFVoBIp',
    year: 2024,
    isPopular: false,
    isFavorite: false,
    categories: ["event"],
    description: 'Ivo and Eli\'s son is turning 1 year old. On this day he is baptized in church.'
  },
  {
    id: 'vacation-2024-budapest-14',
    title: 'Budapest',
    countryCode: 'hu',
    countryName: 'Hongarije',
    dateRange: '31 March 2024 - 11 April 2024',
    duration: '—',
    url: 'https://youtu.be/Ragka69F0R0?si=mrQNVHKar5U6HUYE',
    year: 2024,
    isPopular: false,
    isFavorite: false,
    description: 'Easter vacation with my mother and brother to warm and lovely Budapest, Hungary.'
  },
  {
    id: 'vacation-2024-camping-bulgaria-8',
    title: 'Camping Bulgaria',
    countryCode: 'bg',
    countryName: 'Bulgarije',
    dateRange: '4 August 2024 - 8 August 2024',
    duration: '—',
    url: 'https://youtu.be/x7AskrBjKDU?si=4p3XLiYLRb31m_Kq',
    year: 2024,
    isPopular: false,
    isFavorite: false,
    description: 'Wildcamping on the sea coast of Bulgaria with Anastasiia, Marko and Alex.'
  },
  {
    id: 'mixed-2024-friendmas-2024-6',
    title: 'Friendmas 2024',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '2024',
    duration: '—',
    url: 'https://youtu.be/zfQf6H4SW3k?si=dJFrGOeiJiJFn1ev',
    year: 2024,
    isPopular: false,
    isFavorite: false,
    categories: ["event"],
    description: 'Celebrating Christmas dinner with friends at Badhuisstraat.'
  },
  {
    id: 'mixed-2024-graduation-vlog-alex-9',
    title: 'Graduation vlog Alex',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '2024',
    duration: '—',
    url: 'https://youtu.be/GdZtqZUbiHU?si=uqhzuKIdVEdfx-uo',
    year: 2024,
    isPopular: false,
    isFavorite: false,
    categories: ["event"],
    description: 'Aleksandar Ivanov graduating User Experience Design from The Hague University of Applied Sciences'
  },
  {
    id: 'mixed-2024-graduation-vlog-jurriaan-5',
    title: 'Graduation vlog Jurriaan',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '2024',
    duration: '—',
    url: 'https://youtu.be/p25gRW77NxQ?si=sUdaB6fe6kAGKnJU',
    year: 2024,
    isPopular: false,
    isFavorite: false,
    categories: ["event"],
    description: 'Jurriaan Eduard Varekamp is celebrating his birthday while also graduating his masters in Pharmaceutical Medicine.'
  },
  {
    id: 'vacation-2024-indonesia-6',
    title: 'Indonesia',
    countryCode: 'id',
    countryName: 'Indonesië',
    dateRange: '29 September 2024 - 28 October 2024',
    duration: '—',
    url: 'https://youtu.be/25Ox32-WtmE?si=ykkyi8fckxvqd5fb',
    year: 2024,
    isPopular: false,
    isFavorite: false,
    description: 'My mother and uncle are returning back to Indonesia after more than sixty years to visit family, and she is bringing me and my brother along.'
  },
  {
    id: 'vacation-2024-london-cambridge-oxford-11',
    title: 'London, Cambridge & Oxford',
    countryCode: 'gb',
    countryName: 'Verenigd Koninkrijk',
    dateRange: '1 July 2024 - 9 July 2024',
    duration: '—',
    url: 'https://youtu.be/cZEdcKMP4a0?si=Q8LrvNAfIbV_tqau',
    year: 2024,
    isPopular: false,
    isFavorite: false,
    description: 'Trip to the major universities in England with mom, and also an ABBA concert.'
  },
  {
    id: 'mixed-2024-music-video-clip-10',
    title: 'Music video clip',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '2024',
    duration: '—',
    url: 'https://youtu.be/WQFr_NRJ0QA?si=EZGNlXS1oCL1rOYS',
    year: 2024,
    isPopular: false,
    isFavorite: false,
    categories: ["event"],
    description: 'Gewoon Gemiddeld by Røyking.'
  },
  {
    id: 'vacation-2024-romania-9',
    title: 'Romania',
    countryCode: 'ro',
    countryName: 'Roemenië',
    dateRange: '24 July 2024 - 2 August 2024',
    duration: '—',
    url: 'https://youtu.be/4nTYtn0_rG4?si=c2jb09_nEFZGsZBb',
    year: 2024,
    isPopular: false,
    isFavorite: false,
    description: 'Visiting Smaranda in Bucharest after she recently moved back to her home country Romania.'
  },
  {
    id: 'vacation-2024-rome-12',
    title: 'Rome',
    countryCode: 'it',
    countryName: 'Italië',
    dateRange: '29 May 2024 - 04 June 2024',
    duration: '—',
    url: 'https://youtu.be/-EGiYNTaAm4?si=8cdCgReo_QHOTkh-',
    year: 2024,
    isPopular: false,
    isFavorite: false,
    description: 'Birthday trip with Noel, Bo, Sara, Mattaya, Soph, Arie, Karol, Jeanne and Alex to Italy.'
  },
  {
    id: 'vacation-2024-valduggia-10',
    title: 'Valduggia',
    countryCode: 'it',
    countryName: 'Italië',
    dateRange: '14 July 2024 - 21 July 2024',
    duration: '—',
    url: 'https://youtu.be/BDEjcZJDF5w?si=27xyrAeVVhekGc1r',
    year: 2024,
    isPopular: false,
    isFavorite: false,
    description: 'Driving down to Northern Italy with my father and brother(s), and staying at Casa Valduggia.'
  },
  {
    id: 'mixed-2023-birthday-dinner-13',
    title: 'Birthday dinner',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '4 November 2023',
    duration: '—',
    url: 'https://youtu.be/BKTc5pyBs6I?si=FZv_wtQdnZgwnWJV',
    year: 2023,
    isPopular: false,
    isFavorite: false,
    categories: ["event"],
    description: 'For my father\'s birthday my brother (a chef) created Michelin\'s star level meals in a three course dinner.'
  },
  {
    id: 'vacation-2023-breda-18',
    title: 'Breda',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '13 July 2023 - 14 July 2023',
    duration: '—',
    url: 'https://youtu.be/jW8SEFcpktc?si=w9XltzIz4t_SsqxL',
    year: 2023,
    isPopular: false,
    isFavorite: false,
    description: 'Trip to Breda.'
  },
  {
    id: 'vacation-2023-gent-15',
    title: 'Gent',
    countryCode: 'be',
    countryName: 'België',
    dateRange: '2 December 2023 - 4 December 2023',
    duration: '—',
    url: 'https://youtu.be/VGX8MttZCHA?si=8aG_q8DfK6rvl92I',
    year: 2023,
    isPopular: false,
    isFavorite: false,
    description: 'Visiting Belgium for the 11km CM Urban Walk Gent, which took us through various buildings and hidden spots.'
  },
  {
    id: 'vacation-2023-ijsselmeer-16',
    title: 'IJsselmeer',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '30 September 2023 - 1 October 2023',
    duration: '—',
    url: 'https://youtu.be/EhLi0_xR5ik?si=HALI8CU8mXrrA_N2',
    year: 2023,
    isPopular: false,
    isFavorite: false,
    description: 'Sailing over the IJsselmeer from Lemmer to Enkhuizen with my uncle\'s sailing boat.'
  },
  {
    id: 'mixed-2023-kingsday-17',
    title: 'Kingsday',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '27 April 2023',
    duration: '—',
    url: 'https://youtu.be/n80vCNxIuWU?si=ctAoY-12q9RiHG6F',
    year: 2023,
    isPopular: false,
    isFavorite: false,
    categories: ["event"],
    description: 'Renting a boat and sailing through The Hague during kingsday while the rest of the city is at home with a hangover.'
  },
  {
    id: 'vacation-2023-linz-17',
    title: 'Linz',
    countryCode: 'at',
    countryName: 'Oostenrijk',
    dateRange: '6 September 2023 - 1 October 2023',
    duration: '—',
    url: 'https://youtu.be/TsKS4HkzrHs?si=ZB-CTonSpfpirl_Q',
    year: 2023,
    isPopular: false,
    isFavorite: false,
    description: 'Visiting the Ars Electronica festival in Linz, Austria with the Media Technology master first year students.'
  },
  {
    id: 'mixed-2023-loek-s-funeral-16',
    title: 'Loek\'s Funeral',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '22 May 2023',
    duration: '—',
    url: 'https://youtu.be/YO_eQlKiOvg?si=0ih-Aib2Ls78n9uk',
    year: 2023,
    isPopular: false,
    isFavorite: false,
    categories: ["event"],
    description: 'In loving memory of our dear friend Loek, whose sudden departure on May 12th, 2023, left an irreplaceable void in our hearts. This video was a request of the family and serves as a tribute to his remarkable spirit and the enduring bonds of friendship left behind.'
  },
  {
    id: 'mixed-2023-making-pasta-14',
    title: 'Making pasta',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '22 September 2022',
    duration: '—',
    url: 'https://youtu.be/DbbpRfiMDdo?si=_moRubEz9VzsvC8B',
    year: 2023,
    isPopular: false,
    isFavorite: false,
    categories: ["event"],
    description: 'Making pasta from scratch with Aleks, Karol and Jeanne at Badhuisstraat.'
  },
  {
    id: 'mixed-2023-maneskin-concert-19',
    title: 'Maneskin concert',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '27 January 2023',
    duration: '—',
    url: 'https://youtu.be/visW5KsSMyU?si=zh6bdZEdeuGObifS',
    year: 2023,
    isPopular: false,
    isFavorite: false,
    categories: ["event"],
    description: 'Golden ticket to Maneskin playing in the Ziggo Dome in The Netherlands.'
  },
  {
    id: 'mixed-2023-nostalgialism-11',
    title: 'Nostalgialism',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '12 November 2023',
    duration: '—',
    url: 'https://youtu.be/Zgx_O3nFhEM?si=b5mzj68x25WyvrDQ',
    year: 2023,
    isPopular: false,
    isFavorite: false,
    categories: ["event"],
    description: 'For the Strategies in Creative & Performing Arts course in my masters we had to come up with a new fictitious strategy with which artists create their work. We had to add existing art that supposedly would fall under this strategy. I decided to make this assignment in video form.'
  },
  {
    id: 'vacation-2023-paris-19',
    title: 'Paris',
    countryCode: 'fr',
    countryName: 'Frankrijk',
    dateRange: '12 May 2023 - 15 May 2023',
    duration: '—',
    url: 'https://youtu.be/Ek9kFBQhM1M?si=Xd5kUOMdOHkLShVT',
    year: 2023,
    isPopular: false,
    isFavorite: false,
    description: 'The Egg in Paris: Visiting Karol\'s girlfriend Jeanne in her apartment in Paris for the weekend.'
  },
  {
    id: 'mixed-2023-september-birthday-party-15',
    title: 'September birthday party',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '15 September 2023',
    duration: '—',
    url: 'https://youtu.be/tIjREqO6l_k?si=dMha8klN7zcPNsQx',
    year: 2023,
    isPopular: false,
    isFavorite: false,
    categories: ["event"],
    description: 'The three September babies; Joël, Ines and Mike celebrate their birthdays on a combined evening.'
  },
  {
    id: 'mixed-2023-thanksgiving-12',
    title: 'Thanksgiving',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '23 November 2023',
    duration: '—',
    url: 'https://youtu.be/glgr7P2Oxs4?si=ztw-cD7jfso5HUkm',
    year: 2023,
    isPopular: false,
    isFavorite: false,
    categories: ["event"],
    description: 'Having Thanksgiving dinner at Yanna\'s huis with the Media Technology class.'
  },
  {
    id: 'mixed-2023-video-game-museum-18',
    title: 'Video Game Museum',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '1 March 2023',
    duration: '—',
    url: 'https://youtu.be/Jz41ZOmJK7E?si=KURmUDszVU_RpIna',
    year: 2023,
    isPopular: false,
    isFavorite: false,
    categories: ["event"],
    description: 'Going with Aleks, Ines, Karol and Jeanne to the Video Game Museum in Zoetermeer.'
  },
  {
    id: 'vacation-2022-amsterdam-20',
    title: 'Amsterdam',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '17 June 2022 - 19 June 2022',
    duration: '—',
    url: 'https://youtu.be/WWQGv-eeikA?si=dXh25_SA10u9s7Z6',
    year: 2022,
    isPopular: false,
    isFavorite: false,
    description: 'Experiencing a very 18+ non-kosher Weekend in Amsterdam with Jolijn while fighting for my life.'
  },
  {
    id: 'vacation-2022-amsterdam-23',
    title: 'Amsterdam',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '23 March 2022',
    duration: '—',
    url: 'https://youtu.be/zgEzFUI_VD4?si=xYoBh_Rg71qwuKyl',
    year: 2022,
    isPopular: false,
    isFavorite: false,
    description: 'Day trip to Amsterdam to celebrate our second year anniversary.'
  },
  {
    id: 'mixed-2022-amsterdam-light-festival-24',
    title: 'Amsterdam Light Festival',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '19 January 2022',
    duration: '—',
    url: 'https://youtu.be/m-qMVXKfipw?si=hmMNz_lzvr47V5UF',
    year: 2022,
    isPopular: false,
    isFavorite: false,
    categories: ["event"],
    description: 'Going with the gang to Amsterdam to see some pretty lights outside, because there is nothing else to do during the lockdown.'
  },
  {
    id: 'mixed-2022-dutch-design-week-20',
    title: 'Dutch Design Week',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '25 October 2022',
    duration: '—',
    url: 'https://youtu.be/JNiOaiotqxo?si=RuGVO_2HHahhTYMJ',
    year: 2022,
    isPopular: false,
    isFavorite: false,
    categories: ["event"],
    description: 'Together with Antonina and Nayden we went to Eindhoven in order to visit the Dutch Design Week of 2023.'
  },
  {
    id: 'mixed-2022-first-weekend-of-septembe-22',
    title: 'First weekend of September',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '3 September 2022',
    duration: '—',
    url: 'https://youtu.be/ewCQBQf_NRw?si=EnWEYm5wD1ASQ3E6',
    year: 2022,
    isPopular: false,
    isFavorite: false,
    categories: ["event"],
    description: 'Marko, Anastasiia and her friend come to The Hague to spend some time at the beach with us.'
  },
  {
    id: 'mixed-2022-nxt-museum-21',
    title: 'NXT Museum',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '24 September 2022',
    duration: '—',
    url: 'https://youtu.be/6MFOjJiqsbY?si=Uqil-p5ZKtgltLeM',
    year: 2022,
    isPopular: false,
    isFavorite: false,
    categories: ["event"],
    description: 'Julie, Ananya, Karol, Chiini, Demi explore a large scale multi-sensory exhibition.'
  },
  {
    id: 'vacation-2022-new-orleans-21',
    title: 'New Orleans',
    countryCode: 'us',
    countryName: 'Verenigde Staten',
    dateRange: '14 May 2022 - 27 May 2022',
    duration: '—',
    url: 'https://youtu.be/xdd8lB1PPHg?si=AJgxkxFAQlgDufOg',
    year: 2022,
    isPopular: false,
    isFavorite: false,
    description: 'Work conference for my mom, daydrinking for me. Flying to the USA to experience the humidity of the swamps in Louisiana while partying on Bourbon Street.'
  },
  {
    id: 'vacation-2022-paris-22',
    title: 'Paris',
    countryCode: 'fr',
    countryName: 'Frankrijk',
    dateRange: '11 April 2022 - 13 April 2022',
    duration: '—',
    url: 'https://youtu.be/qyhA6QeuDgU?si=uq6BjMPVkCgeiswj',
    year: 2022,
    isPopular: false,
    isFavorite: false,
    description: 'Aleks\' birthday gift vacation to go to Paris got moved to April due to COVID regulations in December.'
  },
  {
    id: 'mixed-2022-suze-emma-funeral-23',
    title: 'Suze Emma Funeral',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '20 June 2022',
    duration: '—',
    url: 'https://youtu.be/dIONTkAVm0A?si=xQgQRuHyCPbv9uN9',
    year: 2022,
    isPopular: false,
    isFavorite: false,
    categories: ["event"],
    description: 'This video is a tribute to my grandmother\'s remarkable life in Indonesia and The Netherlands. May she rest in piece.'
  },
  {
    id: 'vacation-2021-antwerpen-24',
    title: 'Antwerpen',
    countryCode: 'be',
    countryName: 'België',
    dateRange: '28 December 2021',
    duration: '—',
    url: 'https://youtu.be/y1yaXv2grqo?si=7ZavVvI2J6-rxvXt',
    year: 2021,
    isPopular: false,
    isFavorite: false,
    description: 'Going to Belgium with Melinde to avoid the COVID lockdowns in The Netherlands.'
  },
  {
    id: 'mixed-2021-birthday-vlog-25',
    title: 'Birthday vlog',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '24 November 2021',
    duration: '—',
    url: 'https://youtu.be/ZJSfW9THw9Y?si=_KfMKnCx_COHBRVZ',
    year: 2021,
    isPopular: false,
    isFavorite: false,
    categories: ["event"],
    description: 'Aleks\' 22nd birthday celebrated at van der Palmstraat and in the Mall of the Netherlands in Voorburg.'
  },
  {
    id: 'vacation-2021-bulgaria-25',
    title: 'Bulgaria',
    countryCode: 'bg',
    countryName: 'Bulgarije',
    dateRange: '2 August 2021 - 16 August 2021',
    duration: '—',
    url: 'https://youtu.be/Zbt_7kTFh_I?si=2e6v6SCMSCF_dz0U',
    year: 2021,
    isPopular: false,
    isFavorite: false,
    description: 'Second time visiting Bulgaria.'
  },
  {
    id: 'vacation-2021-italy-26',
    title: 'Italy',
    countryCode: 'it',
    countryName: 'Italië',
    dateRange: '18 July 2021 - 25 July 2021',
    duration: '—',
    url: 'https://youtu.be/DrjUMUB3Xa4?si=XxSLZTkLLfPrSbE8',
    year: 2021,
    isPopular: false,
    isFavorite: false,
    description: 'Vacation in Italy with my mom.'
  },
  {
    id: 'mixed-2021-painting-job-28',
    title: 'Painting Job',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '27 April 2021 - 29 April 2021',
    duration: '—',
    url: 'https://youtu.be/GdvmxydumiY?si=e5-jm40CUUl9ha2_',
    year: 2021,
    isPopular: false,
    isFavorite: false,
    categories: ["event"],
    description: 'Painting the walls of the new restaurant called Burgers & Bowls in Scheveningen.'
  },
  {
    id: 'mixed-2021-pi-a-colada-29',
    title: 'Piña Colada',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '1 March 2021',
    duration: '—',
    url: 'https://youtu.be/ALPCayF5fRY?si=WXxR8uhwKzO1KebR',
    year: 2021,
    isPopular: false,
    isFavorite: false,
    categories: ["event"],
    description: 'Making pina colada and cutting a beautiful pinapple from Sligro.'
  },
  {
    id: 'mixed-2021-sinterklaas-26',
    title: 'Sinterklaas',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '4 December 2021',
    duration: '—',
    url: 'https://youtu.be/lgjqMP0E4EA?si=dLZZ4xHXzoFky1c8',
    year: 2021,
    isPopular: false,
    isFavorite: false,
    categories: ["event"],
    description: 'Several people from the bachelor studies come together in December to celebrate Sinterklaas by doing Secret Santa.'
  },
  {
    id: 'mixed-2021-snappy-the-turtle-27',
    title: 'Snappy the Turtle',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '18 June 2021',
    duration: '—',
    url: 'https://youtu.be/w5RW-e8lJxQ?si=EyvnTzDwRSx0WPDz',
    year: 2021,
    isPopular: false,
    isFavorite: false,
    categories: ["event"],
    description: 'For the course HCI in the bachelor User Experience Design we needed to create a robot with Arduino. My final project was this artificial creature called Snappy.'
  },
  {
    id: 'mixed-2021-the-hague-30',
    title: 'The Hague',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '21 January 2021',
    duration: '—',
    url: 'https://youtu.be/lGGKEgFerAk?si=EKgF7At2dZqHUPSe',
    year: 2021,
    isPopular: false,
    isFavorite: false,
    categories: ["event"],
    description: 'Random scenery of The Hague in the height of the pandemic.'
  },
  {
    id: 'vacation-2021-utrecht-27',
    title: 'Utrecht',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '17 July 2021',
    duration: '—',
    url: 'https://youtu.be/ki-C8NdkvTo?si=8FZ-O2BNrMt-8t9n',
    year: 2021,
    isPopular: false,
    isFavorite: false,
    description: 'Visiting Utrecht with Aleks and Ines.'
  },
  {
    id: 'vacation-2021-volendam-28',
    title: 'Volendam',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '25 June 2021 - 26 June 2021',
    duration: '—',
    url: 'https://youtu.be/L0vmB5VaW2k?si=qqhdrTdf20vgRciw',
    year: 2021,
    isPopular: false,
    isFavorite: false,
    description: 'Jolijn and Daphne are doing stupid stuff in Noord-Holland.'
  },
  {
    id: 'mixed-2021-winter-31',
    title: 'Winter',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '17 January 2021',
    duration: '—',
    url: 'https://youtu.be/z52b31sw_2A?si=a-KtcefFRUux9uVd',
    year: 2021,
    isPopular: false,
    isFavorite: false,
    categories: ["event"],
    description: 'Winter vlog.'
  },
  {
    id: 'vacation-2020-berlin-31',
    title: 'Berlin',
    countryCode: 'de',
    countryName: 'Duitsland',
    dateRange: '26 February 2020 - 1 March 2020',
    duration: '—',
    url: 'https://youtu.be/ysp_mOF-TRU?si=NWtpC1NfvbHPPU-c',
    year: 2020,
    isPopular: false,
    isFavorite: false,
    description: 'Girls trip to Germany.'
  },
  {
    id: 'vacation-2020-bulgaria-30',
    title: 'Bulgaria',
    countryCode: 'bg',
    countryName: 'Bulgarije',
    dateRange: '24 July 2020 - 07 August 2020',
    duration: '—',
    url: 'https://youtu.be/nTUFx7xcczA?si=RZ43ZM2eZosgiO92',
    year: 2020,
    isPopular: false,
    isFavorite: false,
    description: 'First time visiting Aleks\' family in Bulgaria. Continuing on a road trip through the country with Aleksandra, Aleksandar en Marko.'
  },
  {
    id: 'vacation-2020-italy-29',
    title: 'Italy',
    countryCode: 'it',
    countryName: 'Italië',
    dateRange: '3 July 2020 - 10 July 2020',
    duration: '—',
    url: 'https://youtu.be/LHvTSgtCz50?si=KyucGIU5CJgiGNgg',
    year: 2020,
    isPopular: false,
    isFavorite: false,
    description: 'Vacation to Puglia in Italy together with my mom.'
  },
  {
    id: 'mixed-2020-madurodam-35',
    title: 'Madurodam',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '2020',
    duration: '—',
    url: 'https://youtu.be/kDPBhf5F5nw?si=UOJddcIUyMttJ43V',
    year: 2020,
    isPopular: false,
    isFavorite: false,
    categories: ["event"]
  },
  {
    id: 'mixed-2020-t-h-e-g-u-y-s-32',
    title: 'T•H•E•G•U•Y•S',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '4 May 2020',
    duration: '—',
    url: 'https://youtu.be/KBfaQ_SeAbo?si=U1MbkuusG4f93CL_',
    year: 2020,
    isPopular: false,
    isFavorite: false,
    categories: ["event"],
    description: 'Friends intro for Brynja, Smaranda and I, meant soley for comedic purposes.'
  },
  {
    id: 'vacation-2019-lloret-de-mar-32',
    title: 'Lloret de Mar',
    countryCode: 'es',
    countryName: 'Spanje',
    dateRange: '23 August 2019 - 30 August 2019',
    duration: '—',
    url: 'https://youtu.be/EWLgtlD83UQ?si=WweIGeTfPdcwbHCh',
    year: 2019,
    isPopular: false,
    isFavorite: false,
    description: 'Chrissy, Darius, Jeffrey, Jeroen, Jesse, Kirsten, Lucas, Magdy, Mathijs, Quentin, Ravin, Tomasz and I go to Spain, and it goes about how you\'d expect it to go.'
  },
  {
    id: 'mixed-2019-s-4-2-0-33',
    title: 'S•4•2•0',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '2 April 2019',
    duration: '—',
    url: 'https://youtu.be/x1v9zsVhceY?si=rAp7z3xuYfYnw0ee',
    year: 2019,
    isPopular: false,
    isFavorite: false,
    categories: ["event"],
    description: 'A funny spin on the Friends intro song with my friend group.'
  },
  {
    id: 'mixed-2017-dead-riding-hood-34',
    title: 'Dead Riding Hood',
    countryCode: 'nl',
    countryName: 'Nederland',
    dateRange: '21 February 2017',
    duration: '—',
    url: 'https://youtu.be/eDxN-eC7Adk?si=WRR8SiX6LGV2g3na',
    year: 2017,
    isPopular: false,
    isFavorite: false,
    categories: ["event"],
    description: 'For a high school assignment I had to adapt a known fairytale into something different. In my horror version of Red Riding Hood the hunter collaborates with the wolf to murder the little girl.'
  },
  {
    id: 'vacation-2015-austria-33',
    title: 'Austria',
    countryCode: 'at',
    countryName: 'Oostenrijk',
    dateRange: '2015',
    duration: '—',
    url: 'https://youtu.be/WhIIeU30Y4U?si=sNtQtb2RYED38_Mc',
    year: 2015,
    isPopular: false,
    isFavorite: false,
    description: 'Ski trip with the high school Hofstad Lyceum in the Stubaier Gletcher, Austria.'
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
          <p class="info-modal-description" id="info-description"></p>
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
  const descriptionEl = infoModal.querySelector('#info-description');
  
  if (titleEl) titleEl.textContent = vlog.title;
  if (subtitleEl) subtitleEl.textContent = `${vlog.countryName || ''}${vlog.dateRange ? ` · ${vlog.dateRange}` : ''}`;
  if (durationEl) durationEl.textContent = formatDurationToHms(vlog.duration) || '—';
  if (yearEl) yearEl.textContent = vlog.year || '—';
  if (countryEl) countryEl.textContent = vlog.countryName || '—';
  if (descriptionEl) {
    descriptionEl.textContent = vlog.description || '';
    descriptionEl.style.display = vlog.description ? '' : 'none';
  }
  
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
