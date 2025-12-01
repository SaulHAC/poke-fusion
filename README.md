- PokeFusion

Este proyecto fue generado usando Angular CLI
versión 20.1.1.

- Servidor de desarrollo

Para iniciar un servidor de desarrollo local, ejecuta:

ng serve

Una vez que el servidor esté corriendo, abre tu navegador y ve a http://localhost:4200/. La aplicación se recargará automáticamente cada vez que modifiques algún archivo de origen.

- Checklist de Auditoría

1. Reto elegido y alcance

- Reto: PokéFusion – aplicación web para fusionar Pokémon y mostrar resultados con detalles.

- Alcance:

* Buscar de manera random 3 pokemones.

* Mostrar datos principales: Nombre estadisticas.

* Fusionar tres Pokemones y mostrar resultado.

* Gestionar lista de favoritos usando LocalStorage.

- Supuestos:

* La API de Pokémon es confiable y devuelve datos completos.

* La persistencia es usando localstorage, deberia funcionar correctamente.

2. Arquitectura y dependencias

- Arquitectura: Angular + LocalStorage

Patrón MVVM: Componentes → Servicios → Observables → UI

- Dependencias principales

* Angular 20

* Node v22.17.1

* RxJs (Observables y operadores Rxjs)

* Firebase (Hosting)

* CSS Puro

* LocalStorage (Persistencia)

3. Modelo de datos

- Los datos se guardan en el LocalStorage del navegador.
- Los modelos de datos son usados al momento de hacer llamdas a la api

export interface Pokemon {
id: number;
name: string;
types: string[];
stats: { [key: string]: number };
moves: string[];
sprite: string;
}

export interface FusedPokemon {
id: string;
name: string;
types: string[];
stats: { [key: string]: number };
moves: string[];
sprite: string;
}

4. Estado y navegación

Servicios con Observables para centralizar datos de Pokémon, uso de variables para determinar cuando esta cargando o cuando hay error

Angular Router con rutas principales: /home, /favorites

5. Decisiones técnicas

- Uso de Observables para separar lógica de la UI.
- Uso de environment.ts para separar API URL.
- Separación de componentes y servicios para facilitar mantenimiento y escalabilidad.

6. Escalabilidad y mantenimiento

- Cada servicio es independiente y se encarga de su propio nicho

7. Seguridad y validaciones

- No se permite ingresar dos veces el mismo pokemon a favoritos
- Tiene que estar definido el pokemon fusionado antes de agregar o eliminar de favoritos
- Tiene que existe la llave para guardar en el localstorage si no se crea

8. Rendimiento

- Caché de datos de Pokémon en servicios para evitar llamadas repetidas
- Uso de CSS puro para no sobrecargar proyecto
- Llamadas agrupadas y uso de forkJoin para cuando se hacen multiples llamadas

9. Accesibilidad

- Todos los botones y enlaces tienen labels
- Contraste de colores suficiente para texto e íconos
- Interfaz sencilla y facil de entender

10. Limitaciones

- No hay sincronización entre dispositivos

- Los datos se borran si el usuario limpia cache o cambia de navegador

- Límite de espacio aproximado: 5MB por navegador

---

11. Uso de IA

1. ¿En qué partes me apoyé y por qué?

Resolución de errores puntuales (aveces son errores que se les escapa a uno y tarde o temprano los ibas a encontrar, pero la ia puede anticiparlos).

Ejmplos de algunas sintaxis (Habian sintaxis complejas que no recordaba y recurria a la ia para ello)

Hostear en firebase

2. ¿Qué sugerencias acepté vs. reescribí?

Acepté buenas prácticas.

Reescribí la estructura general del proyecto, agregando componentes que no habia previsto que hacian mas facil la manipulacion de la app.

Reescribí código propuesto para adaptarlo a mi arquitectura y LocalStorage.

3. Riesgos detectados y mitigación:

Performance: Sabía que una forma de hacer algo era un poco incorrecta, le pregunté y me propuso algunas soluciones que no recordaba al momento (fork join)

4. Resumen de prompts/ enfoque:

Preguntas cortas y específicas sobre Angular y LocalStorage para recordar conceptos.

Preguntas sobre optimizar código que se que no es lo mejor.

5. Lecciones y siguientes mejoras:

IA acelera ideación y resolución de dudas, pero requiere verificación.

Futuro: migrar LocalStorage a Firestore.
