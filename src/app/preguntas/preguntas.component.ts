import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { PreguntasService } from '../services/preguntas.services';

@Component({
  selector: 'app-preguntas',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.scss'],
})
export class PreguntasComponent implements OnInit {
  //@ViewChild('acordeonitems', { static: false }) acordeonitems!: ElementRef;

  preguntas: any;

  constructor(private PreguntasService: PreguntasService) {}

  ngOnInit(): void {
    this.PreguntasService.getData().subscribe((data) => {
      this.preguntas = data;
      console.log(this.preguntas);

      this.manipularDOM();
    });
  }

  manipularDOM(): void {
    setTimeout(() => {
      const acordeonItems =
        document.querySelectorAll<HTMLElement>('.acordeon-item');

      acordeonItems.forEach((item) => {
        const header = item.querySelector('.acordeon-header') as HTMLElement;

        header.addEventListener('click', () => {
          const content = item.querySelector(
            '.acordeon-content'
          ) as HTMLElement;
          const isOpen = item.classList.contains('acordeon-itemOpen');

          // Cerrar todas las preguntas
          acordeonItems.forEach((i) => {
            const content = i.querySelector('.acordeon-content') as HTMLElement;
            const header = i.querySelector('.acordeon-header') as HTMLElement;
            header.classList.remove('acordeon-headerOpen');
            i.classList.remove('acordeon-itemOpen');
            content.style.maxHeight = '0';
          });

          // Abrir o cerrar la pregunta actual
          if (!isOpen) {
            item.classList.add('acordeon-itemOpen');
            content.style.maxHeight = content.scrollHeight + 'px';
            header.classList.add('acordeon-headerOpen');
          }
        });
      });
    }, 1000);
  }
}
