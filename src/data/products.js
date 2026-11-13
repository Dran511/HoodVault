import heroTwin from "../assets/images/hero-twin.png";
import zipup from "../assets/images/zip-up-hoodie.png";
import oversize from "../assets/images/oversize-hoodie.png";
import blackCrown from "../assets/images/black-crown-hoodie.png";
import graphic from "../assets/images/graphic-hoodie.png";
import limited from "../assets/images/limited-edition-hoodie.png";
import greyClassic from "../assets/images/classic-grey-hoodie.png";
import blackClassic from "../assets/images/classic-black-hoodie.png";
import greenClassic from "../assets/images/classic-green-hoodie.png";
import navyClassic from "../assets/images/classic-navy-hoodie.png";
import authStudio from "../assets/images/auth-studio.jpg";

export const images = {
  heroTwin,
  zipup,
  oversize,
  blackCrown,
  graphic,
  limited,
  greyClassic,
  blackClassic,
  greenClassic,
  navyClassic,
  authStudio
};

export const INITIAL_PRODUCTS = [
  {
    id: "graphic",
    name: "Graphic Hoodie",
    price: 2229,
    catalogPrice: 1999,
    category: "Graphic",
    image: images.graphic,
    inCatalog: true,
    catalogOrder: 1,
    inSearchDefault: true,
    searchOrder: 4,
    fabric: "460 GSM Heavyweight Brushed Fleece",
    fit: "Boxy Streetwear Fit",
    description: "Vintage sanctuary graphic screen-printed on heavyweight jet-black cotton fleece with double-lined hood."
  },
  {
    id: "oversize",
    name: "Oversize Hoodie",
    price: 1999,
    category: "Oversize",
    image: images.oversize,
    inCatalog: true,
    catalogOrder: 2,
    inSearchDefault: true,
    searchOrder: 2,
    fabric: "440 GSM Organic Cotton Blend",
    fit: "Relaxed Drop-Shoulder Fit",
    description: "Warm oatmeal-beige oversize pullover featuring subtle chest crown embroidery and ribbed cuffs."
  },
  {
    id: "limited",
    name: "Limited Edition",
    price: 2229,
    category: "Limited Edition",
    image: images.limited,
    inCatalog: true,
    catalogOrder: 3,
    inSearchDefault: false,
    fabric: "480 GSM Luxury Terry Fleece",
    fit: "Structured Oversize Fit",
    description: "Exclusive archive release with geometric monogram crest on the chest and full back emblem print."
  },
  {
    id: "zip-up",
    name: "Zip-Up Hoodie",
    price: 1999,
    category: "Zip-Up",
    image: images.zipup,
    inCatalog: true,
    catalogOrder: 4,
    inSearchDefault: true,
    searchOrder: 1,
    fabric: "430 GSM Combed Cotton Fleece",
    fit: "Everyday Relaxed Fit",
    description: "Full-length polished silver two-way zipper with split kangaroo pockets and reinforced seams."
  },
  {
    id: "classic-black",
    name: "Classic Hoodie",
    colorName: "Pitch Black",
    price: 1999,
    category: "Hoodies",
    image: images.blackCrown,
    inCatalog: true,
    catalogOrder: 5,
    inSearchDefault: false,
    fabric: "420 GSM Soft-Touch Fleece",
    fit: "Classic Regular Fit",
    description: "Signature pitch-black pullover finished with our embroidered white HoodVault crown crest."
  },
  {
    id: "basic-green",
    name: "Basic Hoodie",
    colorName: "Forest Green",
    price: 1999,
    category: "Hoodies",
    image: images.greenClassic,
    inCatalog: true,
    catalogOrder: 6,
    inSearchDefault: false,
    fabric: "420 GSM Soft-Touch Fleece",
    fit: "Classic Regular Fit",
    description: "Deep forest-green everyday essential with tonal drawcords and embroidered chest crown."
  },
  {
    id: "hv-oversize",
    name: "HoodVault Oversize",
    price: 2150,
    category: "Oversize",
    image: images.blackCrown,
    inCatalog: false,
    inSearchDefault: true,
    searchOrder: 3,
    fabric: "460 GSM Heavyweight Fleece",
    fit: "Extra-Wide Boxy Fit",
    description: "Our signature studio-cut black oversize silhouette engineered for maximum drape and warmth."
  },
  {
    id: "classic-grey",
    name: "Classic Hoodie",
    colorName: "Heather Grey",
    price: 1999,
    category: "Hoodies",
    image: images.greyClassic,
    inCatalog: false,
    inSearchDefault: false,
    fabric: "420 GSM Soft-Touch Fleece",
    fit: "Classic Regular Fit",
    description: "Timeless heather-grey fleece pullover with contrast black HoodVault crown embroidery."
  },
  {
    id: "classic-forest",
    name: "Classic Hoodie",
    colorName: "Pine Green",
    price: 1999,
    category: "Hoodies",
    image: images.greenClassic,
    inCatalog: false,
    inSearchDefault: false,
    fabric: "420 GSM Soft-Touch Fleece",
    fit: "Classic Regular Fit",
    description: "Rich pine-green fleece crafted for breathable all-season layering."
  },
  {
    id: "classic-navy",
    name: "Classic Hoodie",
    colorName: "Midnight Navy",
    price: 1999,
    category: "Hoodies",
    image: images.navyClassic,
    inCatalog: false,
    inSearchDefault: false,
    fabric: "420 GSM Soft-Touch Fleece",
    fit: "Classic Regular Fit",
    description: "Deep midnight-navy pullover with crisp white crown embroidery and plush interior."
  }
];

export const HERO_SLIDES = [
  {
    tag: "FEATURED DROP",
    title: "Classic Comfort",
    subtitle: "Timeless Styles. Everyday wear.",
    cta: "Shop Now",
    gradient: "linear-gradient(112deg, #F59B80 0%, #F7BC9E 45%, #F6DFC3 78%, #F2F0D4 100%)",
    image: images.heroTwin,
    isTwin: true,
    targetCategory: "Hoodies"
  },
  {
    tag: "EXCLUSIVE DROP",
    title: "Limited Edition",
    subtitle: "Heavyweight archive fleece with signature front & back crest.",
    cta: "Shop Limited",
    gradient: "linear-gradient(112deg, #D9C4B1 0%, #E7D8C9 50%, #F3EFEA 100%)",
    image: images.limited,
    isTwin: false,
    targetCategory: "Limited Edition"
  },
  {
    tag: "STATEMENT SERIES",
    title: "Graphic Collection",
    subtitle: "High-definition artwork printed on 460 GSM fleece.",
    cta: "Explore Graphic",
    gradient: "linear-gradient(112deg, #B8C9D1 0%, #D5E1E6 52%, #EFF3F5 100%)",
    image: images.graphic,
    isTwin: false,
    targetCategory: "Graphic"
  },
  {
    tag: "RELAXED SILHOUETTE",
    title: "Oversize Essentials",
    subtitle: "Drop-shoulder warmth in neutral earth tones.",
    cta: "Shop Oversize",
    gradient: "linear-gradient(112deg, #C4D1C2 0%, #DCE5DA 52%, #F1F4F0 100%)",
    image: images.oversize,
    isTwin: false,
    targetCategory: "Oversize"
  }
];

export const DEFAULT_CART = [
  { id: "zip-up", qty: 1, size: "L" },
  { id: "oversize", qty: 1, size: "L" },
  { id: "hv-oversize", qty: 1, size: "XL" },
  { id: "graphic", qty: 1, size: "L" }
];

export const DEFAULT_WISHLIST = ["zip-up", "oversize", "hv-oversize", "graphic"];

export const DEFAULT_RECENT = [
  "classic-grey",
  "classic-black",
  "classic-forest",
  "classic-navy"
];
