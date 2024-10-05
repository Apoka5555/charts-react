import React, { useCallback, useState } from "react";
import Button from "./components/Button/Button";
import Chart from "./components/Chart/Chart";
import ModalDialog from "./components/ModalDialog/ModalDialog";
import "./App.styles.scss";
import { ChartData } from "./components/Chart/Chart.types";
import { ButtonTheme } from "./components/Button/Button.types";

const App: React.FC = () => {
  const [charts, setCharts] = useState<ChartData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveChart = useCallback(
    (chartData: ChartData) => {
      if (charts.some((chart) => chart.id === chartData.id)) {
        const updatedCharts = charts.map((chart) =>
          chart.id === chartData.id ? chartData : chart
        );
        setCharts(updatedCharts);
      } else {
        setCharts([...charts, chartData]);
        setIsModalOpen(false);
      }
    },
    [charts]
  );

  const handleRemoveChart = useCallback(
    (id: string) => {
      setCharts(charts.filter((chart) => chart.id !== id));
    },
    [charts]
  );

  return (
    <div className="app">
      <div className="app-header">
        <Button
          title="Create New Chart"
          onClick={() => setIsModalOpen(true)}
          theme={ButtonTheme.BLUE}
        />
      </div>
      <div className="app-charts">
        {charts.map((chart) => (
          <Chart
            key={chart.id}
            chart={chart}
            onSaveChanges={handleSaveChart}
            onRemove={handleRemoveChart}
          />
        ))}
      </div>
      {isModalOpen && (
        <ModalDialog
          onSave={handleSaveChart}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
