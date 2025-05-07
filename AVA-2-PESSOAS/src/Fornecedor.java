import java.util.ArrayList;
import java.util.List;

public class Fornecedor extends Pessoa {
    private List<String> produtosFornecidos;
    private String tipoFornecimento;

    public Fornecedor(String nome, String documento, String endereco, String telefone, String email, String tipoFornecimento) {
        super(nome, documento, endereco, telefone, email);
        this.tipoFornecimento = tipoFornecimento;
        this.produtosFornecidos = new ArrayList<>();
    }

    public List<String> getProdutosFornecidos() { return produtosFornecidos; }
    public void addProduto(String produto) { produtosFornecidos.add(produto); }

    public String getTipoFornecimento() { return tipoFornecimento; }
    public void setTipoFornecimento(String tipoFornecimento) { this.tipoFornecimento = tipoFornecimento; }
}
