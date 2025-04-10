package application;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class Pedido {
    private String id;
    private LocalDateTime dataHora;
    private Vendedor vendedor;
    private Cliente cliente;
    private StatusPedido status;
    private List<ItemPedido> itens;
    private double valorTotal;  // atualizado em calcularValorTotal()

    public Pedido(String id, Vendedor vendedor, Cliente cliente) {
        this.id = id;
        this.dataHora = LocalDateTime.now();
        this.vendedor = vendedor;
        this.cliente = cliente;
        this.status = StatusPedido.EM_PROCESSAMENTO;
        this.itens = new ArrayList<>();
        this.valorTotal = 0.0;
    }

    public void adicionarItem(ItemPedido item) {
        itens.add(item);
    }

    public void removerItem(String codigo) {
        Iterator<ItemPedido> it = itens.iterator();
        while (it.hasNext()) {
            if (it.next().getCodigo().equals(codigo)) {
                it.remove();
                return;
            }
        }
    }

    public double calcularValorTotal() {
        valorTotal = 0.0;
        for (ItemPedido item : itens) {
            valorTotal += item.getValorTotal();
        }
        return valorTotal;
    }

    public double getValorTotal() {
        return valorTotal;
    }

    public void aplicarDesconto(double percentual) {
        calcularValorTotal();
        valorTotal -= valorTotal * (percentual / 100.0);
    }

    public void atualizarStatus(StatusPedido novoStatus) {
        this.status = novoStatus;
    }

    public StatusPedido getStatus() {
        return status;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("Pedido ID: ").append(id)
          .append("\nData/Hora: ").append(dataHora.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
          .append("\nVendedor: ").append(vendedor)
          .append("\nCliente: ").append(cliente)
          .append("\nStatus: ").append(status)
          .append("\nItens:\n");
        for (ItemPedido item : itens) {
            sb.append("  - ").append(item).append("\n");
        }
        sb.append("Valor Total: R$").append(valorTotal);
        return sb.toString();
    }
}
