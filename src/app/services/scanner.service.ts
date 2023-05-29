import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Injectable({
  providedIn: 'root'
})
export class ScannerService {

  constructor() { }
  
  public async scan (){
    BarcodeScanner.hideBackground()
    document.body.classList.add("qrscanner");
    const result = await BarcodeScanner.startScan();
    document.body.classList.remove("qrscanner");
    if(result.hasContent){
      return result.content
    }
    return;
  }

  public stopScan = ()=>{
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
  }
}
