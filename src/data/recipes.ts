import pasta from '#/assets/recipe-pasta.jpg'
import pasta2 from '#/assets/recipe-pasta-2.jpg'
import pasta3 from '#/assets/recipe-pasta-3.jpg'
import ramen from '#/assets/recipe-ramen.jpg'
import ramen2 from '#/assets/recipe-ramen-2.jpg'
import ramen3 from '#/assets/recipe-ramen-3.jpg'
import tacos from '#/assets/recipe-tacos.jpg'
import tacos2 from '#/assets/recipe-tacos-2.jpg'
import tacos3 from '#/assets/recipe-tacos-3.jpg'
import salad from '#/assets/recipe-salad.jpg'
import salad2 from '#/assets/recipe-salad-2.jpg'
import salad3 from '#/assets/recipe-salad-3.jpg'
import curry from '#/assets/recipe-curry.jpg'
import curry2 from '#/assets/recipe-curry-2.jpg'
import curry3 from '#/assets/recipe-curry-3.jpg'
import soup from '#/assets/recipe-soup.jpg'
import soup2 from '#/assets/recipe-soup-2.jpg'
import soup3 from '#/assets/recipe-soup-3.jpg'
import cake from '#/assets/recipe-cake.jpg'
import cake2 from '#/assets/recipe-cake-2.jpg'
import cake3 from '#/assets/recipe-cake-3.jpg'
import pho from '#/assets/recipe-pho.jpg'
import pho2 from '#/assets/recipe-pho-2.jpg'
import pho3 from '#/assets/recipe-pho-3.jpg'
import banhmi from '#/assets/recipe-banhmi.jpg'
import banhmi2 from '#/assets/recipe-banhmi-2.jpg'
import banhmi3 from '#/assets/recipe-banhmi-3.jpg'
import goicuon from '#/assets/recipe-goicuon.jpg'
import goicuon2 from '#/assets/recipe-goicuon-2.jpg'
import goicuon3 from '#/assets/recipe-goicuon-3.jpg'

export type DietaryTag =
  | 'Vegetarian'
  | 'Vegan'
  | 'Gluten-Free'
  | 'Dairy-Free'
  | 'Contains Nuts'
  | 'Contains Shellfish'
  | 'Contains Pork'
  | 'Pescatarian'
  | 'Spicy'

export type Recipe = {
  slug: string
  title: string
  tagline: string
  cuisine: string
  category: 'Main' | 'Soup' | 'Salad' | 'Dessert' | 'Appetizer' | 'Sandwich'
  time: number
  servings: number
  difficulty: 'Easy' | 'Medium' | 'Hard'
  image: string
  gallery: string[]
  ingredients: string[]
  steps: string[]
  dietary: DietaryTag[]
}

export const recipes: Recipe[] = [
  {
    slug: 'creamy-tuscan-pasta',
    title: 'Creamy Tuscan Pasta',
    tagline: 'Sun-dried tomatoes, basil & a velvet parmesan sauce.',
    cuisine: 'Italian',
    category: 'Main',
    time: 30,
    servings: 4,
    difficulty: 'Easy',
    image: pasta,
    gallery: [pasta, pasta2, pasta3],
    ingredients: [
      '400g spaghetti',
      '200ml heavy cream',
      '100g sun-dried tomatoes, sliced',
      '80g parmesan, finely grated',
      '3 garlic cloves, minced',
      'Fresh basil leaves',
      '2 tbsp olive oil',
      'Salt & black pepper',
    ],
    steps: [
      'Bring a large pot of salted water to a boil and cook the spaghetti until al dente.',
      'While pasta cooks, warm olive oil in a deep pan over medium heat. Add garlic and sun-dried tomatoes; sauté for 2 minutes.',
      'Pour in the cream, season generously, and let it simmer until slightly thickened, about 4 minutes.',
      'Stir in the parmesan until the sauce is silky. Loosen with a splash of pasta water if needed.',
      'Toss the drained pasta into the sauce, finish with torn basil and an extra crack of pepper. Serve immediately.',
    ],
    dietary: ['Vegetarian'],
  },
  {
    slug: 'tonkotsu-style-ramen',
    title: 'Tonkotsu-Style Ramen',
    tagline: 'Deeply savoury broth, jammy egg, springy noodles.',
    cuisine: 'Japanese',
    category: 'Soup',
    time: 60,
    servings: 2,
    difficulty: 'Medium',
    image: ramen,
    gallery: [ramen, ramen2, ramen3],
    ingredients: [
      '2 portions fresh ramen noodles',
      '1L rich pork or chicken stock',
      '2 tbsp white miso',
      '1 tbsp soy sauce',
      '2 soft-boiled eggs, halved',
      '2 sheets nori',
      '2 spring onions, sliced',
      '1 tsp sesame oil',
    ],
    steps: [
      'Warm the stock gently, whisking in miso and soy sauce. Do not let it boil.',
      'Cook the noodles in a separate pot of boiling water according to package instructions.',
      'Divide the hot broth between two deep bowls. Drizzle with sesame oil.',
      'Add drained noodles, then arrange the egg halves, nori, and spring onions on top.',
      'Serve at once with chopsticks and a spoon for the broth.',
    ],
    dietary: ['Contains Pork'],
  },
  {
    slug: 'tacos-al-pastor',
    title: 'Tacos al Pastor',
    tagline: 'Marinated pork, charred pineapple, fresh cilantro.',
    cuisine: 'Mexican',
    category: 'Main',
    time: 45,
    servings: 4,
    difficulty: 'Medium',
    image: tacos,
    gallery: [tacos, tacos2, tacos3],
    ingredients: [
      '500g pork shoulder, thinly sliced',
      '2 dried guajillo chiles, soaked',
      '1/2 fresh pineapple, diced',
      '3 garlic cloves',
      '1 tbsp achiote paste',
      '12 small corn tortillas',
      'Fresh cilantro & lime wedges',
      '1 white onion, finely diced',
    ],
    steps: [
      'Blend chiles, garlic, achiote, and a splash of pineapple juice into a smooth marinade.',
      'Coat pork in the marinade and rest for at least 20 minutes (overnight is better).',
      'Sear pork in a hot pan in batches until charred at the edges and cooked through.',
      'Add diced pineapple to the pan in the final minute to caramelise.',
      'Warm tortillas, fill with pork and pineapple, top with onion, cilantro, and a squeeze of lime.',
    ],
    dietary: ['Gluten-Free', 'Dairy-Free', 'Contains Pork', 'Spicy'],
  },
  {
    slug: 'classic-greek-salad',
    title: 'Classic Greek Salad',
    tagline: 'Crisp vegetables, briny olives, generous feta.',
    cuisine: 'Greek',
    category: 'Salad',
    time: 15,
    servings: 4,
    difficulty: 'Easy',
    image: salad,
    gallery: [salad, salad2, salad3],
    ingredients: [
      '4 ripe tomatoes, cut into wedges',
      '1 cucumber, thickly sliced',
      '1 red onion, thinly sliced',
      '200g feta cheese, in slabs',
      '100g kalamata olives',
      '3 tbsp extra virgin olive oil',
      '1 tsp dried oregano',
      'Sea salt & cracked pepper',
    ],
    steps: [
      'Combine tomatoes, cucumber, onion, and olives in a wide serving bowl.',
      'Drizzle with olive oil, season with salt, pepper, and half the oregano. Toss gently.',
      'Lay the feta slabs across the top — never crumbled.',
      'Finish with the remaining oregano and an extra drizzle of olive oil. Serve with crusty bread.',
    ],
    dietary: ['Vegetarian', 'Gluten-Free'],
  },
  {
    slug: 'butter-chicken',
    title: 'Butter Chicken',
    tagline: 'Tender chicken in a velvety, spiced tomato cream.',
    cuisine: 'Indian',
    category: 'Main',
    time: 50,
    servings: 4,
    difficulty: 'Medium',
    image: curry,
    gallery: [curry, curry2, curry3],
    ingredients: [
      '600g boneless chicken thighs',
      '200g Greek yogurt',
      '2 tbsp garam masala',
      '400g tomato passata',
      '150ml double cream',
      '50g butter',
      '2 tbsp ginger-garlic paste',
      'Fresh coriander to finish',
    ],
    steps: [
      'Marinate chicken in yogurt, half the garam masala, and ginger-garlic paste for 30 minutes.',
      'Sear marinated chicken in a hot pan until lightly charred. Remove and set aside.',
      'In the same pan, melt butter and add the remaining garam masala. Pour in passata and simmer 10 minutes.',
      'Stir in the cream and return the chicken to the pan. Simmer gently for 10 minutes.',
      'Garnish with fresh coriander and serve with naan or basmati rice.',
    ],
    dietary: ['Gluten-Free', 'Spicy'],
  },
  {
    slug: 'french-onion-soup',
    title: 'French Onion Soup',
    tagline: 'Slow-caramelised onions under bubbling Gruyère.',
    cuisine: 'French',
    category: 'Soup',
    time: 75,
    servings: 4,
    difficulty: 'Medium',
    image: soup,
    gallery: [soup, soup2, soup3],
    ingredients: [
      '1kg yellow onions, thinly sliced',
      '60g butter',
      '1 tbsp flour',
      '200ml dry white wine',
      '1.2L beef stock',
      '1 baguette, sliced and toasted',
      '200g Gruyère cheese, grated',
      'Fresh thyme sprigs',
    ],
    steps: [
      'Melt butter in a heavy pot. Add onions and cook over low heat, stirring often, for 35-40 minutes until deeply caramelised.',
      'Sprinkle with flour and stir for a minute. Pour in wine and let it reduce by half.',
      'Add stock and thyme. Simmer for 20 minutes and season to taste.',
      'Ladle soup into oven-proof bowls, float toasted baguette on top and cover with Gruyère.',
      'Place under a hot grill until the cheese melts, bubbles, and turns golden brown.',
    ],
    dietary: ['Vegetarian'],
  },
  {
    slug: 'molten-chocolate-cake',
    title: 'Molten Chocolate Cake',
    tagline: 'A crisp shell, a dark, flowing centre.',
    cuisine: 'French',
    category: 'Dessert',
    time: 25,
    servings: 4,
    difficulty: 'Easy',
    image: cake,
    gallery: [cake, cake2, cake3],
    ingredients: [
      '120g dark chocolate (70%)',
      '120g unsalted butter',
      '2 whole eggs + 2 yolks',
      '60g caster sugar',
      '40g plain flour',
      'Pinch of sea salt',
      'Vanilla ice cream, to serve',
      'Fresh raspberries',
    ],
    steps: [
      'Preheat oven to 200°C (390°F). Butter and lightly flour four ramekins.',
      'Melt chocolate and butter together gently until smooth. Set aside to cool slightly.',
      'Whisk eggs, yolks, and sugar until pale and thick. Fold in the chocolate mixture.',
      'Sift in flour and salt, fold until just combined. Divide between the ramekins.',
      'Bake for 9-10 minutes — the edges should be set but the centre should wobble. Turn out and serve immediately with ice cream and raspberries.',
    ],
    dietary: ['Vegetarian'],
  },
  {
    slug: 'pho-bo',
    title: 'Phở Bò',
    tagline: 'Aromatic beef broth, rice noodles, and a garden of fresh herbs.',
    cuisine: 'Vietnamese',
    category: 'Soup',
    time: 90,
    servings: 4,
    difficulty: 'Medium',
    image: pho,
    gallery: [pho, pho2, pho3],
    ingredients: [
      '1.5L rich beef stock',
      '300g rice noodles (bánh phở)',
      '300g beef sirloin, very thinly sliced',
      '1 onion, halved and charred',
      '1 thumb ginger, charred',
      '3 star anise, 1 cinnamon stick, 4 cloves',
      '2 tbsp fish sauce',
      'Thai basil, cilantro, lime, bean sprouts, sliced chili',
    ],
    steps: [
      'Toast star anise, cinnamon, and cloves in a dry pan until fragrant. Tie in muslin.',
      'Simmer the beef stock with charred onion, ginger, spice bag, and fish sauce for 45 minutes. Strain.',
      'Cook rice noodles according to package, then divide between deep bowls.',
      'Lay raw sirloin slices over the noodles — the boiling broth will cook them on contact.',
      'Ladle the screaming-hot broth into each bowl. Serve with herbs, sprouts, lime, and chili on the side.',
    ],
    dietary: ['Dairy-Free', 'Gluten-Free'],
  },
  {
    slug: 'banh-mi',
    title: 'Bánh Mì',
    tagline: 'Crackling baguette, savoury pork, bright pickled vegetables.',
    cuisine: 'Vietnamese',
    category: 'Sandwich',
    time: 35,
    servings: 2,
    difficulty: 'Easy',
    image: banhmi,
    gallery: [banhmi, banhmi2, banhmi3],
    ingredients: [
      '2 small Vietnamese baguettes',
      '300g pork shoulder, thinly sliced',
      '2 tbsp soy sauce + 1 tbsp honey + 1 tsp five-spice',
      '1 carrot and 1/2 daikon, julienned',
      '3 tbsp rice vinegar + 1 tbsp sugar (for pickle)',
      'Mayonnaise and pâté (optional)',
      '1 cucumber, sliced into batons',
      'Cilantro sprigs and sliced jalapeño',
    ],
    steps: [
      'Toss carrot and daikon with vinegar, sugar, and a pinch of salt. Rest at least 20 minutes.',
      'Marinate pork in soy, honey, and five-spice for 15 minutes, then sear in a hot pan until caramelised.',
      'Warm the baguettes in the oven for 3 minutes so the crust shatters.',
      'Split each baguette and spread with mayo and pâté if using.',
      'Layer pork, drained pickles, cucumber, jalapeño, and a generous handful of cilantro. Press, slice, eat.',
    ],
    dietary: ['Dairy-Free', 'Contains Pork'],
  },
  {
    slug: 'goi-cuon',
    title: 'Gỏi Cuốn',
    tagline: 'Translucent rice paper rolls of shrimp, herbs, and vermicelli.',
    cuisine: 'Vietnamese',
    category: 'Appetizer',
    time: 30,
    servings: 4,
    difficulty: 'Easy',
    image: goicuon,
    gallery: [goicuon, goicuon2, goicuon3],
    ingredients: [
      '12 sheets round rice paper (bánh tráng)',
      '16 cooked shrimp, peeled and halved lengthwise',
      '100g rice vermicelli, cooked and cooled',
      '1 small lettuce, leaves separated',
      'Mint, Thai basil, and cilantro leaves',
      '3 tbsp hoisin sauce + 1 tbsp peanut butter (for dip)',
      '1 tbsp warm water and crushed peanuts to finish',
      'Pinch of chili flakes',
    ],
    steps: [
      'Whisk hoisin, peanut butter, and warm water into a smooth dip. Top with peanuts and chili.',
      'Fill a wide shallow bowl with warm water. Dip one rice paper sheet for 5 seconds until pliable.',
      'Lay the wrapper flat. Place 3 shrimp halves cut-side up, then a lettuce leaf, herbs, and a small nest of vermicelli.',
      'Fold the bottom over the filling, tuck in the sides, and roll tightly upward — the shrimp should show through.',
      'Repeat with remaining wrappers. Serve immediately with the peanut-hoisin dip.',
    ],
    dietary: [
      'Pescatarian',
      'Dairy-Free',
      'Gluten-Free',
      'Contains Shellfish',
      'Contains Nuts',
    ],
  },
]

export const cuisines = Array.from(
  new Set(recipes.map((r) => r.cuisine)),
).sort()
export const categories: Recipe['category'][] = [
  'Main',
  'Soup',
  'Salad',
  'Dessert',
  'Appetizer',
  'Sandwich',
]

export const dietaryTags: DietaryTag[] = [
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Dairy-Free',
  'Pescatarian',
  'Spicy',
  'Contains Nuts',
  'Contains Shellfish',
  'Contains Pork',
]

export const vietnameseHints: { vi: string; en: string; gloss: string }[] = [
  { vi: 'bánh tráng', en: 'rice paper', gloss: 'rice paper' },
  { vi: 'bánh phở', en: 'rice noodles', gloss: 'flat rice noodles' },
  { vi: 'rau thơm', en: 'basil', gloss: 'fresh herbs' },
  { vi: 'nước mắm', en: 'fish sauce', gloss: 'fish sauce' },
  { vi: 'tôm', en: 'shrimp', gloss: 'shrimp' },
  { vi: 'thịt heo', en: 'pork', gloss: 'pork' },
  { vi: 'ngò', en: 'cilantro', gloss: 'cilantro' },
  { vi: 'chanh', en: 'lime', gloss: 'lime' },
]

export const ingredientIndex: string[] = Array.from(
  new Set(
    recipes.flatMap((r) =>
      r.ingredients.map((ing) =>
        ing
          .split(',')[0]
          .replace(
            /^[\d/.\s]+(g|kg|ml|l|tbsp|tsp|cup|cups|cloves?|sprigs?|sheets?|portions?|pieces?|small|large|medium|whole|fresh|ripe|thinly\s+sliced)?\b/i,
            '',
          )
          .replace(/\(.*?\)/g, '')
          .trim()
          .toLowerCase(),
      ),
    ),
  ),
)
  .filter((s) => s.length > 1)
  .sort()

export function getRecipe(slug: string): Recipe | undefined {
  return recipes.find((r) => r.slug === slug)
}
