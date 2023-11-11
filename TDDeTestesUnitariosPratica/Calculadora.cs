using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TDDeTestesUnitariosPratica
{
    public class Calculadora
    {

        private List<string> ListaHistorico;
        private string data;

        public Calculadora(string data)
        {
            ListaHistorico = new List<string>();
            this.data= data;
        }


        public int Somar(int val1, int val2)
        {
            var resultado = val1 + val2;
            ListaHistorico.Insert(0, "Res: " + resultado + " - Data: " + data);

            return resultado;

        }

        public int Subtrair(int val1, int val2)
        {
            var resultado = val1 - val2;
            ListaHistorico.Insert(0, "Res: " + resultado + " - Data: " + data);
            return resultado;
        }

        public int Multiplicar(int val1, int val2)
        {
            var resultado = val1 * val2;
            ListaHistorico.Insert(0, "Res: " + resultado + " - Data: " + data);
            return resultado;
        }

        public int Dividir(int val1, int val2)
        {
            var resultado = val1 / val2;
            ListaHistorico.Insert(0, "Res: " + resultado + " - Data: " + data);
            return resultado;
        }

        public List<string> Historico()
        {
            ListaHistorico.RemoveRange(3, ListaHistorico.Count - 3);
            return ListaHistorico;
        }

      
    }
}
