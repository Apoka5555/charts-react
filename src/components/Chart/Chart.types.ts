import {
  AgCartesianChartOptions,
  AgTimeAxisThemeOptions,
} from "ag-charts-community";

export enum ChartType {
  Line = "line",
  Bar = "bar",
}

export type ChartOptions = AgCartesianChartOptions & {
  axes?: AgTimeAxisThemeOptions[];
  data?: ObservationsData[] | SeriesData[];
};

export type ObservationsData = {
  date: Date;
  value: number;
};

export type SeriesData = {
  observation_end: Date;
  popularity: number;
};

export type ChartData = {
  id: string;
  title: string;
  type: ChartType;
  color?: string;
  xIntervalObservations?: number;
  yIntervalObservations?: number;
  searchText?: string;
  xIntervalSeries?: number;
  yIntervalSeries?: number;
  xLabel?: string;
  yLabel?: string;
};

export type ChartProps = {
  chart: ChartData;
  onSaveChanges: (chart: ChartData) => void;
  onRemove: (id: string) => void;
};
