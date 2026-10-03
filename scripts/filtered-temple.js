// ===== KEEP your existing menu toggle code from scripts/temples.js here =====
// (the code for the #menu button / #nav)

const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  // ===== 3 added temples (verify details; replace the image links) =====
  {
    templeName: "Salt Lake Utah",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 253015,
    imageUrl: "images/salt-lake-temple.jpg" // your own local image; swap for an absolute URL if you can
  },
  {
    templeName: "Accra Ghana",
    location: "Accra, Ghana",
    dedicated: "2004, January, 11",
    area: 17500,
    imageUrl: "PASTE_IMAGE_ADDRESS_HERE"
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 40000,
    imageUrl: "PASTE_IMAGE_ADDRESS_HERE"
  }
];

const gallery = document.querySelector(".gallery");
const pageTitle = document.querySelector("#page-title");

function createTempleCard(list) {
  gallery.innerHTML = ""; // clear old cards first

  list.forEach((t) => {
    const card = document.createElement("figure");

    const name = document.createElement("h3");
    name.textContent = t.templeName;

    const loc = document.createElement("p");
    loc.innerHTML = `<span class="label">Location:</span> ${t.location}`;

    const ded = document.createElement("p");
    ded.innerHTML = `<span class="label">Dedicated:</span> ${t.dedicated}`;

    const size = document.createElement("p");
    size.innerHTML = `<span class="label">Size:</span> ${t.area} sq ft`;

    const img = document.createElement("img");
    img.src = t.imageUrl;
    img.alt = t.templeName;
    img.loading = "lazy";
    img.width = 400;
    img.height = 250;

    card.append(name, loc, ded, size, img);
    gallery.appendChild(card);
  });
}

// dedicated looks like "2005, August, 7" -> take the year
function getYear(t) {
  return parseInt(t.dedicated.split(",")[0]);
}

const filters = {
  home: () => temples,
  old: () => temples.filter((t) => getYear(t) < 1900),
  new: () => temples.filter((t) => getYear(t) > 2000),
  large: () => temples.filter((t) => t.area > 90000),
  small: () => temples.filter((t) => t.area < 10000),
};

document.querySelectorAll("#nav a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const key = link.textContent.trim().toLowerCase();
    if (filters[key]) {
      pageTitle.textContent = link.textContent.trim();
      createTempleCard(filters[key]());
    }
  });
});

// Footer
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#modified").textContent = document.lastModified;

// Show everything on load
createTempleCard(temples);