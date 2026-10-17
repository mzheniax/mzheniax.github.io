// Початковий набір даних для тестування сортування
let products = [
  { id: 1, name: "Оптична миша", desc: "USB, 1200 DPI", price: 350.00, dateAdded: "2026-09-01", sklad: 1 },
  { id: 2, name: "Килимок для миші", desc: "Тканинний, 900x400 мм", price: 420.00, dateAdded: "2026-09-05", sklad: 0 },
  { id: 10, name: "Механічна клавіатура", desc: "Red Switches, RGB", price: 2100.00, dateAdded: "2026-09-10", sklad: 1 },
  { id: 25, name: "Навушники з мікрофоном", desc: "3.5 мм, чорні", price: 1150.00, dateAdded: "2026-09-15", sklad: 0 }
];

let currentSort = { column: null, direction: 'asc' };

// Отримання посилань на DOM-елементи
const form = document.getElementById('productForm');
const formTitle = document.getElementById('formTitle');
const editOriginalId = document.getElementById('editOriginalId');
const inputId = document.getElementById('productId');
const inputName = document.getElementById('productName');
const inputPrice = document.getElementById('productPrice');
const inputDate = document.getElementById('productDate');
const inputSklad = document.getElementById('productSklad');
const inputDesc = document.getElementById('productDesc');
const cancelBtn = document.getElementById('cancelBtn');
const tableBody = document.getElementById('productsTableBody');
const bugModeToggle = document.getElementById('bugModeToggle');

// Встановлення поточної дати за замовчуванням
inputDate.value = new Date().toISOString().split('T')[0];

function clearErrors() {
  ['idError', 'nameError', 'priceError', 'dateError'].forEach(id => {
    const el = document.getElementById(id);
    el.textContent = '';
    el.style.display = 'none';
  });
}

function showError(fieldId, message) {
  const el = document.getElementById(fieldId);
  el.textContent = message;
  el.style.display = 'block';
}

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, function(m) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
  });
}

function renderTable() {
  tableBody.innerHTML = '';

  if (products.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="7" class="empty-row">Список товарів порожній. Додайте перший товар через форму вище.</td></tr>';
    return;
  }

  products.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><b>${p.id}</b></td>
      <td>${escapeHtml(p.name)}</td>
      <td style="color: var(--text-muted);">${escapeHtml(p.desc || '—')}</td>
      <td>${Number(p.price).toFixed(2)}</td>
      <td>${p.dateAdded}</td>
      <td>
        <span class="badge ${p.sklad === 1 ? 'badge-in-stock' : 'badge-out-stock'}">
          ${p.sklad === 1 ? '1 — Є на складі' : '0 — Відсутній'}
        </span>
      </td>
      <td>
        <div class="table-actions">
          <button class="btn btn-secondary btn-sm" onclick="editProduct(${p.id})">Редагувати</button>
          <button class="btn btn-danger btn-sm" onclick="deleteProduct(${p.id})">Видалити</button>
        </div>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}

// Обробка надсилання форми (створення / оновлення товару)
form.addEventListener('submit', (e) => {
  e.preventDefault();
  clearErrors();

  const idVal = inputId.value.trim();
  const nameVal = inputName.value.trim();
  const priceVal = inputPrice.value.trim();
  const dateVal = inputDate.value;
  const skladVal = parseInt(inputSklad.value, 10);
  const descVal = inputDesc.value.trim();
  const originalId = editOriginalId.value;

  let hasError = false;

  // Валідація ID
  if (!idVal) {
    showError('idError', 'ID є обов’язковим полем');
    hasError = true;
  } else {
    const parsedId = parseInt(idVal, 10);
    const isDuplicate = products.some(p => p.id === parsedId && (!originalId || p.id !== parseInt(originalId, 10)));
    if (isDuplicate) {
      showError('idError', 'Товар з таким ID вже існує (має бути унікальним)');
      hasError = true;
    }
  }

  // Валідація назви
  if (!nameVal) {
    showError('nameError', 'Назва товару обов’язкова');
    hasError = true;
  }

  // Валідація ціни
  if (!priceVal) {
    showError('priceError', 'Ціна є обов’язковою');
    hasError = true;
  } else {
    const parsedPrice = parseFloat(priceVal);
    if (isNaN(parsedPrice)) {
      showError('priceError', 'Ціна має бути числом');
      hasError = true;
    } else if (parsedPrice < 0) {
      showError('priceError', 'Ціна не може бути від’ємною');
      hasError = true;
    }
  }

  // Валідація дати
  if (!dateVal) {
    showError('dateError', 'Оберіть дату додавання');
    hasError = true;
  }

  if (hasError) return;

  const parsedId = parseInt(idVal, 10);
  const parsedPrice = parseFloat(priceVal);

  if (originalId) {
    // Редагування запису
    const idx = products.findIndex(p => p.id === parseInt(originalId, 10));
    if (idx !== -1) {
      products[idx] = {
        id: parsedId,
        name: nameVal,
        desc: descVal,
        price: parsedPrice,
        dateAdded: dateVal,
        sklad: skladVal
      };
    }
    resetForm();
  } else {
    // Додавання нового запису
    products.push({
      id: parsedId,
      name: nameVal,
      desc: descVal,
      price: parsedPrice,
      dateAdded: dateVal,
      sklad: skladVal
    });
    form.reset();
    inputDate.value = new Date().toISOString().split('T')[0];
  }

  renderTable();
});

// Редагування товару
window.editProduct = function(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  clearErrors();
  editOriginalId.value = product.id;
  inputId.value = product.id;
  inputName.value = product.name;
  inputPrice.value = product.price;
  inputDate.value = product.dateAdded;
  inputSklad.value = product.sklad;
  inputDesc.value = product.desc;

  formTitle.textContent = `Редагування товару #${product.id}`;
  cancelBtn.style.display = 'inline-block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Видалення товару
window.deleteProduct = function(id) {
  if (confirm(`Ви впевнені, що бажаєте видалити товар з ID ${id}?`)) {
    products = products.filter(p => p.id !== id);
    if (editOriginalId.value === String(id)) {
      resetForm();
    }
    renderTable();
  }
};

cancelBtn.addEventListener('click', resetForm);

function resetForm() {
  form.reset();
  editOriginalId.value = '';
  formTitle.textContent = 'Додати новий товар';
  cancelBtn.style.display = 'none';
  clearErrors();
  inputDate.value = new Date().toISOString().split('T')[0];
}

// Обробники сортування за Варіантом 10: ID та Sklad
document.getElementById('thId').addEventListener('click', () => {
  toggleSort('id');
});

document.getElementById('thSklad').addEventListener('click', () => {
  toggleSort('sklad');
});

function toggleSort(column) {
  if (currentSort.column === column) {
    currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
  } else {
    currentSort.column = column;
    currentSort.direction = 'asc';
  }

  applySort();
  updateSortIcons();
  renderTable();
}

function applySort() {
  if (!currentSort.column) return;

  const dir = currentSort.direction === 'asc' ? 1 : -1;
  const isBugMode = bugModeToggle.checked;

  products.sort((a, b) => {
    if (currentSort.column === 'id') {
      if (isBugMode) {
        // Дефект: рядкове/лексикографічне порівняння ("1", "10", "2", "25")
        return String(a.id).localeCompare(String(b.id)) * dir;
      } else {
        // Виправлення: нормальне числове порівняння (1, 2, 10, 25)
        return (a.id - b.id) * dir;
      }
    }

    if (currentSort.column === 'sklad') {
      return (a.sklad - b.sklad) * dir;
    }

    return 0;
  });
}

function updateSortIcons() {
  const iconId = document.getElementById('sortIconId');
  const iconSklad = document.getElementById('sortIconSklad');

  iconId.textContent = '↕';
  iconSklad.textContent = '↕';

  if (currentSort.column === 'id') {
    iconId.textContent = currentSort.direction === 'asc' ? '↑' : '↓';
  } else if (currentSort.column === 'sklad') {
    iconSklad.textContent = currentSort.direction === 'asc' ? '↑' : '↓';
  }
}

bugModeToggle.addEventListener('change', () => {
  if (currentSort.column) {
    applySort();
    renderTable();
  }
});

// Початкове відображення таблиці
renderTable();