import Chance from "chance";
const chance = new Chance();

describe('Register', () => {
  const name = chance.name().split(' ')[0];
  const surname = chance.last();
  const username = 'username' + chance.integer({ min: 0, max: 99 });
  const pass = 'Password1';

  before(() => {
    cy.visit('/login');

    cy.get('[data-cy=username-input]').click().type('admin', {delay: 100});
    cy.get('[data-cy=password-input]').click().type('pass', {delay: 100});
    cy.get('[data-cy=submit-button]').click();
    cy.wait(500);
  });

  beforeEach(() => {

    cy.get('[data-cy=name-input]').clear();

    cy.get('[data-cy=surname-input]').clear();

    cy.get('[data-cy=username-input]').clear();

    cy.get('[data-cy=password-input]').clear();

    cy.get('[data-cy=confirm-pass-input]').clear();
    cy.wait(500);
  });

  it('should show inputs for name, surname, username, password, confirm password and a disabled button', () => {

    cy.get('[data-cy=name-input]').should('be.visible');

    cy.get('[data-cy=surname-input]').should('be.visible');

    cy.get('[data-cy=username-input]').should('be.visible');

    cy.get('[data-cy=password-input]').should('be.visible');

    cy.get('[data-cy=confirm-pass-input]').should('be.visible');

    cy.get('[data-cy=submit-button]').should('be.visible').should('be.disabled');

  });

  it('should register a valid user', () => {

    cy.server();
    cy.route('POST', '/v1/customers', { name: name, surname: surname, username: username, password: pass }).as('createUser');

    cy.get('[data-cy=name-input]').click().type(name, {delay: 100});

    cy.get('[data-cy=surname-input]').click().type(surname, {delay: 100});

    cy.get('[data-cy=username-input]').click().type(username, {delay: 100});

    cy.get('[data-cy=password-input]').click().type(pass, {delay: 100});

    cy.get('[data-cy=confirm-pass-input]').click().type(pass, {delay: 100});

    cy.get('[data-cy=submit-button]').click();

    cy.wait('@createUser').its('status').should('eq', 200);
  });

  it('should not register a user with a name not between 2 and 20 characters', () => {

    cy.server();
    cy.route({
      method: 'POST',
      url: '/v1/customers',
      status: 400,
      response: {
        name: name.substring(0,1),
        surname: surname,
        username: username,
        password: pass
      }
    }).as('createUser');

    cy.get('[data-cy=name-input]').click().type(name.substring(0,1), {delay: 100});

    cy.get('[data-cy=surname-input]').click().type(surname, {delay: 100});

    cy.get('[data-cy=username-input]').click().type(username, {delay: 100});

    cy.get('[data-cy=password-input]').click().type(pass, {delay: 100});

    cy.get('[data-cy=confirm-pass-input]').click().type(pass, {delay: 100});

    cy.get('[data-cy=submit-button]').click();

    cy.wait('@createUser').its('status').should('eq', 400);
  });

  it('should not register a user with a surname not between 2 and 20 characters', () => {

    cy.server();
    cy.route({
      method: 'POST',
      url: '/v1/customers',
      status: 400,
      response: {
        name: name,
        surname: surname.substring(0,1),
        username: username,
        password: pass
      }
    }).as('createUser');

    cy.get('[data-cy=name-input]').click().type(name, {delay: 100});

    cy.get('[data-cy=surname-input]').click().type(surname.substring(0,1), {delay: 100});

    cy.get('[data-cy=username-input]').click().type(username, {delay: 100});

    cy.get('[data-cy=password-input]').click().type(pass, {delay: 100});

    cy.get('[data-cy=confirm-pass-input]').click().type(pass, {delay: 100});

    cy.get('[data-cy=submit-button]').click();

    cy.wait('@createUser').its('status').should('eq', 400);
  });

  it('should not register a user with a username not between 5 and 32 characters', () => {

    cy.server();
    cy.route({
      method: 'POST',
      url: '/v1/customers',
      status: 400,
      response: {
        name: name,
        surname: surname,
        username: username.substring(0,3),
        password: pass
      }
    }).as('createUser');

    cy.get('[data-cy=name-input]').click().type(name, {delay: 100});

    cy.get('[data-cy=surname-input]').click().type(surname, {delay: 100});

    cy.get('[data-cy=username-input]').click().type(username.substring(0,3), {delay: 100});

    cy.get('[data-cy=password-input]').click().type(pass, {delay: 100});

    cy.get('[data-cy=confirm-pass-input]').click().type(pass, {delay: 100});

    cy.get('[data-cy=submit-button]').click();

    cy.wait('@createUser').its('status').should('eq', 400);
  });

  it('should not register a user with a username with special characters', () => {

    cy.server();
    cy.route({
      method: 'POST',
      url: '/v1/customers',
      status: 400,
      response: {
        name: name,
        surname: surname,
        username: username + '$',
        password: pass
      }
    }).as('createUser');

    cy.get('[data-cy=name-input]').click().type(name, {delay: 100});

    cy.get('[data-cy=surname-input]').click().type(surname, {delay: 100});

    cy.get('[data-cy=username-input]').click().type(username + '$', {delay: 100});

    cy.get('[data-cy=password-input]').click().type(pass, {delay: 100});

    cy.get('[data-cy=confirm-pass-input]').click().type(pass, {delay: 100});

    cy.get('[data-cy=submit-button]').click();

    cy.wait('@createUser').its('status').should('eq', 400);
  });

  it('should not register a user with a password with less than 8 characters', () => {

    cy.server();
    cy.route({
      method: 'POST',
      url: '/v1/customers',
      status: 400,
      response: {
        name: name,
        surname: surname,
        username: username,
        password: 'Pass1'
      }
    }).as('createUser');

    cy.get('[data-cy=name-input]').click().type(name, {delay: 100});

    cy.get('[data-cy=surname-input]').click().type(surname, {delay: 100});

    cy.get('[data-cy=username-input]').click().type(username, {delay: 100});

    cy.get('[data-cy=show-pass]').click();

    cy.get('[data-cy=password-input]').click().type('Pass1', {delay: 100});

    cy.get('[data-cy=show-confirm]').click();

    cy.get('[data-cy=confirm-pass-input]').click().type('Pass1', {delay: 100});

    cy.get('[data-cy=submit-button]').click();

    cy.wait('@createUser').its('status').should('eq', 400);
  });

  it('should not register a user with a password that does not have one upperCase and one number', () => {

    cy.server();
    cy.route({
      method: 'POST',
      url: '/v1/customers',
      status: 400,
      response: {
        name: name,
        surname: surname,
        username: username,
        password: 'password'
      }
    }).as('createUser');

    cy.get('[data-cy=name-input]').click().type(name, {delay: 100});

    cy.get('[data-cy=surname-input]').click().type(surname, {delay: 100});

    cy.get('[data-cy=username-input]').click().type(username, {delay: 100});

    cy.get('[data-cy=show-pass]').click();

    cy.get('[data-cy=password-input]').click().type('password', {delay: 100});

    cy.get('[data-cy=show-confirm]').click();

    cy.get('[data-cy=confirm-pass-input]').click().type('password', {delay: 100});

    cy.get('[data-cy=submit-button]').click();

    cy.wait('@createUser').its('status').should('eq', 400);
  });
});
