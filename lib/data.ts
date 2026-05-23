export type Review = {
  name: string;
  avatar: string;
  rating: number;
  date: string;
  verified: boolean;
  text: string;
  images?: string[];
  videos?: string[];
};

export type ProductDetails = {
  images: string[];
  description: string;
  specs: Record<string, string>;
  reviews: {
    average: string;
    total: string;
    distribution: Record<number, number>;
    list: Review[];
  };
};

export type Product = {
  id: string;
  name: string;
  benefits: string;
  size: string;
  type: string;
  price: string;
  image: string;
  category: string;
  details: ProductDetails;
};

export const products: Product[] = [
  {
    id: "p1",
    name: "Face Wash",
    benefits: "Cleanse • Refresh • Revive",
    size: "100ml",
    type: "Face Care",
    price: "$24.99",
    image: "/images/5.jpeg",
    category: "face",
    details: {
      images: ["/images/5.jpeg", "/images/4.jpeg", "/images/3.jpeg"],
      description: "Lakmé Peach Milk Crème with 2% PRO-CERAMIDE & PEPTIDES provides intense hydration and strengthens your skin's barrier for a soft, healthy glow. Clinically proven.<br><br>Powered by PRO-CERAMIDE, this moisturizer instantly repairs your skin's barrier and protects it from environmental aggressors, leaving it soft and smooth.",
      specs: {
        "Item Volume": "100 Millilitres",
        "Item dimensions L x W x H": "8.7 x 8.7 x 6.7 Centimeters",
        "Age Range (Description)": "Adult",
        "Special Feature": "Lightweight",
        "Active Ingredients": "vitamin e",
        "Skin Type": "All",
        "Number of Items": "1",
        "Scent": "Peach",
        "Item Form": "Cream"
      },
      reviews: {
        average: "4.2",
        total: "2,492",
        distribution: { 5: 65, 4: 20, 3: 5, 2: 5, 1: 5 },
        list: [
          {
            name: "Sarah J.",
            avatar: "https://i.pravatar.cc/150?u=sarah",
            rating: 5,
            date: "Reviewed on 12 May 2026",
            verified: true,
            text: "Absolutely love this! It leaves my skin feeling so soft and hydrated without being greasy. The peach scent is very subtle and pleasant.",
            images: ["/images/5.jpeg"]
          },
          {
            name: "Emily R.",
            avatar: "https://i.pravatar.cc/150?u=emily",
            rating: 4,
            date: "Reviewed on 5 April 2026",
            verified: true,
            text: "Good moisturizer, does what it says. I use it every night and wake up with glowing skin. Minus one star because the packaging could be better.",
            images: []
          }
        ]
      }
    }
  },
  {
    id: "p2",
    name: "Body Wash",
    benefits: "Cleanse • Refresh • Revive",
    size: "200ml",
    type: "Body Care",
    price: "$26.99",
    image: "/images/4.jpeg",
    category: "body",
    details: {
      images: ["/images/4.jpeg", "/images/2.jpeg", "/images/5.jpeg"],
      description: "Refresh and revive your skin with our gentle Body Wash. It cleanses without stripping natural oils.",
      specs: {
        "Item Volume": "200 Millilitres",
        "Item dimensions L x W x H": "10 x 5 x 5 Centimeters",
        "Age Range (Description)": "Adult",
        "Special Feature": "Refreshing",
        "Active Ingredients": "Aloe Vera",
        "Skin Type": "All",
        "Number of Items": "1",
        "Scent": "Fresh",
        "Item Form": "Liquid"
      },
      reviews: {
        average: "4.5",
        total: "1,204",
        distribution: { 5: 70, 4: 15, 3: 10, 2: 3, 1: 2 },
        list: [
          {
            name: "Michael T.",
            avatar: "https://i.pravatar.cc/150?u=mike",
            rating: 5,
            date: "Reviewed on 20 Jan 2026",
            verified: true,
            text: "Great lather and smells amazing. Leaves me feeling clean all day.",
            images: []
          }
        ]
      }
    }
  },
  {
    id: "p3",
    name: "Moisturiser",
    benefits: "Nourish • Hydrate • Protect",
    size: "200ml",
    type: "Face Care",
    price: "$34.99",
    image: "/images/3.jpeg",
    category: "face",
    details: {
      images: ["/images/3.jpeg", "/images/6.jpeg", "/images/7.jpeg"],
      description: "Lakmé Peach Milk Crème with 2% PRO-CERAMIDE & PEPTIDES provides intense hydration and strengthens your skin's barrier for a soft, healthy glow. Clinically proven.",
      specs: {
        "Item Volume": "200 Millilitres",
        "Item dimensions L x W x H": "8.7 x 8.7 x 6.7 Centimeters",
        "Age Range (Description)": "Adult",
        "Special Feature": "Lightweight",
        "Active Ingredients": "vitamin e",
        "Skin Type": "All",
        "Number of Items": "1",
        "Scent": "Peach",
        "Item Form": "Cream"
      },
      reviews: {
        average: "4.8",
        total: "3,892",
        distribution: { 5: 85, 4: 10, 3: 3, 2: 1, 1: 1 },
        list: [
          {
            name: "Jessica W.",
            avatar: "https://i.pravatar.cc/150?u=jess",
            rating: 5,
            date: "Reviewed on 2 March 2026",
            verified: true,
            text: "The best moisturizer I have ever used. Highly recommend to everyone with dry skin.",
            images: ["/images/3.jpeg"]
          }
        ]
      }
    }
  },
  {
    id: "p4",
    name: "Body Mist",
    benefits: "Refresh • Hydrate • Uplift",
    size: "60ml",
    type: "Body Care",
    price: "$18.99",
    image: "/images/2.jpeg",
    category: "body",
    details: {
      images: ["/images/2.jpeg", "/images/4.jpeg"],
      description: "A light, refreshing mist that hydrates and uplifts the senses. Perfect for on-the-go.",
      specs: {
        "Item Volume": "60 Millilitres",
        "Item dimensions L x W x H": "12 x 3 x 3 Centimeters",
        "Age Range (Description)": "Adult",
        "Special Feature": "Travel Size",
        "Active Ingredients": "Rose Water",
        "Skin Type": "All",
        "Number of Items": "1",
        "Scent": "Floral",
        "Item Form": "Spray"
      },
      reviews: {
        average: "4.0",
        total: "845",
        distribution: { 5: 50, 4: 30, 3: 10, 2: 5, 1: 5 },
        list: [
          {
            name: "Anna B.",
            avatar: "https://i.pravatar.cc/150?u=anna",
            rating: 4,
            date: "Reviewed on 15 Feb 2026",
            verified: true,
            text: "Smells nice but doesn't last very long. Still good for a quick refresh.",
            images: []
          }
        ]
      }
    }
  },
  {
    id: "p5",
    name: "Face Serum",
    benefits: "Brighten • Hydrate • Renew",
    size: "30ml",
    type: "Face Care",
    price: "$39.99",
    image: "/images/7.jpeg",
    category: "face",
    details: {
      images: ["/images/7.jpeg", "/images/3.jpeg", "/images/5.jpeg"],
      description: "Potent face serum designed to brighten your complexion and renew skin cells overnight.",
      specs: {
        "Item Volume": "30 Millilitres",
        "Item dimensions L x W x H": "10 x 3 x 3 Centimeters",
        "Age Range (Description)": "Adult",
        "Special Feature": "Anti-aging",
        "Active Ingredients": "Vitamin C, Hyaluronic Acid",
        "Skin Type": "All",
        "Number of Items": "1",
        "Scent": "Unscented",
        "Item Form": "Serum"
      },
      reviews: {
        average: "4.7",
        total: "1,532",
        distribution: { 5: 80, 4: 12, 3: 5, 2: 2, 1: 1 },
        list: [
          {
            name: "David K.",
            avatar: "https://i.pravatar.cc/150?u=david",
            rating: 5,
            date: "Reviewed on 10 April 2026",
            verified: true,
            text: "Noticed a difference in my skin tone within a week. Great product.",
            images: []
          }
        ]
      }
    }
  },
  {
    id: "p6",
    name: "D-TAN Mask",
    benefits: "Brighten • Detox • Restore",
    size: "50gm",
    type: "Face Care",
    price: "$28.99",
    image: "/images/6.jpeg",
    category: "face",
    details: {
      images: ["/images/6.jpeg", "/images/5.jpeg"],
      description: "Detoxify and restore your skin with our D-TAN mask. Helps remove sun tan and dead skin cells.",
      specs: {
        "Item Volume": "50 Grams",
        "Item dimensions L x W x H": "6 x 6 x 5 Centimeters",
        "Age Range (Description)": "Adult",
        "Special Feature": "Detoxifying",
        "Active Ingredients": "Clay, Charcoal",
        "Skin Type": "Oily, Normal",
        "Number of Items": "1",
        "Scent": "Earthy",
        "Item Form": "Paste"
      },
      reviews: {
        average: "4.3",
        total: "920",
        distribution: { 5: 60, 4: 25, 3: 10, 2: 3, 1: 2 },
        list: [
          {
            name: "Priya M.",
            avatar: "https://i.pravatar.cc/150?u=priya",
            rating: 5,
            date: "Reviewed on 22 March 2026",
            verified: true,
            text: "Works really well on my tan. My skin felt very clean after using it.",
            images: ["/images/6.jpeg"]
          }
        ]
      }
    }
  }
];

export const bannerMessages = [
  { tag: 'ORGANIC & VEGAN', text: 'Self-Care For Every You', subtitle: 'Premium Skincare Beyond Gender' },
  { tag: 'DEEP HYDRATION', text: 'Nourish Your Skin Naturally', subtitle: 'Formulated with organic, bio-compatible clean ingredients' },
  { tag: 'CLINICAL RESULTS', text: 'Radiant & Renewed Skin', subtitle: 'Visible results in weeks, backed by clean science' },
  { tag: 'GENDER INCLUSIVE', text: 'Care Beyond Gender', subtitle: 'Formulas designed for all skin types and identities' }
];
