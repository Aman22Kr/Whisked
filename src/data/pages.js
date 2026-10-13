// Original placeholder copy for informational pages (sample content – replace with your own).
export const FAQS = [
  ['Is this a real shop?', 'No. Whisked is a demo storefront built to show a complete multi-page cake & flowers experience. Products, prices and reviews are sample data, and no orders are taken.'],
  ['How does the cart work?', 'Your cart is stored in your browser’s localStorage. It stays after a refresh on this device and browser, but it does not sync to other devices.'],
  ['Can I really pay or log in?', 'No. Checkout is a mock flow that saves a demo order on your device. No payment is processed, nothing is sent to a server, and there is no real account or password.'],
  ['How do I choose a size and flavour?', 'Open any cake, pick a weight and a flavour, then add an optional message for the cake. The price updates with the weight.'],
  ['Can I order eggless cakes?', 'Use the “Eggless” filter on any collection page to narrow the list. (Eggless flags in this demo are sample data.)'],
  ['How do I clear my saved data?', 'Go to Account → “Clear local demo data”. You can also clear site data in your browser settings.'],
];

export const PAGES = {
  'about-us': { title: 'About Us', body: [
    'Whisked is a made-up bakery brand used for this demo storefront. The idea is simple: celebration cakes, cheesecakes, cupcakes and flowers, shown in a clean, pink-and-cream shop experience.',
    'Every product page lets you choose size, flavour and a message – just like a real online bakery – and everything you do is saved in your own browser.',
    'Replace this text with your real story, team and kitchen details when you adapt the project.',
  ] },
  'contact-us': { title: 'Contact Us', body: ['Questions about this demo? Use the form below. Your message is only saved on this device – nothing is sent anywhere.'], form: true },
  'faqs': { title: 'Frequently Asked Questions', faq: true, body: [] },
  'delivery-information': { title: 'Delivery Information', body: [
    'This demo does not deliver anything. In a real deployment, this page would explain delivery areas, time slots, same-day cut-off times and charges.',
    'The header banner mentions a 10 PM cut-off for same-day delivery purely as a design element carried over from the reference layout.',
  ] },
  'privacy-policy': { title: 'Privacy Policy', body: [
    'This demo has no backend. It collects nothing on a server.',
    'Your browser’s localStorage keeps: cart, favourites, recently viewed items, search history, display and animation preferences, and any demo form drafts or demo orders you create. This data lives only in your browser on this device and does not sync across devices.',
    'Do not enter real payment details or passwords – the demo never asks for them and will not store them. You can erase everything from Account → “Clear local demo data”.',
  ] },
  'terms-conditions': { title: 'Terms & Conditions', body: ['This is a demonstration website. Products, prices, reviews and policies are sample content and do not constitute an offer to sell. Replace this page with real terms before any commercial use.'] },
  'terms-of-service': { title: 'Terms of Service', body: ['This is a demonstration website. Nothing here forms a contract, and no goods or services are provided. Replace this page with real terms before any commercial use.'] },
  'sitemap': { title: 'Sitemap', body: ['Every page in this demo store.'] },
  'refund-policy': { title: 'Refund Policy', body: ['No payments are taken in this demo, so there is nothing to refund. A real shop would describe cancellation windows, perishable-goods rules and refund timelines here.'] },
};

export const CITIES = ['delhi', 'noida', 'gurgaon', 'ghaziabad', 'faridabad'];
export const cityPage = (slug) => {
  const m = /^cake-delivery-in-(.+)$/.exec(slug);
  if (!m || !CITIES.includes(m[1])) return null;
  const city = m[1][0].toUpperCase() + m[1].slice(1);
  return { title: `Cake Delivery in ${city}`, body: [
    `Sample landing page for cake and flower delivery in ${city}. In a real deployment this page would list delivery areas, timings and charges for ${city}.`,
    'Browse designer cakes, cheesecakes, cupcakes and bouquets below – all sample data.',
  ], city };
};

export const POSTS = [
  { slug: 'how-to-pick-the-perfect-birthday-cake', title: 'How to pick the perfect birthday cake', date: '2026-08-12', excerpt: 'Size, flavour and design – a quick guide to choosing a cake everyone will enjoy.',
    body: ['Start with the headcount: a half-kilo cake comfortably serves four to six people, while a kilo suits a small party.', 'Pick a flavour most guests like – chocolate truffle is a safe crowd-pleaser, while fruit gateau suits lighter palates.', 'Finally, choose a design that reflects the person: florals for a romantic mood, bold colours for kids, minimal for a modern look.'] },
  { slug: 'eggless-baking-myths', title: 'Three myths about eggless cakes', date: '2026-07-03', excerpt: 'Eggless does not mean dense or dry. Here is why.',
    body: ['Good eggless cakes rely on balanced fat, acid and leavening, not luck.', 'Moisture comes from ingredients such as yoghurt, oil and fruit purées.', 'Frosting and filling choices matter just as much as the sponge.'] },
  { slug: 'flowers-and-cake-pairings', title: 'Flowers and cake: easy pairings for any occasion', date: '2026-06-18', excerpt: 'Pairing a bouquet with a cake takes a gift from nice to memorable.',
    body: ['Soft pastel cakes look lovely beside white or pink blooms.', 'Dark chocolate cakes pair well with deep red roses.', 'Add a scented candle for a finishing touch.'] },
];

export const REVIEWS = [
  ['Aarav S.', 5, 'Beautiful presentation and the sponge was soft. Loved the floral top!'],
  ['Meera K.', 5, 'The chocolate truffle was rich without being too sweet.'],
  ['Rohan P.', 4, 'Great flavour range. The strawberry cake was a hit with the kids.'],
  ['Ishita D.', 5, 'Ordered flowers with a cake – everything felt thoughtfully packed.'],
  ['Kabir N.', 4, 'Nice fresh fruit gateau, light and not heavy at all.'],
  ['Sana R.', 5, 'The pastel design was exactly like the picture.'],
];
