package application;

public class ItemPedido {
    private String codigo;
    private String descricao;
    private int quantidade;
    private double precoUnitario;

    public ItemPedido(String codigo, String descricao, int quantidade, double precoUnitario) {
        this.codigo = codigo;
        this.descricao = descricao;
        this.quantidade = quantidade;
        this.precoUnitario = precoUnitario;
    }

    public String getCodigo() {
        return codigo;
    }

    public String getDescricao() {
        return descricao;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public double getPrecoUnitario() {
        return precoUnitario;
    }

    public double getValorTotal() {
        return quantidade * precoUnitario;
    }

    @Override
    public String toString() {
        return codigo + " - " + descricao +
               " | Qtd: " + quantidade +
               " | Unit: R$" + precoUnitario +
               " | Total: R$" + getValorTotal();
    }
}
