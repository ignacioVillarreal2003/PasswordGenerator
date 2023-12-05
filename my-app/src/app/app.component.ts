import { Component } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private clipboardApi: ClipboardService
  ) { }

  title = 'my-app';

  largo: number = 16;
  password: string = "";
  numero: boolean = true;
  letra: boolean = true;
  simbolo: boolean = true;

  sumarLargo(valor: number) {
    this.largo += valor;
    if (this.largo < 8) {
      this.largo = 8;
    }
    if (this.largo > 32) {
      this.largo = 32;
    }
  }

  numeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  letras = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  simbolos = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "+", "=", "[", "]", "{", "}", ";", ":", ",", ".", "<", ">", "?", "/", "|"];

  generarPassword() {
    let passwordGenerada = "";
    // Todo
    if (this.numero && this.letra && this.simbolo) {
      let cant = Math.floor(this.largo / 3);
      let rest = this.largo - (cant * 2);
      for (let i = 0; i < cant; i++) {
        let randomNumber = this.numeros[Math.floor(Math.random() * this.numeros.length)];
        passwordGenerada += randomNumber;
      }
      for (let i = 0; i < rest; i++) {
        let randomLeter = this.letras[Math.floor(Math.random() * this.letras.length)];
        passwordGenerada += randomLeter;
      }
      for (let i = 0; i < cant; i++) {
        let randomSymbol = this.simbolos[Math.floor(Math.random() * this.simbolos.length)];
        passwordGenerada += randomSymbol;
      }
      this.password = this.desordenarPassword(passwordGenerada);
    }
    // Letras y numeros
    else if (this.numero && this.letra && !this.simbolo) {
      let cant = Math.floor(this.largo / 2);
      let rest = this.largo - cant;
      for (let i = 0; i < cant; i++) {
        let randomNumber = this.numeros[Math.floor(Math.random() * this.numeros.length)];
        passwordGenerada += randomNumber;
      }
      for (let i = 0; i < rest; i++) {
        let randomLeter = this.letras[Math.floor(Math.random() * this.letras.length)];
        passwordGenerada += randomLeter;
      }
      this.password = this.desordenarPassword(passwordGenerada);
    }
    // Numeros y simbolos
    else if (this.numero && this.simbolo && !this.letra) {
      let cant = Math.floor(this.largo / 2);
      let rest = this.largo - cant;
      for (let i = 0; i < rest; i++) {
        let randomNumber = this.numeros[Math.floor(Math.random() * this.numeros.length)];
        passwordGenerada += randomNumber;
      }
      for (let i = 0; i < cant; i++) {
        let randomSymbol = this.simbolos[Math.floor(Math.random() * this.simbolos.length)];
        passwordGenerada += randomSymbol;
      }
      this.password = this.desordenarPassword(passwordGenerada);
    }
    // Letras y simbolos
    else if (this.letra && this.simbolo && !this.numero) {
      let cant = Math.floor(this.largo / 2);
      let rest = this.largo - cant;
      for (let i = 0; i < rest; i++) {
        let randomLeter = this.letras[Math.floor(Math.random() * this.letras.length)];
        passwordGenerada += randomLeter;
      }
      for (let i = 0; i < cant; i++) {
        let randomSymbol = this.simbolos[Math.floor(Math.random() * this.simbolos.length)];
        passwordGenerada += randomSymbol;
      }
      this.password = this.desordenarPassword(passwordGenerada);
    }
    // Numeros
    else if (this.numero && !this.letra && !this.simbolo) {
      for (let i = 0; i < this.largo; i++) {
        let randomNumber = this.numeros[Math.floor(Math.random() * this.numeros.length)];
        passwordGenerada += randomNumber;
      }
      this.password = this.desordenarPassword(passwordGenerada);
    }
    // Simbolos
    else if (this.simbolo && !this.numero && !this.letra) {
      for (let i = 0; i < this.largo; i++) {
        let randomSymbol = this.simbolos[Math.floor(Math.random() * this.simbolos.length)];
        passwordGenerada += randomSymbol;
      }
      this.password = this.desordenarPassword(passwordGenerada);
    }
    // Letras
    else if (this.letra && !this.numero && !this.simbolo) {
      for (let i = 0; i < this.largo; i++) {
        let randomLeter = this.letras[Math.floor(Math.random() * this.letras.length)];
        passwordGenerada += randomLeter;
      }
      this.password = this.desordenarPassword(passwordGenerada);
    }

  }

  desordenarPassword(password: string) {
    const caracteres = password.split('');
    for (let i = caracteres.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [caracteres[i], caracteres[j]] = [caracteres[j], caracteres[i]];
    }
    const stringDesordenado = caracteres.join('');
    return stringDesordenado;
  }

  copyText() {
    this.clipboardApi.copyFromContent(this.password)
  }

}
