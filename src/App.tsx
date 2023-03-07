import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";

import questions from "./utils/questions";

function App() {
  const [code, setCode] = useState("");
  const [questionId, setQuestionId] = useState(-1);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState<unknown[]>([]);
  const [reward, setReward] = useState("");
  const [screen, setScreen] = useState("code");
  const [error, setError] = useState("");

  useEffect(() => {
    let n = 0;

    const timer = setInterval(() => {
      const isDebugging = Date.now() - n < 500;
      // debugger;
      n = Date.now();

      // if (isDebugging) {
      //   window.location.reload();
      // }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const question = questions[questionId];

  const handleSubmitCode = (event: React.FormEvent<HTMLFormElement>) => {
    setError("");
    event.preventDefault();

    if (!code) {
      setError("Invalid Code!");
      return;
    }

    const questionId = questions.findIndex(
      (item) => item.code.toLowerCase() === code.toLowerCase()
    );

    if (questionId === -1) {
      setError("Invalid Code!");
      return;
    }

    setError("");
    setQuestionId(questionId);
    setScreen("question");
  };

  const handleSubmitQuestion = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!question) {
      reset();
      setError("No question found!");
      return;
    }

    if (!answer) {
      setError("Place your answer");
      return;
    }

    const isCorrect = question.answer.toLowerCase() === answer.toLowerCase();

    if (!isCorrect) {
      setError("Incorrect Answer");
      return;
    }

    setAnswers((prev) => {
      return [
        ...prev,
        { ...question, questionId, isCorrect, time: Date.now() },
      ];
    });
    setError("");
    setReward(question.reward);
    setScreen("reward");
    // Here you would calculate the points based on the answer and set it with setPoints()
  };

  const reset = () => {
    setCode("");
    setQuestionId(-1);
    setAnswer("");
    setReward("");
    setError("");
    setScreen("code");
  };

  const handleReset = (event: React.MouseEvent<HTMLButtonElement>) => {
    reset();
  };

  const errorMessage = error ? <Alert variant="danger">{error}</Alert> : null;

  return (
    <Container style={{ marginTop: "100px" }}>
      {screen === "code" && (
        <Row>
          <Col lg={{ span: 6, offset: 3 }} sm={12}>
            <Card>
              <Card.Body>
                <Card.Title>Code</Card.Title>
                <Form onSubmit={handleSubmitCode}>
                  <Form.Group controlId="formBasicCode" className="mb-3">
                    <Form.Label>Enter code:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter code"
                      value={code}
                      onChange={(event) => {
                        setCode(event.target.value);
                        setError("");
                      }}
                    />
                  </Form.Group>
                  {errorMessage}
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {screen === "question" && (
        <Row>
          <Col lg={{ span: 6, offset: 3 }} sm={12}>
            <Card>
              <Card.Body>
                <Card.Title>{question.title}</Card.Title>
                <p>{question.description}</p>
                <Form onSubmit={handleSubmitQuestion}>
                  <Form.Group controlId="formBasicAnswer" className="mb-3">
                    <Form.Label>Answer:</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter answer"
                      value={answer}
                      onChange={(event) => {
                        setAnswer(event.target.value);
                        setError("");
                      }}
                    />
                  </Form.Group>
                  {errorMessage}
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {screen === "reward" && (
        <Row>
          <Col lg={{ span: 6, offset: 3 }} sm={12}>
            <Card>
              <Card.Body>
                <Card.Title>Go to:</Card.Title>
                <p>{reward}</p>
                <Button variant="primary" type="submit" onClick={handleReset}>
                  Reset
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default App;
