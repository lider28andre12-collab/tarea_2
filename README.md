# Nexo digital

Sitio educativo interactivo sobre arquitectura de computadores, redes de comunicaciones e informática forense.

## Estructura

- `index.html`: estructura semántica, contenido educativo y componentes interactivos.
- `css/styles.css`: sistema visual responsive, diagramas CSS, temas y estilos de impresión.
- `js/script.js`: menú móvil, modo claro/oscuro, ciclo de instrucción, memoria, topologías, animaciones y exportación mediante impresión del navegador.

## Ejecutar en GitHub Codespaces

Desde la terminal del proyecto:

```bash
python3 -m http.server 8000
```

Después abre el puerto `8000` desde la pestaña **Ports** de Codespaces. También puedes abrir `index.html` directamente en un navegador, aunque el servidor local es la opción recomendada.

## Dependencias

No requiere backend ni paquetes instalables. Usa JavaScript vanilla y CSS3. La única carga externa es la familia tipográfica Manrope/DM Mono desde Google Fonts; el contenido visual no depende de imágenes ni de frameworks.

El botón **Exportar a PDF** usa `window.print()` y los estilos `@media print` del navegador, por lo que no agrega una librería de terceros.
