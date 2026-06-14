import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-logo',
  imports: [NgOptimizedImage],
  template: `
    <div class="logo">
      <img ngSrc="/burger-logo.png" width="400" height="256" alt="MyBurger" priority />
    </div>
  `,
  styleUrl: './logo.component.scss',
})
export class LogoComponent {}
