import { ChartData } from "../Chart/Chart.types";

export type ModalDialogProps = {
  chart?: ChartData;
  onSave: (chart: ChartData) => void;
  onClose: () => void;
};
