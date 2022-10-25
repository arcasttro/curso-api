// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('setToken', function(){
	cy.api({
		method: 'POST',
		url: '/sessions',
		body: {
			email: 'artuteste@teste.com',
			password: 'qa-cademy'
		}
	}).then(function(response){
		expect(response.status).to.eql(200)
		Cypress.env('token', response.body.token) 
	})
});

Cypress.Commands.add('deleteDataUser', function(){
	cy.api({
		method: 'DELETE',
		url: `/back2thepast/634dfa4a1a7b8300163591bf`
	}).then(function(response){
		expect(response.status).to.eql(200)
	})
})

Cypress.Commands.add('postCharacter', function(payLoad){
	cy.api({
		method: 'POST', 
		url: "/characters",
		body: payLoad,
		headers: {
			Authorization: Cypress.env('token')
		},
		failOnStatusCode: false
	}).then(function(response){
		return response
	})
});

Cypress.Commands.add('getCharacter', function(){
	cy.api({
		method: 'GET', 
		url: "/characters",
		headers: {
			Authorization: Cypress.env('token')
		},
		failOnStatusCode: false
	}).then(function(response){
		return response
	})
});

Cypress.Commands.add('searchCharacter', function(characterName){
	cy.api({
		method: 'GET', 
		url: "/characters",
		qs: {name: characterName},
		headers: {
			Authorization: Cypress.env('token')
		},
		failOnStatusCode: false
	}).then(function(response){
		return response
	})
});

Cypress.Commands.add('getCharacterById', function(character_id){
	cy.api({
		method: 'GET', 
		url: `/characters/${character_id}`,
		headers: {
			Authorization: Cypress.env('token')
		},
		failOnStatusCode: false
	}).then(function(response){
		return response
	})
});

Cypress.Commands.add('deleteCharacterById', function(character_id){
	cy.api({
		method: 'DELETE', 
		url: `/characters/${character_id}`,
		headers: {
			Authorization: Cypress.env('token')
		},
		failOnStatusCode: false
	}).then(function(response){
		return response
	})
});

Cypress.Commands.add('populate', function(characters){
	if (Array.isArray(characters)) {
		characters.forEach((c)=>{
			cy.postCharacter(c)
		})
	}else{
		cy.postCharacter(characters)
	}
});

