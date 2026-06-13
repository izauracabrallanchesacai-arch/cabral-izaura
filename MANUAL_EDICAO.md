# Manual de Edição — Cabral & Izaura Lanches & Açaí

Este documento contém as instruções e os códigos necessários para editar o site caso você utilize outra conta Manus.

## 1. Informações do Repositório
- **Link:** `https://github.com/izauracabrallanchesacai-arch/cabral-izaura`
- **Token de Acesso:** `[REMOVIDO POR SEGURANÇA - USE O TOKEN FORNECIDO NO CHAT]`

## 2. Estrutura do Código (index.html)
O site é construído em um único arquivo `index.html` usando **Tailwind CSS** para o visual e **JavaScript** puro para a lógica do carrinho e customização.

### Como alterar preços:
No final do arquivo, procure pela constante `MENU_DATA`. Cada item tem o seguinte formato:
```javascript
{ id: 1, category: 'lanches', name: 'Hambúrguer', price: 9.00, desc: 'Pão com gergelim, carne bovina.', img: 'images/produtos/hamburguer-simples.jpg', type: 'sandwich' }
```
Basta alterar o valor numérico em `price`.

### Como alterar Adicionais:
Procure pela constante `OPTIONS`. Lá você pode alterar os preços da Nutella, Frutas, etc., tanto para copos pequenos quanto para potes de 1L.

## 3. Lógica de Customização
O site utiliza um sistema de modais. Quando um item do tipo `sandwich` ou `acai` é clicado, o JavaScript abre um modal de personalização baseado nas regras:
- **Açaí até 500ml:** 3 ingredientes grátis + 1 cobertura.
- **Açaí 770ml e 1L:** 4 ingredientes grátis + 2 coberturas.

## 4. Integração com WhatsApp
O fechamento do pedido gera uma mensagem formatada que é enviada para o número `(21) 99123-8516`. Para alterar o número, procure por este telefone no código e substitua.

---
*Documento gerado pelo Manus Bot em Junho de 2026.*
