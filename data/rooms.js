window.CLUEDLE_DATA = window.CLUEDLE_DATA || {};
window.CLUEDLE_DATA.rooms = [
  {
    "id": "art_vault",
    "name": "Art Vault",
    "image": "assets/rooms/art_vault.jpg",
    "traits": [
      "medium",
      "vault door",
      "artwork",
      "no windows",
      "stone",
      "cold lighting",
      "minimal",
      "security",
      "luxury finish",
      "secluded"
    ]
  },
  {
    "id": "billiard_room",
    "name": "Billiard Room",
    "image": "assets/rooms/billiard_room.jpg",
    "traits": [
      "large",
      "carpet",
      "artwork",
      "seating",
      "no windows",
      "classic style",
      "low lighting",
      "entertainment",
      "luxury finish"
    ]
  },
  {
    "id": "chefs_table",
    "name": "Chef’s Table",
    "image": "assets/rooms/chefs_table.jpg",
    "traits": [
      "medium",
      "dining",
      "rug",
      "no windows",
      "low lighting",
      "modern",
      "luxury finish"
    ]
  },
  {
    "id": "cinema_room",
    "name": "Cinema Room",
    "image": "assets/rooms/cinema.jpg",
    "traits": [
      "screen",
      "seating",
      "rug",
      "no windows",
      "low lighting",
      "strip lighting",
      "modern",
      "entertainment",
      "soundproofed"
    ]
  },
  {
    "id": "dressing_room",
    "name": "Dressing Room",
    "image": "assets/rooms/dressing.jpg",
    "traits": [
      "medium",
      "mirrors",
      "seating",
      "rug",
      "no windows",
      "strip lighting",
      "low lighting",
      "luxury finish"
    ]
  },
  {
    "id": "glass_lift",
    "name": "Glass Lift",
    "image": "assets/rooms/lift.jpg",
    "traits": [
      "small",
      "glass walls",
      "metal",
      "strip lighting",
      "all floors",
      "transparent",
      "modern",
      "elevated"
    ]
  },
  {
    "id": "home_gym",
    "name": "Home Gym",
    "image": "assets/rooms/gym.jpg",
    "traits": [
      "medium",
      "mirrors",
      "screen",
      "fitness",
      "no windows",
      "strip lighting",
      "modern",
      "technology"
    ]
  },
  {
    "id": "indoor_pool",
    "name": "Indoor Pool",
    "image": "assets/rooms/pool.jpg",
    "traits": [
      "large",
      "water",
      "mirrors",
      "plants",
      "windows",
      "strip lighting",
      "modern",
      "wellness",
      "luxury finish"
    ]
  },
  {
    "id": "library",
    "name": "Library",
    "image": "assets/rooms/library.jpg",
    "traits": [
      "large",
      "classic style",
      "seating",
      "rug",
      "windows",
      "low lighting",
      "wood",
      "luxury finish"
    ]
  },
  {
    "id": "meditation_suite",
    "name": "Meditation Suite",
    "image": "assets/rooms/med-suite.jpg",
    "traits": [
      "medium",
      "wood",
      "plants",
      "outdoor",
      "open plan",
      "wellness",
      "natural light",
      "calm"
    ]
  },
  {
    "id": "observatory",
    "name": "Observatory",
    "image": "assets/rooms/observ.jpg",
    "traits": [
      "glass walls",
      "windows",
      "carpet",
      "seating",
      "modern",
      "elevated",
      "open plan"
    ]
  },
  {
    "id": "panic_room",
    "name": "Panic Room",
    "image": "assets/rooms/panic.jpg",
    "traits": [
      "small",
      "vault door",
      "concrete",
      "screen",
      "no windows",
      "soundproofed",
      "strip lighting",
      "security",
      "secluded"
    ]
  },
  {
    "id": "podcast_studio",
    "name": "Podcast Studio",
    "image": "assets/rooms/podstudio.jpg",
    "traits": [
      "small",
      "seating",
      "carpet",
      "screen",
      "soundproofed",
      "low lighting",
      "strip lighting",
      "technology",
      "entertainment"
    ]
  },
  {
    "id": "rooftop_terrace",
    "name": "Rooftop Terrace",
    "image": "assets/rooms/fooftop.jpg",
    "traits": [
      "outdoor",
      "glass walls",
      "plants",
      "seating",
      "wood",
      "fire",
      "windows",
      "strip lighting",
      "elevated",
      "luxury finish"
    ]
  },
  {
    "id": "smart_kitchen",
    "name": "Smart Kitchen",
    "image": "assets/rooms/kitchen.jpg",
    "traits": [
      "large",
      "open plan",
      "screen",
      "sink",
      "dining",
      "windows",
      "strip lighting",
      "modern",
      "technology",
      "luxury finish"
    ]
  },
  {
    "id": "wine_cellar",
    "name": "Wine Cellar",
    "image": "assets/rooms/wine_cellar.jpg",
    "traits": [
      "stone",
      "underground",
      "vault door",
      "storage",
      "no windows",
      "security",
      "cold lighting",
      "secluded"
    ]
  }
];

window.CLUEDLE_DATA.roomTraitMatrix = {
  "modern": {
    "frequency": 10,
    "tier": "common",
    "value": 1
  },
  "seating": {
    "frequency": 9,
    "tier": "common",
    "value": 1
  },
  "luxury finish": {
    "frequency": 8,
    "tier": "common",
    "value": 2
  },
  "low lighting": {
    "frequency": 7,
    "tier": "common",
    "value": 2
  },
  "technology": {
    "frequency": 7,
    "tier": "common",
    "value": 2
  },
  "windows": {
    "frequency": 6,
    "tier": "common",
    "value": 2
  },
  "screen": {
    "frequency": 6,
    "tier": "common",
    "value": 2
  },
  "strip lighting": {
    "frequency": 5,
    "tier": "uncommon",
    "value": 4
  },
  "rug": {
    "frequency": 5,
    "tier": "uncommon",
    "value": 4
  },
  "mirrors": {
    "frequency": 4,
    "tier": "uncommon",
    "value": 4
  },
  "plants": {
    "frequency": 4,
    "tier": "uncommon",
    "value": 4
  },
  "glass walls": {
    "frequency": 4,
    "tier": "uncommon",
    "value": 4
  },
  "no windows": {
    "frequency": 4,
    "tier": "uncommon",
    "value": 4
  },
  "entertainment": {
    "frequency": 4,
    "tier": "uncommon",
    "value": 4
  },
  "dining": {
    "frequency": 3,
    "tier": "uncommon",
    "value": 5
  },
  "soundproofed": {
    "frequency": 3,
    "tier": "uncommon",
    "value": 5
  },
  "security": {
    "frequency": 3,
    "tier": "uncommon",
    "value": 5
  },
  "wellness": {
    "frequency": 3,
    "tier": "uncommon",
    "value": 5
  },
  "outdoor": {
    "frequency": 2,
    "tier": "rare",
    "value": 7
  },
  "vault door": {
    "frequency": 2,
    "tier": "rare",
    "value": 7
  },
  "water": {
    "frequency": 2,
    "tier": "rare",
    "value": 7
  },
  "storage": {
    "frequency": 2,
    "tier": "rare",
    "value": 7
  },
  "fitness": {
    "frequency": 2,
    "tier": "rare",
    "value": 7
  },
  "stone": {
    "frequency": 2,
    "tier": "rare",
    "value": 7
  },
  "underground": {
    "frequency": 2,
    "tier": "rare",
    "value": 7
  },
  "concrete": {
    "frequency": 2,
    "tier": "rare",
    "value": 7
  },
  "elevated": {
    "frequency": 2,
    "tier": "rare",
    "value": 7
  },
  "wood": {
    "frequency": 2,
    "tier": "rare",
    "value": 7
  },
  "secluded": {
    "frequency": 2,
    "tier": "rare",
    "value": 7
  }
};

