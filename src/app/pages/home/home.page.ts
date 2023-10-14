import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import jsQR, { QRCode } from 'jsqr';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements AfterViewInit, OnInit {
  
  @ViewChild('video', { static: false }) private video!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas', { static: false }) private canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('fileinput', { static: false }) private fileinput!: ElementRef<HTMLInputElement>;

  ///Se inicializan variables u o datos

  public usuario: Usuario = new Usuario('', '', '', '', '');

  public escaneando = false;
  public datosQR = '';
  public loading: HTMLIonLoadingElement | null = null;

  public bloqueInicio: number = 0;
  public bloqueTermino: number = 0;
  public dia: string = '';
  public horaFin: string = '';
  public horaInicio: string = '';
  public idAsignatura: string = '';
  public nombreAsignatura: string = '';
  public nombreProfesor: string = '';
  public seccion: string = '';
  public sede: string = '';

  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {

    ///Se llama al comienzo de el "cargado" de la pagina , pregunta si en la navegacion previa
    // se pasaron datos de usuario y en caso de que no , re direciona a la pagina de home 
    this.activeroute.queryParams.subscribe(params => {
      const navigation = this.router.getCurrentNavigation();
      if (navigation) {
        if (navigation.extras.state) {
          this.usuario = navigation.extras.state['usuario'];
        } else {
          this.router.navigate(['/home']);
        }
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  ngAfterViewInit() {
    this.limpiarDatos();
  }

  public limpiarDatos(): void {
    this.escaneando = false;
    this.datosQR = '';
    this.loading = null;
    if (this.fileinput && this.fileinput.nativeElement) {
      this.fileinput.nativeElement.value = '';
    }
  }

  public async comenzarEscaneoQR() {
    this.limpiarDatos();
    try {
      const mediaProvider: MediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      if (this.video && this.video.nativeElement) {
        this.video.nativeElement.srcObject = mediaProvider;
        this.video.nativeElement.setAttribute('playsinline', 'true');
        this.loading = await this.loadingController.create({});
        await this.loading.present();
        this.video.nativeElement.play();
        requestAnimationFrame(this.verificarVideo.bind(this));
      }
    } catch (error) {
      console.error('Error al entrar a la camara:', error);
    }
  }

  public obtenerDatosQR(source?: CanvasImageSource): boolean {
    if (this.canvas && this.canvas.nativeElement) {
      let w = 0;
      let h = 0;
      if (!source) {
        this.canvas.nativeElement.width = this.video?.nativeElement?.videoWidth || 0;
        this.canvas.nativeElement.height = this.video?.nativeElement?.videoHeight || 0;
      }

      w = this.canvas.nativeElement.width;
      h = this.canvas.nativeElement.height;

      const context: CanvasRenderingContext2D | null = this.canvas.nativeElement.getContext('2d');
      if (context) {
        context.drawImage(source || this.video.nativeElement, 0, 0, w, h);
        const img: ImageData = context.getImageData(0, 0, w, h);
        const qrCode: QRCode | null = jsQR(img.data, img.width, img.height, { inversionAttempts: 'dontInvert' });
        if (qrCode) {
          this.escaneando = false;
          this.datosQR = qrCode.data;
          this.mostrarDatosQROrdenados(this.datosQR);
        }
        return this.datosQR !== '';
      }
    }
    return false;
  }

  public mostrarDatosQROrdenados(datosQR: string): void {
    const objetoDatosQR = JSON.parse(datosQR);
    this.bloqueInicio = objetoDatosQR.bloqueInicio;
    this.bloqueTermino = objetoDatosQR.bloqueTermino;
    this.dia = objetoDatosQR.dia;
    this.horaFin = objetoDatosQR.horaFin;
    this.horaInicio = objetoDatosQR.horaInicio;
    this.idAsignatura = objetoDatosQR.idAsignatura;
    this.nombreAsignatura = objetoDatosQR.nombreAsignatura;
    this.nombreProfesor = objetoDatosQR.nombreProfesor;
    this.seccion = objetoDatosQR.seccion;
    this.sede = objetoDatosQR.sede;
    
    ///En caso de ser validado , pedir el JSON como string y posteriormente enviarlos 
    this.router.navigate(['/qr-info'], {
      queryParams: { scannedData: JSON.stringify(objetoDatosQR) }
    });
  }
  async verificarVideo() {
    if (this.video && this.video.nativeElement && this.video.nativeElement.readyState === this.video.nativeElement.HAVE_ENOUGH_DATA) {
      if (this.loading) {
        await this.loading.dismiss();
        this.loading = null;
        this.escaneando = true;
      }
      if (this.obtenerDatosQR()) {
        console.log("Se encontro codigo QR");
      } else {
        if (this.escaneando) {
          console.log("escaneando x frame");
          requestAnimationFrame(this.verificarVideo.bind(this));
        }
      }
    } else {
      requestAnimationFrame(this.verificarVideo.bind(this));
    }
  }

  public detenerEscaneoQR(): void {
    this.escaneando = false;
  }

  public cargarImagenDesdeArchivo(): void {
    this.limpiarDatos();
    if (this.fileinput && this.fileinput.nativeElement) {
      this.fileinput.nativeElement.click();
    }
  }

  public verificarArchivoConQR(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input?.files;
    if (files && files.length > 0) {
      const file = files[0];
      const img = new Image();
      img.onload = () => {
        this.obtenerDatosQR(img);
      };
      img.src = URL.createObjectURL(file);
    }
  }
}
