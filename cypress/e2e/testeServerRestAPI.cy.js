describe('Testes API ServerRest', () => {

    const timestamp = Date.now()
    const emailUnico = `fulano_${timestamp}@teste.com.br`

    it('Deve cadastrar um usuário (201)', () => {
        cy.request({
            method: 'POST',
            url: 'https://serverest.dev/usuarios',
            body: {
                nome: 'Fulano da Silva',
                email: emailUnico,
                password: 'teste',
                administrador: 'true'
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body.message).to.contain('Cadastro realizado com sucesso')
        })
    })

    it('Deve realizar o login (200)', () => {
        cy.request({
            method: 'POST',
            url: 'https://serverest.dev/login',
            body: {
                email: emailUnico,
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

    it('Deve falhar cadastrar um usuário (400)', () => {
        cy.request({
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
            url: 'https://serverest.dev/usuarios/8esoLx79DMKlP3fq',
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body._id).to.contain('8esoLx79DMKlP3fq')
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

    it('Deve cadastrar e excluir um usuário com sucesso (201) (200)', () => {
        const timestamp = Date.now()
        const emailUnico = `fulano_${timestamp}@teste.com.br`

        // Cadastrar usuário
        cy.request({
            method: 'POST',
            url: 'https://serverest.dev/usuarios',
            body: {
                nome: 'Fulano da Silva',
                email: emailUnico,
                password: '123456',
                administrador: 'true'
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body.message).to.contain('Cadastro realizado com sucesso')

            const userId = response.body._id

            // Excluir o mesmo usuário usando o _id retornado
            cy.request({
                method: 'DELETE',
                url: `https://serverest.dev/usuarios/${userId}`,
                failOnStatusCode: false,
            }).then((editResponse) => {
                expect(editResponse.status).to.eq(200)
                expect(editResponse.body.message).to.contain('Registro excluído com sucesso')
            })
        })
    })

    it('Deve cadastrar e editar um usuário com sucesso (201) (200)', () => {
        const timestamp = Date.now()
        const emailUnico = `fulano_${timestamp}@teste.com.br`

        // Cadastrar usuário
        cy.request({
            method: 'POST',
            url: 'https://serverest.dev/usuarios',
            body: {
                nome: 'Fulano da Silva',
                email: emailUnico,
                password: '123456',
                administrador: 'true'
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body.message).to.contain('Cadastro realizado com sucesso')

            const userId = response.body._id

            // Editar o mesmo usuário usando o _id retornado
            cy.request({
                method: 'PUT',
                url: `https://serverest.dev/usuarios/${userId}`,
                failOnStatusCode: false,
                body: {
                    nome: 'Fulano Editado',
                    email: emailUnico,
                    password: 'novaSenha123',
                    administrador: 'false'
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((editResponse) => {
                expect(editResponse.status).to.eq(200)
                expect(editResponse.body.message).to.contain('Registro alterado com sucesso')
            })
        })
    })

    it('Deve listar produtos cadastrados', () => {
        cy.request({
            method: 'GET',
            url: 'https://serverest.dev/produtos',
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('quantidade')
        })
    })

    it('Deve cadastrar um produto (201)', () => {
        const produto = Date.now()

        cy.request({
            method: 'POST',
            url: 'https://serverest.dev/login',
            body: {
                email: emailUnico,
                password: 'teste',
            },
            Headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            const token = response.body.authorization

            cy.request({
            method: 'POST',
            url: 'https://serverest.dev/produtos',
            body: {
                nome: `${produto}`,
                preco: 9000,
                descricao: 'Console',
                quantidade: 1
            },
            headers: {
                Authorization: `${token}`,
                'Content-Type': 'application/json'
    
            }
        }).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body.message).to.contain('Cadastro realizado com sucesso')
        })
        })
   })

})
