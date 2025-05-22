public abstract class Usuario {
    protected String nome;
    protected String matricula;
    protected String senha;

    public Usuario(String nome, String matricula, String senha) {
        this.nome = nome;
        this.matricula = matricula;
        this.senha = senha;
    }

    public String getNome() {
        return nome;
    }

    public String getMatricula() {
        return matricula;
    }

    public String getSenha() {
        return senha;
    }
}
