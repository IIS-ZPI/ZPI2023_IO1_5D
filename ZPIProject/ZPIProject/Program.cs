﻿Console.WriteLine("Team: 5D\nSCRUM Master (Developer): JakubMatuszak240749");
Console.WriteLine("Team: 5D\nDeveloper: PiotrJurek240693");
Console.WriteLine("Team: 5D\nTester: Kacper Michalec 240751");
Console.WriteLine("Team: 5D\nDevops (Developer): WeronikaKretowicz240749");
Console.WriteLine("Team: 5D\nDeveloper: MateuszMagd");

using System;

interface IArithmeticsAdd   // Piotr Jurek
{
    double Addition(double a, double b);
}

interface IArithmeticsDiff  // Kacper Michalec
{
    double Difference(double a, double b);
}

interface IArithmeticsMult  // Weronika Kretowicz
{
    double Multiplication(double a, double b);
}

interface IArithmeticsDiv   // Mateusz Magdziński
{
    double Division(double a, double b);
}

public class Arithmetics : IArithmeticsDiv
{
    public double Division(double a, double b)
    {
        if (b == 0)
            throw new DivideByZeroException();
        return a / b;
    }
}

