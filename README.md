# Poker Blitz V2 Web

Version estatica para GitHub Pages basada en el proyecto Android, el reglamento oficial y el Excel de efectos.

## Publicacion en GitHub Pages

1. Sube todo el contenido de esta carpeta `POKER BLITZ V2` a un repositorio.
2. En GitHub, abre `Settings > Pages`.
3. Selecciona la rama y carpeta donde este `index.html`.
4. Guarda. La app funciona sin servidor, build ni dependencias externas.

## Archivos principales

- `index.html`: estructura del entorno de juego.
- `styles.css`: acabado visual de mesa, cartas, modales y animaciones.
- `app.js`: motor de juego web, ventanas emergentes y efectos.
- `data/cards.js`: catalogo completo importado del Excel.
- `assets/starter_cards/`: arte de las Power Cards.

## Controles

- Click sobre cualquier Power Card para ampliarla.
- Desde la ampliacion se puede activar la carta.
- Las ventanas emergentes muestran objetivos, dados, costos, declaraciones y cartas seleccionables segun el efecto.
- El boton de herramientas abre dados, monedas, tabla de cobros y revisiones de deck.
- El selector `Manual / Semi auto` aplica una animacion de transicion y cambia si la app solo guia o si resuelve cambios de estado.
