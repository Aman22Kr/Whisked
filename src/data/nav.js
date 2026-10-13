// Navigation structure (mirrors the reference site's menu groups; labels are plain text, links are in-app routes).
const c = (slug) => `/collections/${slug}`;
const L = (label, slug) => ({ label, to: c(slug) });

export const MEGA = {
  label: 'Cakes',
  to: '/',
  columns: [
    { title: 'By Type', links: [
      L('Designer Cakes', 'designer-cake'), L('Ice Cream Cakes', 'ice-cream-cakes'), L('Sugar Free Cakes', 'sugar-free-cakes'),
      L('Eggless Cakes', 'eggless'), L('Mousse Cakes', 'mousse-cakes'), L('Gluten Free Cakes', 'gluten-free-cakes'),
      L('Photo Cakes', 'personalized-cakes'), L('Design your Own Cake', 'designer-cake'), L('Pretty Cakes', 'pretty-cakes'),
      L('Two and Three Tier Cakes', 'multi-tier-cakes'),
    ] },
    { title: 'Cheesecakes', to: c('cheesecakes'), links: [
      L('Eggless Cheesecakes', 'eggless-cheesecake'), L('Gluten Free Cheesecakes', 'gluten-free-cheesecake'), L('Sugar Free Cheesecakes', 'sugar-free-cheesecakes'),
    ] },
    { title: 'By Flavor', links: [
      L('Ice Cream Cakes', 'ice-cream-cakes'), L('Chocolate Cakes', 'chocolate-cakes'), L('Fresh Fruit Cakes', 'fruit-cakes'), L('Mango Cakes', 'mango-flavour'),
      L('Butterscotch', 'butterscotch'), L('Red Velvet Cakes', 'red-valvet'), L('Strawberry & Blueberry Cakes', 'strawberry-blueberry-flavour'),
      L('Salted Caramel', 'salted-caramal'), L('Tea & Dry Cakes', 'tea-dry-cakes'), L('Nutella', 'nutella'), L('Baileys', 'baileys'),
      L('Biscoff', 'biscoff'), L('Lemon & Tangy', 'lemon-tangy'), L('Make Your Own Flavor', 'designer-cake'),
    ] },
    { title: 'By price', links: [
      L('Under 1000 Cakes', 'cakes-under-1000'), L('Under 1500 Cakes', 'cakes-under-1500'), L('1500 To 2500', 'cakes-1500-to-2500'), L('2500 & Above', 'cakes-2500-above'),
    ] },
  ],
};

export const NAV = [
  { label: 'Occasions', links: [
    L('Raksha Bandhan Cakes', 'rakhi-collection'), L('Birthday Cakes', 'birthday'), L('Anniversary Cakes', 'anniversary'), L('Wedding Cakes', 'wedding'),
    L('Designer Cakes', 'designer-cake'), L('Baby Shower', 'baby-shower'), L('Just Love', 'just-love'), L('House Party', 'house-party'),
    L('Kids/Comic', 'kids'), L('Flower & Candles', 'flowers'), L('View All Designs', 'view-all'),
  ] },
  { label: 'Party Bowls', to: c('party-bowls') },
  { label: 'Cupcakes & More', to: c('cupcakes-n-more'), links: [
    L('Cupcakes', 'cupcakes'), L('Cake Pops', 'cake-a-boo'), L('Brownies', 'brownies'), L('Tarts', 'tarts'), L('Slices', 'slices'), L('Jakes (Cake in a jar)', 'jakes-cakes-in-a-jar'),
  ] },
  { label: 'Flower & Candle', to: c('flowers'), links: [
    L('All Flowers', 'flowers'), L('Bunches', 'bunches'), L('Flower Boxes', 'flower-boxes'), L('Combos', 'combos'), L('Candle', 'scented-candles'),
  ] },
];

export const FOOTER = {
  information: [
    ['About Us', '/pages/about-us'], ['Contact Us', '/pages/contact-us'], ['FAQs', '/pages/faqs'],
    ['Terms of Service', '/policies/terms-of-service'], ['Refund policy', '/policies/refund-policy'], ['Blogs', '/blogs/topic'],
  ],
  support: [
    ['Delivery Information', '/pages/delivery-information'], ['Privacy Policy', '/pages/privacy-policy'],
    ['Terms & Conditions', '/pages/terms-conditions'], ['Refund Policy', '/pages/refund-policy'], ['Sitemap', '/pages/sitemap'],
  ],
  topSearches: [['Online Flower Delivery', '/collections/flowers'], ['Birthday Cake Online', '/collections/birthday'], ['Designer Cakes', '/collections/designer-cake'], ['Eggless Cake', '/collections/eggless']],
  cities: ['Delhi', 'Noida', 'Gurgaon', 'Ghaziabad', 'Faridabad'],
};
