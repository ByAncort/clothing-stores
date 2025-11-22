import JasmineDOM from '@testing-library/jasmine-dom';

// Configuración global para Jasmine
beforeAll(() => {
  // Registra los matchers de Testing Library para Jasmine (toBeInTheDocument, etc.)
  // Nota: @testing-library/jasmine-dom exporta el objeto de matchers por defecto.
  if (typeof jasmine !== 'undefined' && (JasmineDOM as any)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // @ts-ignore
    jasmine.addMatchers((JasmineDOM as any));
  }
  // Configuración global antes de todas las pruebas
  // Asegura que document esté disponible
  expect(document).toBeDefined();
});

afterAll(() => {
  // Limpieza global después de todas las pruebas
});