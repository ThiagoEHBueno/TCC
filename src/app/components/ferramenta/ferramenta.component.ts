import { Component, OnInit, HostListener } from '@angular/core';

interface KeyStatus {
  [key: string]: boolean;
}

interface AudioStatus {
  [key: string]: HTMLAudioElement;
}

interface SoundMap {
  [key: string]: string;
}

@Component({
  selector: 'app-ferramenta',
  templateUrl: './ferramenta.component.html',
  styleUrls: ['./ferramenta.component.css']
})
export class FerramentaComponent implements OnInit {
  private keyStatus: KeyStatus = {
    /*First Octave*/
    q: false,
    '2': false,
    w: false,
    '3': false,
    e: false,
    r: false,
    '5': false,
    t: false,
    '6': false,
    y: false,
    '7': false,
    u: false,
    /*End First Octave*/
    /*Second Octave*/
    b: false,
    h: false,
    n: false,
    j: false,
    m: false,
    l: false,
    ç: false,
    ']': false,
    ',': false,
    '.': false,
    ';': false,
    '/': false,
    /*End Second Octave*/
  };
  audioStatus: AudioStatus = {};
  soundMap: SoundMap = {
    ']': 'colchete',
    ',': 'virgula',
    '.': 'ponto',
    ';': 'pontoevirgula',
    '/': 'barra',
  };

  constructor() {}

  ngOnInit(): void {
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      if (this.keyStatus.hasOwnProperty(event.key)) {
        this.keyStatus[event.key] = true;
        const key = event.key.toLowerCase();
        const keyElement = document.querySelector<HTMLElement>(
          `.white[data-key="${key}"]`
        );
        if (keyElement) {
          keyElement.classList.add('key-pressed');
        }
        const keyElementsus = document.querySelector<HTMLElement>(
          `.black[data-key="${key}"]`
        );
        if (keyElementsus) {
          keyElementsus.classList.add('key-pressedsus');
        }
        this.playSound(event.key);
      }
    });

    document.addEventListener('keyup', (event: KeyboardEvent) => {
      if (this.keyStatus.hasOwnProperty(event.key)) {
        this.keyStatus[event.key] = false;
        const key = event.key.toLowerCase();
        const keyElement = document.querySelector<HTMLElement>(
          `.white[data-key="${key}"]`
        );
        if (keyElement) {
          keyElement.classList.remove('key-pressed');
        }
        const keyElementsus = document.querySelector<HTMLElement>(
          `.black[data-key="${key}"]`
        );
        if (keyElementsus) {
          keyElementsus.classList.remove('key-pressedsus');
        }
      }
    });
  }

  private playSound(key: string): void {
    const soundName = this.soundMap[key] || key;
    console.log(soundName);
    if (this.keyStatus[key]) {
      const audio = new Audio(`assets/audio/${soundName}.mp3`);
      audio.play();
    }
  }
  
}
