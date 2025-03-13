package application;
import java.util.Scanner;

import entities.*;


public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String nome;
        int peso;
        double altura;


        
        System.out.print("Insira seu nome: "); nome = sc.nextLine();
        System.out.print("Insira seu peso: "); peso = sc.nextInt();
        System.out.print("Insira sua altura: "); altura = sc.nextDouble();
        
        calcularImc pessoa = new calcularImc(nome, peso, altura);

        pessoa.calcular();
        pessoa.mostrarImc();

        sc.close();
    }
}

