﻿Console.WriteLine("Team: 5D\nSCRUM Master (Developer): JakubMatuszak240749");
Console.WriteLine("Team: 5D\nDeveloper: PiotrJurek240693");
Console.WriteLine("Team: 5D\nTester: Kacper Michalec 240751");
Console.WriteLine("Team: 5D\nDevops (Developer): WeronikaKretowicz235903");
Console.WriteLine("Team: 5D\nDeveloper: MateuszMagd");

interface IArithmeticsAdd   // Piotr Jurek
{
    double Addition(double a, double b);
}

interface IArithmeticsDiff  // Kacper Michalec, to ja!
{
    double Difference(double a, double b);
}

interface IArithmeticsMult  // Weronika Kretowicz
{
    double Multiplication(double a, double b);
}
// lab1_zad5_comment7
interface IArithmeticsDiv   // Mateusz Magdziński
{// lab1_zad5_comment8
    double Division(double a, double b);
    // lab1_zad5_comment9
}

public class Arithmetics : IArithmeticsAdd, IArithmeticsDiv, IArithmeticsDiff, IArithmeticsMult
{
    public double Addition(double a, double b)
    {
        return a + b;
    }
  
    public double Division(double a, double b)
    {
        if (b == 0)
            throw new DivideByZeroException();
            
        return a / b;
    }

    public double Difference(double a, double b)
    {
        return a - b;
    }

    public double Multiplication(double a, double b)
    {
        return a * b;
    }
}

