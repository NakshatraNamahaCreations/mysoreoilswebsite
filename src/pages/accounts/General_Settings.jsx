{/*import Accordion from "react-bootstrap/Accordion";
import { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import Select from "react-select";

const countryCodes = [
  { value: "+91", label: "+91 (India)" },
  { value: "+1", label: "+1 (USA)" },
  { value: "+44", label: "+44 (UK)" },
  { value: "+61", label: "+61 (Australia)" },
  { value: "+81", label: "+81 (Japan)" },
];

export default function General_Settings() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: countryCodes[0],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setFormData({
        name: `${storedUser.firstname} ${storedUser.lastname}`,
        email: storedUser.email || "",
        phone: storedUser.phone || "",
        countryCode: countryCodes.find(
          (code) => code.value === storedUser.countryCode
        ) || countryCodes[0],
      });
    }
  }, []);
  const handleSelectChange = (selectedOption) => {
    setFormData({ ...formData, countryCode: selectedOption });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <>
      <div className="mt-5">
        <h1
          style={{
            color: "black",
            fontWeight: "800",
            textAlign: "center",
            fontSize: "50px",
            letterSpacing: "1px",
            fontFamily:"montserrat"
          }}
          className="mobile-font"
        >
          YOUR ACCOUNT
        </h1>
      </div>

      <Container
        className="mt-5 general-setting-container"
        style={{ }}
      >
        <Accordion>
          <Accordion.Item
            eventKey="0"
            // style={{ boxShadow: "1px 1px 6px black", border: "none" }}
            style={{ boxShadow: "1px 1px 6px #D3B353", border: "none" }}
          >
            <Accordion.Header className="custom-header"  >
              <span
                style={{
                  fontWeight: "700",
                  color: "#002209",
                  fontSize: "22px",
                  // letterSpacing: "1px",
        
                }}
              >
                General Settings
              </span>
            </Accordion.Header>
            <Accordion.Body className="custom-header">
              <Container
                style={{
                  padding: "30px",
                }}
                className="general-setting-form"
              >
                <Form onSubmit={handleSubmit}>
                  {/* Name */}
                {/*}  <Form.Group className="mb-3">
                    <Form.Label
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        fontSize: "20px",
                        letterSpacing: "1px",
                        fontFamily:"poppins"
                      }}
                    >
                      Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      style={{
                        fontSize: "16px",
                        padding: "12px",
                        borderRadius: "10px",
                        backgroundColor: "#ffffff",
                        border: "1px solid lightgray",
                        fontFamily:"poppins"
                      }}
                      className="search-input"
                    />
                  </Form.Group>

                  {/* Email */}
                {/* <Form.Group className="mb-3">
                    <Form.Label
                      style={{
                        color: "#002209",
                        fontWeight: "bold",
                        fontSize: "20px",
                        letterSpacing: "1px",
                        fontFamily:"poppins"
                      }}
                    >
                      Email ID
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{
                        fontSize: "16px",
                        padding: "12px",
                        fontFamily:"poppins",
                        borderRadius: "10px",
                        backgroundColor: "#ffffff",
                        border: "1px solid lightgray",
                      }}
                      className="input-account-forms search-input"
                    />
                  </Form.Group>

                  {/* Phone Number */}
                  {/*<Form.Group className="mb-3">
                    <Form.Label
                      style={{
                        color: "#002209",
                        fontWeight: "bold",
                        fontSize: "16px",
                        letterSpacing: "1px",
                        fontFamily:"poppins"
                      }}
                    >
                      Phone Number
                    </Form.Label>
                    <div style={{ display: "flex", gap: "15px" }}>
                      {/* Country Code */}
                     {/*} <div style={{ flex: "0.4" }}>
                        <Select
                          options={countryCodes}
                          value={formData.countryCode}
                          onChange={handleSelectChange}
                          classNamePrefix="custom"
                          className="phone-code"
                          styles={{
                            control: (base) => ({
                              ...base,
                              fontSize: "16px",
                              padding: "12px",
                              borderRadius: "10px",
                              backgroundColor: "#ffffff",
                              border: "1px solid lightgray",
                              fontFamily:"poppins"
                            }),
                          }}
                        />
                      </div>
                      {/* Phone Input */}
                      {/*<Form.Control
                        type="tel"
                        name="phone"
                        placeholder="Enter phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        style={{
                          flex: "0.6",
                          fontSize: "16px",
                          padding: "12px",
                          borderRadius: "10px",
                          backgroundColor: "#ffffff",
                          border: "1px solid lightgray",
                          fontFamily:"poppins"
                        }}
                        className="input-account-forms  search-input"
                      />
                    </div>
                  </Form.Group>
                </Form>
              </Container>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </>
  );
}*/}


import Accordion from "react-bootstrap/Accordion";
import { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import Select from "react-select";

const countryCodes = [
  { value: "+91", label: "+91 (India)" },
  { value: "+1", label: "+1 (USA)" },
  { value: "+44", label: "+44 (UK)" },
  { value: "+61", label: "+61 (Australia)" },
  { value: "+81", label: "+81 (Japan)" },
];

export default function General_Settings() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: countryCodes[0],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setFormData({
        name: `${storedUser.firstname} ${storedUser.lastname}`,
        email: storedUser.email || "",
        phone: storedUser.phone || "",
        countryCode: countryCodes.find(
          (code) => code.value === storedUser.countryCode
        ) || countryCodes[0],
      });
    }
  }, []);
  const handleSelectChange = (selectedOption) => {
    setFormData({ ...formData, countryCode: selectedOption });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <>
      <div className="mt-5">
        <h1
          style={{
            color: "black",
            fontWeight: "800",
            textAlign: "center",
            fontSize: "50px",
            letterSpacing: "1px",
            fontFamily:"montserrat"
          }}
          className="mobile-font"
        >
          YOUR ACCOUNT
        </h1>
      </div>

      <Container
        className="mt-5 general-setting-container"
        style={{ }}
      >
        <Accordion>
          <Accordion.Item
            eventKey="0"
            // style={{ boxShadow: "1px 1px 6px black", border: "none" }}
            style={{ boxShadow: "1px 1px 6px #D3B353", border: "none" }}
          >
            <Accordion.Header className="custom-header"  >
              <span
                style={{
                  fontWeight: "700",
                  color: "#002209",
                  fontSize: "22px",
                  // letterSpacing: "1px",
        
                }}
              >
                General Settings
              </span>
            </Accordion.Header>
            <Accordion.Body className="custom-header">
              <Container
                style={{
                  padding: "30px",
                }}
                className="general-setting-form"
              >
                <Form onSubmit={handleSubmit}>
                  {/* Name */}
                  <Form.Group className="mb-3">
                    <Form.Label
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        fontSize: "20px",
                        letterSpacing: "1px",
                        fontFamily:"poppins"
                      }}
                    >
                      Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      style={{
                        fontSize: "16px",
                        padding: "12px",
                        borderRadius: "10px",
                        backgroundColor: "#ffffff",
                        border: "1px solid lightgray",
                        fontFamily:"poppins"
                      }}
                      className="search-input"
                    />
                  </Form.Group>

                  {/* Email */}
                  <Form.Group className="mb-3">
                    <Form.Label
                      style={{
                        color: "#002209",
                        fontWeight: "bold",
                        fontSize: "20px",
                        letterSpacing: "1px",
                        fontFamily:"poppins"
                      }}
                    >
                      Email ID
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{
                        fontSize: "16px",
                        padding: "12px",
                        fontFamily:"poppins",
                        borderRadius: "10px",
                        backgroundColor: "#ffffff",
                        border: "1px solid lightgray",
                      }}
                      className="input-account-forms search-input"
                    />
                  </Form.Group>

                  {/* Phone Number */}
                  <Form.Group className="mb-3">
                    <Form.Label
                      style={{
                        color: "#002209",
                        fontWeight: "bold",
                        fontSize: "16px",
                        letterSpacing: "1px",
                        fontFamily:"poppins"
                      }}
                    >
                      Phone Number
                    </Form.Label>
                    <div style={{ display: "flex", gap: "15px" }}>
                      {/* Country Code */}
                      <div style={{ flex: "0.4" }}>
                        <Select
                          options={countryCodes}
                          value={formData.countryCode}
                          onChange={handleSelectChange}
                          classNamePrefix="custom"
                          className="phone-code"
                          styles={{
                            control: (base) => ({
                              ...base,
                              fontSize: "16px",
                              padding: "12px",
                              borderRadius: "10px",
                              backgroundColor: "#ffffff",
                              border: "1px solid lightgray",
                              fontFamily:"poppins"
                            }),
                          }}
                        />
                      </div>
                      {/* Phone Input */}
                      <Form.Control
                        type="tel"
                        name="phone"
                        placeholder="Enter phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        style={{
                          flex: "0.6",
                          fontSize: "16px",
                          padding: "12px",
                          borderRadius: "10px",
                          backgroundColor: "#ffffff",
                          border: "1px solid lightgray",
                          fontFamily:"poppins"
                        }}
                        className="input-account-forms  search-input"
                      />
                    </div>
                  </Form.Group>
                </Form>
              </Container>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </>
  );
}

