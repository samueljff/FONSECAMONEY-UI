import { DashboardService } from "./../dashboard.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  pieChartData: any;
  lineChartData: any;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.configurarGraficoPizza();
    this.configurarGraficoLine();
  }

  configurarGraficoPizza() {
    this.dashboardService.lancamentosPorCategoria().then((dados) => {
      this.pieChartData = {
        labels: dados.map((dado) => dado.categoria.nome),
        datasets: [
          {
            data: dados.map((dado) => dado.total),
            backgroundColor: this.gerarCoresDinamicas(dados.length),
          },
        ],
      };
    });
  }

  configurarGraficoLine() {
    const diasDoMes = this.configurarDiasMes();
    this.dashboardService.lancamentosPorDia().then((dados) => {
      const totaisReceitas = this.totaisPorCadaDiaMes(
        dados.filter((dado) => dado.tipo === "RECEITA"),
        diasDoMes
      );
      const totaisDespesas = this.totaisPorCadaDiaMes(
        dados.filter((dado) => dado.tipo === "DESPESA"),
        diasDoMes
      );
      this.lineChartData = {
        labels: diasDoMes,
        datasets: [
          {
            label: "Receitas",
            data: totaisReceitas,
            borderColor: "#3366CC",
          },
          {
            label: "Despesas",
            data: totaisDespesas,
            borderColor: "#D62B00",
          },
        ],
      };
    });
  }

  private configurarDiasMes(): number[] {
    const hoje = new Date();
    /* const hoje = new Date(); hoje.setMonth(hoje.getMonth() + 1); hoje.setDate(0); */
    const ultimoDiaDoMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);
    const quantidadeDias = ultimoDiaDoMes.getDate();

    //substitui um for normal com array for(i=1; i<=quantidades; i++){array.push(i) reurn array}
    return Array.from({ length: quantidadeDias }, (_, i) => i + 1);
  }

  private totaisPorCadaDiaMes(dados: any[], diasDoMes: number[]): number[] {
    // Cria um mapa dia -> total para busca O(1)
    const totaisPorDia = new Map<number, number>();

    for (const dado of dados) {
      totaisPorDia.set(dado.dia.getDate(), dado.total);
    }

    return diasDoMes.map((dia) => totaisPorDia.get(dia) || 0);

    /* .keys() - pega todas as chaves
      .values() - pega todos os valores
      .entries() - pega pares [chave, valor]
      .has(chave) - verifica se chave existe
      .get(chave) - pega valor da chave 
    */
  }

  gerarCoresDinamicas(quantidade: number): string[] {
    const coresPadrao = [
      "#FF9900",
      "#109618",
      "#990099",
      "#3B3EAC",
      "#0099C6",
      "#DD4477",
      "#3366CC",
      "#DC3912",
    ];

    if (quantidade <= coresPadrao.length) {
      return coresPadrao.slice(0, quantidade);
    }

    // Expande com cores HSL bem distribuídas
    const cores = [...coresPadrao];
    for (let i = coresPadrao.length; i < quantidade; i++) {
      const matiz =
        (360 / (quantidade - coresPadrao.length)) * (i - coresPadrao.length);
      cores.push(`hsl(${matiz + 30}, 65%, 55%)`); // +30 evita conflito com cores existentes
    }

    return cores;
  }
}
