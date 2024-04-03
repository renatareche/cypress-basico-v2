/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('src\\index.html')
    })
    it('verifica o título da aplicação', function() {
        
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

// ***********************************************************
//
// Exercicios AULA 2
//
// ***********************************************************
 
    //Exercicio1
    it('preenche os campos obrigatórios e envia o formulário', function(){
        const longText = 'Como podemos ajudartestemuitolongo1121111111111111111111111111111111111111111111111111111111111111111111111111111111111444444444444444444444444444444444444444444444444444444444441111111111'
        cy.get('#firstName').type('Nome')
        cy.get('#lastName').type('Sobrenome')
        cy.get('#email').type('teste@gmail.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    })

    //Exercicio2
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Nome')
        cy.get('#lastName').type('Sobrenome')
        cy.get('#email').type('testegmail.com')
        cy.get('#open-text-area').type('Como podemos te ajudar', {delay: 0})
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    //Exercicio3
    it('telefone inválido', function(){
        cy.get('#phone').type('abc').should('have.value', '')
    })

    //Exercicio4
    it ('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Nome')
        cy.get('#lastName').type('Sobrenome')
        cy.get('#email').type('teste@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Como podemos te ajudar')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')

    })

    //Exercicio5
    it ('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        const nome = 'Nome'
        const sobrenome = 'Sobrenome'
        const email = 'teste@gmail.com'
        const telefone = 123456
        cy.get('#firstName').type(nome).should('have.value', nome)
        cy.get('#lastName').type(sobrenome).should('have.value', sobrenome)
        cy.get('#email').type(email).should('have.value', email)
        cy.get('#phone').type(telefone).should('have.value', telefone)
        // teste de limpeza
        cy.get('#firstName').clear().should('have.value', '')
        cy.get('#lastName').clear().should('have.value', '')
        cy.get('#email').clear().should('have.value', '')
        cy.get('#phone').clear().should('have.value', '')

        
    })

    //Exercicio6
    it ('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')

        
    })

    //Exercicio7
    it ('envia o formuário com sucesso usando um comando customizado', function(){
        const nome = 'Nome'
        const sobrenome = 'Sobrenome'
        const email = 'teste@gmail.com'
        const texto = 'Como podem me ajudar?'
        cy.fillMandatoryFieldsAndSubmit(nome, sobrenome, email, texto)
        cy.get('.success').should('be.visible')
        
    })

//Exercicio8
    it('exercicio8', function(){
        const longText = 'Como podemos ajudartestemuitolongo1121111111111111111111111111111111111111111111111111111111111111111111111111111111111444444444444444444444444444444444444444444444444444444444441111111111'
        cy.get('#firstName').type('Nome')
        cy.get('#lastName').type('Sobrenome')
        cy.get('#email').type('teste@gmail.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('button','Enviar').click()
        //cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    })
  
// ***********************************************************
//
// Exercicios AULA 3
//
// ***********************************************************

//Exercicio
    it ('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    
})

//Exercicio1
    it ('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')

})

//Exercicio2
    it ('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product').select(1).should('have.value', 'blog')

})

// ***********************************************************
//
// Exercicios AULA 4
//
// ***********************************************************

//Exercicio
it ('marca o tipo de atendimento "Feedback"', function(){
    cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')

})

//ExercicioExtra
it ('marca cada tipo de atendimento', function(){
    cy.get('input[type="radio"]').should('have.length', 3)
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
    })
})

// ***********************************************************
//
// Exercicios AULA 5
//
// ***********************************************************

//Exercicio
it('marca ambos checkboxes, depois desmarca o último', function(){
//COMO EU FIZ - FUNCIONA
    //  cy.get('input[type="checkbox"]').each(function($box){
    //          cy.wrap($box).check()
    //          cy.wrap($box).should('be.checked')
    //  })
    //  cy.get('input[type="checkbox"]').last().uncheck()
    //  cy.get('input[type="checkbox"]').last().should('not.be.checked')
//COMO O PROF FEZ
    cy.get('input[type="checkbox"]').check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.selected')
})

//Exercicio Extra
it ('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
    const nome = 'Nome'
    const sobrenome = 'Sobrenome'
    const email = 'teste@gmail.com'
    const texto = 'Como podem me ajudar?'
    cy.get('input[type="checkbox"]').check('phone')
        .should('be.checked', 'phone')
    cy.fillMandatoryFieldsAndSubmit(nome, sobrenome, email, texto)
    cy.get('.error').should('be.visible')

    })


// ***********************************************************
//
// Exercicios AULA 6
//
// ***********************************************************

//Exercicio
it('seleciona um arquivo da pasta fixtures', function(){
cy.get('input[type="file"]')
.should('not.have.value')
.selectFile('cypress/fixtures/example.json')
.should(function($input){
    expect($input[0].files[0].name).to.equal('example.json')
})
})
//Exercicio1
it('seleciona um arquivo simulando um drag-and-drop', function(){
    cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
    })
})

//Exercicio2
it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
    })
})

// ***********************************************************
//
// Exercicios AULA 7
//
// ***********************************************************

//Exercicio
it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

//Exercicio1
it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
    cy.get('#privacy a').invoke('removeAttr', 'target').click()
    //COMO EU FIZ
    //cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
    cy.contains('Talking About Testing').should('be.visible')
    })


//Exercicio2
it('testa a página da política de privacidade de forma independente', function(){
    cy.visit('/src/privacy.html')
    //COMO EU FIZ
    //cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
    cy.contains('Talking About Testing').should('be.visible')
    })


// ***********************************************************
//
// Exercicios AULA 8 
//
// ***********************************************************

//Exercicio
//no arquivo package.json criar um novo script: 
//"cy:open:mobile": "cypress open --config viewportWidth=410 viewportHeight=860",
//e rodar os testes

//Exercicio1
//no arquivo package.json criar um novo script: 
//"cy:test:mobile": "cypress run --config viewportWidth=410 viewportHeight=860",
//e rodar os testes


// ***********************************************************
//
// Exercicios AULA 9
//
// ***********************************************************
//
// DOCUMENTAÇÃO


})