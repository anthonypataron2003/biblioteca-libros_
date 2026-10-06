# Biblioteca de Libros

CRUD de biblioteca (Node.js + Express) con préstamo y devolución de libros. Usado para la Práctica 2 de Gestión de la Configuración de Software (UNEMI).

## Ejecutar
```bash
npm install
npm start      # http://localhost:3000
```

## Comandos
- `npm run build`: verifica la sintaxis del código
- `npm test`: ejecuta las pruebas automatizadas

## API
| Método | Ruta | Acción |
|---|---|---|
| GET | /api/libros?q=texto | Listar / buscar |
| GET | /api/libros/:id | Ver uno |
| POST | /api/libros | Crear `{ "titulo", "autor", "anio" }` |
| PUT | /api/libros/:id | Actualizar |
| POST | /api/libros/:id/prestar | Prestar |
| POST | /api/libros/:id/devolver | Devolver |
| DELETE | /api/libros/:id | Eliminar |

## Política de commits
Prefijos `feat:`, `fix:`, `docs:`, `test:`. Nada se sube directo a `main`: siempre mediante Pull Request.
