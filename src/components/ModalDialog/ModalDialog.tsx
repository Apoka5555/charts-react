import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./ModalDialog.styles.scss";
import { ModalDialogProps } from "./ModalDialog.types";
import { ChartType } from "../Chart/Chart.types";
import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import { InputType } from "../InputField/InputField.types";
import { ButtonTheme } from "../Button/Button.types";

const DEFAULT_CHART_TITLE = "New Chart";
const DEFAULT_X_INTERVAL_OBSERVATIONS = 10;
const DEFAULT_Y_INTERVAL_OBSERVATIONS = 5000;
const DEFAULT_COLOR = "#5091dc";
const DEFAULT_X_INTERVAL_SERIES = 3;
const DEFAULT_Y_INTERVAL_SERIES = 10;

const ModalDialog: React.FC<ModalDialogProps> = ({
  onSave,
  onClose,
  chart,
}) => {
  const [title, setTitle] = useState<string>(DEFAULT_CHART_TITLE);
  const [xIntervalObservations, setXIntervalObservations] = useState<number>(
    DEFAULT_X_INTERVAL_OBSERVATIONS
  );
  const [yIntervalObservations, setYIntervalObservations] = useState<number>(
    DEFAULT_Y_INTERVAL_OBSERVATIONS
  );
  const [xIntervalSeries, setXIntervalSeries] = useState<number>(
    DEFAULT_X_INTERVAL_SERIES
  );
  const [yIntervalSeries, setYIntervalSeries] = useState<number>(
    DEFAULT_Y_INTERVAL_SERIES
  );

  const [type, setType] = useState<ChartType>(ChartType.Bar);
  const [color, setColor] = useState<string>(DEFAULT_COLOR);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    if (chart) {
      setTitle(chart.title);
      setXIntervalObservations(
        chart.xIntervalObservations || DEFAULT_X_INTERVAL_OBSERVATIONS
      );
      setYIntervalObservations(
        chart.yIntervalObservations || DEFAULT_Y_INTERVAL_OBSERVATIONS
      );
      setXIntervalSeries(chart.xIntervalSeries || DEFAULT_X_INTERVAL_SERIES);
      setYIntervalSeries(chart.yIntervalSeries || DEFAULT_Y_INTERVAL_SERIES);
      setType(chart.type);
      setColor(chart.color || DEFAULT_COLOR);
      setSearchText(chart.searchText || "");
    }
  }, [chart]);

  const handleSave = () => {
    onSave({
      id: chart?.id || uuidv4(),
      title,
      type,
      color,
      xIntervalObservations,
      yIntervalObservations,
      searchText,
      xIntervalSeries,
      yIntervalSeries,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <h2>{chart ? chart.title : "Create New Chart"}</h2>

          <InputField
            type={InputType.TEXT}
            label="Title"
            value={title}
            onChange={setTitle}
          />

          <InputField
            type={InputType.SELECT}
            label="Type"
            value={type}
            onChange={(value) => setType(value as ChartType)}
            options={[
              { label: "Bar", value: ChartType.Bar },
              { label: "Line", value: ChartType.Line },
            ]}
          />

          <InputField
            type={InputType.COLOR}
            label="Bar/Line Color"
            value={color}
            onChange={setColor}
          />

          <InputField
            type={InputType.TEXT}
            label="Search text"
            value={searchText}
            onChange={setSearchText}
          />

          {!searchText.trim() && (
            <>
              <InputField
                type={InputType.SELECT}
                label="X-Axis Interval (Years)"
                value={xIntervalObservations}
                onChange={(value) => setXIntervalObservations(+value)}
                options={[
                  { label: "10", value: 10 },
                  { label: "15", value: 15 },
                  { label: "20", value: 20 },
                  { label: "25", value: 25 },
                  { label: "30", value: 30 },
                ]}
              />

              <InputField
                type={InputType.SELECT}
                label="Y-Axis Interval (Value)"
                value={yIntervalObservations}
                onChange={(value) => setYIntervalObservations(+value)}
                options={[
                  { label: "5000", value: 5000 },
                  { label: "6000", value: 6000 },
                  { label: "7000", value: 7000 },
                  { label: "8000", value: 8000 },
                  { label: "9000", value: 9000 },
                  { label: "10000", value: 10000 },
                  { label: "15000", value: 15000 },
                  { label: "20000", value: 20000 },
                ]}
              />
            </>
          )}

          {searchText.trim() && (
            <>
              <InputField
                type={InputType.SELECT}
                label="X-Axis Interval (End Years)"
                value={xIntervalSeries}
                onChange={(value) => setXIntervalSeries(+value)}
                options={[
                  { label: "3", value: 3 },
                  { label: "4", value: 4 },
                  { label: "5", value: 5 },
                  { label: "6", value: 6 },
                  { label: "7", value: 7 },
                  { label: "8", value: 8 },
                  { label: "9", value: 9 },
                  { label: "10", value: 10 },
                ]}
              />

              <InputField
                type={InputType.SELECT}
                label="Y-Axis Interval (Popularity)"
                value={yIntervalSeries}
                onChange={(value) => setYIntervalSeries(+value)}
                options={[
                  { label: "10", value: 10 },
                  { label: "20", value: 20 },
                  { label: "30", value: 30 },
                ]}
              />
            </>
          )}

          <div className="modal-actions">
            <Button
              title="Save"
              onClick={handleSave}
              theme={ButtonTheme.BLUE}
            />
            <Button title="Cancel" onClick={onClose} theme={ButtonTheme.RED} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDialog;
