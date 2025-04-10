package application;

public class Main {
    public static void main(String[] args) {
        Vendedor vendedor = new Vendedor("Alice Silva", "V123");
        Cliente cliente = new Cliente(
            "João Souza",
            "123.456.789-00",
            "Rua das Flores, 100 – Centro",
            "(11) 98765‑4321"
        );

        Pedido pedido = new Pedido("P001", vendedor, cliente);
        pedido.adicionarItem(new ItemPedido("I001", "Teclado Mecânico", 2, 350.0));
        pedido.adicionarItem(new ItemPedido("I002", "Mouse Gamer", 1, 180.0));

        // calcula e exibe antes do desconto
        System.out.println("=== Antes do Desconto ===");
        pedido.calcularValorTotal();
        System.out.println(pedido);

        // aplica 10% de desconto
        pedido.aplicarDesconto(10);
        System.out.println("\n=== Após 10% de Desconto ===");
        System.out.println(pedido);

        // atualiza status
        pedido.atualizarStatus(StatusPedido.ENVIADO);
        System.out.println("\nStatus final: " + pedido.getStatus());
    }
}
