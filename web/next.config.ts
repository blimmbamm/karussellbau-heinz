import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      { source: "/willkommen.html", destination: "/de", permanent: true },
      { source: "/news.html", destination: "/de", permanent: true },
      // { source: "/", destination: "/de", permanent: true },
      {
        source: "/bier-karussells.html",
        destination: "/de/beer-carousel",
        permanent: true,
      },
      {
        source: "/karussell-1.html",
        destination: "/de/carousel-1",
        permanent: true,
      },
      {
        source: "/karussell-2.html",
        destination: "/de/carousel-2",
        permanent: true,
      },
      {
        source: "/karussell-3.html",
        destination: "/de/carousel-3",
        permanent: true,
      },
      {
        source: "/karussell-4.html",
        destination: "/de/carousel-4",
        permanent: true,
      },
      {
        source: "/karussell-5.html",
        destination: "/de/carousel-5",
        permanent: true,
      },
      {
        source: "/karussell-6.html",
        destination: "/de/carousel-6",
        permanent: true,
      },
      {
        source: "/karussell-7.html",
        destination: "/de/carousel-7",
        permanent: true,
      },
      {
        source: "/karussell-8.html",
        destination: "/de/carousel-8",
        permanent: true,
      },
      {
        source: "/karussell-9.html",
        destination: "/de/carousel-9",
        permanent: true,
      },
      {
        source: "/muenzautomaten-coin-ops.html",
        destination: "/de/coin-game-crane",
        permanent: true,
      },
      { source: "/kontakt.html", destination: "/de/contact", permanent: true },
      {
        source: "/impressum.html",
        destination: "/de/contact",
        permanent: true,
      },
      {
        source: "/family-balloon.html",
        destination: "/de/family-balloon",
        permanent: true,
      },
      {
        source: "/family-rides.html",
        destination: "/de/family-twister",
        permanent: true,
      },
      {
        source: "/riesenraeder.html",
        destination: "/de/ferris-wheel",
        permanent: true,
      },
      {
        source: "/fly-allround.html",
        destination: "/de/fly-allround",
        permanent: true,
      },
      {
        source: "/playground-equipment.html",
        destination: "/de/game-n-fun-hill",
        permanent: true,
      },
      {
        source: "/kiddy-rides.html",
        destination: "/de/mini-coffee-cup-carousel",
        permanent: true,
      },
      {
        source: "/mini-starflyer-2.html",
        destination: "/de/mini-family-flyer",
        permanent: true,
      },
      {
        source: "/polyesterbau-figurenbau.html",
        destination: "/de/polyester-and-figure-construction",
        permanent: true,
      },
      {
        source: "/schaukeln.html",
        destination: "/de/ship-swing-ride",
        permanent: true,
      },
      {
        source: "/wash-dish.html",
        destination: "/de/wasch-dich",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
