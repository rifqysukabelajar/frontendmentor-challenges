// USAGE EXAMPLES:
// const div = createElement('div');
// const span = createElement('span', 'todo-count', '5 items left');
// const btn = createElement('button', ['btn', 'primary'], 'Click', { type: 'button' });

export function createElement({
  tag,
  classNames = null,
  content = "",
  attribute = {},
}) {
  if (!tag || typeof tag !== "string") {
    throw new Error("Parameter tag tidak boleh kosong dan berupa string");
  }

  const el = document.createElement(tag);

  if (classNames) {
    // Array.isArray(classNames) ==> cek apakah classNames itu array atau bukan

    // Kalau classNames = ['todo-footer', 'surface'] (berupa array)
    // maka ...classNames menghasilkan: 'todo-footer', 'surface'
    // el.classList.add('todo-footer', 'surface')

    // kalau classNames = 'todo-footer' (berupa string biasa)
    // masukin classNames ke dalam array
    // lalu ...[classNames] menghasilkan: 'todo-footer'
    // el.classList.add('todo-footer')

    // Versi mudah dibaca
    // const classList = Array.isArray(classes) ? classes : [classes];
    // el.classList.add(...classList);

    el.classList.add(
      ...(Array.isArray(classNames) ? classNames : [classNames]),
    );
  }

  if (content) {
    el.textContent = content;
  }

  // Misal: attribute = { 'aria-label': 'Clear' }
  // Object.entries(attribute) menghasilkan:
  // ['aria-label', 'Clear']
  // lalu di loop: key='aria-label', value='Clear'
  Object.entries(attribute).forEach(([key, value]) => {
    // pastikan key dan value tidak undefine/null
    // supaya tidak setAtribute kosong
    if (key && value !== undefined && value !== null) {
      // setAttribute() hanya menerima string
      // String(value) memastikan value dikonversi ke string
      // Contoh: value=123 => '123'
      el.setAttribute(key, String(value));
    }
  });

  return el;
}
