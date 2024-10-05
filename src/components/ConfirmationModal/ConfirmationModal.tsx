import React from "react";
import "./ConfirmationModal.styles.scss";
import Button from "../Button/Button";
import { ButtonTheme } from "../Button/Button.types";
import { ConfirmationModalProps } from "./ConfirmationModal.types";

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  onConfirm,
  onCancel,
  chartTitle,
}) => {
  return (
    <div className="confirmation-modal-overlay">
      <div className="confirmation-modal">
        <div className="confirmation-modal-content">
          <h2>Are you sure you want to delete this chart?</h2>
          <p>
            This action will delete the chart <strong>{chartTitle}</strong>.
            This cannot be undone.
          </p>

          <div className="confirmation-modal-actions">
            <Button title="Yes" onClick={onConfirm} theme={ButtonTheme.BLUE} />
            <Button title="No" onClick={onCancel} theme={ButtonTheme.RED} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
