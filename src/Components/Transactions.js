import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { InMemorySigner } from "near-api-js";
import { Container, Row, Card } from "react-bootstrap";
import { async } from "regenerator-runtime";

const Transactions = (props) => {
  const [memos, changeMemos] = useState([]);

  useEffect(() => {
    const getInfo = async () => {
      let userMemos = await window.contract.get_memos({
        user: window.accountId,
      });
      changeMemos(userMemos);
    };

    getInfo();
  }, []);

  return (
    <Container>
      {memos.map((el, i) => {
        return (
          <Row
            style={{ margin: "3vh" }}
            key={i}
            className='d-flex justify-content-center'
          >
            <Card>
              <Card.Title>Transaction #{i}</Card.Title>
              <Card.Body>{el}</Card.Body>
            </Card>
          </Row>
        );
      })}
    </Container>
  );
};

Transactions.propTypes = {};

export default Transactions;
