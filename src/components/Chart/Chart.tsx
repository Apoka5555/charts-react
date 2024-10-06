import React, { memo, useCallback, useEffect, useState } from "react";
import { ChartData, ChartOptions, ChartProps, ChartType } from "./Chart.types";
import "./Chart.styles.scss";
import { AgCharts } from "ag-charts-react";
import {
  AgBarSeriesOptions,
  AgCartesianSeriesOptions,
  AgLineSeriesOptions,
  time,
} from "ag-charts-community";
import Button from "../Button/Button";
import {
  getSeriesObservations,
  Observation,
  searchSeries,
  Series,
} from "../../api/api";
import ModalDialog from "../ModalDialog/ModalDialog";
import { ButtonTheme } from "../Button/Button.types";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";

const Chart: React.FC<ChartProps> = ({ chart, onSaveChanges, onRemove }) => {
  const {
    title,
    type,
    color,
    xIntervalObservations,
    yIntervalObservations,
    xIntervalSeries,
    yIntervalSeries,
    searchText,
  } = chart;
  const [chartOptions, setChartOptions] = useState<ChartOptions>({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const getXInterval = useCallback(() => {
    if (searchText) {
      if (xIntervalSeries) {
        return { step: time.year.every(xIntervalSeries) };
      }

      return undefined;
    }

    if (xIntervalObservations) {
      return { step: time.year.every(xIntervalObservations) };
    }

    return undefined;
  }, [searchText, xIntervalObservations, xIntervalSeries]);

  const getYInterval = useCallback(() => {
    if (searchText) {
      if (yIntervalSeries) {
        return { step: yIntervalSeries };
      }

      return undefined;
    }

    if (yIntervalObservations) {
      return { step: yIntervalObservations };
    }
  }, [searchText, yIntervalObservations, yIntervalSeries]);

  const getChartOptions = useCallback(() => {
    const seriesOptions: AgCartesianSeriesOptions = {
      type,
      xKey: searchText ? "observation_end" : "date",
      yKey: searchText ? "popularity" : "value",
    };

    if (type === ChartType.Line) {
      (seriesOptions as AgLineSeriesOptions).stroke = color;
      (seriesOptions as AgLineSeriesOptions).marker = {
        fill: color,
        size: 1,
      };
    }

    if (type === ChartType.Bar) {
      (seriesOptions as AgBarSeriesOptions).fill = color;
    }

    const options: ChartOptions = {
      title: {
        text: title,
      },
      series: [seriesOptions],
      axes: [
        {
          type: "time",
          nice: false,
          position: "bottom",
          interval: getXInterval(),
          title: {
            text: "Year",
          },
        },
        {
          type: "number",
          position: "left",
          title: {
            text: searchText ? "Popularity" : "Value",
          },
          interval: getYInterval(),
        },
      ],
    };

    return options;
  }, [color, getXInterval, getYInterval, searchText, title, type]);

  useEffect(() => {
    const newOptions = getChartOptions();

    setChartOptions((prevChartOptions) => ({
      ...prevChartOptions,
      ...newOptions,
    }));
  }, [getChartOptions]);

  const setChartDataObservations = (data: Observation[]) => {
    const chartOptionsData = data.map((item) => ({
      ...item,
      value: +item.value,
      date: new Date(item.date),
    }));

    setChartOptions((prevChartOptions) => ({
      ...prevChartOptions,
      data: chartOptionsData,
    }));
    setIsLoading(false);
  };

  const setChartDataSeries = (data: Series[]) => {
    const chartOptionsData = data.map((item) => ({
      ...item,
      observation_end: new Date(item.observation_end),
    }));

    setChartOptions((prevChartOptions) => ({
      ...prevChartOptions,
      data: chartOptionsData,
    }));
    setIsLoading(false);
  };

  const handleError = (error: unknown) => {
    setErrorMessage(error as string);
    setIsError(true);
  };

  useEffect(() => {
    setIsLoading(true);

    if (searchText?.trim()) {
      searchSeries(searchText.trim())
        .then(setChartDataSeries)
        .catch(handleError);
    } else {
      getSeriesObservations().then(setChartDataObservations).catch(handleError);
    }
  }, [searchText]);

  const handleSaveChanges = (chart: ChartData) => {
    setIsEditModalOpen(false);
    onSaveChanges(chart);
  };

  if (isLoading) {
    return <h2 className="chart-loading">Chart is loading...</h2>;
  }

  if (isError && !isLoading) {
    return (
      <div className="chart-error">
        <p>Oops, something went wrong...</p>
        <p>{errorMessage}</p>
      </div>
    );
  }

  return (
    <div className="chart">
      <AgCharts options={chartOptions} />
      <div className="chart-buttons">
        <Button
          title="Edit"
          onClick={() => setIsEditModalOpen(true)}
          theme={ButtonTheme.BLUE}
        />
        <Button
          title="Remove"
          onClick={() => setIsDeleteModalOpen(true)}
          theme={ButtonTheme.RED}
        />
      </div>
      {isEditModalOpen && (
        <ModalDialog
          chart={chart}
          onSave={handleSaveChanges}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
      {isDeleteModalOpen && (
        <ConfirmationModal
          chartTitle={chart.title}
          onConfirm={() => onRemove(chart.id)}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}
    </div>
  );
};

export default memo(Chart);
