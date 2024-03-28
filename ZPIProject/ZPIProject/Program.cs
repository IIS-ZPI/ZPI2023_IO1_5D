Console.WriteLine("Team: 5D\nSCRUM Master (Developer): JakubMatuszak240749");
Console.WriteLine("Team: 5D\nDeveloper: PiotrJurek240693"); // lab1_zad5_240693 It's me! :)
Console.WriteLine("Team: 5D\nTester: Kacper Michalec 240751");
Console.WriteLine("Team: 5D\nDevops (Developer): WeronikaKretowicz235903");
Console.WriteLine("Team: 5D\nDeveloper: MateuszMagd");

// lab1_zad5_240751 comment1
// lab1_zad5_240751 comment2
// lab1_zad5_240751 comment3
interface IArithmeticsAdd   // Piotr Jurek lab1_zad5_240693 It's me again!!! :)
{
    double Addition(double a, double b);
}

// lab1_zad5_240742 third comment
interface IArithmeticsDiff  // Kacper Michalec, to ja!
{
    double Difference(double a, double b);
}

// lab1_zad5_240742 second comment
interface IArithmeticsMult  // Weronika Kretowicz
{
    //comm1
    double Multiplication(double a, double b);
    //comm2
    //comm3
}

//lab1_zad5_240742 first comment
interface IArithmeticsDiv   // Mateusz Magdziński lab1_zad5_240693 And that's not me :(
{
    double Division(double a, double b);
}

// lab1_zad5_240751 comment4
// lab1_zad5_240751 comment5
// lab1_zad5_240751 comment6
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
    // lab1_zad5_240749 third comment

    public double Difference(double a, double b)
    {
        return a - b;
    }

    public double Multiplication(double a, double b)
    {
        return a * b;
    }
}
// lab1_zad5_240751 comment7
// lab1_zad5_240751 comment8
// lab1_zad5_240751 comment9
