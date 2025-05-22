public class Login {
    public Usuario autenticar(String matricula, String senha) {
        if (matricula.equals("123") && senha.equals("prof123")) {
            return new Professor("Professor Exemplo", matricula, senha);
        } else if (matricula.equals("456") && senha.equals("aluno456")) {
            return new Aluno("Aluno Exemplo", matricula, senha);
        }
        return null;
    }
}
