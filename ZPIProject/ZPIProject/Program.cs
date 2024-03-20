// lab1_zad5_comment1
Console.WriteLine("Team: 5D\nDeveloper: PiotrJurek240693");
// lab1_zad5_comment2
Console.WriteLine("Team: 5D\nTester: Kacper Michalec 240751");
// lab1_zad5_comment3
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

interface IArithmeticsDiv   // Mateusz Magdziński
{
    double Division(double a, double b);
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

