import { Component, OnInit } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';


@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent implements OnInit {
  availableDevices: MediaDeviceInfo[] | any;
  currentDevice: MediaDeviceInfo | any = null;
  hasDevices: boolean | any;
  hasPermission: boolean | any;
  qrResult = '';
  allowedFormats = [
    BarcodeFormat.QR_CODE,
    BarcodeFormat.EAN_13,
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_8,
    BarcodeFormat.CODE_39];

    elementType = NgxQrcodeElementTypes.URL;
    correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  constructor() {}

  ngOnInit(): void {
    navigator.permissions.query({name: 'camera'})
    .then((perm) => {
      console.log(perm);
      if (perm.state === 'denied') {
        console.log('La demande à la caméra a été refusée');
      }
    });
  }

  clearResult(): void {
    // this.qrResult = null;
  }

  //Scans the QR code
  onCodeResult(resultString: any): void {
    console.log(resultString);
    console.log(this.currentDevice);

    this.qrResult = resultString;
  }

  //Permission for the app to use the device camera
  onHasPermission(has: any): void {
    this.hasPermission = has;
  }

  enabledPermission(): void {
    navigator.mediaDevices.getUserMedia({video: true});
  }



  // //This function check if the QR code has a valid JSON as data
  // checkQRJSON(qrString: string): boolean {
  //   if (
  //     /^[\],:{}\s]*$/.test(
  //       qrString
  //         .replace(/\\["\\\/bfnrtu]/g, "@")
  //         .replace(
  //           /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
  //           "]"
  //         )
  //         .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
  //     )
  //   ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

}
