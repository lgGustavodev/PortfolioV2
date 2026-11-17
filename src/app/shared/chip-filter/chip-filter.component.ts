import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';

export interface ChipOption<T extends string> {
  value: T;
  label: string;
}

// Componente genérico: serve para qualquer lista de opções de texto.
@Component({
  selector: 'app-chip-filter',
  templateUrl: './chip-filter.component.html',
  styleUrl: './chip-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipFilterComponent<T extends string> {
  readonly label = input.required<string>();
  readonly options = input.required<ChipOption<T>[]>();
  // model() permite o binding de duas vias: [(value)]="filtro"
  readonly value = model.required<T>();
}
