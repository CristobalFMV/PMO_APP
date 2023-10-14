export class NivelEducacional {
  public id: number;
  public nombre: string;

  public constructor() {
    this.id = 0;
    this.nombre = '';
  }

  public getNivelEducacional(id: number, nombre: string): NivelEducacional {
    const Neduc = new NivelEducacional();
    Neduc.id = id;
    Neduc.nombre = nombre;
    return Neduc;
  }

  public getNivelesEducacionales(): NivelEducacional[] {
    const nivelesEducacionales = [];
    nivelesEducacionales.push(this.getNivelEducacional(1, 'Básica Incompleta'));
    nivelesEducacionales.push(this.getNivelEducacional(2, 'Básica Completa'));
    nivelesEducacionales.push(this.getNivelEducacional(3, 'Media Incompleta'));
    nivelesEducacionales.push(this.getNivelEducacional(4, 'Media Completa'));
    nivelesEducacionales.push(this.getNivelEducacional(5, 'Superior Incompleta'));
    nivelesEducacionales.push(this.getNivelEducacional(6, 'Superior Completa'));
    return nivelesEducacionales;
  }

  public setNivelEducacional(id: number, nombre: string) {
    this.id = id;
    this.nombre = nombre;
  }

 
  public findNombreBy(id: number) {
    if (id < 1 || id > 6) {
      return 'Sin nivel educacional';
    }
    const Neduc = this.getNivelesEducacionales().find(n => n.id === id);
    if (Neduc !== undefined) {
     return Neduc.nombre;
    } else {
      return `Nivel educacional con id=${id} no fue encontrado`;
    }
  }

  public getTextoId(): string {
    if (this.id < 1 || this.id > 6) {
      return 'Sin nivel educacional';
    }
    return this.id.toString();
  }

  public getTextoNombre(): string {
    return this.nombre? this.nombre : 'No asignado';
  }

  public getTextoNivelEducacional(): string {
    if (this.id < 1 || this.id > 6) {
      return 'No asignado';
    } else {
      return this.id.toString() + ' - ' + this.findNombreBy(this.id);
    }
  }
}
