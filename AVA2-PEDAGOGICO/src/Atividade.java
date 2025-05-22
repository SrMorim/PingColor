public class Atividade {
    private String titulo;
    private String descricao;
    private String turma;

    public Atividade(String titulo, String descricao, String turma) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.turma = turma;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public String getTurma() {
        return turma;
    }
}
