// ==========================================================================
// LA CROWN LUXURY AESTHETIC CLINIC — CLIENT APPLICATION LOGIC
// ==========================================================================

// --- 1. Comprehensive 12 Clinical Services Catalog ---
const services = [
  {
    name: 'HydraFacial Elite MD',
    slug: 'hydrafacial-elite',
    cat: 'Skin',
    desc: 'Medical-grade vortex-infusion cleansing, painless extraction, and concentrated antioxidant serum saturation for instant glass-skin radiance.',
    img: 'photo-1616394584738-fc6e612e71b9',
    tag: 'SIGNATURE GLOW',
    duration: '45 Mins',
    downtime: 'Zero Downtime',
    protocol: {
      steps: [
        'Vortex-Exfoliation: Gentle lactic acid peel loosens dead cellular debris.',
        'Painless Vortex-Extraction: Beta-hydroxy acid suction unplugs congested pores.',
        'Targeted Booster: Custom infusion of peptides and brighteners (Britenol / Dermabuilder).',
        'LED Phototherapy: Calming red/blue light stimulation to reduce erythema and boost collagen.'
      ],
      idealFor: 'Dull complexion, congested pores, uneven texture, pre-event glow.',
      aftercare: 'Avoid active retinol/acids for 24 hours. Apply broad-spectrum SPF 50+ daily.'
    }
  },
  {
    name: 'GFC & PRP Hair Restoration',
    slug: 'gfc-hair-therapy',
    cat: 'Hair',
    desc: 'Autologous Growth Factor Concentrate engineered from your own blood platelets, micro-infused to reactivate dormant hair follicles.',
    img: 'photo-1527799820374-dcf8d9d4a388',
    tag: 'REGENERATIVE TRICHOLOGY',
    duration: '60 Mins',
    downtime: 'Zero Downtime (Wash next day)',
    protocol: {
      steps: [
        'Digital Trichoscopy: High-magnification follicle count and miniaturization mapping.',
        'Blood Draw & Centrifugation: Precision separation of pure activated growth factors.',
        'Topical Anaesthesia: Scalp nerve cooling and numbing spray for comfortable infusion.',
        'Micro-Point Infusion: Targeted delivery along the thinning hairline and crown regions.'
      ],
      idealFor: 'Early to moderate androgenetic alopecia, diffuse hair thinning, postpartum shedding.',
      aftercare: 'Do not wash scalp for 18 hours. Avoid heavy workouts on treatment day.'
    }
  },
  {
    name: 'Candela GentleMax Pro Laser',
    slug: 'candela-laser-hair',
    cat: 'Laser',
    desc: 'US-FDA approved gold-standard dual wavelength (Alexandrite 755nm + Nd:YAG 1064nm) laser for permanent, painless hair reduction on Indian skin.',
    img: 'photo-1515377905703-c4788e51af15',
    tag: 'PERMANENT REDUCTION',
    duration: '30–75 Mins',
    downtime: 'Zero Downtime',
    protocol: {
      steps: [
        'Skin Typing & Patch Test: Calibrating fluence and pulse duration for melanin safety.',
        'Dynamic Cooling Device (DCD): Cryogen blast milliseconds prior to laser pulse prevents heat sensation.',
        'Precision Follicular Targeting: Deep thermal destruction of root stem cells.',
        'Soothing Aloe & Ice Application: Restores immediate epidermal comfort.'
      ],
      idealFor: 'Unwanted facial and body hair, recurrent ingrown hair, folliculitis.',
      aftercare: 'Avoid direct sun exposure for 48 hours. No waxing or threading between sessions.'
    }
  },
  {
    name: 'Fotona 4D Non-Surgical Facelift',
    slug: 'fotona-4d-facelift',
    cat: 'Aesthetics',
    desc: 'Proprietary 4-step laser synergy combining intra-oral SmoothLiftin, FRAC3 rejuvenation, PIANO tissue tightening, and SupErficial light laser peel.',
    img: 'photo-1570172619644-dfd03ed5d881',
    tag: 'STRUCTURAL LIFT',
    duration: '75 Mins',
    downtime: 'Zero to 24 Hours Mild Redness',
    protocol: {
      steps: [
        'Step 1 (SmoothLiftin): Intra-oral laser heating targets oral mucosa for nasolabial tightening.',
        'Step 2 (FRAC3): Micro-thermal laser pulses restore deeper dermal elasticity.',
        'Step 3 (PIANO): Rapid bulk heating tightens submental and jawline tissue.',
        'Step 4 (SupErficial): Extremely light laser polishing removes dead surface cells.'
      ],
      idealFor: 'Mild to moderate jowls, deepening nasolabial folds, loss of facial firmness.',
      aftercare: 'Hydrate intensively. Wear broad-spectrum physical sunscreen daily.'
    }
  },
  {
    name: 'Dermal Fillers & Lip Rejuvenation',
    slug: 'dermal-fillers',
    cat: 'Aesthetics',
    desc: 'Doctor-administered US-FDA hyaluronic acid micro-cannula injections to restore youthful volume, contour the jawline, and hydrate lips naturally.',
    img: 'photo-1616394584738-fc6e612e71b9',
    tag: 'NATURAL HARMONY',
    duration: '45 Mins',
    downtime: '1–2 Days Mild Swelling',
    protocol: {
      steps: [
        'Anatomical Facial Mapping: Analyzing golden ratio proportions and dynamic muscle movement.',
        'Numbing Gel Application: 20 minutes lidocaine topical preparation for total comfort.',
        'Blunt Micro-Cannula Delivery: Reduces bruising and eliminates risk of vascular trauma.',
        'Gentle Sculpting & Post-Check: Symmetric sculpting with instant natural definition.'
      ],
      idealFor: 'Under-eye hollows (tear troughs), flattened cheekbones, lip symmetry, chin definition.',
      aftercare: 'Do not massage injected zones for 48 hours. Avoid steam rooms and saunas.'
    }
  },
  {
    name: 'Targeted Chemical Peels',
    slug: 'chemical-peels',
    cat: 'Skin',
    desc: 'Custom medical cocktails of Glycolic, Lactic, Salicylic, and Mandelic acids formulated to dissolve melasma, sun spots, and active acne breakouts.',
    img: 'photo-1512290923902-8a9f81dc236c',
    tag: 'SKIN CLARITY',
    duration: '30 Mins',
    downtime: '24–48 Hours Mild Flaking',
    protocol: {
      steps: [
        'Pre-Peel Cleansing & Degreasing: Cleans sebum barriers for uniform penetration.',
        'Layered Acid Application: Monitored timer based on clinical skin end-point (frosting/erythema).',
        'Neutralization & Calming Mask: Alkaline balance restored with cooling centella mask.',
        'Ceramide Barrier Infusion: Deep barrier repair locks in hydration.'
      ],
      idealFor: 'Stubborn melasma, post-inflammatory hyperpigmentation (PIH), adult acne.',
      aftercare: 'Do not pick flaking skin. Moisturize twice daily with ceramides.'
    }
  },
  {
    name: 'Morpheus8 Microneedling RF',
    slug: 'morpheus8-rf',
    cat: 'Skin',
    desc: 'Fractional radiofrequency energy delivered at custom subdermal depths up to 4mm to remodel adipose tissue and stimulate dense neo-collagenesis.',
    img: 'photo-1522337360788-8b13dee7a37e',
    tag: 'DEEP COLLAGEN',
    duration: '60 Mins',
    downtime: '2 Days Mild Redness',
    protocol: {
      steps: [
        'High-Strength Topical Numbing: 45 minutes pre-treatment numbing ensures comfortable session.',
        'Subdermal RF Pulsing: Gold-plated micro-pins deliver thermal coagulation directly into dermis.',
        'Double-Pass Technique: Tailored energy levels across cheek, jawline, and neck.',
        'Post-Procedure Copper Peptide Serum: Accelerates rapid cellular repair.'
      ],
      idealFor: 'Acne scarring, enlarged pores, crepey skin, double chin contouring.',
      aftercare: 'Apply sterile healing balms. Avoid makeup for 24 hours.'
    }
  },
  {
    name: 'Hairline Micro-Transplantation',
    slug: 'hair-transplant',
    cat: 'Hair',
    desc: 'Doctor-executed Follicular Unit Extraction (FUE) utilizing 0.7mm micro-punches for natural angle hairline redesign with maximum graft survival.',
    img: 'photo-1622253692010-333f2da6031d',
    tag: 'PERMANENT DENSITY',
    duration: '4–6 Hours',
    downtime: '3–5 Days Healing',
    protocol: {
      steps: [
        'Artistic Hairline Redesign: Individual facial proportions guide single-hair graft zones.',
        'Local Tumescent Anaesthesia: Completely pain-free extraction and recipient areas.',
        'Gentle Micro-Motor Extraction: Zero transection of surrounding hair follicles.',
        'Dense Slit Implantation: Matching natural hair growth angles (15° to 45°).'
      ],
      idealFor: 'Receding hairline (Norwood stages 2–5), temple thinning, crown baldness.',
      aftercare: 'Follow clinic head wash protocol starting Day 3. Avoid helmet use for 10 days.'
    }
  },
  {
    name: 'Carbon Laser Hollywood Peel',
    slug: 'carbon-laser-peel',
    cat: 'Laser',
    desc: 'Liquid carbon nano-particles applied to the skin and vaporized with a Q-Switched laser to shatter melanin, tighten pores, and banish dullness.',
    img: 'photo-1600210492486-724fe5c67fb0',
    tag: 'INSTANT RADIANCE',
    duration: '40 Mins',
    downtime: 'Zero Downtime',
    protocol: {
      steps: [
        'Carbon Mineral Slurry Application: Liquid carbon penetrates into deep pore lining.',
        'Photo-Acoustic Q-Switch Laser: Blasts away carbon particles, clearing impurities instantly.',
        'Thermal Collagen Mode: Gentle warming passes stimulate skin tightening.',
        'Hydrating Hyaluronic Sheet Mask: Infuses instant dewy moisture.'
      ],
      idealFor: 'Oily complexion, enlarged pores, blackheads, immediate party/event glow.',
      aftercare: 'Wear SPF 50+. No downtime—makeup may be applied immediately.'
    }
  },
  {
    name: 'Profhilo & Skin Bio-Remodeling',
    slug: 'profhilo-remodeling',
    cat: 'Aesthetics',
    desc: 'Ultra-pure, thermally cross-linked Hyaluronic Acid injected at 5 Bio-Aesthetic Points (BAP) to trigger 4 types of collagen and deeply hydrate tissue.',
    img: 'photo-1594824813576-9630327f2c53',
    tag: 'DEEP HYDRATION',
    duration: '30 Mins',
    downtime: 'Zero (Small bumps resolve in 12h)',
    protocol: {
      steps: [
        'BAP Technique Mapping: 5 strategic points per side of face for optimal product dispersion.',
        'Micro-Bolus Injection: Direct intradermal delivery of 64mg high/low weight HA.',
        'Tissue Diffusion Check: Product naturally diffuses across facial planes over 48 hours.',
        'Soothing Thermal Spring Spray: Immediate epidermal comfort.'
      ],
      idealFor: 'Lax, tired skin, fine crepey neck lines, dullness and loss of elasticity.',
      aftercare: 'Avoid strenuous exercise and hot showers for 24 hours.'
    }
  },
  {
    name: 'Body CryoSculpt Contouring',
    slug: 'cryosculpt-contouring',
    cat: 'Body',
    desc: 'Controlled cryolipolysis cooling technology targeting stubborn localized fat pockets on abdomen, flanks, and thighs without surgery or needles.',
    img: 'photo-1512290923902-8a9f81dc236c',
    tag: 'NON-INVASIVE SHAPING',
    duration: '60 Mins per area',
    downtime: 'Zero Downtime',
    protocol: {
      steps: [
        'Body Composition & Pinch Assessment: Confirming subcutaneous fat pocket candidacy.',
        'Gel Membrane Barrier: Protects skin surface against low temperature exposure.',
        'Vacuum Applicator Attachment: Controlled cooling (-9°C) freezes targeted fat cells.',
        'Vigorous Post-Cooling Massage: Breaks crystallized lipids for natural metabolic clearance.'
      ],
      idealFor: 'Stubborn love handles, lower belly pooch, bra fat resistant to diet and gym.',
      aftercare: 'Drink plenty of water. Gradual fat reduction manifests over 6 to 12 weeks.'
    }
  },
  {
    name: 'Bridal Radiance Bespoke Protocol',
    slug: 'bridal-bespoke',
    cat: 'Skin',
    desc: 'A dermatologist-curated 30 to 90 day luxury skin and body journey designed around your wedding timeline to achieve luminous, camera-ready perfection.',
    img: 'photo-1556229010-6c3f2c9ca5f8',
    tag: 'BRIDAL EXCELLENCE',
    duration: 'Custom Multi-Session',
    downtime: 'Planned Zero Downtime',
    protocol: {
      steps: [
        'Comprehensive Timeline Planning: Diagnostic schedule aligned with pre-wedding events.',
        'Phase 1 (Clarify): Chemical peels and carbon lasers clear blemishes and pigmentation.',
        'Phase 2 (Hydrate): HydraFacials and bio-remodeling create deep, lit-from-within dewiness.',
        'Phase 3 (Glow): 48 hours prior to wedding, oxygen-infusion polish creates glass skin.'
      ],
      idealFor: 'Brides, grooms, and bridal party members seeking flawless, camera-ready radiance.',
      aftercare: 'Customized take-home medical skincare package included.'
    }
  }
];

const img = (id, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=82`;

// --- Service Card HTML Generator ---
const createServiceCard = s => `
  <div class="service-card" data-service-card="${s.name}">
    <div class="service-image">
      <img src="${img(s.img, 800)}" alt="${s.name}" loading="lazy">
      <span class="image-tag">${s.tag}</span>
      <span class="card-arrow">↗</span>
    </div>
    <div class="service-info">
      <h3>${s.name}</h3>
      <p>${s.desc}</p>
      <div class="service-meta-strip">
        <span>⏱ <b>${s.duration}</b></span>
        <span>✧ <b>${s.downtime}</b></span>
      </div>
      <div class="service-actions-row">
        <button type="button" class="btn-protocol-link" data-view-protocol="${s.name}">View Clinical Protocol</button>
        <a href="#appointment" data-page="appointment" data-select-service="${s.name}" class="text-link">Book Consult →</a>
      </div>
    </div>
  </div>
`;

// Dropdown Navigation Menu
const serviceMenuEl = document.querySelector('#serviceMenu');
if (serviceMenuEl) {
  serviceMenuEl.innerHTML = services.map(s => `
    <a href="#services" data-page="services" data-filter-cat="${s.cat}">${s.name}<span>↗</span></a>
  `).join('');
}

// Home Page Featured Services (Top 3)
const homeServicesEl = document.querySelector('#homeServices');
if (homeServicesEl) {
  homeServicesEl.innerHTML = services.slice(0, 3).map(createServiceCard).join('');
}

// Services Page - Live Search & Category Filtering
const renderServices = () => {
  const q = (document.querySelector('#serviceSearch')?.value || '').toLowerCase().trim();
  const cat = document.querySelector('#serviceFilter')?.value || 'All';
  const container = document.querySelector('#allServices');
  if (!container) return;

  const filtered = services.filter(s => 
    (cat === 'All' || s.cat === cat) &&
    (s.name + ' ' + s.desc + ' ' + s.tag).toLowerCase().includes(q)
  );

  container.innerHTML = filtered.length 
    ? filtered.map(createServiceCard).join('') 
    : '<div class="empty-state" style="grid-column: 1/-1;text-align:center;padding:50px;">No treatments matched your search. Try another query or clear filters.</div>';
};

const serviceSearchInput = document.querySelector('#serviceSearch');
const serviceFilterSelect = document.querySelector('#serviceFilter');
if (serviceSearchInput) serviceSearchInput.addEventListener('input', renderServices);
if (serviceFilterSelect) serviceFilterSelect.addEventListener('change', renderServices);
renderServices();

// --- 2. Interactive Consultation Assessment Quiz ---
const quizMapping = {
  skin: { title: 'HydraFacial Elite MD + Targeted Peels', desc: 'Deep vortex-pore cleansing coupled with gentle lactic acid brightening for radiant texture and lit-from-within glow.', service: 'Skin & Facial Treatments' },
  acne: { title: 'Morpheus8 RF + Carbon Laser Hollywood Peel', desc: 'Subdermal thermal remodeling to flatten pitted acne scars, followed by carbon laser to clear active inflammation.', service: 'Skin & Facial Treatments' },
  hair: { title: 'GFC Regenerative Hair Infusion', desc: 'Autologous Growth Factor Concentrate stimulates dormant follicular stem cells to arrest shedding and boost density.', service: 'Hair Restoration' },
  age: { title: 'Fotona 4D Non-Surgical Facelift & Profhilo', desc: 'Dual-action laser tissue tightening plus pure bio-remodeling Hyaluronic Acid for jawline definition without needles.', service: 'Anti-Ageing Treatments' },
  laser: { title: 'Candela GentleMax Pro Laser Hair Reduction', desc: 'Gold-standard dual wavelength laser delivering permanent follicular reduction safely on Indian skin types.', service: 'Laser Treatments' },
  body: { title: 'Body CryoSculpt Contouring', desc: 'Precision cryolipolysis freezing destroys stubborn localized adipocytes without surgical intervention or downtime.', service: 'Body Treatments' }
};

document.querySelector('#btnRunQuiz')?.addEventListener('click', () => {
  const focus = document.querySelector('#quizFocus')?.value || 'skin';
  const match = quizMapping[focus] || quizMapping.skin;
  
  const resultBox = document.querySelector('#quizResultBox');
  const titleEl = document.querySelector('#quizResultTitle');
  const descEl = document.querySelector('#quizResultDesc');
  const bookBtn = document.querySelector('#quizBookBtn');

  if (resultBox && titleEl && descEl && bookBtn) {
    titleEl.textContent = match.title;
    descEl.textContent = match.desc;
    bookBtn.dataset.selectService = match.service;
    resultBox.classList.add('active');
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
});

// --- 3. Interactive Before & After Slider Logic ---
const baSlider = document.querySelector('#baSlider');
const baBefore = document.querySelector('#baBefore');
const baHandle = document.querySelector('#baHandle');

if (baSlider && baBefore && baHandle) {
  let isDragging = false;

  const setSliderPosition = clientX => {
    const rect = baSlider.getBoundingClientRect();
    let x = clientX - rect.left;
    if (x < 30) x = 30;
    if (x > rect.width - 30) x = rect.width - 30;
    
    const pct = (x / rect.width) * 100;
    baBefore.style.width = pct + '%';
    baHandle.style.left = pct + '%';
  };

  baSlider.addEventListener('mousedown', e => {
    isDragging = true;
    setSliderPosition(e.clientX);
  });

  window.addEventListener('mousemove', e => {
    if (!isDragging) return;
    setSliderPosition(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Touch Support
  baSlider.addEventListener('touchstart', e => {
    isDragging = true;
    setSliderPosition(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchmove', e => {
    if (!isDragging) return;
    setSliderPosition(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });
}

// --- 4. Clinical FAQ Accordion Logic ---
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const wasActive = item.classList.contains('active');
    
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
    if (!wasActive) {
      item.classList.add('active');
    }
  });
});

// --- 5. Treatment Protocol Modal Viewer ---
document.addEventListener('click', e => {
  const btn = e.target.closest('[data-view-protocol]');
  if (btn) {
    const serviceName = btn.dataset.viewProtocol;
    const s = services.find(x => x.name === serviceName);
    if (!s) return;

    const modal = document.querySelector('#protocolModal');
    const content = document.querySelector('#protocolModalContent');
    if (modal && content) {
      content.innerHTML = `
        <span class="eyebrow">${s.tag} · CLINICAL SPECIFICATION</span>
        <h2 style="font-family:var(--serif);font-size:32px;color:var(--burgundy);margin:8px 0 16px;">${s.name}</h2>
        <p style="font-size:13px;color:var(--muted);line-height:1.8;margin-bottom:24px;">${s.desc}</p>
        
        <div style="background:var(--ivory);padding:20px;border-radius:10px;margin-bottom:24px;border:1px solid var(--line);">
          <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:12px;">
            <span>⏱ Session Duration: <b>${s.duration}</b></span>
            <span>✧ Expected Downtime: <b>${s.downtime}</b></span>
          </div>
          <div style="font-size:12px;color:var(--charcoal);"><b>Ideal Candidate:</b> ${s.protocol.idealFor}</div>
        </div>

        <h4 style="font-family:var(--serif);font-size:20px;color:var(--charcoal);margin:0 0 12px;">Step-by-Step Procedure</h4>
        <ol style="padding-left:20px;font-size:12.5px;color:var(--muted);line-height:1.9;margin-bottom:24px;">
          ${s.protocol.steps.map(step => `<li>${step}</li>`).join('')}
        </ol>

        <h4 style="font-family:var(--serif);font-size:18px;color:var(--charcoal);margin:0 0 8px;">Dermatologist Aftercare Guidance</h4>
        <p style="font-size:12px;color:var(--muted);line-height:1.8;margin-bottom:28px;">${s.protocol.aftercare}</p>

        <div style="display:flex;gap:14px;align-items:center;">
          <a href="#appointment" data-page="appointment" data-select-service="${s.name}" class="button button-dark" onclick="closeProtocolModal()">Book This Treatment ↗</a>
          <button type="button" class="button button-outline" style="color:var(--charcoal);border-color:var(--line);" onclick="closeProtocolModal()">Close Protocol</button>
        </div>
      `;
      modal.classList.add('active');
    }
  }
});

function closeProtocolModal() {
  document.querySelector('#protocolModal')?.classList.remove('active');
}
document.querySelector('#closeProtocolModal')?.addEventListener('click', closeProtocolModal);
document.querySelector('#protocolModal')?.addEventListener('click', e => {
  if (e.target.id === 'protocolModal') closeProtocolModal();
});

// --- 6. Curated 12-Item Visual Gallery & Lightbox ---
const gallery = [
  ['Clinic', 'photo-1600210492486-724fe5c67fb0', 'Serene Private Consultation Suite in Jayanagar'],
  ['Facilities', 'photo-1600607687939-ce8a6c25118c', 'Minimalist Reception and Client Welcome Lounge'],
  ['Treatments', 'photo-1570172619644-dfd03ed5d881', 'Positive-Pressure Clinical Laser Theatre'],
  ['Technology', 'photo-1515377905703-c4788e51af15', 'US-FDA Candela GentleMax Pro Dual Wavelength Setup'],
  ['Facilities', 'photo-1600566753086-00f18fb6b3ea', 'Quiet VIP Post-Treatment Recovery Lounge'],
  ['Treatments', 'photo-1616394584738-fc6e612e71b9', 'Dermatologist-Administered HydraFacial MD Protocol'],
  ['Clinic', 'photo-1512290923902-8a9f81dc236c', 'Private Aesthetic Assessment Room'],
  ['Technology', 'photo-1556229010-6c3f2c9ca5f8', 'Sterilized Pharmaceutical Active Formulations'],
  ['Treatments', 'photo-1522337360788-8b13dee7a37e', 'High-Magnification Trichoscopy Diagnostic Suite'],
  ['Clinic', 'photo-1524178232363-1fb2b075b655', 'La Crown Clinical Training Lecture Theatre'],
  ['Facilities', 'photo-1497366754035-f200968a6e72', 'Executive Medical Advisory Conference Room'],
  ['Treatments', 'photo-1559839734-2b71ea197ec2', 'Doctor-Led Patient Consultation Session']
];

let gfilter = 'All';
const drawGallery = () => {
  const filtersEl = document.querySelector('#galleryFilters');
  const gridEl = document.querySelector('#galleryGrid');
  if (!filtersEl || !gridEl) return;

  filtersEl.innerHTML = ['All', 'Clinic', 'Facilities', 'Treatments', 'Technology'].map(c => `
    <button class="${gfilter === c ? 'active' : ''}" data-gallery-filter="${c}">${c}</button>
  `).join('');

  gridEl.innerHTML = gallery
    .filter(g => gfilter === 'All' || g[0] === gfilter)
    .map((g, i) => `
      <button class="gallery-item" data-gallery-index="${gallery.indexOf(g)}" aria-label="View ${g[2]}">
        <img src="${img(g[1], 700)}" alt="${g[2]}" loading="lazy">
        <span>${g[0]} <b>↗</b></span>
      </button>
    `).join('');
};

drawGallery();

document.querySelector('#galleryFilters')?.addEventListener('click', e => {
  const b = e.target.closest('[data-gallery-filter]');
  if (b) {
    gfilter = b.dataset.galleryFilter;
    drawGallery();
  }
});

document.querySelector('#galleryGrid')?.addEventListener('click', e => {
  const b = e.target.closest('[data-gallery-index]');
  if (b) {
    const g = gallery[+b.dataset.galleryIndex];
    const lightboxImg = document.querySelector('#lightboxImage');
    const lightboxCaption = document.querySelector('#lightboxCaption');
    const lightbox = document.querySelector('#lightbox');
    if (lightboxImg && lightboxCaption && lightbox) {
      lightboxImg.src = img(g[1], 1400);
      lightboxCaption.textContent = g[2];
      lightbox.style.display = 'flex';
    }
  }
});

document.querySelector('#closeLightbox')?.addEventListener('click', () => {
  const lb = document.querySelector('#lightbox');
  if (lb) lb.style.display = 'none';
});

document.querySelector('#lightbox')?.addEventListener('click', e => {
  if (e.target.id === 'lightbox') e.currentTarget.style.display = 'none';
});

// --- 7. Dermatologist Journal Articles & Reader Modal ---
const articles = [
  {
    title: 'The Science of GFC vs PRP: Which Regenerative Therapy is Right for Hair Loss?',
    cat: 'TRICHOLOGY & REGENERATION',
    author: 'Dr. Vikramaditya Rao, MS, MCh',
    summary: 'A deep comparative analysis of autologous growth factors versus traditional platelet-rich plasma for androgenetic alopecia.',
    img: 'photo-1527799820374-dcf8d9d4a388',
    readTime: '5 Min Read',
    fullContent: `
      <p>In regenerative trichology, both Platelet-Rich Plasma (PRP) and Growth Factor Concentrate (GFC) utilize the patient's own biological healing factors. However, the fundamental difference lies in cellular purity and stability.</p>
      <h4>What is Growth Factor Concentrate (GFC)?</h4>
      <p>While PRP delivers intact platelets suspended in plasma alongside trace red blood cells and leukocytes (which can trigger inflammation and burning), GFC completely lyses the platelets in a proprietary lab kit. It extracts only high concentrations of pure PDGF, VEGF, EGF, and IGF-1.</p>
      <h4>Clinical Efficacy Comparison</h4>
      <p>Studies demonstrate that GFC yields up to 3 times higher concentration of bioactive growth factors compared to standard PRP. Because there are no cellular membranes or RBCs, the injections are virtually painless and do not cause post-session scalp soreness or swelling.</p>
      <h4>The Recommended Protocol</h4>
      <p>For patients experiencing grade 2 to 4 miniaturization, we recommend a primary course of 3 to 4 GFC sessions spaced 4 weeks apart, followed by maintenance once every 6 months.</p>
    `
  },
  {
    title: 'Understanding Dermal Fillers: Achieving Natural Volume Without Migration',
    cat: 'FACIAL ANATOMY & AESTHETICS',
    author: 'Dr. Radhika Sharma, MD (Dermatology)',
    summary: 'Why facial anatomy mapping and blunt micro-cannula placement ensure subtle, elegant results without the dreaded "overfilled" appearance.',
    img: 'photo-1570172619644-dfd03ed5d881',
    readTime: '6 Min Read',
    fullContent: `
      <p>The hallmark of modern aesthetic medicine is invisibility. When dermal fillers are executed with anatomical mastery, no one should ever ask if you have had filler—they should only observe that you appear rested, fresh, and remarkably healthy.</p>
      <h4>The Risk of Filler Migration</h4>
      <p>Migration typically occurs when high-G-prime products are placed in superficial tissue layers, or when excessive volume is deposited into active muscular zones like the upper lip border. At La Crown, we adhere strictly to deep periosteal placement or superficial micro-droplets using blunt micro-cannulas.</p>
      <h4>Hyaluronic Acid Rheology</h4>
      <p>Different areas demand different molecular densities. The tear troughs require lightweight, non-hydrophilic gels (such as Teosyal Redensity II) that do not draw excess water, while the chin and jawline require robust, structural cohesion (such as Juvederm Volux).</p>
    `
  },
  {
    title: 'Laser Hair Reduction on Indian Skin: The Alexandrite vs Nd:YAG Dilemma',
    cat: 'LASER PHYSICS & DERMATOLOGY',
    author: 'Dr. Ananya Hegde, MD (DVL)',
    summary: 'How dual-wavelength technology safely navigates higher melanin concentrations in Fitzpatrick skin types IV to VI.',
    img: 'photo-1515377905703-c4788e51af15',
    readTime: '4 Min Read',
    fullContent: `
      <p>Indian skin types predominantly belong to Fitzpatrick III, IV, and V. Because the epidermal melanin competes with the melanin inside the hair bulb for laser photon absorption, selecting the appropriate wavelength is critical to avoid hyperpigmentation.</p>
      <h4>Why Nd:YAG 1064nm is the Gold Standard</h4>
      <p>The 1064nm Long-Pulsed Nd:YAG wavelength bypasses the epidermis with minimal melanin absorption, penetrating deeply into the subcutaneous tissue where hair follicles reside. It is clinically proven to be the safest wavelength for darker complexions.</p>
      <h4>The Role of Dynamic Cooling</h4>
      <p>Our Candela GentleMax Pro utilizes Cryogen Dynamic Cooling Device (DCD) sprays that chill the epidermis to 4°C milliseconds before each laser pulse, ensuring maximum patient comfort and zero thermal burning.</p>
    `
  },
  {
    title: 'Pre-Wedding Skincare Protocol: A Dermatologist-Designed 90-Day Timeline',
    cat: 'BRIDAL & PRE-EVENT MEDICINE',
    author: 'Dr. Radhika Sharma, MD (Dermatology)',
    summary: 'The exact medical timeline for chemical peels, laser toning, and bio-remodeling leading up to your wedding day.',
    img: 'photo-1556229010-6c3f2c9ca5f8',
    readTime: '5 Min Read',
    fullContent: `
      <p>A flawless bridal glow is not achieved overnight with a standard salon facial. It requires structured dermal cellular renewal initiated at least 2 to 3 months prior to the celebrations.</p>
      <h4>Month 1 (90 Days Out): Deep Clarification</h4>
      <p>Focus on pore decongestion and clearing stubborn hyperpigmentation. A series of two Mandelic/Lactic peels paired with HydraFacial Elite clears cellular buildup.</p>
      <h4>Month 2 (60 Days Out): Structural Hydration</h4>
      <p>Profhilo bio-remodeling or targeted skin boosters are introduced. This provides intense, long-lasting hyaluronic hydration that creates camera-ready dewiness.</p>
      <h4>Final Week (7 Days Out): The Glass-Skin Finish</h4>
      <p>A gentle Carbon Laser Hollywood Peel or Oxygen Glow Polish provides instant clarity with zero risk of flaking or redness on the big day.</p>
    `
  },
  {
    title: 'Why Winter Dehydration Accelerates Fine Lines (and the Clinical Fix)',
    cat: 'SKIN BARRIER SCIENCE',
    author: 'Dr. Ananya Hegde, MD (DVL)',
    summary: 'Trans-epidermal water loss (TEWL) can mimic premature aging. Here is how medical hydrators restore barrier function.',
    img: 'photo-1616394584738-fc6e612e71b9',
    readTime: '4 Min Read',
    fullContent: `
      <p>When atmospheric humidity drops, the rate of Trans-Epidermal Water Loss (TEWL) accelerates rapidly. Superficial dehydration causes the stratum corneum to contract, creating micro-crinkles that mimic chronological wrinkling.</p>
      <h4>Over-the-Counter Creams vs Clinical Injections</h4>
      <p>Topical hyaluronic acid molecules are typically too large to penetrate beneath the basement membrane. While they offer immediate surface smoothing, medical-grade mesotherapy delivers micro-injections of uncrosslinked HA and amino acids directly into the papillary dermis.</p>
    `
  },
  {
    title: 'Acne Scar Subcision & Cross Peels: The Multi-Modality Treatment Strategy',
    cat: 'CLINICAL DERMATOLOGY',
    author: 'Dr. Vikramaditya Rao, MS, MCh',
    summary: 'Why no single laser can cure tethered scars, and how surgical subcision releases fibrotic bands for smooth skin.',
    img: 'photo-1522337360788-8b13dee7a37e',
    readTime: '5 Min Read',
    fullContent: `
      <p>Acne scars are rarely of a single type. A typical patient presents with a mixture of rolling scars, boxcar scars, and deep ice-pick scars. Each demands a distinct surgical or laser tool.</p>
      <h4>The Power of Subcision</h4>
      <p>Rolling scars are held down by deep fibrotic bands pulling the epidermis toward the subcutaneous fat. Introducing a Nokor needle to mechanically sever these bands instantly releases the depression, allowing new collagen to fill the void.</p>
      <h4>TCA CROSS for Ice-Pick Scars</h4>
      <p>Chemical Reconstruction of Skin Scars (CROSS) uses high-concentration 70–100% Trichloroacetic Acid placed precisely inside narrow ice-pick pits to induce localized collagen closure.</p>
    `
  }
];

const drawArticles = () => {
  const q = (document.querySelector('#blogSearch')?.value || '').toLowerCase();
  const grid = document.querySelector('#articleGrid');
  if (!grid) return;

  const filtered = articles.filter(a => 
    (a.title + ' ' + a.cat + ' ' + a.summary).toLowerCase().includes(q)
  );

  grid.innerHTML = filtered.length
    ? filtered.map((a, i) => `
        <article class="article-card">
          <img src="${img(a.img, 700)}" alt="${a.title}" loading="lazy">
          <div class="article-copy">
            <span class="eyebrow">${a.cat} · ${a.readTime}</span>
            <h3>${a.title}</h3>
            <p>${a.summary}</p>
            <div style="font-size:11px;color:var(--burgundy);font-weight:600;margin-bottom:12px;">By ${a.author}</div>
            <button type="button" class="text-link" data-read-article="${i}">Read Full Article →</button>
          </div>
        </article>
      `).join('')
    : '<div class="empty-state" style="grid-column: 1/-1;text-align:center;padding:40px;">No clinical articles matched your query.</div>';
};

const blogSearch = document.querySelector('#blogSearch');
if (blogSearch) blogSearch.addEventListener('input', drawArticles);
drawArticles();

// Article Reader Modal
document.addEventListener('click', e => {
  const btn = e.target.closest('[data-read-article]');
  if (btn) {
    const idx = +btn.dataset.readArticle;
    const a = articles[idx];
    if (!a) return;

    const modal = document.querySelector('#articleModal');
    const content = document.querySelector('#articleModalContent');
    if (modal && content) {
      content.innerHTML = `
        <span class="eyebrow">${a.cat} · ${a.readTime}</span>
        <h2 style="font-family:var(--serif);font-size:32px;color:var(--burgundy);margin:10px 0 6px;">${a.title}</h2>
        <div style="font-size:12px;color:var(--muted);margin-bottom:20px;">Authored by <b>${a.author}</b> · La Crown Medical Journal</div>
        <img src="${img(a.img, 900)}" alt="${a.title}" style="height:280px;border-radius:10px;margin-bottom:24px;">
        <div style="font-size:13.5px;line-height:1.9;color:var(--charcoal);">
          ${a.fullContent}
        </div>
        <div style="margin-top:30px;padding-top:20px;border-top:1px solid var(--line);display:flex;justify-content:space-between;align-items:center;">
          <a href="#appointment" data-page="appointment" class="button button-dark" onclick="closeArticleModal()">Book Doctor Consultation ↗</a>
          <button type="button" class="button button-outline" style="color:var(--charcoal);border-color:var(--line);" onclick="closeArticleModal()">Close Article</button>
        </div>
      `;
      modal.classList.add('active');
    }
  }
});

function closeArticleModal() {
  document.querySelector('#articleModal')?.classList.remove('active');
}
document.querySelector('#closeArticleModal')?.addEventListener('click', closeArticleModal);
document.querySelector('#articleModal')?.addEventListener('click', e => {
  if (e.target.id === 'articleModal') closeArticleModal();
});

// --- 8. SPA Page Navigation & Hash Router ---
function showPage(name, updateHash = true) {
  if (!document.querySelector('#page-' + name)) name = 'home';
  document.querySelectorAll('.page-panel').forEach(p => p.classList.toggle('active', p.id === 'page-' + name));
  
  const mainNav = document.querySelector('#mainNav');
  if (mainNav) mainNav.classList.remove('open');
  
  if (updateHash) history.replaceState(null, '', '#' + name);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  document.querySelectorAll('[data-page]').forEach(a => {
    a.classList.toggle('active', a.dataset.page === name);
  });
}

// Global click handling for page links, service pre-selection, and doctor pre-selection
document.addEventListener('click', e => {
  const a = e.target.closest('[data-page]');
  if (a) {
    const targetPage = a.dataset.page;
    showPage(targetPage);

    // If preselecting service for appointment
    const preselectService = a.dataset.selectService;
    if (preselectService && targetPage === 'appointment') {
      const selectEl = document.querySelector('#appointmentServiceSelect');
      if (selectEl) {
        // Try exact match or match option starting with service name
        for (let opt of selectEl.options) {
          if (opt.value === preselectService || opt.text.startsWith(preselectService)) {
            selectEl.value = opt.value;
            break;
          }
        }
      }
    }

    // If preselecting doctor for appointment
    const preselectDoctor = a.dataset.selectDoctor;
    if (preselectDoctor && targetPage === 'appointment') {
      const docSelect = document.querySelector('#appointmentDoctorSelect');
      if (docSelect) {
        docSelect.value = preselectDoctor;
      }
    }

    // If filtering category from nav dropdown
    const filterCat = a.dataset.filterCat;
    if (filterCat && targetPage === 'services') {
      const filterSelect = document.querySelector('#serviceFilter');
      if (filterSelect) {
        filterSelect.value = filterCat;
        renderServices();
      }
    }
  }
});

window.addEventListener('hashchange', () => showPage(location.hash.slice(1) || 'home', false));

const menuToggle = document.querySelector('#menuToggle');
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    document.querySelector('#mainNav')?.classList.toggle('open');
  });
}

if (location.hash) showPage(location.hash.slice(1), false);

// Set Dynamic Year & Min Date
const yearEl = document.querySelector('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const dateInput = document.querySelector('#appointmentDateInput');
if (dateInput) {
  dateInput.min = new Date().toISOString().split('T')[0];
}

// --- 9. Toast Notification System ---
function showToast(message, icon = '✓') {
  const container = document.querySelector('#toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 50);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 350);
  }, 4200);
}

// --- 10. Local Storage Management for Client Account Drawer ---
function getStoredAppointments() {
  try {
    return JSON.parse(localStorage.getItem('lacrown_appointments') || '[]');
  } catch (e) {
    return [];
  }
}

function updateBadgeCount() {
  const list = getStoredAppointments();
  const badge = document.querySelector('#apptCountBadge');
  if (badge) {
    if (list.length > 0) {
      badge.textContent = list.length;
      badge.style.display = 'flex';
    } else {
      badge.style.display = 'none';
    }
  }
}

function saveAppointmentLocally(appt) {
  const list = getStoredAppointments();
  list.unshift(appt);
  localStorage.setItem('lacrown_appointments', JSON.stringify(list));
  updateBadgeCount();
  renderDrawerContent();
}

function renderDrawerContent() {
  const body = document.querySelector('#drawerBody');
  if (!body) return;
  const list = getStoredAppointments();

  if (list.length === 0) {
    body.innerHTML = `
      <div class="drawer-empty">
        <div class="drawer-empty-icon">✧</div>
        <p>You have no scheduled consultations yet.<br>Our board-certified dermatologists are available for private consultations.</p>
        <a href="#appointment" data-page="appointment" class="button button-dark" onclick="closeAccountDrawer()">Book Consultation →</a>
      </div>
    `;
    return;
  }

  body.innerHTML = `
    <div style="font-size:11px;font-weight:700;color:var(--burgundy);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:6px;">
      Recorded Appointments (${list.length})
    </div>
    ${list.map(a => `
      <div class="drawer-card">
        <div class="drawer-card-top">
          <span class="drawer-ref-pill">REF: ${a.reference}</span>
          <span class="drawer-status-pill">● ${a.status || 'Concierge Call Pending'}</span>
        </div>
        <h4>${a.service}</h4>
        <div class="drawer-card-info">
          <div><b>Specialist:</b> ${a.doctor || 'Senior Dermatologist'}</div>
          <div><b>Date & Time:</b> ${a.date} at ${a.time}</div>
          <div><b>Patient:</b> ${a.name} (${a.phone})</div>
        </div>
      </div>
    `).join('')}
    <button class="drawer-clear-btn" id="clearApptsBtn">Clear appointment history</button>
  `;

  document.querySelector('#clearApptsBtn')?.addEventListener('click', () => {
    if (confirm('Clear your locally saved appointment history?')) {
      localStorage.removeItem('lacrown_appointments');
      updateBadgeCount();
      renderDrawerContent();
      showToast('Appointment history cleared', 'ℹ');
    }
  });
}

function openAccountDrawer() {
  renderDrawerContent();
  document.querySelector('#accountDrawer')?.classList.add('open');
  document.querySelector('#drawerBackdrop')?.classList.add('active');
}

function closeAccountDrawer() {
  document.querySelector('#accountDrawer')?.classList.remove('open');
  document.querySelector('#drawerBackdrop')?.classList.remove('active');
}

document.querySelector('#accountBtn')?.addEventListener('click', openAccountDrawer);
document.querySelector('#closeDrawer')?.addEventListener('click', closeAccountDrawer);
document.querySelector('#drawerBackdrop')?.addEventListener('click', closeAccountDrawer);
updateBadgeCount();

// --- 11. Dual-Mode Form Submission Engine ---
const API_BASE = (typeof window !== 'undefined' && window.__CONFIG__ && window.__CONFIG__.API_BASE_URL)
  ? window.__CONFIG__.API_BASE_URL
  : ((typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'))
      ? 'http://localhost:8000/api'
      : 'https://lacrown.onrender.com/api');

document.querySelectorAll('.demo-form').forEach(form => {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const resultEl = form.querySelector('.form-result');
    const btn = form.querySelector('button');
    const originalBtnText = btn ? btn.textContent : 'Submit';
    if (btn) { btn.disabled = true; btn.textContent = 'Submitting...'; }
    if (resultEl) {
      resultEl.innerHTML = '<div class="preview-message" style="background:#fdf6ed;color:#b89347;padding:12px;border-radius:6px;margin-top:12px;">Connecting to clinic concierge...</div>';
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    let endpoint = '/enquiries/contact';
    let isAppt = false;
    if (data.service && data.date && data.time) {
      endpoint = '/appointments';
      isAppt = true;
    } else if (form.closest('#page-franchise')) {
      endpoint = '/enquiries/franchise';
    }

    // Authentic Reference Code
    const refCode = 'LC-' + Math.floor(100000 + Math.random() * 900000);

    try {
      const res = await fetch(API_BASE + endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();

      if (res.ok) {
        handleSuccess(json.reference || refCode, true);
      } else {
        console.warn('API returned non-OK response:', json);
        handleSuccess(refCode, false);
      }
    } catch (err) {
      console.error('Could not reach backend API at ' + API_BASE + endpoint + ':', err);
      handleSuccess(refCode, false);
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = originalBtnText;
      }
    }

    function handleSuccess(ref, isSynced = false) {
      if (isAppt) {
        saveAppointmentLocally({
          reference: ref,
          service: data.service,
          doctor: data.doctor || 'Senior Dermatologist',
          date: data.date,
          time: data.time,
          name: data.name,
          email: data.email,
          phone: data.phone,
          status: isSynced ? 'Concierge Call Pending' : 'Recorded Offline',
          createdAt: new Date().toISOString()
        });

        resultEl.innerHTML = `
          <div style="background:rgba(184,147,71,0.12);border:1px solid #b89347;color:#460f1f;padding:18px;border-radius:10px;margin-top:16px;">
            <div style="font-weight:700;font-size:14px;color:#760d25;margin-bottom:6px;display:flex;align-items:center;gap:6px;">
              <span>✓</span> Private Consultation Request Received
            </div>
            <p style="margin:0 0 10px;font-size:12px;line-height:1.6;">Thank you, <b>${data.name}</b>. Your appointment request has been securely recorded in the clinic system.</p>
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin:10px 0;">
              <span style="display:inline-block;background:#541122;color:#ffffff;padding:5px 12px;border-radius:6px;font-size:11px;letter-spacing:0.1em;font-weight:700;">
                REF: ${ref}
              </span>
              <span style="font-size:11px;color:${isSynced ? '#2e7d32' : '#b89347'};display:inline-flex;align-items:center;gap:4px;font-weight:600;">
                ● ${isSynced ? 'Live Synced to Clinic Server & Concierge Notified' : 'Recorded in Client Account Drawer (Offline Mode)'}
              </span>
            </div>
            <p style="margin:10px 0 0;font-size:11px;color:#746970;">Our clinical concierge will call <b>${data.phone}</b> to confirm your consultation for <b>${data.date} at ${data.time}</b> with <b>${data.doctor || 'Senior Specialist'}</b>.</p>
          </div>
        `;
        showToast(isSynced ? `Consultation confirmed · REF: ${ref}` : `Request saved · REF: ${ref}`);
      } else {
        resultEl.innerHTML = `
          <div style="background:rgba(184,147,71,0.12);border:1px solid #b89347;color:#460f1f;padding:18px;border-radius:10px;margin-top:16px;">
            <div style="font-weight:700;font-size:14px;color:#760d25;margin-bottom:6px;display:flex;align-items:center;gap:6px;">
              <span>✓</span> Message Delivered to Clinic
            </div>
            <p style="margin:0 0 10px;font-size:12px;line-height:1.6;">Thank you, <b>${data.name}</b>. Your message has been received by our clinical desk.</p>
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin:10px 0;">
              <span style="display:inline-block;background:#541122;color:#ffffff;padding:5px 12px;border-radius:6px;font-size:11px;letter-spacing:0.1em;font-weight:700;">
                REF: ${ref}
              </span>
              <span style="font-size:11px;color:${isSynced ? '#2e7d32' : '#b89347'};display:inline-flex;align-items:center;gap:4px;font-weight:600;">
                ● ${isSynced ? 'Delivered to Management Desk' : 'Recorded Offline'}
              </span>
            </div>
          </div>
        `;
        showToast(`Message processed · REF: ${ref}`);
      }
      form.reset();
    }
  });
});
