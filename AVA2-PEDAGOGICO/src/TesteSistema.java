public class TesteSistema {
    public static void main(String[] args) {
        Login login = new Login();
        Usuario usuario = login.autenticar("123", "prof123");

        if (usuario instanceof Professor) {
            Professor professor = (Professor) usuario;

            Aluno aluno = new Aluno("João da Silva", "789", "senha789");
            Atividade atividade = new Atividade("Trabalho de POO", "Implementação de sistema", "Turma A");

            professor.cadastrarAluno(aluno.getNome(), aluno.getMatricula());
            professor.cadastrarAtividade(atividade);
            professor.lancarNota(aluno, atividade, 9.5);

            System.out.println("Notas do aluno " + aluno.getNome() + ":");
            for (Nota nota : aluno.getNotas()) {
                System.out.println("- " + nota.getAtividade().getTitulo() + ": " + nota.getValor());
            }
        } else {
            System.out.println("Falha na autenticação.");
        }
    }
}
