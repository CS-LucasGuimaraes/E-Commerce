# Cadastro e Manutenção de Métodos de Pagamento (inserir, remover, atualizar) - Lucas Carvalho

Scenario 1: Navegar para página de métodos de pagamento com sucesso
Given o usuário está na página de “Pagamento”
When o usuário seleciona a opção "Adicionar novo cartão"
Then o usuário está na página de “Cadastro de cartão”

Scenario 2: Cadastro de cartão concluído com sucesso
Given o usuário está na página de "Cadastro de cartão"
When o usuário preenche o apelido “Cartão de painho”, o nome “Wilson F Torres”, o código “5112345678998766”, o vencimento “08/32” e o cvc “123”
Then o cartão é salvo na conta com o apelido “Cartão de painho”, o nome “Wilson F Torres”, o código “5112345678998766”, o vencimento “08/32”, o cvc “123” e o tipo “MasterCard”
And o usuário está para página de “Pagamento”

Scenario 3: Remoção de cartão cadastrado com sucesso
Given o usuário está na página de “Pagamento”
And o usuário tem os cartões de apelido “cartão de painho” e “Cartão de mainha” cadastrados
When o usuário seleciona a opção “Remover” o cartão “Cartão de painho”
Then o usuário recebe uma questionamento de confirmação para remoção do cartão “Cartão de painho”
When o usuário confirma remoção do “Cartão de painho”
Then o usuário está na página de “Pagamento”
And o cartão de apelido “Cartão de painho” é removido da lista de cartões
And o usuário tem os cartões de apelido “Cartão de mainha” cadastrados

Scenario 4: Atualização de cartão cadastrado com sucesso
Given o usuário está na página de "Atualização de cartão"
When o usuário seleciona a opção “Atualizar” o cartão “Cartão de painho”
And o usuário preenche o apelido “Cartão de pai”, o nome “Wilson F Torres”, o código “4556737586899855”, o vencimento “03/30” e o cvc “123”
Then o cartão é salvo na conta com o apelido “Cartão de pai”, o nome “Wilson F Torres”, o código “4556737586899855”, o vencimento “03/30”, o cvc “123” e o tipo “VISA”
And o usuário está para página de “Atualização de cartão”

Scenario 5: Atualização de cartão cadastrado sem sucesso por código incorreto
Given o usuário está na página de "Atualização de cartão"
When o usuário seleciona a opção “Atualizar” o cartão “Cartão de painho”
And o usuário preenche o apelido “Cartão de pai”, o nome “Wilson F Torres”, o código “623513”, o vencimento “03/30” e o cvc “123”
Then o usuário está na página de "Atualização de cartão"
And o sistema emite um alerta de “dados incorretos”

Scenario 6: algoritmo de validação dos cartões cadastrados
Given o usuário está na página “Cadastro de cartão”
When o usuário preenche o apelido “Cartão de painho”, o nome “Wilson F Torres”, o código “5112345678998766”, o vencimento “08/32” e o cvc “123”
And o usuário seleciona a opção “Cadastrar” com sucesso
Then o cartão é validado
And o cartão é salvo com a figura do tipo “MasterCard” ou “Visa”

Scenario 7: requisito não funcional de segurança de cadastro de cartão
Given o usuário está na página “Cadastro de cartão”
When o usuário preenche o apelido “Cartão de painho”, o nome “Wilson F Torres”, o código “5112345678998766”, o vencimento “08/32” e o cvc “123”
And o usuário seleciona a opção “Cadastrar” com sucesso
Then o número do cartão salvo está protegido como “************9855” por questões de segurança
And o usuário está na página "Pagamento"