public abstract class Funcionario extends Pessoa {
    private String matricula;
    private String cargo;
    private double salario;

    public Funcionario(String nome, String documento, String endereco, String telefone, String email,
                       String matricula, String cargo, double salario) {
        super(nome, documento, endereco, telefone, email);
        this.matricula = matricula;
        this.cargo = cargo;
        this.salario = salario;
    }

    public String getMatricula() { return matricula; }
    public void setMatricula(String matricula) { this.matricula = matricula; }

    public String getCargo() { return cargo; }
    public void setCargo(String cargo) { this.cargo = cargo; }

    public double getSalario() { return salario; }
    public void setSalario(double salario) { this.salario = salario; }
}
