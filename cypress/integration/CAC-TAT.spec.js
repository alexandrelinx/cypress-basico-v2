// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test


///<reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT',function() {
  beforeEach(function(){
    cy.visit('./src/index.html')
  })

    it('verifica o titulo da aplicação',function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })
    it(' preenche os campos obrigatorios e enviar o formulario', function() {    //it.olny executa função de callback
        const longText = "alexadre malaquias oliveira da silva " //  criada a variavel longText  para inserir um texto longo //
        cy.clock()
        cy.get('#firstName').type('aleaxndre')
        cy.get('#lastName').type('malaquias')
        cy.get('#email').type('alexandremos@gmail.com')
        cy.get('#open-text-area').type(longText, {delay:0}) // o argumento delay 0 insere instantanemente o testo longo //
        //cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()
        
        cy.get('.success').should('be.visible')
        cy.tick(3000)
        cy.get('.success').should('not.be.visible')
        //Should  comando para validar campos //
    })
    it('Exibe mensagem de erro ao submeter o formulario com um emal comm formatação invalida',function() {
        cy.get('#firstName').type('aleaxndre')
        cy.get('#lastName').type('malaquias')
        cy.get('#email').type('alexandremos@.com')
        cy.get('#open-text-area').type('teste')
        //cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible') //Should  comando para validar campos //
    
       }) 
    it('Campo telefone fica vazio quando preechido com valor não numerico',function(){

       cy.get('#phone')
        .type('abcoder')
        .should('have.value','')
    })
    it('exibir mensagem de erro quando o telefone se tornar obrigatorio mas não é preenchido antes do envio',function(){

        cy.get('#firstName').type('aleaxndre')
        cy.get('#lastName').type('malaquias')
        cy.get('#email').type('alexandremos@gmail.com')
        cy.get('#phone-checkbox').check()
       // cy.get('#phone').type('98589259')
        cy.get('#open-text-area').type('teste')
        //cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()
     
        cy.get('.error').should('be.visible') 

        })
    it('Preenche e limpa os campos nome,sobrenome,email e telefone',function(){
     
        cy.get('#firstName')
        .type('alexandre')
        .should('have.value', 'alexandre')
        .clear()
        cy.get('#lastName')
        .type('malaquias')
        .should('have.value', 'malaquias')
        .clear()
        cy.get('#email')
        .type('alexandremos@gmail.com')
        .should('have.value', 'alexandremos@gmail.com')
        .clear()
        cy.get('#phone-checkbox').click()
        cy.get('#phone')
        .type('98589259')
        .should('have.value', '98589259')
        .clear()

        //cy.get('#open-text-area').type('teste')
        //cy.get('button[type="submit"]').click()

    })
    it('valida mensagem de erro ao subimenter formulario sem preecher campos obrigatorios',function(){
       
        cy.get('#phone-checkbox').click()
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible') 
    })
    it('envia o formulario com sucesso usando um comando customizado',function(){
        cy.fillMandatoryFieldAndSubmit()
        cy.get('.success').should('be.visible')

    })
    it('Selecionar um produto youtube por seu texto',function(){
       // cy.get('#product').click
        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
    })
    it('seleciona um produto (Mentoria) por seu valor (value)',function(){
        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    }) 
     it('seleciona um produto (Blog) por seu índice',function(){
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')

     })
     it('marca o tipo de atendimento "Feedback"',function(){
        //cy.get(':nth-child(4) > input')
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('be.checked')
    })
    it('marca cada tipo de atendimento"',function(){
                
        cy.get('input[type="radio"]')  //comando get (busca dados)
        .should('have.length',3)     //comando should (validar campos)
        .each(function($radio){     //comando each (encadeia mais de uma seleção -cria lista )
         cy.wrap($radio).check()    // comando wrap (encapsula o objeto e permite que seja executado os comando check ,should)
         cy.wrap($radio).should('be.checked') 
        })
    })
    it('marca ambos checkboxes, depois desmarca o último', function(){
          
        cy.get('input[type="checkbox"]') .check()
        .should('be.checked')
        .last() //comando que marca o ultimo campo
        .uncheck()
         // cy.get('input[type="checkbox"][id="phone-checkbox"]').uncheck()
        .should('not.be.checked')  

    })
    it('seleciona um arquivo da pasta fixtures',function()  {
        //cy.get('input[type="file"]')
        cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
            //.selectFile('C:\Aplicativos\repositorio\cypress-basico-v2\cypress\fixtures\example.json')
        .selectFile('./cypress/fixtures/test.json')
        .should(function($input){
          expect($input[0].files[0].name).to.equal('test.json') 
               })
           
            //pode ser validado desta forma tambem  usando o comando .then
           // .then(input => {
            //    expect(input[0].files[0].name).to.equal('test.json') 
           // })
            
      
    })
    it('seleciona um arquivo simulando um drag-and-drop',function()  {
         //cy.get('input[type="file"]')
       cy.get('input[type="file"]#file-upload')
         .should('not.have.value')
            //.selectFile('C:\Aplicativos\repositorio\cypress-basico-v2\cypress\fixtures\example.json')
         .selectFile('./cypress/fixtures/test.json',{action:'drag-drop'})
         .should(function($input){
            console.log($input)
            expect($input[0].files[0].name).to.equal('teste.json') 
                 })
           
    })
     it(' seleciona um arquivo utilizando uma fixture para a qual foi dada um alias',function()  {
          
        cy.fixture('test.json', {encoding: null}).as ('testfile')
        cy.get('input[type="file"]#file-upload')
          .should('not.have.value')
          .selectFile({
              contents:'@testfile',
              fileName:'test.json'
                   })
          .should(function($input){
             expect($input[0].files[0].name).to.equal('test.json') 
                   })
              
    })
           
     it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',function(){
         cy.get('#privacy a')
           .should('have.attr', 'target', '_blank')
            
            
           
    })

    it(' acessa a página da política de privacidade removendo o target e então clicando no link',function(){
         cy.get('#privacy a').invoke('removeAttr', 'target') .click()
          cy.contains ('Talking About Testing').should('be.visible')
         
           
    })

})
    



       

       

