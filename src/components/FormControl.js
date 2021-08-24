import React from "react";
import { FormGroup, Col, Label, Input } from "reactstrap";
import { ErrorMessage } from "formik";

export const FormControl = ({
  formControlName,
  formControlType,
  formControlLabel,
  handleChange,
  handleBlur,
  values,
}) => {
  return (
    <FormGroup row className="mb-sm-3">
      <Label
        for={formControlName}
        sm="3"
        lg={{ size: "2", offset: 2 }}
        className="text-sm-end"
      >
        {formControlLabel}
      </Label>
      <Col sm="6" lg="4">
        <Input
          id={formControlName}
          type={formControlType}
          name={formControlName}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values[formControlName]}
        />
        <ErrorMessage
          component="span"
          style={{ color: "#fb8500", fontSize: "0.9rem" }}
          name={formControlName}
        />
      </Col>
    </FormGroup>
  );
};
