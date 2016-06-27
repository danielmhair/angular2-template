import { TestComponentBuilder } from '@angular/compiler/testing';
import { Component, provide } from '@angular/core';
import {
  beforeEachProviders,
  describe,
  inject,
  injectAsync,
  it
} from '@angular/core/testing';

// Load the implementations that should be tested
import { Todos } from './todos.component';

describe('About', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    Todos
  ]);

  it('should log ngOnInit', inject([ Todos ], (about) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    about.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
