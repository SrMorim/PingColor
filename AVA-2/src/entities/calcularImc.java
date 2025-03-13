package entities;

public class calcularImc {
    public String nome;
    public double peso;
    public double altura;
    public double imc;
    
    public calcularImc(String nome, double peso, double altura) {
        this.nome = nome;
        this.peso = peso;
        this.altura = altura;
    }

    public void calcular() {        
        imc = peso / altura;
    }

    public void mostrarImc() {
        System.out.printf("Ola, %s! seu imc é %.2f. %n%n", nome, imc);
    }



}
