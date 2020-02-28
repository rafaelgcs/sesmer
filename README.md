# SESMER v2.0
Sistema para gerenciamento de vendas de usuário único, contendo MERCADORIAS, ESTOQUE, CARRINHO DE COMPRAS e CONTROLE DE VENDAS

## Instalando
```shell
git clone https://github.com/rafaelgcs/sesmer.git
```
Instale as dependencias do React dentro da pasta /front/
```shell
cd ./front/
npm install
```
Caso preferir, utilize:
```shell
cd ./front/
yarn install
```

## Banco de dados
```sql
CREATE DATABASE sesmer_db;

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `name` varchar(160)  NOT NULL,
  `email` varchar(200) NOT NULL,
  `numero` varchar(30) NOT NULL,
  `valor_gasto` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `estoque` (
  `id` int(11) NOT NULL,
  `mercadoriaId` int(11) NOT NULL,
  `quantidade` int(11) NOT NULL,
  `ultima_data` varchar(30) NOT NULL,
  `saidas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `itens_venda` (
  `id` int(11) NOT NULL,
  `mercadoria_cod` varchar(150) NOT NULL,
  `venda_id` int(11) NOT NULL,
  `quantidade` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `mercadorias` (
  `id` int(11) NOT NULL,
  `cod` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` varchar(400) DEFAULT NULL,
  `p_unit` float NOT NULL,
  `img` varchar(500) DEFAULT '/images/products/default.png',
  `p_entrada` float NOT NULL,
  `p_saida` float NOT NULL,
  `p_final` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `firstname` varchar(90) NOT NULL,
  `lastname` varchar(180) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(4000) NOT NULL,
  `permission` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `vendas` (
  `id` int(11) NOT NULL,
  `valor` double NOT NULL,
  `clienteId` int(11) NOT NULL,
  `vendedorId` int(11) NOT NULL,
  `dia_venda` varchar(10) NOT NULL,
  `mes_venda` varchar(10) NOT NULL,
  `ano_venda` varchar(10) NOT NULL,
  `hora_venda` varchar(5) NOT NULL,
  `metodo` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices de tabela `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `estoque`
--
ALTER TABLE `estoque`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `itens_venda`
--
ALTER TABLE `itens_venda`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `mercadorias`
--
ALTER TABLE `mercadorias`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `COD_Mercadorias` (`cod`);

--
-- Índices de tabela `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `vendas`
--
ALTER TABLE `vendas`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabela `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `estoque`
--
ALTER TABLE `estoque`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `itens_venda`
--
ALTER TABLE `itens_venda`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `mercadorias`
--
ALTER TABLE `mercadorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `vendas`
--
ALTER TABLE `vendas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;


--
-- INSERT de Usuário Admin (SENHA PADRÃO é 123456):
--
INSERT INTO `user` (`id`, `firstname`, `lastname`, `email`, `password`, `permission`) VALUES
(null, 'Administrador', 'Geral do Sistema', 'admin@email.com', 'e10adc3949ba59abbe56e057f20f883e', 1);

```

## Para executar:

Primeiro, vá no arquivo '/api/index.php' e altere a string de conexão, colocando os dados de acesso para seu banco de dados:
"host: Hospedagem do seu banco de dados MySql, em geral pode deixar como localhost";
"dbname: Nome do banco de dados, caso siga o código acima para gerar os eu banco, o nome será: sesmer_db";
"db_user: O usuário do seu banco de dados, se estiver utilizando XAMPP, WAMP ou algum outro, será: root, como padrão";
"db_password: A senha do seu usuário que estará acessando o banco".

```php
$conn = new \PDO('mysql:host=localhost;dbname=db_name', 'db_user', 'db_password');
```

Feito isso, basta colocar no seu servidor e consumir a API;

Agora para realizar todas as requisições a partir do ReactJS utilizado no front-end, continue lendo...

## Link da API para o Front

Vá no arquivo './front/src/services/api.js' e altere a url base para as requisições da api:

```javascript
const api = axios.create({
  baseURL: "http://localhost/api"
});
```

Feito isso, basta executar o comando abaixo para realizar o build da aplicação
```shell
cd ./front/
npm build -prod
```
Caso preferir, utilize:
```shell
cd ./front/
yarn build -prod
```
