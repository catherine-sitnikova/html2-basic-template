import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

const initPriceSlider = () => {
  const priceRange = document.querySelector('#price-range');
  const minPriceInput = document.querySelector('input[name="price-min"]');
  const maxPriceInput = document.querySelector('input[name="price-max"]');
  const catalogForm = document.querySelector('#catalog-form');

  if (!priceRange || !minPriceInput || !maxPriceInput || !catalogForm) {
    return;
  }

  // Защита от повторной инициализации
  if (priceRange.noUiSlider) {
    return;
  }

  const MIN_PRICE = 0;
  const MAX_PRICE = 1000;
  const DEFAULT_MIN = 0;
  const DEFAULT_MAX = 900;

  noUiSlider.create(priceRange, {
    start: [DEFAULT_MIN, DEFAULT_MAX],
    connect: true,
    step: 1,
    range: {
      min: MIN_PRICE,
      max: MAX_PRICE,
    },
    format: {
      to: (value) => String(Math.round(value)),
      from: (value) => Number(value),
    },
  });

  const priceSlider = priceRange.noUiSlider;

  // Обновляем поля при перемещении ползунков
  priceSlider.on('update', (values) => {
    minPriceInput.value = values[0];
    maxPriceInput.value = values[1];
  });

  // Проверяем введённую цену
  const getPrice = (input, defaultValue) => {
    if (input.value.trim() === '') {
      return defaultValue;
    }

    const value = Number(input.value);

    if (!Number.isFinite(value)) {
      return defaultValue;
    }

    return Math.min(MAX_PRICE, Math.max(MIN_PRICE, value));
  };

  // Обновляем ползунки при изменении полей ввода
  const updateSliderFromInputs = (event) => {
    let minPrice = getPrice(minPriceInput, DEFAULT_MIN);
    let maxPrice = getPrice(maxPriceInput, DEFAULT_MAX);

    if (minPrice > maxPrice) {
      if (event.currentTarget === minPriceInput) {
        minPrice = maxPrice;
      } else {
        maxPrice = minPrice;
      }
    }

    priceSlider.set([minPrice, maxPrice]);
  };

  minPriceInput.addEventListener('change', updateSliderFromInputs);
  maxPriceInput.addEventListener('change', updateSliderFromInputs);

  // Сбрасываем слайдер вместе с формой
  catalogForm.addEventListener('reset', () => {
    window.setTimeout(() => {
      priceSlider.set([DEFAULT_MIN, DEFAULT_MAX]);
    }, 0);
  });
};

export default initPriceSlider;