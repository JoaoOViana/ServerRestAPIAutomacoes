describe('Testes API ServerRest', () => {
    it('Deve realizar o login', () => {
        cy.request({
            method: 'POST', // GET ou 'POST', 'PUT', 'DELETE', etc.
            url: 'https://serverest.dev/login',
            body: {
                email: 'teste@teste.com.br',
                password: '123456',
            },
            Headers: {
                'Content-Type': 'application/json'

            }
        }).then((response) => {
            expect(response.status).to.eq(200)
        })       
    })

    it('Deve falhar o login', () => {
        cy.request({
            method: 'POST', // GET ou 'POST', 'PUT', 'DELETE', etc.
            url: 'https://serverest.dev/login',
            failOnStatusCode: false,
            body: {
                email: 'teste@teste.com.br',
                password: '123457',
            },
            Headers: {
                'Content-Type': 'application/json'

            }
        }).then((response) => {
            expect(response.status).to.eq(401)
            expect(response.body.message).to.contain('Email e/ou senha inválidos')
        })       
    })

    it('Deve realizar o login', () => {
        cy.request({
            method: 'POST', // GET ou 'POST', 'PUT', 'DELETE', etc.
            url: 'https://serverest.dev/login',
            body: {
                email: 'teste@teste.com.br',
                password: '123456',
            },
            Headers: {
                'Content-Type': 'application/json'

            }
        }).then((response) => {
            expect(response.status).to.eq(200)
        })       
    })
    
});
