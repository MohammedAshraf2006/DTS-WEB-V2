/**
 * Featured clients catalog (identifiers + media only).
 * Copy lives in locales/clients.json under items.{key}.
 * hasStory is reserved — story pages ship later when copy exists.
 */
export const CLIENT_KEYS = [
  'hellmann',
  'bue',
  'orientalWeavers',
  'ykk',
  'savco',
  'nilePharma',
  'deltaFoods',
  'cairoSteel',
  'redSeaHotels',
  'misrTextiles',
  'deltaCement',
  'alexandriaPorts',
  'gizaRetail',
  'nileDairy',
  'horizonPack',
  'oasisFarms',
  'atlasAuto',
  'deltaPrint',
  'cairoGlass',
  'lotusCosmetics',
  'pyramidBuild',
  'nileLogistics',
  'sunriseMalls',
  'deltaChem',
  'cairoPaper',
  'emeraldFoods',
  'saharaMining',
  'nileElectronics',
  'deltaFurniture',
  'cairoHealth'
]

export const clientsCatalog = {
  hellmann: {
    key: 'hellmann',
    logo: '/images/clients/1.webp',
    url: '',
    placeholder: false,
    hasStory: false
  },
  bue: {
    key: 'bue',
    logo: '/images/clients/2.webp',
    url: 'https://www.bue.edu.eg',
    placeholder: false,
    hasStory: false
  },
  orientalWeavers: {
    key: 'orientalWeavers',
    logo: '/images/clients/3.webp',
    url: 'https://orientalweavers.com',
    placeholder: false,
    hasStory: false
  },
  ykk: {
    key: 'ykk',
    logo: '/images/clients/4.webp',
    url: 'https://www.ykk.com',
    placeholder: false,
    hasStory: false
  },
  savco: {
    key: 'savco',
    logo: '/images/clients/5.webp',
    url: 'https://savco-eg.com',
    placeholder: false,
    hasStory: false
  },
  nilePharma: { key: 'nilePharma', logo: '', url: '', placeholder: true, hasStory: false },
  deltaFoods: { key: 'deltaFoods', logo: '', url: '', placeholder: true, hasStory: false },
  cairoSteel: { key: 'cairoSteel', logo: '', url: '', placeholder: true, hasStory: false },
  redSeaHotels: { key: 'redSeaHotels', logo: '', url: '', placeholder: true, hasStory: false },
  misrTextiles: { key: 'misrTextiles', logo: '', url: '', placeholder: true, hasStory: false },
  deltaCement: { key: 'deltaCement', logo: '', url: '', placeholder: true, hasStory: false },
  alexandriaPorts: { key: 'alexandriaPorts', logo: '', url: '', placeholder: true, hasStory: false },
  gizaRetail: { key: 'gizaRetail', logo: '', url: '', placeholder: true, hasStory: false },
  nileDairy: { key: 'nileDairy', logo: '', url: '', placeholder: true, hasStory: false },
  horizonPack: { key: 'horizonPack', logo: '', url: '', placeholder: true, hasStory: false },
  oasisFarms: { key: 'oasisFarms', logo: '', url: '', placeholder: true, hasStory: false },
  atlasAuto: { key: 'atlasAuto', logo: '', url: '', placeholder: true, hasStory: false },
  deltaPrint: { key: 'deltaPrint', logo: '', url: '', placeholder: true, hasStory: false },
  cairoGlass: { key: 'cairoGlass', logo: '', url: '', placeholder: true, hasStory: false },
  lotusCosmetics: { key: 'lotusCosmetics', logo: '', url: '', placeholder: true, hasStory: false },
  pyramidBuild: { key: 'pyramidBuild', logo: '', url: '', placeholder: true, hasStory: false },
  nileLogistics: { key: 'nileLogistics', logo: '', url: '', placeholder: true, hasStory: false },
  sunriseMalls: { key: 'sunriseMalls', logo: '', url: '', placeholder: true, hasStory: false },
  deltaChem: { key: 'deltaChem', logo: '', url: '', placeholder: true, hasStory: false },
  cairoPaper: { key: 'cairoPaper', logo: '', url: '', placeholder: true, hasStory: false },
  emeraldFoods: { key: 'emeraldFoods', logo: '', url: '', placeholder: true, hasStory: false },
  saharaMining: { key: 'saharaMining', logo: '', url: '', placeholder: true, hasStory: false },
  nileElectronics: { key: 'nileElectronics', logo: '', url: '', placeholder: true, hasStory: false },
  deltaFurniture: { key: 'deltaFurniture', logo: '', url: '', placeholder: true, hasStory: false },
  cairoHealth: { key: 'cairoHealth', logo: '', url: '', placeholder: true, hasStory: false }
}

export function getClientsList() {
  return CLIENT_KEYS.map((key) => clientsCatalog[key])
}

export function getTrustBarClients() {
  return getClientsList().filter((client) => !client.placeholder)
}
