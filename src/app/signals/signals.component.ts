import { NgFor } from '@angular/common';
import { Component, signal, computed, effect } from '@angular/core';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  standalone: true,
  imports: [NgFor]
})
export class SignalsComponent {
  actions = signal<string[]>([]);
  counter = signal(0);
  doubleCounter = computed(() => this.counter() * 2);

  constructor() {
    effect(() => console.log('Counter: ', this.counter()));
  }

  increment() {
    this.counter.update((oldCounter) => oldCounter + 1);
    // this.actions.push('INCREMENT');
    this.actions.mutate((oldActions) => oldActions.push('INCREMENT'));
  }

  decrement() {
    this.counter.update((oldCounter) => oldCounter - 1);
    // this.actions.push('DECREMENT');
    this.actions.update((oldActions) => [...oldActions, 'DECREMENT']);
  }

  set() {
    this.counter.set(5);
    // this.actions.push('SET');
    this.actions.mutate((oldActions) => oldActions.push('SET'));
  }
}
