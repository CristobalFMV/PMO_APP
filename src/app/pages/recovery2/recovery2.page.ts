import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-recovery2',
  templateUrl: './recovery2.page.html',
  styleUrls: ['./recovery2.page.scss'],
})
export class Recovery2Page {
  public usuario: Usuario = new Usuario('', '', '', '', '');
  public nombre: string;
  public correo: string;
  public preguntaSecreta: string;
  public respuestaSecreta: string = ''; 

  /// Se fija la respuesta como boolean 
  public isAnswerCorrect: boolean = true; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    private alertController: AlertController 
  ) {
    this.nombre = '';
    this.correo = '';
    this.preguntaSecreta = '';
  }

  ngOnInit() {

    ///Se pasan los datos de usuario y posteriormente se inicializan partes de el 
    this.route.queryParams.subscribe(params => {
      const usuarioString = params['usuario'];
      if (usuarioString) {
        this.usuario = JSON.parse(usuarioString);
        this.nombre = this.usuario.nombre;
        this.correo = this.usuario.correo;
        this.preguntaSecreta = this.usuario.preguntaSecreta;
      }
    });
  }
  
  async validateRespuestaSecreta(): Promise<void> {
    console.log('respuestaSecreta:', this.respuestaSecreta);
    console.log('this.usuario.respuestaSecreta:', this.usuario.respuestaSecreta);
  
    if (this.usuario.respuestaSecreta.trim() === this.respuestaSecreta.trim()) {
      //Todo bien
      this.router.navigate(['/granted'], { queryParams: { password: this.usuario.password } });

    } else {
      // Incorrecto
      this.router.navigate(['/denied']);
    }
  }
  
  
  
  
  
  
  
  
  
  
  
}
