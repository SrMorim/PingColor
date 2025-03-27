package entities;

public class Pessoa {
    private String nome;
    private double peso;
    private double altura;
    private double imc;
    
    public Pessoa(String nome, double peso, double altura) {
        this.nome = nome;
        this.peso = peso;
        this.altura = altura;
    }

    private double calcularImc() {        
        return peso / (altura * altura);
    }

    public void exibirImc() {
        imc = calcularImc();
        System.out.printf("Ola, %s! seu imc é %.2f kg/m² %n%n", nome, imc);
    }

    public void analiseImc() {
        if (imc < 18.5) {
            System.out.println("Classificação: Baixo peso.");
            System.out.println("Recomendação: Procure um médico para avaliação criteriosa. Pode indicar poucas reservas e riscos associados.");
        } else if (imc >= 18.5 && imc <= 24.9) {
            System.out.println("Classificação: Peso adequado.");
            System.out.println("Recomendação: Tudo indica que está tudo bem, mas avalie outros parâmetros como circunferência abdominal e massa gorda.");
        } else if (imc >= 25 && imc <= 29.9) {
            System.out.println("Classificação: Sobrepeso.");
            System.out.println("Recomendação: Atenção! Consulte um médico e reveja hábitos. Avalie também circunferência abdominal.");
        } else if (imc >= 30 && imc <= 34.9) {
            System.out.println("Classificação: Obesidade grau I.");
            System.out.println("Recomendação: Procure orientação médica e nutricional, mesmo que exames estejam normais.");
        } else if (imc >= 35 && imc <= 39.9) {
            System.out.println("Classificação: Obesidade grau II.");
            System.out.println("Recomendação: Quadro mais evoluído. Não adie a busca por ajuda médica e nutricional.");
        } else {
            System.out.println("Classificação: Obesidade grau III.");
            System.out.println("Recomendação: Alto risco de doenças associadas. Procure orientação médica urgente.");
        }
    }




}
