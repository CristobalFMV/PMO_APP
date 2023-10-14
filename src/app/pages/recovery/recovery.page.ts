import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.page.html',
  styleUrls: ['./recovery.page.scss'],
})
export class RecoveryPage {
  public usuario: Usuario = new Usuario('', '', '', '', '');

  constructor(
    private router: Router,
    private navCtrl: NavController
  ) {}

  recuperar() {
    //  Se busca por correo si existe un usuario con el
    const usuarioValido = this.usuario.listaUsuariosValidos().find(usu => usu.correo === this.usuario.correo);

    if (usuarioValido !== undefined) {
      //Pasa la contraseña como JSON 
      this.router.navigate(['/recovery2'], {
        queryParams: {
          usuario: JSON.stringify(usuarioValido),
          nombre: usuarioValido.nombre,
          correo: usuarioValido.correo,
          preguntaSecreta : usuarioValido.preguntaSecreta,
          respuestaSecreta : usuarioValido.respuestaSecreta
        }
      });
    } else {
      //Datos incorrectos
      this.navCtrl.navigateForward('/denied');
    }
  }
}
