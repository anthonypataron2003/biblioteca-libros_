const test = require('node:test');
const assert = require('node:assert');
const LibrosService = require('../src/librosService');

test('crear un libro válido', () => {
  const s = new LibrosService();
  const l = s.crear({ titulo: 'Clean Code', autor: 'Robert Martin', anio: 2008 });
  assert.strictEqual(l.id, 1);
  assert.strictEqual(l.disponible, true);
});

test('crear sin título lanza error', () => {
  const s = new LibrosService();
  assert.throws(() => s.crear({ titulo: ' ', autor: 'X' }), /título/);
});

test('crear sin autor lanza error', () => {
  const s = new LibrosService();
  assert.throws(() => s.crear({ titulo: 'X', autor: '' }), /autor/);
});

test('crear con año inválido lanza error', () => {
  const s = new LibrosService();
  assert.throws(() => s.crear({ titulo: 'X', autor: 'Y', anio: -5 }), /año/);
});

test('buscar por título o autor', () => {
  const s = new LibrosService();
  s.crear({ titulo: 'Clean Code', autor: 'Robert Martin' });
  s.crear({ titulo: 'Ingeniería del Software', autor: 'Ian Sommerville' });
  assert.strictEqual(s.listar('sommerville').length, 1);
  assert.strictEqual(s.listar('clean').length, 1);
  assert.strictEqual(s.listar().length, 2);
});

test('actualizar cambia los datos', () => {
  const s = new LibrosService();
  s.crear({ titulo: 'Viejo', autor: 'A' });
  const l = s.actualizar(1, { titulo: 'Nuevo' });
  assert.strictEqual(l.titulo, 'Nuevo');
  assert.strictEqual(s.actualizar(99, { titulo: 'X' }), null);
});

test('prestar y devolver un libro', () => {
  const s = new LibrosService();
  s.crear({ titulo: 'A', autor: 'B' });
  assert.strictEqual(s.prestar(1).disponible, false);
  assert.throws(() => s.prestar(1), /ya está prestado/);
  assert.strictEqual(s.devolver(1).disponible, true);
  assert.throws(() => s.devolver(1), /no estaba prestado/);
});

test('eliminar quita el libro', () => {
  const s = new LibrosService();
  s.crear({ titulo: 'A', autor: 'B' });
  assert.strictEqual(s.eliminar(1), true);
  assert.strictEqual(s.eliminar(1), false);
});
