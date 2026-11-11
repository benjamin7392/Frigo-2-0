# FRIGO 2.0 — caja, stock y resultados de la heladería

App instalable en el celular. **Funciona sin internet**: abrís, vendés, cargás gastos y
cerrás la caja aunque no haya señal. Gratis, sin tiendas de aplicaciones.

## Qué hace

**Hoy** — la ganancia del día en grande, ventas, gastos, costo del helado y margen.
Gráfico de ventas por hora para saber cuándo se llena. Cómo pagaron. Cierre de caja.

**+ (el botón del medio)** — el formulario exprés. Una venta en tres toques: producto,
sabores, cobrar. Después de cobrar tenés 5 segundos para **Deshacer**. La otra pestaña
es Gasto, con teclado numérico y rubros.

**Movimientos** — todo lo del día, con hora y quién lo cargó. Podés moverte a otro día.

**Faltan** — semáforo por sabor, medido en baldes de 10 kg. Verde: hay. Amarillo: queda
poco. Rojo parpadeante: reponer ya. Cada venta descuenta sola, repartiendo entre los
sabores elegidos. Un sabor en cero se bloquea al vender. Solo seguís los sabores que
querés controlar: los demás no molestan.

**Más** — reportes de 7, 30 y 90 días con comparación contra el período anterior, lo que
más deja, sabores más pedidos, cierre de caja, productos y precios, y copias de seguridad.

## Instalarla

1. Subí esta carpeta entera a cualquier hosting con HTTPS (arrastrándola a Netlify, o con
   Firebase Hosting, o GitHub Pages). Te queda un link.
2. **Android (Chrome):** abrí el link → menú de tres puntos → Instalar app.
3. **iPhone (Safari, no sirve Chrome):** abrí el link → Compartir → Agregar a pantalla de
   inicio → dejá activado *Abrir como web app* → Agregar.

> En iPhone, si la abrís desde el navegador en vez del ícono, la app **no te deja vender**
> y te explica cómo instalarla. No es capricho: desde el navegador el sistema puede borrar
> las ventas que cargaste sin señal.

## Primeros pasos

1. Más → Productos y precios → **Cargar el menú de FRIGO**, y poné precios y costos.
   La tercera casilla de cada fila son los kilos que salen de la cámara (1 bocha ≈ 0,1).
2. Faltan → tocá **+1** o **+5** en los sabores que quieras controlar.
3. Más → Ajustes → cargá el fondo fijo de caja, lo que dejás siempre para dar vuelto.

## Dónde viven los datos

En **este celular**, en la base de datos del navegador. No se van a ningún servidor y
nadie más los ve. Por eso:

- **Hacé una copia de seguridad una vez por mes** desde Más → Datos y respaldo, y guardala
  en otro lado (mandátela por mail o WhatsApp a vos mismo).
- Si querés que varios celulares compartan los datos en vivo, hace falta una base en la
  nube. El código para esa versión está en la conversación: usa Firebase y requiere crear
  una cuenta gratuita una sola vez.

## Publicar una versión nueva

1. Subí el número de `V` en `sw.js` (`frigo-v2.0` → `frigo-v2.1`) y `VERSION` en `index.html`.
2. Reemplazá los archivos en el hosting.
3. Nadie tiene que tocar nada: al abrir la app, o al volver a ella, el celular busca la
   versión nueva, la instala solo y se recarga en cuanto no haya nada a medio hacer
   (hoja de venta abierta, ticket sin cobrar, gasto a medio cargar, viaje en curso o un
   campo escrito sin guardar). Con una venta en marcha espera; no la corta.
4. Para confirmar qué versión tiene un celular: **Más**, abajo de todo, dice "FRIGO 2.x".

## Probá esto antes de confiarle la caja

- Modo avión: abrí la app, cobrá una venta, cerrala y volvé a abrirla. Tiene que estar todo.
- Cobrá y tocá **Deshacer**: la venta se borra y el stock vuelve.
- Vendé hasta dejar un sabor en cero: tiene que bloquearse al elegirlo.
- Cerrá el día con un número distinto al esperado: tiene que avisarte cuánto falta o sobra.
- Las dos primeras semanas, llevá también el cuaderno y compará al cierre.

**Esto es control interno de gestión. No es facturación ni liquidación de impuestos.**
Exportá la planilla una vez por mes y pasásela a tu contador.
