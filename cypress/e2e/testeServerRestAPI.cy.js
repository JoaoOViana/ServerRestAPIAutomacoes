describe('Testes API ServerRest', () => {
    it('Deve realizar o login (200)', () => {
        cy.request({
            method: 'POST',
            url: 'https://serverest.dev/login',
            body: {
                email: 'fulaanoo@teste.com.br',
                password: 'teste',
            },
            Headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.contain('Login realizado com sucesso')
        })       
    })

    it('Deve falhar o login (401)', () => {
        cy.request({
            method: 'POST', 
            url: 'https://serverest.dev/login',
            failOnStatusCode: false,
            body: {
                email: 'fulaanoo@teste.com.br',
                password: 'testee',
            },
            Headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            expect(response.status).to.eq(401)
            expect(response.body.message).to.contain('Email e/ou senha inválidos')
        })       
    })

    it('Deve listar os usuários cadastrados (200)', () => {
        cy.request({
            method: 'GET', 
            url: 'https://serverest.dev/usuarios',
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.usuarios).to.include.members([])
        })       
    })

    it('Deve cadastrar um usuário (201)', () => {
        cy.request({ //Precisa ajustar o e-mail sempre que for rodar
            method: 'POST', 
            url: 'https://serverest.dev/usuarios',
            body: {
                nome: 'Fulano da Silva',
                email: 'fulaanoo@teste.com.br',
                password: 'teste',
                administrador: 'true'
            },
            Headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body.message).to.contain('Cadastro realizado com sucesso')
        })       
    })

    it('Deve falhar cadastrar um usuário (400)', () => {
        cy.request({ //Precisar estar de acordo com o teste acima
            method: 'POST',
            url: 'https://serverest.dev/usuarios',
            failOnStatusCode: false,
            body: {
                nome: 'Fulano da Silva',
                email: 'fulaanoo@teste.com.br',
                password: 'teste',
                administrador: 'true'
            },
            Headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body.message).to.contain('Este email já está sendo usado')
        })       
    })

    it('Deve falhar cadastrar um usuário e-mail em branco (400)', () => {
        cy.request({
            method: 'POST',
            url: 'https://serverest.dev/usuarios',
            failOnStatusCode: false,
            body: {
                nome: 'Fulano da Silva',
                email: '',
                password: 'teste',
                administrador: 'true'
            },
            Headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body.email).to.contain('email não pode ficar em branco')
        })       
    })

    it('Deve falhar cadastrar um usuário email válido (400)', () => {
        cy.request({
            method: 'POST',
            url: 'https://serverest.dev/usuarios',
            failOnStatusCode: false,
            body: {
                nome: 'Fulano da Silva',
                email: 'aa',
                password: 'teste',
                administrador: 'true'
            },
            Headers: {
                'Content-Type': 'application/json' 
            }
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body.email).to.contain('email deve ser um email válido')
        })       
    })

    it('Deve falhar cadastrar um usuário senha em branco (400)', () => {
        cy.request({
            method: 'POST',
            url: 'https://serverest.dev/usuarios',
            failOnStatusCode: false,
            body: {
                nome: 'Fulano da Silva',
                email: 'sennhaembranco@gmail.com',
                password: '',
                administrador: 'true'
            },
            Headers: {
                'Content-Type': 'application/json' 
            }
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body.password).to.contain('password não pode ficar em branco')
        })       
    })

    it('Deve listar o usuario por ID (200)', () => {
        cy.request({
            method: 'GET', 
            url: 'https://serverest.dev/usuarios/0pEiXrn2P4DUgW2z',
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body._id).to.contain('0pEiXrn2P4DUgW2z')
        })       
    })

    it('Não deve listar o usuario por ID usuario nao encontrado (400)', () => {
        cy.request({
            method: 'GET', 
            url: 'https://serverest.dev/usuarios/MKTvwqVffHeqFeCP',
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body.message).to.contain('Usuário não encontrado')
        })       
    })

    it('Não deve listar o usuario por ID sem quantidade de caracter valido (400)', () => {
        cy.request({
            method: 'GET', 
            url: 'https://serverest.dev/usuarios/MKTvwqVffHeqFeC',
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body.id).to.contain('id deve ter exatamente 16 caracteres alfanuméricos')
        })       
    })

    it('Deve excluir um usuário (200)', () => {
        cy.request({
            method: 'DELETE', 
            url: 'https://serverest.dev/usuarios/x5mH2YW5Ze7QfR9C',
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.contain('Registro excluído com sucesso')
        })       
    })

    it('Deve editar um usuário (200)', () => {
        cy.request({
            method: 'PUT',
            url: 'https://serverest.dev/usuarios/FJjHQc2Y25orMOpY',
            failOnStatusCode: false,
            body: {
                nome: 'Joee',
                email: 'joaoteste@gmail.com',
                password: '1234567',
                administrador: 'true'
            },
            Headers: {
                'Content-Type': 'application/json' 
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.contain('Registro alterado com sucesso')
        })       
    })
    
});
