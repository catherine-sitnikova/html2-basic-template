const sort = document.querySelector('.catalog__sort');
const sortButton = document.querySelector('.catalog__sort-select');
const sortValue = document.querySelector('.catalog__sort-value');
const sortOptions = document.querySelectorAll('.catalog__sort-option');
const sortInput = document.querySelector('input[name="sort"]');

sortButton.addEventListener('click', () => {
  const isOpened = sort.classList.contains('catalog__sort--opened');

  sort.classList.toggle('catalog__sort--opened', !isOpened);
  sort.classList.toggle('catalog__sort--closed', isOpened);

  sortButton.setAttribute('aria-expanded', String(!isOpened));
});

sortOptions.forEach((option) => {
  option.addEventListener('click', () => {
    sortValue.textContent = option.textContent.trim();
    sortInput.value = option.dataset.value;

    sortOptions.forEach((item) => {
      const isSelected = item === option;

      item.classList.toggle('catalog__sort-option--selected', isSelected);
      item.setAttribute('aria-selected', String(isSelected));
    });

    sort.classList.replace('catalog__sort--opened', 'catalog__sort--closed');
    sortButton.setAttribute('aria-expanded', 'false');
  });
});

document.addEventListener('click', (event) => {
  if (!sort.contains(event.target)) {
    sort.classList.replace('catalog__sort--opened', 'catalog__sort--closed');
    sortButton.setAttribute('aria-expanded', 'false');
  }
});