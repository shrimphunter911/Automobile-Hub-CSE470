import React, { useState } from "react";
import { Alert, Col, Container, Form, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAddCarMutation } from "../services/appApi";
import axios from "../axios";
import "./AddCar.css";

function AddCar() {
    const [model, setModel] = useState("");
    const [details, setDetails] = useState("");
    const [specs, setSpecs] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [pictures, setImages] = useState([]);
    const [imgToRemove, setImgToRemove] = useState(null);
    const navigate = useNavigate();
    const [createCar, { isError, error, isLoading, isSuccess }] = useAddCarMutation();

    function handleRemoveImg(imgObj) {
        setImgToRemove(imgObj.public_id);
        axios
            .delete(`/images/${imgObj.public_id}/`)
            .then((res) => {
                setImgToRemove(null);
                setImages((prev) => prev.filter((img) => img.public_id !== imgObj.public_id));
            })
            .catch((e) => console.log(e));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!model || !details || !specs || !price || !category || !pictures.length) {
            return alert("Please fill out all the fields");
        }
        createCar({ model, details, specs, price, category, pictures }).then(({ data }) => {
            if (data.length > 0) {
                setTimeout(() => {
                    navigate("/");
                }, 5000);
            }
        });
    }

    function showWidget() {
        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: "djsf0lwca",
                uploadPreset: "qv5gd0ci",
            },
            (error, result) => {
                if (!error && result.event === "success") {
                    setImages((prev) => [...prev, { url: result.info.url, public_id: result.info.public_id }]);
                }
            }
        );
        widget.open();
    }

    return (
        <Container>
                <Col md={5}>
                            <div className="images-preview-container">
                                {pictures.map((image) => (
                                    <div className="image-preview">
                                        <img src={image.url} />
                                        {imgToRemove != image.public_id && <i className="fa fa-times-circle" onClick={() => handleRemoveImg(image)}></i>}
                                    </div>
                                ))}
                            </div>
                </Col>
                <Col md={5} className="new-product__form--container">
                    <Form onSubmit={handleSubmit}>
                        <h1 className="mt-3">Add your car for sale</h1>
                        {isSuccess && <Alert variant="success">Car created with succcess</Alert>}
                        {isError && <Alert variant="danger">{error.data}</Alert>}
                        <Form.Group className="mb-3">
                            <Form.Label>Car Model</Form.Label>
                            <Form.Control type="text" placeholder="Enter car model" value={model} required onChange={(e) => setModel(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Car Details</Form.Label>
                            <Form.Control as="textarea" placeholder="Vividly describe your car" style={{ height: "100px" }} value={details} required onChange={(e) => setDetails(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Specs</Form.Label>
                            <Form.Control as="textarea" placeholder="Add Engine, Interior Grade" style={{ height: "100px" }} value={specs} required onChange={(e) => setSpecs(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Price($)</Form.Label>
                            <Form.Control type="number" placeholder="(BDT)" value={price} required onChange={(e) => setPrice(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" onChange={(e) => setCategory(e.target.value)}>
                            <Form.Label>Category</Form.Label>
                            <Form.Select>
                                <option disabled selected>
                                    -- Body Types --
                                </option>
                                <option value="SUV">SUV</option>
                                <option value="Sedan">Sedan</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Button type="button" onClick={showWidget}>
                                Upload Images
                            </Button>
                        </Form.Group>

                        <Form.Group>
                            <Button type="submit" disabled={isLoading || isSuccess}>
                                Create Car
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
        </Container>
    );
}

export default AddCar;