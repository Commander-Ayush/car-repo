/* =====================================================================
   data.js — brand, filters, inventory (loaded on every page)
   Edit BRAND to update brand details across the entire site.
   Car photos come from imagin.studio CDN (brand-accurate renders).
   ===================================================================== */

window.BRAND = {
    brandName: "Maison Avenir",
    tagline: "Pre-owned luxury, presented properly.",
    address: "9472 Wilshire Boulevard, Beverly Hills, CA 90212",
    phone: "+1 (310) 555-0142",
    email: "concierge@maisonavenir.com",
    city: "Beverly Hills",
    images: {
        hero: "https://images.pexels.com/photos/33327689/pexels-photo-33327689.jpeg",
        showroom: "https://images.pexels.com/photos/16176576/pexels-photo-16176576.jpeg"
    }
};

/* ---------- Brand-accurate car photo (IMAGIN.studio CDN) ---------- */
window.carImg = function (make, modelFamily, angle) {
    const m = encodeURIComponent(make);
    const f = encodeURIComponent(modelFamily);
    const a = angle || "09";
    return `https://cdn.imagin.studio/getImage?customer=img&make=${m}&modelFamily=${f}&angle=${a}`;
};

/* ---------- Filter taxonomies (counts must match inventory) ---------- */
window.FILTERS = {
    exteriorColor: [
        { label: "Amazon Gray", count: 1, swatch: "#7d7f80" },
        { label: "Billet Silver Metallic Clearcoat", count: 1, swatch: "#bcbec0" },
        { label: "Black Onyx", count: 1, swatch: "#0c0c0c" },
        { label: "Black Raven", count: 1, swatch: "#0a0a0a" },
        { label: "Black", count: 3, swatch: "#111111" },
        { label: "Blue Topaz Metallic", count: 1, swatch: "#3a6ea5" },
        { label: "Blue Velvet Metallic", count: 1, swatch: "#1f3a6b" },
        { label: "Butte Red Metallic", count: 1, swatch: "#7a1f1f" },
        { label: "Classic Silver Metallic", count: 1, swatch: "#c4c6c8" },
        { label: "Coliseum Gray", count: 1, swatch: "#888a8d" },
        { label: "Cool Silver Metallic", count: 1, swatch: "#cfd2d6" },
        { label: "Deep Black Pearl", count: 1, swatch: "#0d0d10" },
        { label: "Deep Ocean Blue Metallic", count: 1, swatch: "#0e2a47" },
        { label: "designo Diamond White Metallic", count: 1, swatch: "#f3efe9" },
        { label: "Diffused Silver Metallic", count: 1, swatch: "#bdc0c4" },
        { label: "Digital Yellow", count: 1, swatch: "#e9c63b" },
        { label: "Ebony Black", count: 1, swatch: "#101010" },
        { label: "Electric Blue Metallic", count: 1, swatch: "#1c5fb7" },
        { label: "Frost White Pearl", count: 1, swatch: "#f7f5ef" },
        { label: "Glacier Silver Metallic", count: 1, swatch: "#c9ccd0" },
        { label: "Granite Crystal Metallic Clearcoat", count: 1, swatch: "#535557" },
        { label: "Ice Silver Metallic", count: 1, swatch: "#d4d7da" },
        { label: "Ingot Silver Metallic", count: 1, swatch: "#bdc0c2" },
        { label: "Iridium Silver Metallic", count: 1, swatch: "#a8abae" },
        { label: "Lapis Blue Pearl", count: 1, swatch: "#1c3f7a" },
        { label: "Mineral Gray Metallic", count: 1, swatch: "#5a5d61" },
        { label: "Nightfall Gray Metallic", count: 1, swatch: "#3a3d41" },
        { label: "Olive Green Pearlcoat", count: 1, swatch: "#4a5d3e" },
        { label: "Oxford White", count: 1, swatch: "#f5f3ee" },
        { label: "Pacific Blue Metallic", count: 1, swatch: "#214a78" },
        { label: "Phantom Black", count: 1, swatch: "#0b0b0d" },
        { label: "Platinum Gray Metallic", count: 2, swatch: "#7f8285" },
        { label: "Shadow Gray Metallic", count: 1, swatch: "#494c4f" },
        { label: "Silver Ice Metallic", count: 2, swatch: "#c8cbce" },
        { label: "Summit White", count: 1, swatch: "#f6f4ef" },
        { label: "Symphony Silver", count: 1, swatch: "#b5b8bb" },
        { label: "Undercover Green", count: 1, swatch: "#3a4a3a" },
        { label: "Venom Red Pearl", count: 1, swatch: "#7d1b1f" },
        { label: "White Diamond Tricoat", count: 1, swatch: "#f4f1ea" }
    ],
    interiorColor: [
        { label: "Beige/Espresso", count: 1, swatch: "#c9b48a" },
        { label: "Black/Light Graystone", count: 1, swatch: "#3a3a3c" },
        { label: "Black", count: 14, swatch: "#0e0e0e" },
        { label: "Charcoal Black", count: 2, swatch: "#191919" },
        { label: "Charcoal", count: 1, swatch: "#2a2a2a" },
        { label: "Dark Atmosphere/Medium Ash Gray", count: 1, swatch: "#5a5b5d" },
        { label: "Ebony", count: 3, swatch: "#141414" },
        { label: "Gray", count: 3, swatch: "#7c7e80" },
        { label: "Jet Black/Brick", count: 1, swatch: "#1a0a0a" },
        { label: "Jet Black/Dark Titanium", count: 1, swatch: "#171717" },
        { label: "Jet Black", count: 8, swatch: "#0a0a0a" },
        { label: "Ruby Red/Black", count: 1, swatch: "#5a1414" },
        { label: "Sahara Beige/Mocha", count: 1, swatch: "#b8956a" },
        { label: "Sepia", count: 1, swatch: "#7e5b3e" },
        { label: "Titan Black", count: 3, swatch: "#0d0d0e" },
        { label: "Warm Ivory", count: 1, swatch: "#e8dcc6" }
    ],
    drivetrain: [
        { label: "All Wheel Drive", count: 17 },
        { label: "Four Wheel Drive", count: 6 },
        { label: "Front Wheel Drive", count: 20 },
        { label: "Rear Wheel Drive", count: 1 }
    ],
    fuelType: [
        { label: "Diesel Fuel", count: 1 },
        { label: "Flex Fuel Capability", count: 1 },
        { label: "Gasoline Fuel", count: 40 },
        { label: "Plug-In Electric/Gas", count: 2 }
    ],
    cityMpg: [
        { label: "Other", count: 3, key: "other" },
        { label: "Over 10 MPG", count: 41, key: "10" },
        { label: "Over 20 MPG", count: 32, key: "20" },
        { label: "Over 30 MPG", count: 2, key: "30" }
    ],
    highwayMpg: [
        { label: "Other", count: 3, key: "other" },
        { label: "Over 10 MPG", count: 41, key: "10" },
        { label: "Over 20 MPG", count: 39, key: "20" },
        { label: "Over 30 MPG", count: 22, key: "30" },
        { label: "Over 40 MPG", count: 4, key: "40" }
    ],
    transmission: [
        { label: "Automatic", count: 42 },
        { label: "Manual", count: 2 }
    ]
};

/* ---------- Inventory (44 vehicles) ----------
   Each row: [make, model, modelFamily(imagin), year, drivetrain, fuelType, transmission, cityMpg, hwyMpg, price, mileage]
   modelFamily is used by carImg() to fetch brand-accurate render from imagin.studio.
*/
const MODELS = [
    ["Mercedes-Benz","E 450 4MATIC Sedan","E-Class",2022,"All Wheel Drive","Gasoline Fuel","Automatic",21,30,84500,18420],
    ["BMW","M340i xDrive","3 Series",2021,"All Wheel Drive","Gasoline Fuel","Automatic",22,30,62900,32100],
    ["Audi","A6 55 TFSI Premium Plus","A6",2022,"All Wheel Drive","Gasoline Fuel","Automatic",22,31,58900,24500],
    ["Porsche","Macan S","Macan",2021,"All Wheel Drive","Gasoline Fuel","Automatic",18,23,64950,19800],
    ["Lexus","RX 350 F Sport","RX",2022,"All Wheel Drive","Gasoline Fuel","Automatic",19,26,52400,21900],
    ["Land-Rover","Range Rover Velar P250 R-Dynamic","Range Rover Velar",2021,"All Wheel Drive","Gasoline Fuel","Automatic",21,27,56900,22600],
    ["Genesis","G70 3.3T Sport","G70",2022,"All Wheel Drive","Gasoline Fuel","Automatic",18,25,42800,17400],
    ["Volvo","XC90 T6 Inscription","XC90",2021,"All Wheel Drive","Gasoline Fuel","Automatic",19,27,49200,28800],
    ["BMW","X5 xDrive40i","X5",2022,"All Wheel Drive","Gasoline Fuel","Automatic",21,26,67400,21300],
    ["Mercedes-Benz","GLE 450 4MATIC","GLE-Class",2022,"All Wheel Drive","Gasoline Fuel","Automatic",19,25,72900,18900],
    ["Audi","Q5 45 Premium Plus","Q5",2021,"All Wheel Drive","Gasoline Fuel","Automatic",23,28,41800,26400],
    ["Cadillac","CT5-V Blackwing","CT5",2022,"Rear Wheel Drive","Gasoline Fuel","Manual",13,21,108900,8400],
    ["Subaru","Outback Touring XT","Outback",2022,"All Wheel Drive","Gasoline Fuel","Automatic",23,30,36200,21900],
    ["Mercedes-Benz","GLC 300 4MATIC","GLC-Class",2022,"All Wheel Drive","Gasoline Fuel","Automatic",22,29,46800,19400],
    ["Lexus","NX 350 F Sport","NX",2022,"All Wheel Drive","Gasoline Fuel","Automatic",22,28,44900,16200],
    ["Audi","Q7 55 TFSI","Q7",2021,"All Wheel Drive","Gasoline Fuel","Automatic",17,21,62400,26900],
    ["BMW","X3 M40i","X3",2021,"All Wheel Drive","Gasoline Fuel","Automatic",21,27,49800,28100],
    ["Jeep","Grand Cherokee Summit","Grand Cherokee",2022,"Four Wheel Drive","Gasoline Fuel","Automatic",19,26,57800,22400],
    ["Ford","F-150 Lariat","F-150",2021,"Four Wheel Drive","Flex Fuel Capability","Automatic",17,23,52900,31600],
    ["Toyota","4Runner TRD Off-Road","4Runner",2021,"Four Wheel Drive","Gasoline Fuel","Automatic",16,19,42800,28900],
    ["Land-Rover","Defender 110 X","Defender",2022,"Four Wheel Drive","Gasoline Fuel","Automatic",17,22,84500,18400],
    ["GMC","Sierra 1500 Denali","Sierra 1500",2021,"Four Wheel Drive","Gasoline Fuel","Automatic",16,21,58900,29200],
    ["Ram","1500 Limited","1500",2022,"Four Wheel Drive","Diesel Fuel","Automatic",22,32,61900,21800],
    ["Acura","TLX A-Spec","TLX",2021,"Front Wheel Drive","Gasoline Fuel","Automatic",22,31,34900,29400],
    ["Honda","Accord Touring 2.0T","Accord",2022,"Front Wheel Drive","Gasoline Fuel","Automatic",22,32,32800,24100],
    ["Toyota","Camry XSE V6","Camry",2022,"Front Wheel Drive","Gasoline Fuel","Automatic",22,33,32400,18900],
    ["Nissan","Maxima Platinum","Maxima",2021,"Front Wheel Drive","Gasoline Fuel","Automatic",20,30,28900,32100],
    ["Hyundai","Sonata N Line","Sonata",2022,"Front Wheel Drive","Gasoline Fuel","Automatic",23,33,29400,21800],
    ["Kia","K5 GT-Line","K5",2022,"Front Wheel Drive","Gasoline Fuel","Automatic",24,32,26900,18900],
    ["Mazda","CX-5 Signature","CX-5",2022,"Front Wheel Drive","Gasoline Fuel","Automatic",22,28,31200,19800],
    ["Lexus","ES 350 F Sport","ES",2022,"Front Wheel Drive","Gasoline Fuel","Automatic",22,32,42800,18200],
    ["Acura","RDX A-Spec","RDX",2021,"Front Wheel Drive","Gasoline Fuel","Automatic",21,27,38400,26800],
    ["Honda","CR-V Touring","CR-V",2022,"Front Wheel Drive","Gasoline Fuel","Automatic",27,32,29800,23100],
    ["Toyota","RAV4 XLE Premium","RAV4",2022,"Front Wheel Drive","Gasoline Fuel","Automatic",27,35,29400,18900],
    ["Nissan","Altima SR","Altima",2022,"Front Wheel Drive","Gasoline Fuel","Automatic",27,37,26400,18900],
    ["Hyundai","Tucson Limited","Tucson",2022,"Front Wheel Drive","Gasoline Fuel","Automatic",24,29,27900,21400],
    ["Kia","Sportage SX Prestige","Sportage",2022,"Front Wheel Drive","Gasoline Fuel","Automatic",25,32,28400,18900],
    ["Mazda","Mazda3 Premium","Mazda3",2022,"Front Wheel Drive","Gasoline Fuel","Automatic",26,35,24800,18900],
    ["Buick","Encore GX Essence","Encore GX",2022,"Front Wheel Drive","Gasoline Fuel","Automatic",26,30,24400,19800],
    ["Chevrolet","Malibu Premier","Malibu",2021,"Front Wheel Drive","Gasoline Fuel","Automatic",22,33,21900,29400],
    ["Ford","Mustang Mach 1","Mustang",2022,"Rear Wheel Drive","Gasoline Fuel","Manual",15,24,57400,6900],
    ["Volkswagen","Golf GTI Autobahn","Golf",2022,"Front Wheel Drive","Gasoline Fuel","Automatic",24,34,32800,14800],
    ["Toyota","Prius Prime XLE","Prius Prime",2022,"Front Wheel Drive","Plug-In Electric/Gas","Automatic",55,53,28900,18900],
    ["BMW","330e xDrive","3 Series",2022,"All Wheel Drive","Plug-In Electric/Gas","Automatic",75,32,46900,17800]
];

window.INVENTORY = MODELS.map((m, i) => {
    const [make, model, modelFamily, year, drivetrain, fuelType, transmission, cityMpg, highwayMpg, price, mileage] = m;
    const ext = window.FILTERS.exteriorColor;
    const intr = window.FILTERS.interiorColor;
    const extPool = [];
    ext.forEach(c => { for (let j = 0; j < c.count; j++) extPool.push(c); });
    const intPool = [];
    intr.forEach(c => { for (let j = 0; j < c.count; j++) intPool.push(c); });
    const exterior = extPool[i % extPool.length];
    const interior = intPool[i % intPool.length];
    return {
        id: i + 1,
        make, model, modelFamily, year,
        title: `${make.replace("-", "-")} ${model}`.replace("Land-Rover", "Land Rover"),
        displayMake: make.replace("-", " "),
        condition: "Pre-Owned",
        exteriorColor: exterior.label,
        exteriorSwatch: exterior.swatch,
        interiorColor: interior.label,
        interiorSwatch: interior.swatch,
        drivetrain, fuelType, transmission,
        cityMpg, highwayMpg, price, mileage,
        photo: window.carImg(make, modelFamily, "09"),
        photoSide: window.carImg(make, modelFamily, "23"),
        photoRear: window.carImg(make, modelFamily, "01"),
        vin: `WAU${String(1000000 + i * 8137).slice(0, 14)}`
    };
});
