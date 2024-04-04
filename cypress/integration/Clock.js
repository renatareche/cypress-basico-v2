/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('src/index.html')
    })
    it('verifica o título da aplicação', function() {
        
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

// ***********************************************************
//
// Exercicios AULA 11
//
// ***********************************************************
 
    //Exercicio
    it('preenche os campos obrigatórios e envia o formulário', function(){
        const longText = 'Como podemos ajudartestemuitolongo1121111111111111111111111111111111111111111111111111111111111111111111111111111111111444444444444444444444444444444444444444444444444444444444441111111111'
        cy.get('#firstName').type('Nome')
        cy.get('#lastName').type('Sobrenome')
        cy.get('#email').type('teste@gmail.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.get('button[type="submit"]').click()
        cy.clock()
        cy.get('.success').should('be.visible')
        cy.tick(3000)
        cy.get('.success').should('not.be.visible')
    })

    //Exercicio1
    Cypress._.times(3, () => {
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Nome')
        cy.get('#lastName').type('Sobrenome')
        cy.get('#email').type('testegmail.com')
        cy.get('#open-text-area').type('Como podemos te ajudar')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })
})

    //Exercicio2
    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', function() {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })


    //Exercicio3
    it('preenche a area de texto usando o comando invoke', function(){
        const texto = Cypress._.repeat('0123456789', 20)
        cy.get('#open-text-area').invoke('val', texto)
        .should('have.value', texto)

    })

    //Exercicio 4
    it('faz uma requisição HTTP', function(){
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
        .should(function(response){
            //console.log(response)
            const {status, statusText, body} = response
            expect(status).to.equal(200)
            expect(statusText).to.equal('OK')
            expect(body).to.include('CAC TAT')
        })       
    })

 // ***********************************************************
//
// Exercicios AULA 12
//
// ***********************************************************
//
//Achar o gato
it('achar o gato', function(){
cy.get('#cat').invoke('show').should('be.visible')

})



})