package application;
import entities.*;
import java.util.Scanner;


public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String nome;
        int peso;
        double altura;

        System.out.print("Insira seu nome: "); nome = sc.nextLine();
        System.out.print("Insira seu peso: "); peso = sc.nextInt();
        System.out.print("Insira sua altura: "); altura = sc.nextDouble();
        
        Pessoa pessoa = new Pessoa(nome, peso, altura);
        
        pessoa.exibirImc();
        pessoa.analiseImc();

        sc.close();
    }
}

