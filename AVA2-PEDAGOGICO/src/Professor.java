public class Professor extends Usuario {

    public Professor(String nome, String matricula, String senha) {
        super(nome, matricula, senha);
    }

    public void cadastrarAluno(String nome, String matricula) {
        System.out.println("Aluno cadastrado: " + nome + " (" + matricula + ")");
    }

    public void cadastrarAtividade(Atividade atividade) {
        System.out.println("Atividade cadastrada: " + atividade.getTitulo());
    }

    public void lancarNota(Aluno aluno, Atividade atividade, double valor) {
        Nota nota = new Nota(valor, aluno, atividade);
        aluno.receberNota(nota);
        System.out.println("Nota lançada: " + valor + " para " + aluno.getNome());
    }
}
