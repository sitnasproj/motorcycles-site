async function loadBikes() {
  const res = await fetch('/bikes.json');
  const bikes = await res.json();
  const grid = document.getElementById('stockGrid');
  grid.innerHTML = '';

  bikes.forEach(bike => {
    const card = document.createElement('article');
    card.className = 'card';
    card.dataset.type = bike.category;

    const imgSrc = bike.images?.[0] || '/images/placeholder.jpg';

    card.innerHTML = `
      <img src="${imgSrc}" alt="${bike.name}" loading="lazy" />
      <div class="body">
        <h4>${bike.name}</h4>
        <div class="muted">${bike.mileage}</div>
        <div class="price">${bike.price}</div>
        <div class="muted">
          ${bike.tags.map(t => `<span class="tag">${t}</span>`).join(' ')}
        </div>
      </div>
    `;

    grid.appendChild(card);
  });

  setupFilters();
}

// Filter function (same logic as before)
function setupFilters() {
  const chips = document.querySelectorAll('.chip');
  const cards = document.querySelectorAll('#stockGrid .card');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const filter = chip.dataset.filter;
      cards.forEach(card => {
        card.style.display = (filter === 'all' || card.dataset.type === filter)
          ? '' : 'none';
      });
    });
  });
}

document.getElementById('y').textContent = new Date().getFullYear();
loadBikes();
