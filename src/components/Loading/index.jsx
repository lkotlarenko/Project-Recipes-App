import React from 'react';
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Loading() {
  return (
    <Spinner animation="border" variant="danger" />
  );
}

export default Loading;
