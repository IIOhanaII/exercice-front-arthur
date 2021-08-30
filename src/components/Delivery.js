import React from "react";
import { Formik } from "formik";
import { FormControl } from "./FormControl";
import {
  Button,
  Container,
  Form,
  FormGroup,
  Col,
  Label,
  Input,
} from "reactstrap";
import { ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { storeFormData } from "../features/deliverySlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Delivery = () => {
  const dispatch = useDispatch();
  return (
    <Container>
      <h4 className="my-4 text-primary text-center">
        Votre adresse de livraison
      </h4>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          street: "",
          city: "",
          postalCode: "",
          phone: "",
          remarks: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.firstName) {
            errors.firstName = "Veuillez saisir votre prénom";
          }
          if (!values.lastName) {
            errors.lastName = "Veuillez saisir votre nom";
          }
          if (!values.street) {
            errors.street = "Veuillez saisir la rue pour votre livraison";
          }
          if (!values.city) {
            errors.city = "Veuillez saisir la ville pour votre livraison";
          }
          if (!values.postalCode) {
            errors.postalCode =
              "Veuillez saisir le code postal pour votre livraison";
          } else if (!/^(?:[0-8]\d|9[0-8])\d{3}$/i.test(values.postalCode)) {
            errors.postalCode = "Veuillez saisir un code postal valide";
          }
          if (!values.phone) {
            errors.phone =
              "Veuillez saisir un numéro sur lequel nous pourrions vous joindre";
          } else if (
            !/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/i.test(
              values.phone
            )
          ) {
            errors.phone = "Veuillez saisir un numéro de téléphone valide";
          }
          return errors;
        }}
        onSubmit={(values) => {
          console.log(values);
          dispatch(storeFormData(values));
          window.location.assign("/order-details");
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
          <Form id="contact-form" onSubmit={handleSubmit}>
            <FormControl
              formControlName="firstName"
              formControlType="text"
              formControlLabel="Prénom"
              handleChange={handleChange}
              handleBlur={handleBlur}
              values={values}
            />
            <FormControl
              formControlName="lastName"
              formControlType="text"
              formControlLabel="Nom"
              handleChange={handleChange}
              handleBlur={handleBlur}
              values={values}
            />
            <FormControl
              formControlName="street"
              formControlType="text"
              formControlLabel="Rue"
              handleChange={handleChange}
              handleBlur={handleBlur}
              values={values}
            />
            <FormControl
              formControlName="city"
              formControlType="text"
              formControlLabel="Ville"
              handleChange={handleChange}
              handleBlur={handleBlur}
              values={values}
            />
            <FormControl
              formControlName="postalCode"
              formControlType="number"
              formControlLabel="Code postal"
              handleChange={handleChange}
              handleBlur={handleBlur}
              values={values}
            />
            <FormControl
              formControlName="phone"
              formControlType="tel"
              formControlLabel="Téléphone"
              handleChange={handleChange}
              handleBlur={handleBlur}
              values={values}
            />

            <FormGroup row className="mt-3">
              <Label for="remarks" className="text-center mb-2">
                Vos remarques à notre attention
              </Label>
              <Col sm={{ size: "8", offset: 2 }} lg={{ size: "4", offset: 4 }}>
                <Input
                  id="remarks"
                  type="textarea"
                  name="remarks"
                  // Print less textarea rows for devices with a screen height less or equal than 667px
                  rows={window.screen.height <= 667 ? 2 : 7}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.remarks}
                />
                <ErrorMessage
                  component="span"
                  style={{ color: "#fb8500", fontSize: "0.9rem" }}
                  name="remarks"
                />
              </Col>
            </FormGroup>
            <FormGroup row className="text-center my-3 my-sm-4">
              <Col>
                <Button
                  className="me-5"
                  style={{ backgroundColor: "#fb8500" }}
                  href="/cart"
                >
                  <FontAwesomeIcon icon={["fas", "shopping-cart"]} size="lg" />
                </Button>
                <Button type="submit" color="success">
                  <FontAwesomeIcon icon={["fas", "check"]} size="lg" />
                </Button>
              </Col>
            </FormGroup>
          </Form>
        )}
      </Formik>
    </Container>
  );
};
