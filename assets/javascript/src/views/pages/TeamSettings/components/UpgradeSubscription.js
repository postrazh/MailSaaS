import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Card,
  CardBody,
  CardFooter,
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import {
  formatHeader,
  toggleTopLoader,
  toastOnSuccess,
  toastOnError,
  messages,
} from "../../../../utils/Utils";
import axios from "../../../../utils/axios";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Upgrade
      </button>
    </form>
  );
};

const UpgradeSubscription = (props) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleUpgrade = async () => {
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
  };

  useEffect(async () => {
    try {
      toggleTopLoader(true);

      const { data } = await axios.get(
        "/subscriptions/api/upgrade-subscription/"
      );
      console.log(data);
    } catch (e) {
      toastOnError(messages.api_failed);
    } finally {
      toggleTopLoader(false);
    }
  }, []);

  return (
    <>
      <Container>
        <Row className="mt-3">
          <Col lg="5" md="6" sm="12" className="mobile-p-0">
            <Card>
              <CardBody>
                <Row className="mt-3">
                  <Col>
                    <span className="h5 surtitle">Plan</span>
                    <span className="d-block h2 ml-4">$39.00/month</span>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <span className="h5 surtitle">Features</span>
                    <span class="d-block mt-2 ml-4 text">
                      <i class="fa fa-check"></i> 1 User
                    </span>
                  </Col>
                </Row>

                <Row className="mt-5">
                  <Col>
                    <CardElement className="w-100" />
                  </Col>
                </Row>
              </CardBody>
              <CardFooter className="bg-transparent">
                <Button
                  color="primary"
                  type="submit"
                  className="text-uppercase"
                  onClick={handleUpgrade}
                  disabled={!stripe}
                >
                  Upgrade
                </Button>
                <span className="text-sm d-block mt-3">
                  Your card will be charged $39.00 for your first month.
                </span>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UpgradeSubscription;
