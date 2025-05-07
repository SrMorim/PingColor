import java.util.ArrayList;
import java.util.List;

public class Cliente extends Pessoa {
    private String dataCadastro;
    private List<String> historicoCompras;

    public Cliente(String nome, String documento, String endereco, String telefone, String email, String dataCadastro) {
        super(nome, documento, endereco, telefone, email);
        this.dataCadastro = dataCadastro;
        this.historicoCompras = new ArrayList<>();
    }

    public String getDataCadastro() { return dataCadastro; }
    public void setDataCadastro(String dataCadastro) { this.dataCadastro = dataCadastro; }

    public List<String> getHistoricoCompras() { return historicoCompras; }
    public void addCompra(String compra) { historicoCompras.add(compra); }
}
