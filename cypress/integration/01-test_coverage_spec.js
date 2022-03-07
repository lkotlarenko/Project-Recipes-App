describe('1 - Desenvolva os testes unitários de maneira que a cobertura seja de, no mínimo, 90%', () => {
  it('Verifica a cobertura de testes unitários', () => {
    cy.exec('npm run test-coverage -- --coverageReporters="json-summary" --testFailureExitCode=0');
    cy.readFile('coverage/coverage-summary.json').its('total.lines.pct').should('be.gte', 90.00);
  });
});
