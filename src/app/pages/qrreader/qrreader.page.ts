import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import jsQR, { QRCode } from 'jsqr';

@Component({
  selector: 'app-qrreader',
  templateUrl: './qrreader.page.html',
  styleUrls: ['./qrreader.page.scss'],
})
export class QrreaderPage implements AfterViewInit {

  @ViewChild('video', { static: false }) private video!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas', { static: false }) private canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('fileinput', { static: false }) private fileinput!: ElementRef<HTMLInputElement>;

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

  constructor(private loadingController: LoadingController, private router: Router) {}

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
      console.error('Error accessing camera:', error);
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

    this.router.navigate(['/qr-info'], {
      state: { scannedData: objetoDatosQR }
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
        console.log(1);
      } else {
        if (this.escaneando) {
          console.log(2);
          requestAnimationFrame(this.verificarVideo.bind(this));
        }
      }
    } else {
      console.log(3);
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
