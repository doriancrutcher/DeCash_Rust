import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

// React Bootstrap
import { Card, Button, Form } from "react-bootstrap";

const MoneyMemo = (props) => {
  const memoField = useRef("");
  const nearField = useRef("");
  const recipientField = useRef("");

  const [buttonState, changeButtonState] = useState(false);

  // Submit Button

  const submitButton = async () => {
    changeButtonState(true);
    // checking text was written in field, and not just whitespaces
    let isThereText = memoField.current.value.match("[A-Za-z0-9]");

    console.log(recipientField.current.value);
    console.log(memoField.current.value);
    console.log(nearField.current.value);

    if (isThereText === null) {
      alert(
        " I think you're missing the point of the memo... you need to type something in it"
      );
    } else {
      console.log(" you wrote something cool....");

      // Save Memo to Blockchain
      await window.contract.add_memo({
        receiver: recipientField.current.value,
        memo_text: memoField.current.value,
        price: nearField.current.value,
      });

      // Send Near tokens using smart contract
      await window.contract.transfer_money({
        account_id: recipientField.current.value,
        amount: parseInt(
          window.utils.format.parseNearAmount(nearField.current.value)
        ),
      });

      alert("Money Sent");
    }
    changeButtonState(false);
  };

  return (
    <Card style={{ marginTop: "3vh" }}>
      <Card.Body>
        <Card.Title>Send NEAR</Card.Title>
        <Form>
          <Form.Group className='mb-3'>
            <Form.Label>Recipient</Form.Label>
            <Form.Control
              ref={recipientField}
              placeholder='example.testnet'
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Amount</Form.Label>
            <Form.Control
              ref={nearField}
              placeholder='Enter NEAR Value'
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Memo Field</Form.Label>
            <Form.Control
              ref={memoField}
              placeholder='Write Something Cool'
              as='textarea'
              rows={5}
            ></Form.Control>
          </Form.Group>
        </Form>
        <Button
          disabled={buttonState}
          onClick={submitButton}
          style={{ marginTop: "3vh" }}
          variant='primary'
        >
          Send NEAR
        </Button>
      </Card.Body>
    </Card>
  );
};

MoneyMemo.propTypes = {};

export default MoneyMemo;
