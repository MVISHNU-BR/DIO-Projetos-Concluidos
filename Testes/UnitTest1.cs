using TDDeTestesUnitariosPratica;

namespace Testes
{
    public class UnitTest1
    {

        public Calculadora ConstruirClasse()
        {
            string data = "08/11/2023";
            Calculadora calc = new Calculadora("08/11/2023");

            return calc;
        }

        [Theory]
        [InlineData (1,2,3)]
        [InlineData (2,3,5)]
        public void TestSomar(int val1, int val2,int resultado)
        {
            //
            Calculadora Calc = ConstruirClasse();
            //Arrange
            int resultadoCalculadora = Calc.Somar(val1, val2);
            //Assert
            Assert.Equal(resultado, resultadoCalculadora);
        }

        [Theory]
        [InlineData(5, 2, 3)]
        [InlineData(4, 2, 2)]
        public void TestSubtrair(int val1, int val2, int resultado)
        {
            //
            Calculadora Calc = ConstruirClasse();
            //Arrange
            int resultadoCalculadora = Calc.Subtrair(val1, val2);
            //Assert
            Assert.Equal(resultado, resultadoCalculadora);
        }

        [Theory]
        [InlineData(2, 2, 4)]
        [InlineData(2, 3, 6)]
        public void TestMultiplicar(int val1, int val2, int resultado)
        {
            //
            Calculadora Calc = ConstruirClasse();
            //Arrange
            int resultadoCalculadora = Calc.Multiplicar(val1, val2);
            //Assert
            Assert.Equal(resultado, resultadoCalculadora);
        }

        [Theory]
        [InlineData(10, 2, 5)]
        [InlineData(12, 2, 6)]
        public void TestDividir(int val1, int val2, int resultado)
        {
            //
            Calculadora Calc = ConstruirClasse();
            //Arrange
            int resultadoCalculadora = Calc.Dividir(val1, val2);
            //Assert
            Assert.Equal(resultado, resultadoCalculadora);
        }

        [Fact]
        public void TestarDivisaoPorZero()
        {
            Calculadora calc = ConstruirClasse();

            Assert.Throws<DivideByZeroException>(() => calc.Dividir(3,0));
        }

        [Fact]
        public void TestarHistorico()
        {
            Calculadora calc = ConstruirClasse();

            calc.Somar(1, 2);
            calc.Somar(3, 2);
            calc.Somar(4, 2);
            calc.Somar(6, 2);

            var lista = calc.Historico();

            Assert.NotEmpty(lista);
            Assert.Equal(3, lista.Count);
        }
    }
}