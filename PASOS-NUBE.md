# Conectar FRIGO a la nube

Esto prende cuatro cosas que hoy no existen:

- **Usuarios y roles.** Cada uno entra con su usuario. El dueño ve todo; el empleado vende y cierra caja pero no toca precios; el cadete solo marca su jornada y sus viajes.
- **Control de horarios.** Se marca "Llegué" y "Me voy" de un toque, y el dueño lo ve en vivo, con las horas de hoy, de la semana y del mes.
- **Registro de viajes.** El reparto marca "Salgo a entregar" y "Entregué", y queda la distancia y la duración de cada viaje, con el total de kilómetros por día, semana y mes.
- **Datos compartidos.** Las ventas de todos los celulares se ven en el mismo lugar, al instante.

Es gratis y se hace una sola vez. Unos 10 minutos.

---

## 1. Crear el proyecto

Entrá a `console.firebase.google.com` con tu cuenta de Google y creá un proyecto llamado
**FRIGO**. Si te ofrece Google Analytics, podés decir que no.

## 2. Crear los usuarios

En el menú de la izquierda: **Security → Authentication → Comenzar**.
Pestaña **Sign-in method**: activá **Correo electrónico/contraseña** (solo el primer
interruptor, no el de link por correo). Guardá.

Después, en la pestaña **Users → Agregar usuario**, creá uno por persona:

| Correo | Quién es | Qué ve |
|---|---|---|
| `benjaes7392@gmail.com` | el dueño | todo |
| `guegui@frigo.app` | Guegui | ventas, cierre, faltantes, su jornada |
| `camila@frigo.app` | Camila | lo mismo, más registro de viajes |
| `cadete@frigo.app` | el cadete | solo llegada, salida y viajes |

Las claves las elegís vos, mínimo 6 caracteres. En la app, los empleados escriben solo
`guegui` o `cadete`, sin el `@frigo.app`.

> **El dueño va con un correo real.** `@frigo.app` no es un dominio que exista: si se
> pierde esa clave, el mail de recuperación no llega a ningún lado y el acceso se pierde
> para siempre. Las claves de los empleados sí las puede resetear el dueño desde esta misma
> pantalla, así que para ellos el correo corto no es problema.

> **Nunca un usuario compartido.** Si todos entran con el mismo, no vas a saber quién
> cobró, quién fichó ni quién hizo cada viaje.

Para agregar o sacar gente después: creás el usuario acá y me avisás para que lo cargue en
`config.js` con su rol. Cuando alguien deja de trabajar, borrás su usuario en esta pantalla
el mismo día.

## 3. Crear la base de datos

**Compilación → Firestore Database → Crear base de datos**. Elegí el modo producción y la
ubicación que te sugiera.

## 4. Pegar las reglas de seguridad

En Firestore, pestaña **Reglas**: borrá lo que hay y pegá el contenido del archivo
`firestore.rules` de este repositorio. **Publicar**.

Esto es lo que hace que un empleado no pueda cambiar un precio ni fichar por otro, aunque
sepa de computación. La seguridad vive acá, no en esconder botones.

## 5. Copiar las cuatro claves

Engranaje arriba a la izquierda → **Configuración del proyecto**. Abajo de todo, en
*Tus apps*, tocá el ícono **`</>`** (Web), poné de apodo `FRIGO` y registrá la app.

Te va a mostrar un bloque de texto. De ahí necesito cuatro valores:

- `apiKey`
- `authDomain`
- `projectId`
- `appId`

**Pegámelos en el chat y yo los cargo.** No son contraseñas: en toda app web van dentro del
código y cualquiera las puede ver. Lo que protege tus datos son las reglas del paso 4.

## 6. Pedidos de clientes (opcional, pero ya está hecho)

Hay una segunda página para que tus clientes pidan solos, sin usuario ni clave:
`https://benjamin7392.github.io/Frigo-2-0/pedir.html`

Para que funcione faltan dos cosas en la consola:

1. **Security → Authentication → Sign-in method**: activá también **Anónimo**. Eso es lo que
   permite que alguien pida sin crearse una cuenta, y al mismo tiempo deja que las reglas
   distingan a un cliente del equipo.
2. **Firestore → Reglas**: volvé a pegar `firestore.rules`, que cambió. Ahora separa al
   equipo (entra con clave) del cliente (entra anónimo). El cliente solo puede leer el menú
   y crear su propio pedido: no ve ventas, ni caja, ni horarios, ni los pedidos de otros.

El pedido entra al instante en la app del equipo, en la pestaña **Pedidos**, con un cartel
amarillo. Cuando se entrega, se toca **Entregado y cobrado** y queda registrado como venta,
descontando el stock igual que una venta del mostrador.

## 7. Listo

Subo el cambio y, la próxima vez que abran la app, a cada uno le va a aparecer la pantalla
de ingreso. Después de entrar, lo primero que ve el empleado es un botón grande **Llegué**.

---

## Después, el día a día

- El empleado abre la app, toca **Llegué**, y trabaja normal. Al irse toca **Me voy**.
- El cadete ve una sola pantalla: **Llegué**, **Salgo a entregar**, **Entregué**, **Me voy**. Nada más.
- Vos entrás a **Más → Personal y horarios** y ves quién está en el local, hace cuánto, y
  las horas de cada uno por día, semana y mes.
- Si alguien se olvidó de marcar la salida, vos la cerrás desde ahí.
- Cuando alguien deja de trabajar, borrá su usuario en Firebase Authentication el mismo día.

## Sobre la ubicación

El GPS se lee **solo mientras hay un viaje abierto y la app está en pantalla**. Al cerrar el
viaje se apaga, y fuera del horario no se registra nada. Mientras está activo, la persona ve
un cartel que lo dice.

Esa es también la limitación técnica: un navegador no puede leer el GPS con la pantalla
bloqueada o la app en segundo plano. Por eso la distancia se mide entre los puntos marcados
y, si la app quedó abierta durante el viaje, con el recorrido real. Cuando hay pocos puntos,
la app avisa que la distancia es en línea recta.

Avisales a los tres que la app registra ubicación durante la jornada.

## Qué mirar los primeros días

- Que las horas den lo que esperabas contra lo que viste en el local.
- Que los kilómetros de un viaje conocido den parecido a lo real.
- Que un empleado no pueda entrar a cambiar un precio.
- Que una venta cargada sin señal aparezca en tu celular cuando vuelve internet.
