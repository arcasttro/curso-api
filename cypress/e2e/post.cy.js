
describe('POST /characters', function(){

	before(function(){
		cy.deleteDataUser();		
		cy.setToken();
	})

	it('deve cadastrar um novo personagem', function () {
		const character = {
			name: "Arthur Rodrigues de Castro",
			alias: "Rato",
			team: ["x-men"],
			active: true
		}

		cy.postCharacter(character).then(function(response){
			expect(response.status).to.eql(201)
			Cypress.env('character_id', response.body.character_id)
			expect(response.body.character_id.length).to.eql(24)
		})
	})

	context('quando cadastrado um novo usuário', function(){

		const character = {
			name: "novo",
			alias: "Dorinha",
			team: ["dogs"],
			active: true
		}

		before(function(){
			cy.postCharacter(character).then(function(response){
				expect(response.status).to.eql(201)
			})
		})

		it('não deve permitir cadastrar duplicado', function(){

			cy.postCharacter(character).then(function(response){
				expect(response.status).to.eql(400)
				expect(response.body.error).to.eql('Duplicate character')
			})
		})	
	})

	it('cadastrar sem preencher todos os campos obrigatorios', function(){

		const irregularCharacter = {
			name: "Isadora Aventureira",
			alias: "Dorinha",
			team: ["raposos"]
		}

		cy.postCharacter(irregularCharacter).then(function(response){
			expect(response.status).to.eql(400)			
			expect(response.body.message).to.eql('Validation failed')			
		})
	})

})

