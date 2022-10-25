describe('GET /character', function(){

    before(function(){
        cy.deleteDataUser();
		cy.setToken();
	})

    it('deve retornar um array de personagens', function(){

        const characters = [
            {
                name: "Lara Croft",
                alias: "Tomb Raider",
                team: ["Hunter"],
                active: true
            },
            {
                name: "Mateus Magalhaes",
                alias: "Teteu",
                team: ["Porygon"],
                active: true
            },
            {
                name: "Jair",
                alias: "Mito",
                team: ["Patriotas"],
                active: true
            }
        ]
        cy.populate(characters).then(function(){
            cy.getCharacter().then(function(response){
                expect(response.status).to.eql(200)
                expect(response.body).to.be.a('array')
            })    
        })
    })

    it('deve poder pesquisar por nome', function (){
        cy.searchCharacter("Jair").then(function (response){
            expect(response.status).to.eql(200)
            expect(response.body[0].name).to.eql("Jair")
        })
    })

    it('deve retornar um personagem com o id', function(){

        const newCharacter = {
            name: "Lara Croft",
			alias: "Tomb Raider",
			team: ["Hunter"],
			active: true
        }
        cy.deleteDataUser();
        cy.populate(newCharacter).then(function(response){
            expect(response.status).to.eql(201)
            cy.getCharacterById(response.body.character_id).then(function(response){
                expect(response.status).to.eql(200)
                expect(response.body.name).to.eql(newCharacter.name)
            })
        })
    })

    it('deve retornar 404 para id não cadastrado', function () {
        const newCharacter = {
            name: "sumiu",
			alias: "Mister M",
			team: ["Mage"],
			active: true
        }
        cy.postCharacter(newCharacter).then(function (response) {
            const id = response.body.character_id;
            cy.deleteDataUser().then(function () {
                cy.getCharacterById(id).then(function (response) {
                    expect(response.status).to.eql(404)
                })
            })
        })
    })
})


