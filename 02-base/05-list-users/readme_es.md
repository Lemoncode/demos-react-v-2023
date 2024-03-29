# 04 List Users

## Resumen

Este ejemplo toma como punto de partida el ejemplo _03-webpack-react_.

Vamos a pedirle a la API de Github la lista de miembros que pertenece a una
organización y vamos a mostrarla por pantalla.

Este ejemplo lo vamos a hacer de forma rápida y sucia, en el siguiente lo
refactorizaremos para aprovechar las ventajas que nos ofrece trabajar
con TypeScript y como hacer nuestro código más mantenible.

Que vamos a aprender en este ejemplo:

- Cómo crear un componente de visualización sin tener que depender de leer
  de una fuente remota.
- Cómo iterar y mostrar una lista de resultados.
- Cómo hacer una llamada asíncrona para pedir datos a una api remota.
- Cómo meter estos datos en el estado de nuestro componente en React.

Pasos:

## Paso a Paso

- Primero copiamos el ejemplo anterior, y hacemos un _npm install_

```bash
npm install
```

- Si queremos ver que tipo de datos vamos a manejar, podemos abrir el
  navegador web y ver que devuelve la API Rest de Github

```bash
https://api.github.com/orgs/lemoncode/members
```

- Vamos a crear un set de datos parecido que muestre dos miembros de una organización.

_./src/app.tsx_

```diff
import React from "react";

+ const membersMock = [
+  {
+     id: 14540103,
+     login: "antonio06",
+     avatar_url: "https://avatars1.githubusercontent.com/u/14540103?v=4"
+  },
+  {
+     id: 1457912,
+     login: "brauliodiez",
+     avatar_url: "https://avatars1.githubusercontent.com/u/1457912?v=4"
+  },
+  ];

export const App = () => {
  return <h1>Hello React !!</h1>;
};
```

- Ahora que tenemos los datos, vamos a añadirle estado a nuestro componente
  y cargarle estos datos por defecto.

_./src/app.tsx_

```diff
export const App = () => {
+ const [members, setMembers] = React.useState(membersMock);

  return <h1>Hello React !!</h1>;
};
```

- Ya tenemos los datos en nuestro estado, vamos a mostrar el primer elemento
  y vemos si el nombre que aparece por pantalla es _antonio06_:

_./src/app.tsx_

```diff
export const App = () => {
  const [members, setMembers] = React.useState(membersMock);

+  return <span>{members[0].login}</span>

-  return <h1>Hello React !!</h1>;
};
```

- Probamos:

```bash
npm start
```

- Esto no esta mal, pero igual la lista no trae elementos que igual puede traer 5, ¿Cómo iterar por los
  elementos de la lista? Usando _map_ de ES6.

_./src/app.tsx_

```diff
export const App = () => {
  const [members, setMembers] = React.useState(membersMock);

-  return <span>{members[0].login}</span>;
+  return (
+    <>
+      {members.map((member) => (
+        <span key={member.id}>{member.login}</span>
+      ))}
+    </>
+  )
};
```

Con estas líneas de código, estamos iterando por el array de miembros y creado un elemento span por cada entrada,
a tener en cuenta:

- _key:_ cuando creamos elementos de forma dinámica hace falta añadirles una clave única (así React puede optimizar
  el renderizado).

- _Member Login:_ leemos el valor del elemento actual de array y mostramos el campo login.

Ahora que vemos que funciona vamos a encajar esto en un \_grid\_\_:

- Vamos a definir algunos estilos gobales
  (revisa [Ejemplo de módulos CSS](https://github.com/Lemoncode/master-frontend-lemoncode/tree/master/03-bundling/01-webpack/12-css-modules), para aprender a configurar el CSS aislado de los componentes).

_./src/styles.css_

```css
body {
  font-family: Sans-Serif;
}

.user-list-container {
  display: grid;
  grid-template-columns: 80px 1fr 3fr;
  grid-template-rows: 20px;
  grid-auto-rows: 80px;
  grid-gap: 10px 5px;
}

.header {
  background-color: #2f4858;
  color: white;
  font-weight: bold;
}

.user-list-container > img {
  width: 80px;
}
```

¿Qué estamos haciendo aquí?

- Le decimos que para toda la aplicación use la fuente _Sans-Serif_ (sin serifa), que queda mejor que la tipo _times new roman_ que usan Chrome.
- Después creamos un contenedor CSS Grid:
  - Tienes 3 columnas.
  - La primera columna tiene un ancho de 80px, la segunda ocupa el resto del espacio, pero teniendo en que cuenta que la tercera va a ocupar 3 veces el espacio de la segunda.
  - La primera fila tiene un alto de 20px.
  - El resto de filas tienen un alto de 80px.
  - El espacio entre filas y columnas es de 10px y 5px respectivamente.
- Después definimos un estilo para la cabecera.
- Y por último definimos un estilo para las imágenes que van a aparecer en la primera columna del grid (Que no salgan muy grandes).

Vamos a integrarlo en el componente de nuestra aplicación:

_./src/app.tsx_

```diff
export const App = () => {
  const [members, setMembers] = React.useState(membersMock);

-  return members.map((member) => <span key={member.id}>{member.login}</span>);
+  return (
+    <div className="user-list-container">
+      <span className="header">Avatar</span>
+      <span className="header">Id</span>
+      <span className="header">Name</span>
+      {members.map((member) => (
+        <>
+          <img src={member.avatar_url} />
+          <span>{member.id}</span>
+          <span>{member.login}</span>
+        </>
+      ))}
+    </div>
+  )
```

Así que hemos creado aquí un contenedor CSS Grid añadimos la cabecera y un bucle de todos los elementos de la lista de usuarios.

> TEMA... Si miras la consola del navegador verás que te aparece un warning, nos falta el _key_ en el siguiente ejemplo lo resolveremos.

- Hasta aquí muy bien pero... yo quiero tirar de la API de Github no de datos mockeados, vamos a empezar
  por eliminar los datos mock e inicializar el estado de nuestro componente a un array vacio:

```diff
- const membersMock = [
-  {
-    id: 14540103,
-    login: "antonio06",
-    avatar_url: "https://avatars1.githubusercontent.com/u/14540103?v=4",
-  },
-  {
-    id: 1457912,
-    login: "brauliodiez",
-    avatar_url: "https://avatars1.githubusercontent.com/u/1457912?v=4",
-  },
- ];

export const App = () => {
-  const [members, setMembers] = React.useState(membersMock);
+  const [members, setMembers] = React.useState([]);
```

- ¿Cómo puedo hacer la llamada al servidor de Github y traerme los datos justo cuando el compomenten se monte en mi HTML?
  Para ello vamos a usar _useEffect_ esto lo veremos más adelante cuando cubramos la parte de hooks

_./src/app.tsx_

```diff
export const App = () => {
  const [members, setMembers] = React.useState([]);

+  React.useEffect(() => {
+  }, []);

  return (
```

Aquí ejecutamos un código justo cuando el componente se monta el DOM, los corchetes que nos encontramos al final de useEffect
son los que indican que sólo se ejecute una sóla vez al montarse el componente, aprenderemos como funciona esto en detalle más adelante.

- Ahora nos queda realizar la llamada AJAX dentro de ese _useEffect_

_./src/app.tsx_

```diff
  React.useEffect(() => {
+    fetch(`https://api.github.com/orgs/lemoncode/members`)
+      .then((response) => response.json())
+      .then((json) => setMembers(json));
  }, []);
```

¿Qué estamos haciendo aquí? Estamos haciendo una llamada a la API REST de Github, esta api es asíncrona (de ahí que utilicemos
promesas), primero parseamos el resultado a _json_ y después asignamos ese resultado al estado de nuestro componente
invocando a _setMembers_

- Si arrancamos el proyecto veremos como ahora está realizando la carga de servidor.

```bash
npm start
```
