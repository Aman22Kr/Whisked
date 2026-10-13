// ───────── Mock catalogue ─────────
// Pretty-cake names/prices were read from the reference collection page.
// Everything else (other collections, descriptions, eggless flags, reviews) is SAMPLE DATA.
import { hash, slugify } from '../utils/format';

const REF = 'https://whipped.in/cdn/shop/files/';
export const IMG = {
  heroCustom: REF + 'custom-desktop_1400x.webp?v=1723478854',
  heroPretty: REF + 'Pretty-cakes-desktop_1400x.webp?v=1723478930',
  cupcakes: REF + 'cakepops_400x.jpg?v=1712855132',
  flowers: REF + 'Singlerose_400x.jpg?v=1707239238',
  whiteSymphony: [
    REF + 'WhatsAppImage2026-03-29at2_1800x1800.png?v=1774804703',
    REF + 'WhatsAppImage2026-03-29at2.34.34PM_1800x1800.png?v=1774804705',
  ],
};

export const WEIGHTS = [
  { label: '0.5 Kg', mult: 1 }, { label: '1 Kg', mult: 1.625 }, { label: '1.5 Kg', mult: 2.625 },
  { label: '2 Kg', mult: 3.25 }, { label: '3 Kg', mult: 4.875 }, { label: '5 Kg', mult: 8.125 },
];
export const FLAVOURS = [
  'Milk Chocolate Truffle (40% Cocoa)', 'Chocolate Truffle (55% Cocoa)', 'Fresh Fruit Gateau', 'Mixed Berry n Cream',
  'Butterscotch', 'Chocolate Rum', 'Kahlua Truffle', 'Death By Chocolate',
];
const CHEESE_FLAVOURS = ['Classic Baked', 'Blueberry', 'Biscoff', 'Nutella', 'Mango'];

export const COLLECTIONS = [
  ['pretty-cakes', 'Pretty Cakes'], ['designer-cake', 'Designer Cakes'], ['ice-cream-cakes', 'Ice Cream Cakes'], ['sugar-free-cakes', 'Sugar Free Cakes'],
  ['eggless', 'Eggless Cakes'], ['mousse-cakes', 'Mousse Cakes'], ['gluten-free-cakes', 'Gluten Free Cakes'], ['personalized-cakes', 'Photo Cakes'],
  ['multi-tier-cakes', 'Two and Three Tier Cakes'], ['cheesecakes', 'Cheesecakes'], ['cheesecake', 'Cheesecakes'], ['eggless-cheesecake', 'Eggless Cheesecakes'],
  ['gluten-free-cheesecake', 'Gluten Free Cheesecakes'], ['sugar-free-cheesecakes', 'Sugar Free Cheesecakes'], ['chocolate-cakes', 'Chocolate Cakes'],
  ['fruit-cakes', 'Fresh Fruit Cakes'], ['mango-flavour', 'Mango Cakes'], ['butterscotch', 'Butterscotch Cakes'], ['red-valvet', 'Red Velvet Cakes'],
  ['strawberry-blueberry-flavour', 'Strawberry & Blueberry Cakes'], ['salted-caramal', 'Salted Caramel Cakes'], ['tea-dry-cakes', 'Tea & Dry Cakes'],
  ['nutella', 'Nutella Cakes'], ['baileys', 'Baileys Cakes'], ['biscoff', 'Biscoff Cakes'], ['lemon-tangy', 'Lemon & Tangy Cakes'], ['all-flavours', 'All Flavours'],
  ['cakes-under-1000', 'Cakes Under ₹1000'], ['cakes-under-1500', 'Cakes Under ₹1500'], ['cakes-1500-to-2500', 'Cakes ₹1500 to ₹2500'], ['cakes-2500-above', 'Cakes ₹2500 & Above'],
  ['rakhi-collection', 'Raksha Bandhan Cakes'], ['birthday', 'Birthday Cakes'], ['anniversary', 'Anniversary Cakes'], ['wedding', 'Wedding Cakes'],
  ['baby-shower', 'Baby Shower'], ['just-love', 'Just Love'], ['house-party', 'House Party'], ['kids', 'Kids / Comic'], ['view-all', 'View All Designs'],
  ['party-bowls', 'Party Bowls'], ['cupcakes-n-more', 'Cupcakes & More'], ['cupcakes', 'Cupcakes'], ['cake-a-boo', 'Cake Pops'], ['brownies', 'Brownies'],
  ['tarts', 'Tarts'], ['tarts-1', 'Tarts'], ['slices', 'Slices'], ['jakes-cakes-in-a-jar', 'Jakes (Cake in a jar)'], ['ice-cream-tubs', 'Ice Cream Tubs'],
  ['bento-cakes', 'Bento Cakes'], ['diwali-gift-boxes', 'Gift Boxes'],
  ['flowers', 'Flowers & Candles'], ['bunches', 'Bunches'], ['flower-boxes', 'Flower Boxes'], ['combos', 'Combos'], ['scented-candles', 'Scented Candles'],
].map(([slug, title]) => ({ slug, title }));

// [slug, name, 0.5kg price]  – from the reference "Pretty cakes" listing
const PRETTY = `designer-cake|Customize Your Cake|4499
white-symphony|White Symphony|1600
frosted-hug|Frosted Hug|1800
lavender-garden|Lavender Garden|1800
pearl-dream|Pearl Dream|1800
mini-pink-butterfly|Mini Pink Butterfly|1600
confetti-dreams|Confetti Dreams|1600
olaf-s-tulip-wish-cake|Olaf's Tulip Wish Cake|2800
waves-cake|Waves Cake|1800
sunset-cake|Sunset Cake|1800
jasmine-cake|Jasmine Cake|1600
rainbow-cake|Rainbow Cake|1800
brushstroke-cake|Brush Stroke Cake|1800
sunflower-cake|Sunflower Cake|1800
heart-birthday-cakes|Heart and Hearts Cake|1800
love-in-the-air-cake|Love In The Air Cake|1600
pop-cake-3|Pop Cake 3|1600
big-heart-cake|Big Heart Cake|1600
ombre-coco|Ombre Coco|1800
heart-confetti-cake|Heart Confetti Cake|1800
flower-cake|Flower Cake|1800
good-day-cake|Rose Quartz Cake|1800
glory-cake|Glory Cake|1800
peachy-cake|Peach Blossom|1600
drizzly-cake|Drizzly Cake|1600
polka-heart-cake|Polka Heart Cake|1800
lily-cake|Lily Cake|1800
paris-birthday-cake|Paris Cake|1800
literally-a-heart-cake|Literally A Heart Cake|1800
monet-cake-1|Monet Cake|1800
rosy-cake|Rosy Cake|1800
bad-day-cake|Bad Day Cake|1600
always-cake|Pink Of My Heart|1600
drippy-cake|Drippy Cake|1600
delicate-cake|Periwinkle Cake|1600
ombre-cake|Ombre Pink|1800
cherry-cake|Cherry Cake|1600
solid-love-cake|Solid Love Cake|1800
rang-cake|Mellow Cake|1800
cherry-on-top-cake|Cherry On Top Cake 2|1600
fathers-day-cake-3|Big Mustache Cake|1600
dad-tik-tak-blue-cake|Tic Dad Toe (Blue)|1600
coco-hearts-cake|Coco Hearts Cake|1600
twirly-cake|Twirly Cake|1800
hearts-on-heart-cake|Mi Amor Cake|1600
for-you-cake|For You Cake|1600
crimson-cake|Crimson Cake|1800
pastel-cake|Beige Bliss Cake|1600
grace-cake|Grace Cake|1600
starry-cake|Starry Cake|2500
xoxo-cake|Xoxo Cake|3000
sprinkles-cake|Sprinkles Cake|3000
or-rio-cake|Or-rio Cake|5390
garden-cake|Bed of Roses|4199
harmony-cake|Harmony Cake|1600
daisy-cake|Daisy Cake|1800
halloween-cake-2|Perky Pumpkin Cake|2700
eye-i-cake|Eye-i Cake|1800
cutemares-cake|Cutemares Cake|1800
casper-cake|Casper Cake|1800
azure-butterfly|Azure Butterfly Cake|3000
pink-butterfly-cake|Pink Butterfly Cake|3000
half-a-bear-cake|Half a Bear Cake|4199
potpourri-cake|Potpourri Cake|3000
slay-cat-cake|Slay Cat Cake|4100
elegance-cake|Florescence Cake|4199
frame-101-cake|Oreo Cloud Cake|3000
dream-white-ccake|Ivory Dream Cake|8999
copy-of-pearl-butterfly-cake|Pearl & Rose Cake|3300
frogo-cake|Frogo Cake|4199
2-tier-fresh-fruit-cake|2 Tier Fresh Fruit Cake|8999
mercedes-benz-cake|Mercedes Benz Cake|5390
dc-marvel-theme-cake|DC Marvel Theme Cake|3300
avengers-cake|Avengers Cake|5390
winnie-the-pooh-cake|Winnie The Pooh Cake|4199
lilac-butterflies-cake|Lilac Flutter Cake|3000
wedding-cake|Wedding Cake|5999
macaroons-cake|Macaron Magic Cake|3300
bmw-cake|BMW Cake|5390
spider-man-cake|Spider-Man Cake|3500
piggy-cake|Piggy Cake|4199
peach-love-cake|Peach Love Cake|8999
unicorn-cake|Unicorn Cake|5390
cone-cake|Cone On Top Cake|3000
carnations-cake|Chocolate 'n Roses Cake|3000
candy-shop-cake|Candy Shop Cake|3500
bunnies-cake|Bunnies Cake|5390
beer-cheer-cake|Beer Cheer Cake|4599
queen-of-night|Queen of Night|4500
love-drops|Love Drops|900
triple-heart|Triple Hearts|1800
sweetheart|Sweetheart|900
pearl-pop|Pearl Pop|1900
2-tier-ferrari-cake-1|2 Tier Ferrari Cake|11999
bunny-cake|Bunny Cake|4199
melt-my-heart|Melt My Heart|1600
gabbys-dream-house-cake|Gabby's DollHouse Cake|9900
pink-cake|Pink Cake|1600
blush-cake-1|Blush Cake|1600
aqua-cake|Aqua Cake|1600
midnight-gold|Midnight Gold|2700
dark-desire|Dark Desire 2|2800`.split('\n').map((l) => l.split('|')).map(([slug, name, base]) => ({ slug, name, base: +base }));

const has = (n, words) => words.some((w) => n.toLowerCase().includes(w));

function prettyTags(name, base) {
  const t = ['pretty-cakes', 'designer-cake', 'view-all', 'birthday', 'all-flavours', 'personalized-cakes'];
  if (name.startsWith('Customize')) return t;
  if (has(name, ['heart', 'love', 'rose', 'xoxo', 'amor', 'sweet', 'crimson', 'blush', 'desire'])) t.push('just-love', 'anniversary');
  if (has(name, ['olaf', 'spider', 'avengers', 'winnie', 'unicorn', 'bunny', 'bunnies', 'superman', 'gabby', 'casper', 'frogo', 'piggy', 'marvel', 'half a bear', 'slay cat', 'cutemares', 'rainbow', 'mustache', 'dad'])) t.push('kids');
  if (has(name, ['wedding', 'ivory', 'pearl', 'white symphony', 'grace'])) t.push('wedding');
  if (has(name, ['pastel', 'beige', 'lavender', 'lilac', 'periwinkle', 'azure', 'butterfly', 'pearl', 'aqua', 'pink'])) t.push('baby-shower');
  if (has(name, ['pop', 'candy', 'beer', 'confetti', 'cone', 'sprinkles', 'party'])) t.push('house-party');
  if (has(name, ['2 tier', 'ivory', 'peach love', 'wedding'])) t.push('multi-tier-cakes');
  if (has(name, ['dad', 'mustache', 'sweetheart', 'love drops'])) t.push('rakhi-collection');
  return t;
}

// [name, 0.5kg price, kind, collection tags]  – SAMPLE products for other collections
const SAMPLE = [
  ['Midnight Chocolate Truffle', 1200, 'cake', ['chocolate-cakes', 'birthday', 'all-flavours']],
  ['Dark Ganache Dream', 1400, 'cake', ['chocolate-cakes', 'anniversary', 'all-flavours']],
  ['Double Choco Crunch', 1500, 'cake', ['chocolate-cakes', 'kids', 'all-flavours']],
  ['Fresh Fruit Gateau', 1300, 'cake', ['fruit-cakes', 'birthday', 'all-flavours']],
  ['Orchard Harvest Cake', 1500, 'cake', ['fruit-cakes', 'baby-shower', 'all-flavours']],
  ['Alphonso Mango Bliss', 1400, 'cake', ['mango-flavour', 'birthday', 'all-flavours']],
  ['Mango Cream Cloud', 1300, 'cake', ['mango-flavour', 'house-party', 'all-flavours']],
  ['Classic Butterscotch Crunch', 900, 'cake', ['butterscotch', 'birthday', 'all-flavours']],
  ['Caramel Praline Butterscotch', 1200, 'cake', ['butterscotch', 'kids', 'all-flavours']],
  ['Red Velvet Cream Cheese', 1300, 'cake', ['red-valvet', 'anniversary', 'just-love', 'all-flavours']],
  ['Velvet Rose Cake', 1500, 'cake', ['red-valvet', 'just-love', 'all-flavours']],
  ['Strawberry Shortcake', 1100, 'cake', ['strawberry-blueberry-flavour', 'birthday', 'all-flavours']],
  ['Blueberry Cloud Cake', 1400, 'cake', ['strawberry-blueberry-flavour', 'baby-shower', 'all-flavours']],
  ['Salted Caramel Crunch', 1300, 'cake', ['salted-caramal', 'house-party', 'all-flavours']],
  ['Caramel Sea-Salt Cake', 1400, 'cake', ['salted-caramal', 'birthday', 'all-flavours']],
  ['Tea-Time Marble Loaf', 600, 'single', ['tea-dry-cakes']],
  ['Orange Almond Dry Cake', 650, 'single', ['tea-dry-cakes']],
  ['Walnut Banana Loaf', 700, 'single', ['tea-dry-cakes']],
  ['Nutella Overload', 1600, 'cake', ['nutella', 'birthday', 'kids', 'all-flavours']],
  ['Hazelnut Nutella Drip', 1800, 'cake', ['nutella', 'house-party', 'all-flavours']],
  ['Irish Cream Truffle', 1700, 'cake', ['baileys', 'anniversary', 'all-flavours']],
  ['Baileys Coffee Cake', 1800, 'cake', ['baileys', 'house-party', 'all-flavours']],
  ['Biscoff Biscuit Crumble', 1700, 'cake', ['biscoff', 'birthday', 'all-flavours']],
  ['Biscoff Caramel Drip', 1900, 'cake', ['biscoff', 'kids', 'all-flavours']],
  ['Lemon Tangy Drizzle', 1100, 'cake', ['lemon-tangy', 'baby-shower', 'all-flavours']],
  ['Lemon Blueberry Zest', 1300, 'cake', ['lemon-tangy', 'birthday', 'all-flavours']],
  ['Vanilla Ice Cream Cake', 1500, 'cake', ['ice-cream-cakes', 'kids', 'house-party']],
  ['Choco Chip Ice Cream Cake', 1600, 'cake', ['ice-cream-cakes', 'birthday']],
  ['Mango Ice Cream Cake', 1700, 'cake', ['ice-cream-cakes', 'mango-flavour']],
  ['Sugar-Free Chocolate Cake', 1500, 'cake', ['sugar-free-cakes', 'birthday']],
  ['Sugar-Free Dates & Nuts Cake', 1600, 'cake', ['sugar-free-cakes', 'anniversary']],
  ['Chocolate Mousse Cake', 1400, 'cake', ['mousse-cakes', 'birthday', 'anniversary']],
  ['Berry Mousse Cake', 1500, 'cake', ['mousse-cakes', 'baby-shower']],
  ['Gluten-Free Chocolate Cake', 1700, 'cake', ['gluten-free-cakes', 'birthday']],
  ['Gluten-Free Almond Cake', 1800, 'cake', ['gluten-free-cakes', 'anniversary']],
  ['Photo Print Cake', 1800, 'cake', ['personalized-cakes', 'birthday', 'anniversary']],
  ['Custom Photo Heart Cake', 2000, 'cake', ['personalized-cakes', 'just-love', 'anniversary']],
  ['Two-Tier Floral Cake', 6500, 'cake', ['multi-tier-cakes', 'wedding', 'designer-cake']],
  ['Three-Tier Celebration Cake', 9500, 'cake', ['multi-tier-cakes', 'wedding', 'designer-cake']],
  ['Classic Baked Cheesecake', 1300, 'cheesecake', ['cheesecakes', 'cheesecake']],
  ['Blueberry Cheesecake', 1400, 'cheesecake', ['cheesecakes', 'cheesecake', 'eggless-cheesecake']],
  ['Biscoff Cheesecake', 1600, 'cheesecake', ['cheesecakes', 'cheesecake', 'eggless-cheesecake']],
  ['Gluten-Free Lemon Cheesecake', 1700, 'cheesecake', ['cheesecakes', 'cheesecake', 'gluten-free-cheesecake']],
  ['Sugar-Free Berry Cheesecake', 1800, 'cheesecake', ['cheesecakes', 'cheesecake', 'sugar-free-cheesecakes']],
  ['Mini Heart Bento Cake', 650, 'single', ['bento-cakes', 'just-love', 'cakes-under-1000']],
  ['Lunchbox Bento Cake', 600, 'single', ['bento-cakes', 'birthday', 'cakes-under-1000']],
  ['Box of 6 Mini Cupcakes', 450, 'box', ['cupcakes', 'cupcakes-n-more', 'house-party']],
  ['Red Velvet Cupcakes (Box of 6)', 500, 'box', ['cupcakes', 'cupcakes-n-more', 'anniversary']],
  ['Chocolate Cake Pops (Box of 6)', 450, 'box', ['cake-a-boo', 'cupcakes-n-more', 'kids']],
  ['Sprinkle Cake Pops (Box of 12)', 800, 'box', ['cake-a-boo', 'cupcakes-n-more', 'baby-shower']],
  ['Fudgy Brownies (Box of 6)', 500, 'box', ['brownies', 'cupcakes-n-more', 'diwali-gift-boxes']],
  ['Walnut Brownies (Box of 9)', 700, 'box', ['brownies', 'cupcakes-n-more']],
  ['Chocolate Ganache Tarts (Box of 4)', 500, 'box', ['tarts', 'tarts-1', 'cupcakes-n-more']],
  ['Lemon Meringue Tarts (Box of 4)', 550, 'box', ['tarts', 'tarts-1', 'cupcakes-n-more']],
  ['Cake Slice – Chocolate Truffle', 220, 'single', ['slices', 'cupcakes-n-more']],
  ['Cake Slice – Red Velvet', 240, 'single', ['slices', 'cupcakes-n-more']],
  ['Dessert Jar – Tiramisu', 300, 'single', ['jakes-cakes-in-a-jar', 'cupcakes-n-more']],
  ['Dessert Jar – Chocolate Truffle', 280, 'single', ['jakes-cakes-in-a-jar', 'cupcakes-n-more']],
  ['Party Bowl – Brownie Bites', 1200, 'single', ['party-bowls', 'house-party']],
  ['Party Bowl – Cupcake Medley', 1500, 'single', ['party-bowls', 'house-party', 'kids']],
  ['Vanilla Bean Ice Cream Tub', 450, 'single', ['ice-cream-tubs']],
  ['Belgian Chocolate Ice Cream Tub', 520, 'single', ['ice-cream-tubs']],
  ['Festive Gift Box – Brownies & Cookies', 1100, 'single', ['diwali-gift-boxes', 'rakhi-collection']],
  ['Celebration Gift Hamper', 1800, 'single', ['diwali-gift-boxes', 'rakhi-collection']],
  ['Rakhi Special Chocolate Cake', 1400, 'cake', ['rakhi-collection', 'chocolate-cakes', 'birthday']],
  ['Baby Shower Pastel Cake', 1900, 'cake', ['baby-shower', 'birthday', 'designer-cake']],
  ['Kids Cartoon Cake', 1800, 'cake', ['kids', 'birthday', 'designer-cake']],
  ['Flowers & Cake Combo', 2200, 'single', ['combos', 'flowers', 'birthday', 'anniversary']],
  ['Cake & Candle Combo', 1600, 'single', ['combos', 'flowers', 'scented-candles', 'birthday']],
  ['Cake, Roses & Topper Combo', 2600, 'single', ['combos', 'flowers', 'anniversary']],
  ['Rose Flower Box (Box of 12)', 1999, 'single', ['flower-boxes', 'flowers', 'anniversary']],
  ['Pastel Blooms Box', 1799, 'single', ['flower-boxes', 'flowers', 'birthday']],
  ['Lavender Scented Candle', 349, 'single', ['scented-candles', 'flowers']],
  ['Vanilla Glow Candle', 299, 'single', ['scented-candles', 'flowers']],
];

// Real add-on items & prices read from the reference's "Would you like to add?" drawer.
export const ADDONS = [
  ['happy-birthday-cake-topper', 'Happy Birthday Cake Topper', 200, ['cake-toppers']],
  ['happy-anniversary-cake-topper', 'Happy Anniversary Cake Topper', 200, ['cake-toppers']],
  ['red-rose', 'Bunch of 10 Flowers', 1299, ['bunches', 'flowers']],
  ['box-of-5', 'Premium Box of Flowers', 1599, ['flower-boxes', 'flowers']],
  ['sparkling-candle-single', 'Sparkling Candle (Single)', 50, ['candles-misc']],
  ['sparking-candle-box-of-10', 'Sparkling Candles (Box of 5)', 200, ['candles-misc']],
  ['box-of-regular-candles', 'Box of Regular Candles', 50, ['candles-misc']],
  ['party-popper', 'Party Popper', 199, ['candles-misc']],
  ['bouquet-of-6', 'Bunch of 5 Flowers', 799, ['bunches', 'flowers']],
  ['make-a-wish-birthday-candle', '"Make a Wish" Scented Candle Jar', 299, ['scented-candles', 'flowers']],
  ['single-flower-bouqet', 'Single Flower Bouquet', 199, ['bunches', 'flowers']],
  ['double-flower-bouquet', 'Double Flower Bouquet', 399, ['bunches', 'flowers']],
].map(([slug, name, base, tags]) => ({ slug, name, base, kind: 'single', tags, addon: true }));

const DESC_BITS = ['Handcrafted in small batches', 'Baked fresh on the day of delivery', 'Finished by hand with care', 'Made to order'];

function finalize(p) {
  const h = hash(p.slug);
  const isCake = p.kind === 'cake' || p.kind === 'cheesecake';
  const tags = new Set(p.tags);
  if (isCake) {
    if (p.base < 1000) tags.add('cakes-under-1000');
    if (p.base < 1500) tags.add('cakes-under-1500');
    if (p.base >= 1500 && p.base <= 2500) tags.add('cakes-1500-to-2500');
    if (p.base >= 2500) tags.add('cakes-2500-above');
    tags.add('view-all');
  }
  const eggless = p.eggless ?? (isCake ? h % 3 !== 0 : true);
  if (eggless && p.kind === 'cake') tags.add('eggless');
  return {
    rating: +(4.3 + (h % 8) / 10).toFixed(1),
    reviews: 8 + (h % 90),
    ...p,
    tags: [...tags],
    eggless,
    images: p.images || [],
    desc: p.desc || `${p.name} – ${DESC_BITS[h % DESC_BITS.length].toLowerCase()}. Choose your size and flavour, add a message and pick a delivery slot. (Sample product copy.)`,
  };
}

const prettyProducts = PRETTY.map((p) => finalize({
  ...p, kind: 'cake', tags: prettyTags(p.name, p.base),
  images: p.slug === 'white-symphony' ? IMG.whiteSymphony : [],
  desc: p.slug === 'white-symphony' ? 'An elegant white cake adorned with delicate hand-placed blooms, giving it a soft, romantic charm. Perfect for celebrations that call for a touch of grace and beauty.' : undefined,
}));
const sampleProducts = SAMPLE.map(([name, base, kind, tags]) => finalize({ slug: slugify(name), name, base, kind, tags, sample: true }));
const addonProducts = ADDONS.map(finalize);

export const PRODUCTS = [...prettyProducts, ...sampleProducts, ...addonProducts];
const BY_SLUG = Object.fromEntries(PRODUCTS.map((p) => [p.slug, p]));
export const getProduct = (slug) => BY_SLUG[slug];
export const getCollection = (slug) => COLLECTIONS.find((c) => c.slug === slug);

export function collectionProducts(slug) {
  if (slug === 'view-all') return PRODUCTS.filter((p) => !p.addon && (p.kind === 'cake' || p.kind === 'cheesecake'));
  return PRODUCTS.filter((p) => p.tags.includes(slug));
}

export function getVariants(p) {
  if (p.kind === 'cake') return { sizes: WEIGHTS.map((w) => ({ label: w.label, price: Math.round((p.base * w.mult) / 10) * 10 })), flavours: FLAVOURS, sizeName: 'Weight' };
  if (p.kind === 'cheesecake') return { sizes: [{ label: '0.5 Kg', price: p.base }, { label: '1 Kg', price: Math.round((p.base * 1.8) / 10) * 10 }], flavours: CHEESE_FLAVOURS, sizeName: 'Weight' };
  if (p.kind === 'box') return { sizes: [{ label: 'Standard box', price: p.base }, { label: 'Large box', price: Math.round(p.base * 1.9) }], flavours: [], sizeName: 'Size' };
  return { sizes: [{ label: 'Standard', price: p.base }], flavours: [], sizeName: 'Size' };
}

export const priceFor = (p, sizeLabel) => (getVariants(p).sizes.find((s) => s.label === sizeLabel) || getVariants(p).sizes[0]).price;

export function searchProducts(q) {
  const s = q.trim().toLowerCase();
  if (!s) return [];
  const words = s.split(/\s+/);
  return PRODUCTS.filter((p) => {
    const hay = `${p.name} ${p.tags.join(' ')} ${p.kind} ${p.eggless ? 'eggless' : ''}`.toLowerCase();
    return words.every((w) => hay.includes(w));
  });
}

// Home page tiles
export const FLAVOUR_TILES = [
  ['Gluten Free Cakes', 'gluten-free-cakes', 'cream'], ['Cheesecakes', 'cheesecake', 'berry'], ['Ice Cream Cakes', 'ice-cream-cakes', 'mint'],
  ['Chocolate Cakes', 'chocolate-cakes', 'choc'], ['Fruit Cakes', 'fruit-cakes', 'pink'], ['Mango Cakes', 'mango-flavour', 'mango'],
  ['Red Velvet', 'red-valvet', 'red'], ['Sugar Free Cakes', 'sugar-free-cakes', 'lavender'], ['Berry Cakes', 'strawberry-blueberry-flavour', 'berry'],
  ['Salted Caramel', 'salted-caramal', 'caramel'], ['Tea & Dry Cakes', 'tea-dry-cakes', 'caramel'], ['Lemon & Tangy', 'lemon-tangy', 'lemon'],
  ['View All Flavours', 'all-flavours', 'pink'],
].map(([title, slug, palette]) => ({ title, slug, palette }));

export const OTHER_TILES = [
  ['Gift Boxes', 'diwali-gift-boxes', 'caramel'], ['Party Bowls', 'party-bowls', 'lavender'], ['Jar Cakes', 'jakes-cakes-in-a-jar', 'choc'],
  ['Cupcakes', 'cupcakes', 'pink', IMG.cupcakes], ['Brownies', 'brownies', 'choc'], ['Flower & Candles', 'flowers', 'red', IMG.flowers],
  ['Slices', 'slices', 'cream'], ['Cake Pops', 'cake-a-boo', 'pink', IMG.cupcakes], ['Ice Cream Tubs', 'ice-cream-tubs', 'mint'],
  ['Tarts', 'tarts-1', 'lemon'], ['Bento Cakes', 'bento-cakes', 'berry'], ['Tea & Dry Cakes', 'tea-dry-cakes', 'caramel'],
].map(([title, slug, palette, img]) => ({ title, slug, palette, img }));
