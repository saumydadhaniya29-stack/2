// ===== SERIES PAGE ENGINE =====
// This single script powers EVERY series page (ludo-promo, ludo-prime, future series).
// Each series page just loads its own data file (e.g. ludo-promo.data.js) which defines
// a `seriesData` object, then includes this file to render + wire up search and WhatsApp enquiry.

const WHATSAPP_NUMBER = '918306543264';

function renderSeriesPage() {
  if (typeof seriesData === 'undefined') {
    console.error('seriesData not found — make sure the .data.js file is loaded before series-engine.js');
    return;
  }

  // ---- Header ----
  document.title = seriesData.seriesName + ' Series – FlowGem';
  const titleEl = document.getElementById('seriesTitle');
  if (titleEl) {
    titleEl.innerHTML = seriesData.seriesName.split(' ').map((word, i) =>
      i === seriesData.titleAccentIndex ? `<span>${word}</span>` : word
    ).join(' ') + ' Series';
  }
  const subEl = document.getElementById('seriesSubtitle');
  if (subEl) {
    subEl.textContent = `${seriesData.tagline} — ${seriesData.products.length} Exclusive Variant${seriesData.products.length !== 1 ? 's' : ''}`;
  }
  const countEl = document.getElementById('productCount');
  if (countEl) countEl.textContent = seriesData.products.length;

  // ---- Render product cards ----
  const grid = document.getElementById('lbGrid');
  const emptyState = document.getElementById('lbEmpty');

  function renderCards(products) {
    grid.innerHTML = '';
    if (products.length === 0) {
      emptyState.classList.add('show');
      return;
    }
    emptyState.classList.remove('show');

    products.forEach(p => {
      const card = document.createElement('div');
      card.className = 'lb-card';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');

      const enquireText = `${p.name} - ${p.code}${p.price ? ' - ₹' + p.price + '/-' : ''}`;
      card.onclick = () => enquireProduct(enquireText);
      card.onkeypress = (e) => { if (e.key === 'Enter') enquireProduct(enquireText); };

      const detailsHTML = (p.details || []).map(d => `<span><b>${d.label}:</b> ${d.value}</span>`).join('');

      card.innerHTML = `
        <div class="lb-card-img">
          <span class="lb-card-num">${p.code}</span>
          ${p.image
            ? `<img src="${p.image}" alt="${p.name} ${p.code}" class="lb-prod-img" loading="lazy" onerror="this.onerror=null;this.replaceWith(Object.assign(document.createElement('i'),{className:'fa-solid fa-faucet fallback-icon'}))" />`
            : `<i class="fa-solid fa-faucet fallback-icon"></i>`}
        </div>
        <div class="lb-card-body">
          <h3>${p.name}</h3>
          <div class="lb-details">
            <span><b>Code:</b> ${p.code}</span>
            ${detailsHTML}
          </div>
          <div class="lb-card-footer">
            <span class="lb-price">${p.price ? '₹' + p.price + '/-' : 'Ask price'}</span>
            <button class="lb-enquire" type="button">Enquire</button>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  renderCards(seriesData.products);

  // ---- Search ----
  const searchInput = document.getElementById('lbSearch');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.trim().toLowerCase();
      const filtered = seriesData.products.filter(p =>
        p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q)
      );
      renderCards(filtered);
    });
  }
}

function enquireProduct(productText) {
  const msg = `🔵 *FlowGem Product Enquiry*\n\n🚿 *Product:* ${productText}\n\nPlease send me more details and pricing.`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
}

document.addEventListener('DOMContentLoaded', renderSeriesPage);
