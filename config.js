/* ============================================================
   FRIGO — configuración
   Mientras firebase.apiKey diga PEGAR_ACA, la app funciona igual
   pero cada celular guarda lo suyo: sin roles ni control de horarios.
   ============================================================ */
window.FRIGO = {
  firebase: {
    apiKey:     "PEGAR_ACA",
    authDomain: "PEGAR_ACA",
    projectId:  "PEGAR_ACA",
    appId:      "PEGAR_ACA"
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
