export class Usuario {
  public correo = '';
  public password = '';
  public nombre = '';
  public preguntaSecreta = '';
  public respuestaSecreta = '';

  constructor(
    correo: string, password: string, nombre: string, preguntaSecreta: string, respuestaSecreta: string)
  {
    this.correo = correo;
    this.password = password;
    this.nombre = nombre;
    this.preguntaSecreta = preguntaSecreta;
    this.respuestaSecreta = respuestaSecreta;
  }

  public listaUsuariosValidos(): Usuario[] {
    const lista = [];
    lista.push(new Usuario('Usuario1@duocuc.cl', '1234', 'Juan Antonio Acevedo'
      , '¿Cuál es tu animal favorito?', 'gato'));
    lista.push(new Usuario('Usuario2@duocuc.cl', '2345', 'Alexandra Pérez Torres'
      , '¿Cuál es tu comida favorita?', 'lasagna'));
    lista.push(new Usuario('Usuario3@duocuc.cl', '4321', 'Gonzalo Javier Gonzales'
      , '¿Cuál es tu vehículo favorito?', 'moto'));
    return lista;
  }

  public validarRespuestaSecreta(): boolean {
    return this.respuestaSecreta.trim() !== '' && this.respuestaSecreta === this.preguntaSecreta;
  }
  

  public buscarUsuarioValido(correo: string, password: string): Usuario | null {
    const usuario = this.listaUsuariosValidos().find(
      usu => usu.correo === correo && usu.password === password);
    if (usuario !== undefined) {
      return usuario;
    } else {
      return null;
    }
  }

  public validarcorreo(): string {
    if (this.correo.trim() === '') {
      return 'Para ingresar al sistema debe ingresar un nombre de usuario.';
    }
    if (this.correo.length < 3 || this.correo.length > 8) {
      return 'El nombre de usuario debe tener entre 3 y 8 caracteres.';
    }
    return '';
  }

  public validarPassword(): string {
    if (this.password.trim() === '') {
      return 'La contraseña es obligatoria.';
    }
    for(let i = 0; i < this.password.length; i++) {
      if ('0123456789'.indexOf(this.password.charAt(i)) === -1) {
        return 'La contraseña debe ser numérica.';
      }
    }
    if (this.password.length !== 4) {
      return 'La contraseña debe ser numérica de 4 dígitos.';
    }
    return '';
  }

  public validarUsuario(): string {
    return this.validarcorreo()
      || this.validarPassword();
  }
}