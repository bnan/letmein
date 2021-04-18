# letmein

Empresas podem ter dificuldades em encontrar uma solução de baixo custo, segura e flexível para poder dar autorização/acesso a utilizadores aos seus serviços.
 
A nossa solução consiste em usar a segurança fornecida por smart contracts da blockchain da Ethereum para implementar uma solução simples e barata para qualquer pessoa conseguir controlar o acesso a um determinado serviço ou bem. Alguns use cases são: acesso a ginásios, cacifos públicos, bicicletas de alugar, etc.
Outro exemplo, é no caso de ter uma fechadura "intelegente" em uma casa. Se por exemplo, estiver longa da sua casa e quiser dar acesso a um amigo ou familiar basta saber o endereço da carteira dessa pessoa e dar acesso, por exemplo na próxima hora.

As tecnologias usadas são:

Ganache para uma blockchain pessoal para desenvolvimento dos smartcontracts
Truffle para desenvolvimento de smart contracts
HTML/CSS/JS para a aplicação web cliente
IPFS tecnologia descentralizada para armazenar documentos 


## How to run the project 

Install Ganache https://www.trufflesuite.com/ganache

Install IPFS and Run a node https://docs.ipfs.io/how-to/command-line-quick-start/#initialize-the-repository

IPFS Cors configuration:
```
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["GET", "POST"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Headers '["Authorization"]'
ipfs config --json API.HTTPHeaders.Access-Control-Expose-Headers '["Location"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Credentials '["true"]'
```
Start ipfs node:
```
ipfs daemon
npm install
rm -rf build
npm run compile
npm run migration
npm run dev
```
Install dependencies, clean build and compile and deploy contract:
```
npm install
rm -rf build
npm run compile
npm run migration
```
Start web server:
```
npm run dev
```
