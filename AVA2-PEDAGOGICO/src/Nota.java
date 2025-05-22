public class Nota {
    private double valor;
    private Aluno aluno;
    private Atividade atividade;

    public Nota(double valor, Aluno aluno, Atividade atividade) {
        this.valor = valor;
        this.aluno = aluno;
        this.atividade = atividade;
    }

    public double getValor() {
        return valor;
    }

    public Aluno getAluno() {
        return aluno;
    }

    public Atividade getAtividade() {
        return atividade;
    }
}
