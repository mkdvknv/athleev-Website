import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import PrivacyPolicy from "./Pages/PrivacyPolicy";
import logo from "./assets/Athleev Logo.png";
import Checkout from "./Pages/Checkout";
import Cart from "./Pages/Cart";
import Shop from "./Pages/Shop";
import ProductGoals from "./Pages/ProductGoals";
import OurStory from "./Pages/OurStory";
import Athletes from "./Pages/Athletes";
import ProductPage from "./Pages/ProductPage";
import MyAccount from "./Pages/MyAccount";
import Wishlist from "./Pages/Wishlist";
import Search from "./Pages/Search";
import GlobalSearch from "./Pages/GlobalSearch";
import { products as productList } from "./data/products";

const currencyOptions = [
  { code: "INR", symbol: "₹", rate: 1, label: "Indian Rupee" },
  { code: "USD", symbol: "$", rate: 0.012, label: "US Dollar" },
  { code: "EUR", symbol: "€", rate: 0.011, label: "Euro" },
  { code: "GBP", symbol: "£", rate: 0.0095, label: "British Pound" },
  { code: "AED", symbol: "AED", rate: 0.044, label: "UAE Dirham" },
];

const europeCountryCodes = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "NO", "CH"
]);

const getDefaultCurrencyCode = (countryCode) => {
  switch (countryCode) {
    case "IN":
      return "INR";
    case "US":
      return "USD";
    case "GB":
    case "UK":
      return "GBP";
    case "AE":
      return "AED";
    default:
      if (europeCountryCodes.has(countryCode)) return "EUR";
      return "INR";
  }
};

const formatPrice = (amountInINR, currency) => {
  if (!currency) return `₹${amountInINR.toFixed(0)}`;
  const converted = amountInINR * currency.rate;
  const decimals = currency.code === "INR" || currency.code === "AED" ? 0 : 2;
  const value = converted.toFixed(decimals);
  return currency.code === "AED" ? `${currency.symbol} ${value}` : `${currency.symbol}${value}`;
};

function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function HomePage({
  addToCart,
  increaseQty,
  decreaseQty,
  goals,
  products,
  formatPrice,
  wishlist,
  toggleWishlist,
  cart,
}) {
  const bestSellerProducts = products.filter((product) => [1, 2, 4].includes(product.id));
  const trendingProducts = products.filter((product) => [3, 5, 6].includes(product.id));
  const wishlistIds = new Set(wishlist.map((item) => item.id));
  const cartItemsById = new Map(cart.map((item) => [item.id, item]));

  const renderCartAction = (product) => {
    const cartItem = cartItemsById.get(product.id);

    if (!cartItem) {
      return (
        <button
          onClick={() => addToCart(product)}
          className="mt-6 w-full bg-[#c69a4b] text-black font-bold text-base py-3 rounded-full hover:bg-[#d4b16f] transition-all duration-300"
        >
          Add To Cart
        </button>
      );
    }

    return (
      <div className="mt-6 rounded-[28px] border border-[#c69a4b]/80 bg-white/[0.04] p-2.5 shadow-[0_18px_45px_rgba(198,154,75,0.18)] backdrop-blur">
        <div className="mb-2.5 text-center text-[11px] font-black uppercase tracking-[0.28em] text-[#d4b16f]">
          Added to Cart
        </div>
        <div className="flex items-center justify-between overflow-hidden rounded-full border border-[#c69a4b]/40 bg-gradient-to-r from-[#080808] via-[#15120c] to-[#080808] p-1 shadow-inner shadow-black">
          <button
            type="button"
            onClick={() => decreaseQty(product.id)}
            className="grid h-12 w-12 place-items-center rounded-full text-2xl font-black text-[#c69a4b] transition duration-200 hover:scale-105 hover:bg-[#c69a4b] hover:text-black active:scale-95"
            aria-label={`Decrease ${product.name} quantity`}
          >
            -
          </button>
          <span className="grid h-12 min-w-16 place-items-center rounded-full border border-[#c69a4b]/30 bg-black/70 px-5 text-lg font-black text-white shadow-[0_0_18px_rgba(198,154,75,0.16)]">
            {cartItem.qty || 1}
          </span>
          <button
            type="button"
            onClick={() => increaseQty(product.id)}
            className="grid h-12 w-12 place-items-center rounded-full text-2xl font-black text-[#c69a4b] transition duration-200 hover:scale-105 hover:bg-[#c69a4b] hover:text-black active:scale-95"
            aria-label={`Increase ${product.name} quantity`}
          >
            +
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <section className="relative h-[600px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600&auto=format&fit=crop"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex items-center px-10 md:px-20">
          <div className="max-w-xl z-10">
            <p className="uppercase tracking-[5px] text-[#c69a4b] mb-4">Stance Supplements</p>
            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
              YOUR BEST
              <span className="text-[#c69a4b]"> FITNESS</span>
              PARTNERS
            </h1>
            <p className="text-gray-300 mb-8">
              Hardcore mass gainer perfect for bodybuilders and fitness enthusiasts.
            </p>
            <Link to="/shop">
              <button className="bg-[#c69a4b] px-8 py-4 rounded-full font-bold hover:scale-105 hover:bg-yellow-500 transition-all duration-300 cursor-pointer shadow-lg shadow-[#c69a4b]/30">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="px-8 md:px-20 py-16">
        <h2 className="text-4xl font-black mb-10">
          SHOP BY <span className="text-[#c69a4b]">GOALS</span>
        </h2>
        <div className="flex gap-4 overflow-x-auto">
          {goals.map((goal, index) => (
            <div
              key={index}
              className="min-w-[220px] bg-[#111111] border border-[#c69a4b] rounded-3xl overflow-hidden shadow-2xl shadow-[#c69a4b]/20 hover:-translate-y-2 transition-all duration-300"
            >
              <img src={goal.img} className="h-52 w-full object-cover" />
              <div className="p-4 text-center">
                <h3 className="font-bold text-lg">{goal.title}</h3>
                <p className="text-gray-400 text-sm mt-2">{goal.description}</p>
                <Link to="/shop">
                  <button className="mt-4 border border-[#c69a4b] text-[#c69a4b] px-4 py-2 rounded-full hover:bg-[#c69a4b] hover:text-black transition">
                    Shop Now
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-8 md:px-20 py-16 bg-black text-white">
        <h2 className="text-4xl font-black mb-10">
          SHOP BY <span className="text-[#c69a4b]">PRODUCT</span>
        </h2>
        <div className="grid gap-6 lg:grid-cols-[280px_1fr] items-stretch min-h-[620px]">
          <div className="grid gap-6 auto-rows-fr h-full">
            <div className="bg-[#111111] rounded-3xl border border-[#c69a4b] overflow-hidden shadow-2xl shadow-[#c69a4b]/10 h-full">
              <div className="relative h-full min-h-[280px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
                  <div>
                    <p className="uppercase tracking-[4px] text-sm text-[#d4b16f] mb-4">Premium Picks</p>
                    <h2 className="text-5xl md:text-6xl font-black leading-tight text-[#c69a4b]">BEST</h2>
                    <h2 className="text-5xl md:text-6xl font-black leading-tight mt-1">SELLERS</h2>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm md:text-base max-w-md">
                      Discover our highest-rated formulas for strength, recovery, and performance. Every product is crafted to deliver results.
                    </p>
                    <Link to="/shop">
                      <button className="mt-1 bg-[#c69a4b] text-black font-bold px-6 py-3 rounded-full text-sm md:text-base shadow-lg shadow-[#c69a4b]/30 hover:bg-[#d4b16f] transition-all duration-300">
                        Shop Best Sellers
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#111111] rounded-3xl border border-[#c69a4b] overflow-hidden shadow-2xl shadow-[#c69a4b]/10 h-full">
              <div className="relative h-full min-h-[280px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format&fit=crop"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/55" />
                <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
                  <div>
                    <p className="uppercase tracking-[4px] text-sm text-[#d4b16f] mb-4">Must Have</p>
                    <h2 className="text-6xl md:text-4xl font-black leading-tight text-[#c69a4b]">TRENDING</h2>
                    <h2 className="text-6xl md:text-4xl font-black leading-tight mt-1">NOW</h2>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm md:text-base max-w-md">
                      Stay ahead with formulas that athletes love. Shop the latest performance essentials and premium recovery staples.
                    </p>
                    <Link to="/shop">
                      <button className="mt-6 bg-[#c69a4b] text-black font-bold px-6 py-3 rounded-full text-sm md:text-base shadow-lg shadow-[#c69a4b]/30 hover:bg-[#d4b16f] transition-all duration-300">
                        Browse Trending
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-rows-[1fr_1fr] gap-6 h-full">
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 auto-rows-fr h-full">
              {bestSellerProducts.map((product, index) => (
                <div
                  key={`best-${index}`}
                  className={`group relative bg-[#111111] rounded-3xl border p-6 flex flex-col justify-between h-full transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(198,154,75,0.16)] ${cartItemsById.has(product.id) ? "border-[#c69a4b] shadow-[0_0_28px_rgba(198,154,75,0.18)]" : "border-[#c69a4b]/70"}`}
                >
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product)}
                    className={`absolute right-4 top-4 z-10 h-11 w-11 rounded-full border text-xl font-black transition ${wishlistIds.has(product.id) ? "border-[#c69a4b] bg-[#c69a4b] text-black" : "border-[#c69a4b] bg-black/80 text-[#c69a4b] hover:bg-[#c69a4b] hover:text-black"}`}
                    aria-label="Toggle wishlist"
                  >
                    {wishlistIds.has(product.id) ? "♥" : "♡"}
                  </button>
                  <div>
                    <div className="flex h-[220px] items-center justify-center overflow-hidden rounded-2xl border border-[#eadfca] bg-[#f8f6f1] p-5 shadow-inner">
                      <img
                        src={product.img}
                        alt={product.name}
                        className="h-full w-full object-contain object-center transition-all duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-5">
                      <p className="text-xs uppercase tracking-[3px] text-gray-400">Best Seller</p>
                      <h3 className="font-black text-xl mt-3">{product.name}</h3>
                      <p className="text-[#c69a4b] font-bold text-2xl mt-4">{formatPrice(product.basePrice)}</p>
                    </div>
                  </div>
                  {renderCartAction(product)}
                </div>
              ))}
            </div>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 auto-rows-fr h-full">
              {trendingProducts.map((product, index) => (
                <div
                  key={`trend-${index}`}
                  className={`group relative bg-[#111111] rounded-3xl border p-6 flex flex-col justify-between h-full transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(198,154,75,0.16)] ${cartItemsById.has(product.id) ? "border-[#c69a4b] shadow-[0_0_28px_rgba(198,154,75,0.18)]" : "border-[#c69a4b]/70"}`}
                >
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product)}
                    className={`absolute right-4 top-4 z-10 h-11 w-11 rounded-full border text-xl font-black transition ${wishlistIds.has(product.id) ? "border-[#c69a4b] bg-[#c69a4b] text-black" : "border-[#c69a4b] bg-black/80 text-[#c69a4b] hover:bg-[#c69a4b] hover:text-black"}`}
                    aria-label="Toggle wishlist"
                  >
                    {wishlistIds.has(product.id) ? "♥" : "♡"}
                  </button>
                  <div>
                    <div className="flex h-[220px] items-center justify-center overflow-hidden rounded-2xl border border-[#eadfca] bg-[#f8f6f1] p-5 shadow-inner">
                      <img
                        src={product.img}
                        alt={product.name}
                        className="h-full w-full object-contain object-center transition-all duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-1 max-w-full overflow-hidden">
                     <p className="text-[10px] uppercase tracking-[1px] text-[#d4b16f] mb-1 truncate">
  Trending Now
</p>
                      <h3 className="font-black text-xl mt-3">{product.name}</h3>
                      <p className="text-[#c69a4b] font-bold text-2xl mt-1">{formatPrice(product.basePrice)}</p>
                    </div>
                  </div>
                  {renderCartAction(product)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-8 md:px-20 py-10">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative overflow-hidden rounded-3xl border-2 border-[#c69a4b]">
            <img
              src="https://images.unsplash.com/photo-1622484212850-eb596d769edc?q=80&w=1200&auto=format&fit=crop"
              className="w-full h-[320px] object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute top-10 left-10 z-10">
              <p className="bg-[#c69a4b] text-black px-4 py-1 rounded-full text-sm font-bold inline-block mb-4">ONE DAY ONLY</p>
              <h2 className="text-5xl font-black">20% OFF</h2>
              <p className="mt-2 text-gray-300">ALL GYM SUPPLEMENTS</p>
              <Link to="/shop">
                <button className="mt-8 bg-[#c69a4b] px-8 py-4 rounded-full font-bold hover:scale-105 hover:bg-yellow-500 transition-all duration-300 cursor-pointer shadow-lg shadow-[#c69a4b]/30">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl border-2 border-[#c69a4b]">
            <img
              src="https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?q=80&w=1200&auto=format&fit=crop"
              className="w-full h-[320px] object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute top-10 left-10 z-10">
              <p className="bg-[#c69a4b] text-black px-4 py-1 rounded-full text-sm font-bold inline-block mb-4">ONE DAY ONLY</p>
              <h2 className="text-5xl font-black">20% OFF</h2>
              <p className="mt-2 text-gray-300">ALL GYM SUPPLEMENTS</p>
              <Link to="/shop">
                <button className="mt-8 bg-[#c69a4b] px-8 py-4 rounded-full font-bold hover:scale-105 hover:bg-yellow-500 transition-all duration-300 cursor-pointer shadow-lg shadow-[#c69a4b]/30">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-8 md:px-20 py-20">
        <h2 className="text-4xl font-black mb-10">ATHLEEV <span className="text-[#c69a4b]">MOMENTS</span></h2>
        <div className="flex gap-4 overflow-x-auto">
          {goals.map((goal, index) => (
            <img
              key={index}
              src={goal.img}
              className="rounded-3xl h-52 min-w-[220px] border border-[#c69a4b] object-cover"
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default function App() {
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState(() => {
    if (typeof window === "undefined") return "INR";
    const storedCurrency = window.localStorage.getItem("athleevCurrency");
    return currencyOptions.some((currency) => currency.code === storedCurrency)
      ? storedCurrency
      : "INR";
  });
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [email, setEmail] = useState("");

  const selectedCurrency = useMemo(
    () => currencyOptions.find((currency) => currency.code === selectedCurrencyCode) || currencyOptions[0],
    [selectedCurrencyCode]
  );

  useEffect(() => {
    const storedCurrency = window.localStorage.getItem("athleevCurrency");
    if (storedCurrency && currencyOptions.some((currency) => currency.code === storedCurrency)) {
      return;
    }

    fetch("https://ipapi.co/json/")
      .then((response) => response.json())
      .then((data) => {
        const detected = getDefaultCurrencyCode(data.country_code || "IN");
        setSelectedCurrencyCode(detected);
      })
      .catch(() => {
        setSelectedCurrencyCode("INR");
      });
  }, []);

  useEffect(() => {
    window.localStorage.setItem("athleevCurrency", selectedCurrencyCode);
  }, [selectedCurrencyCode]);

  const handleCurrencyChange = (currencyCode) => {
    setSelectedCurrencyCode(currencyCode);
  };

  const goals = [
    { title: "Lean Muscle", description: "Build lean muscles with high quality protein supplements.", img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop" },
    { title: "Gain Mass", description: "Increase your mass with our premium mass gainers.", img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format&fit=crop" },
    { title: "Lose Weight", description: "Accelerate your weight loss journey with our effective fat burners.", img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop" },
    { title: "Recovery", description: "Support your recovery with our post-workout supplements.", img: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=800&auto=format&fit=crop" },
    { title: "Strength", description: "Enhance your strength with our powerful pre-workout formulas.", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop" },
  ];

  const products = productList;
  const cartCount = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
  const wishlistCount = wishlist.length;

  const getTotalInINR = () => {
    return cart.reduce((sum, item) => sum + item.basePrice * (item.qty || 1), 0);
  };

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === product.id);
      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id ? { ...item, qty: (item.qty || 1) + 1 } : item
        );
      }
      return [...currentCart, { ...product, qty: 1 }];
    });
  };

  const toggleWishlist = (product) => {
    setWishlist((currentWishlist) => {
      const exists = currentWishlist.some((item) => item.id === product.id);
      return exists
        ? currentWishlist.filter((item) => item.id !== product.id)
        : [...currentWishlist, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((currentWishlist) => currentWishlist.filter((item) => item.id !== productId));
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== productId));
  };

  const increaseQty = (productId) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId ? { ...item, qty: (item.qty || 1) + 1 } : item
      )
    );
  };

  const decreaseQty = (productId) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId ? { ...item, qty: (item.qty || 1) - 1 } : item
        )
        .filter((item) => (item.qty || 0) > 0)
    );
  };

  const handleSubscribe = () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }
    alert("Subscribed Successfully 🚀");
    setEmail("");
  };

  return (
    <BrowserRouter>
      <div className="bg-black min-h-screen text-white font-sans">
        <div className="bg-[#c69a4b] text-white text-sm flex flex-col md:flex-row items-center justify-between px-8 py-3 gap-4">
          <p>Contact +084 123 - 456 88</p>
          <p>Free gift when you spend over $150</p>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline">Currency</span>
            <select
              value={selectedCurrencyCode}
              onChange={(e) => handleCurrencyChange(e.target.value)}
              className="bg-[#c69a4b] text-white outline-none border border-white px-3 py-1 rounded"
            >
              {currencyOptions.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} - {currency.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <nav className="bg-[#111111] px-8 py-5 flex items-center justify-between border-b border-[#c69a4b]/20">
          <div>
            <img src={logo} alt="Athleev Logo" className="h-12 w-auto" />
          </div>
          <ul className="hidden md:flex gap-8 font-medium">
            <Link to="/" className="hover:text-[#c69a4b]">Home</Link>
            <Link to="/product-goals" className="hover:text-[#c69a4b]">Product by Goals</Link>
            <Link to="/shop" className="hover:text-[#c69a4b]">Shop</Link>
            <Link to="/our-story" className="hover:text-[#c69a4b]">Our Story</Link>
            <Link to="/Athletes" className="hover:text-[#c69a4b]">Athletes</Link>
          </ul>
          <div className="flex items-center gap-3 text-xl">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="cursor-pointer transition hover:text-[#c69a4b]"
              aria-label="Open global search"
            >
              🔍
            </button>
            <Link to="/wishlist" className="cursor-pointer hover:text-[#c69a4b]">♡ {wishlistCount}</Link>
            <Link to="/cart" className="cursor-pointer hover:text-[#c69a4b]">🛒 {cartCount}</Link>
            <Link
              to="/my-account"
              className="grid h-11 w-11 place-items-center rounded-full border border-[#c69a4b]/50 bg-black text-[#c69a4b] shadow-lg shadow-[#c69a4b]/10 transition hover:-translate-y-0.5 hover:border-[#c69a4b] hover:bg-[#c69a4b] hover:text-black"
              aria-label="My account"
              title="My account"
            >
              <UserIcon />
            </Link>
          </div>
        </nav>

        <GlobalSearch
          open={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          products={products}
          goals={goals}
          wishlist={wishlist}
          cart={cart}
          formatPrice={(value) => formatPrice(value, selectedCurrency)}
        />

        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                addToCart={addToCart}
                increaseQty={increaseQty}
                decreaseQty={decreaseQty}
                goals={goals}
                products={products}
                formatPrice={(value) => formatPrice(value, selectedCurrency)}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
                cart={cart}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                removeFromCart={removeFromCart}
                increaseQty={increaseQty}
                decreaseQty={decreaseQty}
                addToCart={addToCart}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
                formatPrice={(value) => formatPrice(value, selectedCurrency)}
                selectedCurrency={selectedCurrency}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <Checkout
                cart={cart}
                getTotalInINR={getTotalInINR}
                formatPrice={(value) => formatPrice(value, selectedCurrency)}
                selectedCurrency={selectedCurrency}
              />
            }
          />
          <Route
            path="/shop"
            element={
              <Shop
                products={products}
                cart={cart}
                addToCart={addToCart}
                increaseQty={increaseQty}
                decreaseQty={decreaseQty}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
                formatPrice={(value) => formatPrice(value, selectedCurrency)}
              />
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProductPage
                products={products}
                addToCart={addToCart}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
                formatPrice={(value) => formatPrice(value, selectedCurrency)}
              />
            }
          />
          <Route path="/my-account" element={<MyAccount />} />
          <Route
            path="/search"
            element={
              <Search
                products={products}
                formatPrice={(value) => formatPrice(value, selectedCurrency)}
              />
            }
          />
          <Route
            path="/wishlist"
            element={
              <Wishlist
                wishlist={wishlist}
                removeFromWishlist={removeFromWishlist}
                addToCart={addToCart}
                formatPrice={(value) => formatPrice(value, selectedCurrency)}
              />
            }
          />
          <Route path="/product-goals" element={<ProductGoals />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/Athletes" element={<Athletes />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>

        <footer className="bg-[#111111] border-t border-[#c69a4b]/20 px-8 md:px-20 py-16">
          <div className="grid md:grid-cols-4 gap-10">
            <div>
              <h2 className="text-3xl font-black text-[#c69a4b]">ATHLEEV</h2>
              <p className="text-gray-400 mt-4 leading-relaxed">
                Premium sports nutrition supplements designed for athletes, fitness lovers and bodybuilders.
              </p>
              <div className="flex gap-4 mt-6 text-2xl">
                <a href="#" className="hover:text-[#c69a4b] transition">📷</a>
                <a href="#" className="hover:text-[#c69a4b] transition">📘</a>
                <a href="#" className="hover:text-[#c69a4b] transition">▶️</a>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-5 text-white">Products</h3>
              <ul className="space-y-3 text-gray-400">
                <Link to="/shop" className="block hover:text-[#c69a4b] cursor-pointer transition">Whey Protein</Link>
                <Link to="/shop" className="block hover:text-[#c69a4b] cursor-pointer transition">Creatine</Link>
                <Link to="/shop" className="block hover:text-[#c69a4b] cursor-pointer transition">Mass Gainer</Link>
                <Link to="/shop" className="block hover:text-[#c69a4b] cursor-pointer transition">Pre Workout</Link>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-5">Quick Links</h3>
              <ul className="space-y-3 text-gray-400">
                <Link to="/our-story" className="block hover:text-[#c69a4b] cursor-pointer">About Us</Link>
                <Link to="/Athletes" className="block hover:text-[#c69a4b] cursor-pointer">Athletes</Link>
                <Link to="/shop" className="block hover:text-[#c69a4b] cursor-pointer">Shop</Link>
                <Link to="/privacy-policy" className="block hover:text-[#c69a4b] cursor-pointer">Privacy Policy</Link>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-5 text-white">Newsletter</h3>
              <p className="text-gray-400 mb-4">Subscribe & get exclusive offers and fitness updates.</p>
              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-3 rounded-full bg-black border border-gray-700 outline-none focus:border-[#c69a4b]"
                />
                <button
                  onClick={handleSubscribe}
                  className="bg-[#c69a4b] text-black px-6 py-3 rounded-full font-bold hover:bg-yellow-500 transition"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-14 pt-8 flex justify-center items-center text-gray-500 text-center">
            <p>© 2026 Athleev Nutrition. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
