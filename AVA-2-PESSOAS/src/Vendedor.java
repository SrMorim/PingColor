public class Vendedor extends Funcionario {
    private double comissao;
    private double metaVendas;

    public Vendedor(String nome, String documento, String endereco, String telefone, String email,
                    String matricula, String cargo, double salario,
                    double comissao, double metaVendas) {
        super(nome, documento, endereco, telefone, email, matricula, cargo, salario);
        this.comissao = comissao;
        this.metaVendas = metaVendas;
    }

    public double getComissao() { return comissao; }
    public void setComissao(double comissao) { this.comissao = comissao; }

    public double getMetaVendas() { return metaVendas; }
    public void setMetaVendas(double metaVendas) { this.metaVendas = metaVendas; }
}
