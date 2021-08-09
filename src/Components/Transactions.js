import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Card } from "react-bootstrap";
import { async } from "regenerator-runtime";

const Transactions = (props) => {
  const [memos, changeMemos] = useState([]);

  useEffect(() => {
    const getInfo = async () => {
      let userMemos = await window.contract.getMemos({
        user: window.accountId,
      });
      changeMemos(userMemos);
    };

    getInfo();
  }, []);

  return (
    <Container>
      {'give me code to display transactions '}
    </Container>
  );
};

Transactions.propTypes = {};

export default Transactions;
