/* ============================================================
   FRIGO — configuración
   Conectada al proyecto frigo-27072. Estas claves son públicas por
   diseño: lo que protege los datos son las reglas de Firestore.
   ============================================================ */
window.FRIGO = {
  firebase: {
    apiKey:     "AIzaSyB-inIgCwkHqhYPvNCjjCt63QFer0P3_FA",
    authDomain: "frigo-27072.firebaseapp.com",
    projectId:  "frigo-27072",
    appId:      "1:337652706402:web:1713b7913c7ad85d23b53b"
  },

  /* Quién es quién.
     rol    "dueño"    ve todo, cambia precios, anula ventas, ve al personal
            "empleado" vende, cierra caja, marca faltantes y ficha su jornada
            "cadete"   solo marca llegada, salida y viajes
     gps    true        registra los viajes con ubicación
     nombre  cómo se lo llama en pantalla                                    */
  gente: {
    "benjaes7392@gmail.com": { rol: "dueño",    nombre: "Benja",  gps: false },
    "guegui@frigo.app":      { rol: "empleado", nombre: "Guegui", gps: false },
    "camila@frigo.app":      { rol: "empleado", nombre: "Camila", gps: true  },
    "cadete@frigo.app":      { rol: "cadete",   nombre: "Cadete", gps: true  }
  }
};
