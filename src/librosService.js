// Lógica de la biblioteca (en memoria). Separada de Express para probarla fácil.
class LibrosService {
  constructor() {
    this.libros = [];
    this.siguienteId = 1;
  }

  listar(busqueda) {
    if (!busqueda) return this.libros;
    const q = String(busqueda).toLowerCase();
    return this.libros.filter(
      (l) => l.titulo.toLowerCase().includes(q) || l.autor.toLowerCase().includes(q)
    );
  }

  obtener(id) {
    return this.libros.find((l) => l.id === id) || null;
  }

  crear({ titulo, autor, anio }) {
    if (!titulo || !String(titulo).trim()) throw new Error('El título es obligatorio');
    if (!autor || !String(autor).trim()) throw new Error('El autor es obligatorio');
    if (anio !== undefined && (!Number.isInteger(anio) || anio < 0)) {
      throw new Error('El año debe ser un número entero positivo');
    }
    const libro = {
      id: this.siguienteId++,
      titulo: String(titulo).trim(),
      autor: String(autor).trim(),
      anio: anio ?? null,
      disponible: true,
    };
    this.libros.push(libro);
    return libro;
  }

  actualizar(id, datos) {
    const libro = this.obtener(id);
    if (!libro) return null;
    if (datos.titulo !== undefined) {
      if (!String(datos.titulo).trim()) throw new Error('El título es obligatorio');
      libro.titulo = String(datos.titulo).trim();
    }
    if (datos.autor !== undefined) {
      if (!String(datos.autor).trim()) throw new Error('El autor es obligatorio');
      libro.autor = String(datos.autor).trim();
    }
    if (datos.anio !== undefined) libro.anio = datos.anio;
    return libro;
  }

  prestar(id) {
    const libro = this.obtener(id);
    if (!libro) return null;
    if (!libro.disponible) throw new Error('El libro ya está prestado');
    libro.disponible = false;
    return libro;
  }

  devolver(id) {
    const libro = this.obtener(id);
    if (!libro) return null;
    if (libro.disponible) throw new Error('El libro no estaba prestado');
    libro.disponible = true;
    return libro;
  }

  eliminar(id) {
    const indice = this.libros.findIndex((l) => l.id === id);
    if (indice === -1) return false;
    this.libros.splice(indice, 1);
    return true;
  }
}

module.exports = LibrosService;
