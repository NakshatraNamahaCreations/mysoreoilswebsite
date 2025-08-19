import React, { useState } from 'react';
import { Button, Form, InputGroup, Container } from 'react-bootstrap';

const SearchBarToggle = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleToggle = () => {
    setShowSearch(!showSearch);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchText);
    // Perform your search logic here
  };

  return (
    <Container className="mt-4">
      <Button variant="primary" onClick={handleToggle}>
        {showSearch ? 'Close Search' : 'Search'}
      </Button>

      {showSearch && (
        <Form onSubmit={handleSearch} className="mt-3">
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search for products..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button type="submit" variant="success">Go</Button>
          </InputGroup>
        </Form>
      )}
    </Container>
  );
};

export default SearchBarToggle;
