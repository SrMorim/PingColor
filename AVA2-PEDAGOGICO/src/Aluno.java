import java.util.ArrayList;
import java.util.List;

public class Aluno extends Usuario {
    private List<Atividade> atividades = new ArrayList<>();
    private List<Nota> notas = new ArrayList<>();

    public Aluno(String nome, String matricula, String senha) {
        super(nome, matricula, senha);
    }

    public void adicionarAtividade(Atividade atividade) {
        atividades.add(atividade);
    }

    public void receberNota(Nota nota) {
        notas.add(nota);
    }

    public List<Nota> getNotas() {
        return notas;
    }
}
