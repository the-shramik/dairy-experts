import { asset } from '../lib/asset'
// Single source of truth for site content.
// Items marked `TODO(client)` are demo placeholders. Replace them once the client shares real data.

export const company = {
  name: 'The Dairy Experts (India) Pvt. Ltd.',
  short: 'The Dairy Experts',
  tagline: 'The Ultimate Destination for Complete Dairy Solutions',
  email: 'info@thedairyexperts.com',
  website: 'www.thedairyexperts.com',
  address: [
    'M. No. 226, Near Swami Samarth Mandir,',
    'Behind Sound Casting, MIDC Shiroli, Shiye,',
    'Tal. Karveer, Dist. Kolhapur,',
    'Maharashtra, India 416122',
  ],
  mapQuery: 'MIDC Shiroli, Shiye, Kolhapur, Maharashtra 416122',
  whatsapp: '919823014113',
  brochure: asset('/the-dairy-experts-brochure.pdf'),
  phones: {
    sales: ['+91 98230 14113', '+91 98815 15005', '+91 90119 99931'],
    service: ['+91 82950 59924', '+91 87085 67764', '+91 99756 88998'],
  },
  hours: 'Mon to Sat, 9:30 AM to 6:30 PM', // TODO(client): confirm working hours
  // TODO(client): fill these in. CIN must be shown on a company website (Companies (Incorporation) Rules, Rule 26).
  cin: '',
  gstin: '',
}

export const tel = (p) => `tel:${p.replace(/\s/g, '')}`

export const nav = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services & Supply' },
  { to: '/spare-parts', label: 'Spare Parts' },
  { to: '/projects', label: 'Projects' },
  { to: '/team', label: 'Team' },
  { to: '/contact', label: 'Contact' },
]

export const stats = [
  { value: 10, suffix: ' Lakh', label: 'LPD max turnkey capacity' },
  { value: 15, suffix: '+', label: 'Equipment lines supplied' },
  { value: 100, suffix: '%', label: 'Sales across Indian states' },
  { value: 4, suffix: '', label: 'Group & partner companies' },
]

export const services = [
  {
    id: 'sourcing',
    icon: 'Factory',
    title: 'Machinery Sourcing & Supply',
    short: 'Heavy-duty dairy processing equipment with a strong focus on centrifugal separators and high-pressure homogenizers.',
    body: 'We specialize in the procurement and supply of heavy-duty dairy processing equipment. From high-capacity centrifugal separators to advanced high-pressure homogenizers, we deliver machines that drive efficiency and product excellence.',
    points: ['New & reconditioned machines', 'Separators, homogenizers, pasteurizers', 'Matched to plant capacity'],
    image: asset('/images/homogenizer-unit.webp'),
  },
  {
    id: 'spares',
    icon: 'Cog',
    title: 'Precision Spare Parts',
    short: 'Rapid sourcing of matched-set industrial components so your machinery stays operational and reliable.',
    body: 'Downtime is the enemy of dairy production. We specialize in the rapid sourcing and supply of highly specific, matched-set industrial components such as drive gears, wheels, plungers, valves and seals, so your heavy machinery stays operational.',
    points: ['Homogenizer & HP pump spares', 'Separator & clarifier spares', 'PHE plates & gaskets'],
    image: asset('/images/spares-bench.webp'),
  },
  {
    id: 'consultancy',
    icon: 'Lightbulb',
    title: 'Dairy Consultancy',
    short: 'Strategic insight to modernize facilities and bridge traditional methods with scalable technology.',
    body: 'Beyond equipment, we offer the strategic insight needed to modernize dairy facilities. We bridge the gap between traditional processing methods and scalable, modern technology to help clients improve yield, quality and sustainable growth.',
    points: ['Plant layouts & design', 'Process optimization', 'Capacity expansion planning'],
    image: asset('/images/plant-layout.webp'),
  },
  {
    id: 'installation',
    icon: 'Wrench',
    title: 'Installation & Commissioning',
    short: 'Erection and commissioning of complete dairy plants, executed by our own engineering teams.',
    body: 'Our engineering teams handle erection and commissioning of complete dairy plants and individual equipment, from piping and utilities to trial runs and handover, anywhere in India.',
    points: ['Complete plant erection', 'Trial runs & handover', 'Operator training'],
    image: asset('/images/plant-floor.webp'),
  },
  {
    id: 'maintenance',
    icon: 'RefreshCcw',
    title: 'Reconditioning & On-site Repair',
    short: 'Preventive maintenance, troubleshooting and reconditioning support for dairy machinery on site.',
    body: 'Our team provides comprehensive maintenance strategies and hands-on troubleshooting. We work closely with plant managers to execute seamless upgrades, conduct preventive maintenance and recondition machinery on site.',
    points: ['Preventive maintenance plans', 'On-site troubleshooting', 'Machine reconditioning'],
    image: asset('/images/spares-workshop.webp'),
  },
]

export const machines = [
  { name: 'Milk Homogenizer', tag: 'High pressure', image: asset('/images/m-hp-homogenizer.webp') },
  { name: 'Cream Separator', tag: 'Manual & self-cleaning', image: asset('/images/m-separator.webp') },
  { name: 'Pasteurizer & PHE', tag: 'HTST / skid mounted', image: asset('/images/m-pasteurizer.webp') },
  { name: 'High Pressure Pump', tag: 'Homogenizing duty', image: asset('/images/m-homogenizer.webp') },
  { name: 'Bulk Milk Cooler', tag: 'Chilling & storage', image: asset('/images/m-milk-cooler.webp') },
]

export const equipment = [
  'Homogenizers',
  'High Pressure Pumps',
  'Separators (Manual & Self Cleaning)',
  'Bactofuge',
  'Clarifiers',
  'Ghee Clarifier',
  'Continuous Butter Making Machines',
  'Butter Churn & Reworkers',
  'Pasteurizers & Plate Heat Exchangers',
  'Evaporators',
  'Packing & Wrapping Machines',
  'Ice Cream Making & Packing Machines',
  'Ice Cream Freezers',
  'Cheese Making Equipment',
  'Bulk Milk Coolers & Chilling Plants',
  'Turnkey Projects',
]

// Spare part photos (cropped from the client's own spare part photos, each carrying their logo).
export const spareCategories = [
  { id: 'homogenizer', label: 'Homogenizer & HP Pump' },
  { id: 'separator', label: 'Separator & Clarifier' },
  { id: 'phe', label: 'PHE & Process Line' },
]

export const spareParts = [
  { name: 'Pistons', cat: 'homogenizer', img: 'sp-pistons', note: 'Precision machined, matched sets' },
  { name: 'Plungers & Plunger Rods', cat: 'homogenizer', img: 'sp-plungers', note: 'Hard-coated for long wear life' },
  { name: 'Homogenizing Valve Block', cat: 'homogenizer', img: 'sp-valve-block', note: 'Single and two-stage assemblies' },
  { name: 'Pump Head / Cylinder Block', cat: 'homogenizer', img: 'sp-pump-head', note: 'SS 316 blocks and covers' },
  { name: 'Poppet Valves & Springs', cat: 'homogenizer', img: 'sp-valves-springs', note: 'Suction and discharge valves' },
  { name: 'Connecting Rods', cat: 'homogenizer', img: 'sp-connecting-rods', note: 'With bearings and bushes' },
  { name: 'Pressure Gauges', cat: 'homogenizer', img: 'sp-pressure-gauge', note: 'Inlet and outlet gauges' },
  { name: 'Valve Seats & Impact Rings', cat: 'homogenizer', img: 'sp-valve-seat', note: 'Stellite and TC options' },
  { name: 'Gaskets, O-Rings & Packing', cat: 'homogenizer', img: 'sp-orings', note: 'Chevron packing and seal kits' },
  { name: 'Separator Bowl', cat: 'separator', img: 'sp-bowl', note: 'Bowl body, hood and parts' },
  { name: 'Bowl Disc Stack', cat: 'separator', img: 'sp-disc-stack', note: 'Discs, top disc and spacers' },
  { name: 'Brake Drum & Pulley', cat: 'separator', img: 'sp-brake-drum', note: 'Brake and clutch parts' },
  { name: 'Drive Gears & Worm Wheels', cat: 'separator', img: 'sp-gears', note: 'Matched gear sets' },
  { name: 'Bearings', cat: 'separator', img: 'sp-bearings', note: 'Spindle and worm shaft bearings' },
  { name: 'Distributor Cone', cat: 'separator', img: 'sp-cone', note: 'Distributor and paring parts' },
  { name: 'Bowl Housing & Lock Ring', cat: 'separator', img: 'sp-seal-housing', note: 'Lock rings and housings' },
  { name: 'SS Fasteners', cat: 'separator', img: 'sp-fasteners', note: 'Studs, nuts and bolts' },
  { name: 'PHE Plates', cat: 'phe', img: 'sp-phe-plate', note: 'SS 304 / 316 plates' },
  { name: 'PHE Plate Pack', cat: 'phe', img: 'sp-phe-pack', note: 'Complete packs for all frames' },
  { name: 'PHE Gaskets', cat: 'phe', img: 'sp-phe-gaskets', note: 'EPDM and NBR gaskets' },
].map((p) => ({ ...p, img: asset(`/images/spares/${p.img}.webp`) }))

// Additional parts we supply that are not photographed yet.
export const moreSpares = [
  'Crankshaft', 'Oil pumps & filters', 'Hydraulic cylinders', 'Belts', 'Solenoid valves', 'Hand wheels',
  'Spindle assembly', 'Sliding piston & seals', 'Paring discs', 'Friction pads',
  'Pump impellers', 'Mechanical seals', 'Valves & fittings', 'SS pipes & bends', 'Sensors & instruments',
]

export const solutions = ['Milk Processing', 'Curd / Yogurt', 'Butter Milk', 'Paneer', 'Ghee', 'Shrikhand', 'Lassi', 'Ice Cream', 'Cream', 'Butter']

export const tradingProducts = ['SMP', 'Dairy Whitener', 'Ghee', 'Butter', 'Cheese', 'Paneer', 'Milk related products']

export const process = [
  { title: 'Consultation', text: 'We study your product mix, capacity and site to define the right solution.' },
  { title: 'Layout & Design', text: 'Plant layouts, process flow and equipment selection for your LPD target.' },
  { title: 'Supply & Erection', text: 'Machinery supply, piping and complete erection by our own engineers.' },
  { title: 'Commissioning & Support', text: 'Trial runs, training, spares and long-term maintenance support.' },
]

// Equipment makes referenced for spares/service compatibility.
// TODO(client): confirm which makes they service before going live.
export const makes = ['Tetra Pak', 'GEA', 'SPX Flow', 'APV', 'Gaulin', 'Alfa Laval', 'Bos Homogenisers', 'FBF Italia', 'Westfalia']

export const partners = {
  marketing: [
    { name: 'Milkman Global Ltd.', logo: asset('/images/partner-milkman.png') },
    { name: 'Milkman Makin, Turkey', logo: null },
  ],
  group: [
    { name: 'Sanulal Group', logo: asset('/images/group-sanulal.png') },
    { name: 'Eswar Dairy Solutions', logo: asset('/images/group-eswar.png') },
    { name: 'Varun Dairy Machinery & Services', logo: asset('/images/group-varun.png') },
  ],
}

// TODO(client): replace names & designations with real team details.
export const team = [
  { name: 'Team Member', role: 'Managing Director', photo: asset('/images/team-1.webp') },
  { name: 'Team Member', role: 'Sales Director', photo: asset('/images/team-2.webp') },
  { name: 'Team Member', role: 'Projects Director', photo: asset('/images/team-3.webp') },
  { name: 'Team Member', role: 'Head of Service & Maintenance', photo: asset('/images/team-4.webp') },
  { name: 'Team Member', role: 'Sales Manager', photo: asset('/images/team-5.webp') },
  { name: 'Team Member', role: 'Service Engineer', photo: asset('/images/team-6.webp') },
]

export const gallery = [
  { src: asset('/images/plant-floor.webp'), title: 'Milk processing hall', cat: 'Processing' },
  { src: asset('/images/aerial-plant.webp'), title: 'Complete dairy plant, aerial view', cat: 'Turnkey' },
  { src: asset('/images/silo-branded.webp'), title: 'Milk storage silo', cat: 'Storage' },
  { src: asset('/images/plant-layout.webp'), title: 'Dairy plant layout design', cat: 'Design' },
  { src: asset('/images/storage-tank.webp'), title: 'Horizontal milk storage tank', cat: 'Storage' },
  { src: asset('/images/homogenizer-unit.webp'), title: 'High-pressure homogenizer installation', cat: 'Processing' },
  { src: asset('/images/hero-plant.webp'), title: 'Separation & pasteurization line', cat: 'Processing' },
  { src: asset('/images/silo-row.webp'), title: 'Silo & process tank farm', cat: 'Storage' },
  { src: asset('/images/plant-processing.webp'), title: 'Processing vat in operation', cat: 'Processing' },
  { src: asset('/images/tank-room.webp'), title: 'Process tank room', cat: 'Turnkey' },
  { src: asset('/images/process-hall.webp'), title: 'Process hall with platforms', cat: 'Turnkey' },
  { src: asset('/images/pipeline.webp'), title: 'SS process piping', cat: 'Turnkey' },
]

// Answers use only facts from the company brochure.
export const faqs = [
  {
    q: 'What size of dairy plant can you set up?',
    a: 'We take up turnkey dairy projects from 1,000 LPD to 10,00,000 LPD, including project layouts, design, consultation, erection and commissioning.',
  },
  {
    q: 'Do you work outside Maharashtra?',
    a: 'Yes. Our head office is in MIDC Shiroli, Kolhapur, and our sales and service cover all states of India.',
  },
  {
    q: 'Which machines do you supply spare parts for?',
    a: 'Homogenizers, high-pressure pumps, separators (manual and self-cleaning), clarifiers, bactofuge, pasteurizers and plate heat exchangers, along with other dairy machinery we supply.',
  },
  {
    q: 'How do I get a quote for a spare part?',
    a: 'Send us the machine make and model, the part name or number and, if possible, a photo of the old part on WhatsApp or email. Our team will reply with availability and price.',
  },
  {
    q: 'Can you recondition or repair our existing machines?',
    a: 'Yes. We provide reconditioning and repair support for dairy machinery on site, plus preventive maintenance and troubleshooting.',
  },
  {
    q: 'Do you also trade dairy products?',
    a: 'Yes. We trade SMP, dairy whitener, ghee, butter, cheese, paneer and other milk-related products.',
  },
]

// Videos. TODO(client): add the client's own plant / installation videos.
// Hero: short (8-15 s), muted, loopable clip, 1920x1080, under ~4 MB. Put files in public/videos/.
// Example: export const heroVideo = { mp4: asset('/videos/hero.mp4'), webm: asset('/videos/hero.webm') }
export const heroVideo = null

// Projects page "Our work in action". Each item: YouTube id OR a self-hosted file, plus a poster image.
// Example: { title: '50,000 LPD plant, Kolhapur', youtube: 'VIDEO_ID', poster: asset('/images/plant-floor.webp'), duration: '2:15' }
export const videos = []
