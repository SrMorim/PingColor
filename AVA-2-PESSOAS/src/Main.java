import java.util.List;

public class Main {
    public static void main(String[] args) {
        // Teste Cliente
        Cliente cliente = new Cliente(
            "João", 
            "123.456.789-00", 
            "Rua A", 
            "9999-9999", 
            "joao@email.com", 
            "2025-05-07"
        );
        cliente.addCompra("Produto 1");
        cliente.addCompra("Produto 2");

        // Teste Fornecedor
        Fornecedor fornecedor = new Fornecedor(
            "Empresa XYZ", 
            "12.345.678/0001-00", 
            "Av. B", 
            "8888-8888", 
            "contato@xyz.com", 
            "Eletrônicos"
        );
        fornecedor.addProduto("Notebook");
        fornecedor.addProduto("Monitor");

        // Teste Vendedor
        Vendedor vendedor = new Vendedor(
            "Carlos", 
            "987.654.321-00", 
            "Rua C", 
            "7777-7777", 
            "carlos@email.com",
            "M001", 
            "Vendedor", 
            3000.00, 
            0.10, 
            50000.00
        );

        // Teste UsuarioSistema
        UsuarioSistema usuario = new UsuarioSistema(
            "Admin", 
            "admin", 
            "1234", 
            1, 
            true
        );

        // Exibição simples
        System.out.println("Cliente: " + cliente.getNome() + 
                           ", Compras: " + cliente.getHistoricoCompras());
        System.out.println("Fornecedor: " + fornecedor.getNome() + 
                           ", Produtos: " + fornecedor.getProdutosFornecidos());
        System.out.println("Vendedor: " + vendedor.getNome() + 
                           ", Comissão: " + vendedor.getComissao());
        System.out.println("Usuário: " + usuario.getLogin() + 
                           ", Ativo: " + usuario.isAtivo());
    }
}
