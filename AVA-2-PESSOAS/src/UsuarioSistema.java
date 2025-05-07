public class UsuarioSistema {
    private String nome;
    private String login;
    private String senha;
    private int nivelAcesso;
    private boolean ativo;

    public UsuarioSistema(String nome, String login, String senha, int nivelAcesso, boolean ativo) {
        this.nome = nome;
        this.login = login;
        this.senha = senha;
        this.nivelAcesso = nivelAcesso;
        this.ativo = ativo;
    }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getLogin() { return login; }
    public void setLogin(String login) { this.login = login; }

    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }

    public int getNivelAcesso() { return nivelAcesso; }
    public void setNivelAcesso(int nivelAcesso) { this.nivelAcesso = nivelAcesso; }

    public boolean isAtivo() { return ativo; }
    public void setAtivo(boolean ativo) { this.ativo = ativo; }
}
