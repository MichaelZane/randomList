import { useEffect, useState, useRef } from "react";
import { Button, Container, Form, Stack } from "react-bootstrap";

function App() {
  const [names, setNames] = useState([]);
  const [randomNames, setRandomNames] = useState([]);
  const [numberOfNames, setNumberOfNames] = useState(0);
  const isMounted = useRef(false);

  useEffect(() => {
    console.log("Loaded");
    if (!isMounted.current) {
      isMounted.current = true;
      const storedNames = JSON.parse(localStorage.getItem("names"));
      if (storedNames) {
        setNames(storedNames);
      }
    } else {
      localStorage.setItem("names", JSON.stringify(names));
    }
  }, [names]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newName = e.target.name.value;
    if (newName === '') {
      return;
    }
    setNames([...names, newName]);
    e.target.name.value = "";
  };

  const handleNumberChange = (e) => {
    setNumberOfNames(e.target.value);
  };

  const generateRandomNames = () => {
    if (numberOfNames >= new Set(names).size) {
        setRandomNames([...new Set(names)]);
    } else {
        let tempRandomNames = [];
        let setNames = new Set();
        for (let i = 0; i < numberOfNames; i++) {
            const randomIndex = Math.floor(Math.random() * names.length);
            if (!setNames.has(names[randomIndex])) {
                tempRandomNames = [...tempRandomNames, names[randomIndex]];
                setNames.add(names[randomIndex]);
            } else {
                i--;
            }
        }
        setRandomNames(tempRandomNames);
    }
};


  return (
    <Container>
      <h1>Ashley's Pick O App</h1>
      <Form onSubmit={handleSubmit}>
        <Stack gap={3}>
          <Form.Group className="mt-2">
            <Form.Control
              className="ms-3 w-50"
              autoFocus
              type="text"
              name="name"
              placeholder="Type name and press enter"
            />
            <Button
              className="m-3 w-50"
              variant="outline-primary"
              type="submit"
            >
              Add name
            </Button>
          </Form.Group>
        </Stack>
      </Form>
      <div>
        <Form.Label className="mt-3 ms-3">
          Number of names to generate:
        </Form.Label>
        <Form.Control
          className="mb-3 ms-3 w-25"
          type="number"
          min="1"
          step="1"
          value={numberOfNames}
          onChange={handleNumberChange}
        />
      </div>
      <Button
        className="mb-3 mt-3 ms-3 w-50"
        variant="outline-primary"
        onClick={generateRandomNames}
      >
        Generate random names
      </Button>
      <Button
        className="mb-1 mt-3 ms-3 w-50"
        variant="outline-primary"
        onClick={() => setNames([])}
      >
        Reset Entries
      </Button>
      <h6 className="m-3">Entries:</h6>
      <ul>
        {names.map((name, index) => (
          <li key={index}>
            <span>{name}</span>
          </li>
        ))}
      </ul>
      <Button
        onClick={() => setRandomNames([])}
        className="mb-3 mt-1 ms-3 w-50"
        variant="outline-primary"
      >
        Reset Selected
      </Button>
      <div className="">
        <span className="m-3">Selected:</span>
      </div>
      <ul>
        {randomNames.map((name, index) => (
          <li key={index}>
            <span>{name}</span>
          </li>
        ))}
      </ul>
    </Container>
  );
}

export default App;
