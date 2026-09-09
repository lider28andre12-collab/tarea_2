const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const themeToggle = $('.theme-toggle');
const storedTheme = localStorage.getItem('nexo-theme');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (storedTheme === 'dark' || (!storedTheme && systemDark)) document.body.classList.add('dark-theme');
$('.theme-icon').textContent = document.body.classList.contains('dark-theme') ? '☀' : '◐';
themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  localStorage.setItem('nexo-theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
  $('.theme-icon').textContent = document.body.classList.contains('dark-theme') ? '☀' : '◐';
});

const menuToggle = $('.menu-toggle');
const menu = $('.nav-menu');
menuToggle?.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open);
});
$$('.nav-menu a').forEach(link => link.addEventListener('click', () => menu.classList.remove('open')));

const cycleData = {
  fetch: ['Fetch / buscar', 'La Unidad de Control toma la próxima instrucción desde memoria usando el contador de programa.', 'PC → MAR → IR'],
  decode: ['Decode / interpretar', 'La instrucción se descompone y la Unidad de Control identifica la operación y sus operandos.', 'IR → UC → señales'],
  execute: ['Execute / ejecutar', 'La ALU realiza el cálculo o la operación solicitada y actualiza el resultado.', 'ALU → REG → salida']
};
$$('.cycle-step').forEach(step => step.addEventListener('click', () => {
  $$('.cycle-step').forEach(item => item.classList.remove('active'));
  step.classList.add('active');
  const [title, text, data] = cycleData[step.dataset.step];
  $('#cycle-title').textContent = title; $('#cycle-text').textContent = text; $('#cycle-data').textContent = data;
  $('.cycle-beam').style.transform = `translateX(${step.dataset.step === 'fetch' ? 0 : step.dataset.step === 'decode' ? '100%' : '200%'})`;
}));

const memoryData = {
  registers: ['Registros', 'Máxima velocidad, mínima capacidad. Viven dentro de la CPU y contienen los operandos que se están usando ahora.', 'RÁPIDO / COSTOSO'],
  cache: ['Caché', 'Una memoria pequeña y veloz que conserva datos de uso frecuente para evitar esperas de la RAM.', 'RÁPIDO / PEQUEÑO'],
  ram: ['RAM', 'Mantiene programas y datos activos. Es amplia, pero pierde su contenido cuando se corta la energía.', 'ACTIVA / VOLÁTIL'],
  storage: ['Almacenamiento', 'Discos y unidades persistentes guardan grandes volúmenes de información aunque con mayor latencia.', 'LENTO / PERSISTENTE']
};
$$('.memory-level').forEach(level => level.addEventListener('mouseenter', () => {
  const [title, text, tag] = memoryData[level.dataset.memory];
  $('#memory-note').innerHTML = `<strong>${title}</strong><span>${text}</span><b>${tag}</b>`;
}));

const topologyData = {
  star: ['TOPOLOGÍA 01', 'Estrella', 'Todos los dispositivos se conectan a un nodo central. Es fácil de administrar y aislar, aunque el switch es un punto crítico.', 'Gestión simple y escalable', 'Depende del nodo central'],
  ring: ['TOPOLOGÍA 02', 'Anillo', 'Cada dispositivo se conecta con el siguiente formando un circuito. El tráfico sigue un recorrido predecible.', 'Acceso ordenado y estable', 'Una ruptura afecta el circuito'],
  bus: ['TOPOLOGÍA 03', 'Bus', 'Todos comparten un cable troncal. Usa poco tendido, pero el rendimiento cae cuando crece el número de equipos.', 'Instalación económica', 'Colisiones y punto único de fallo']
};
$$('.topology-tab').forEach(tab => tab.addEventListener('click', () => {
  $$('.topology-tab').forEach(item => item.classList.remove('active')); tab.classList.add('active');
  const [tag, title, text, pro, con] = topologyData[tab.dataset.topology];
  $('#topology-tag').textContent = tag; $('#topology-title').textContent = title; $('#topology-text').textContent = text; $('#topology-pro').textContent = pro; $('#topology-con').textContent = con;
  $('#topology-visual').className = `topology-visual topology-${tab.dataset.topology}`;
}));

const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('is-visible')), { threshold: .12 });
$$('.reveal').forEach(item => observer.observe(item));
const progress = $('.reading-progress span');
const topButton = $('.back-top');
window.addEventListener('scroll', () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${(window.scrollY / scrollable) * 100}%`;
  topButton.classList.toggle('visible', window.scrollY > 500);
}, { passive: true });
topButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
$$('.print-trigger').forEach(button => button.addEventListener('click', () => window.print()));