# Conectar FRIGO a la nube

Esto prende tres cosas que hoy no existen:

- **Usuarios y roles.** Cada empleado entra con su usuario. El dueño ve todo; el empleado no puede cambiar precios ni anular ventas.
- **Control de horarios.** El empleado marca "Llegué" y "Me voy" de un toque, y vos lo ves en vivo desde tu celular, con las horas de hoy, de la semana y del mes.
- **Datos compartidos.** Las ventas de todos los celulares se ven en el mismo lugar, al instante.

Es gratis y se hace una sola vez. Unos 10 minutos.

---

## 1. Crear el proyecto

Entrá a `console.firebase.google.com` con tu cuenta de Google y creá un proyecto llamado
**FRIGO**. Si te ofrece Google Analytics, podés decir que no.

## 2. Crear los usuarios

En el menú de la izquierda: **Compilación → Authentication → Comenzar**.
Elegí **Correo electrónico/contraseña** y activalo. Guardá.

Después, en la pestaña **Users → Agregar usuario**, creá uno por persona:

| Correo | Quién es |
|---|---|
| `dueno@frigo.app` | vos |
| `caja1@frigo.app` | un empleado |
| `caja2@frigo.app` | otro empleado |

Las claves las elegís vos, mínimo 6 caracteres. En la app cada uno escribe solo `caja1`,
sin el `@frigo.app`.

> **Nunca un usuario compartido.** Si todos entran con el mismo, no vas a saber quién
> cobró ni quién fichó.

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

## 6. Listo

Subo el cambio y, la próxima vez que abran la app, a cada uno le va a aparecer la pantalla
de ingreso. Después de entrar, lo primero que ve el empleado es un botón grande **Llegué**.

---

## Después, el día a día

- El empleado abre la app, toca **Llegué**, y trabaja normal. Al irse toca **Me voy**.
- Vos entrás a **Más → Personal y horarios** y ves quién está en el local, hace cuánto, y
  las horas de cada uno por día, semana y mes.
- Si alguien se olvidó de marcar la salida, vos la cerrás desde ahí.
- Cuando alguien deja de trabajar, borrá su usuario en Firebase Authentication el mismo día.

## Qué mirar los primeros días

- Que las horas den lo que esperabas contra lo que viste en el local.
- Que un empleado no pueda entrar a cambiar un precio.
- Que una venta cargada sin señal aparezca en tu celular cuando vuelve internet.
