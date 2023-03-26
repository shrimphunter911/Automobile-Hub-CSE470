import React, { useEffect, useState } from 'react';
import axios from '../axios';
import AliceCarousel from 'react-alice-carousel';
import {Container, Row, Col, Badge} from 'react-bootstrap';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import Load from '../components/Load';
import SameBody from '../components/SameBody';

function CarPage() {
    const {id} = useParams();
    const user = useSelector(state => state.user);
    const [car, setCar] = useState(null);
    const [same, setSame] = useState(null);
    const handleDragStart = (e) => e.preventDefault();
    useEffect(()=> {
        axios.get(`/cars/${id}`).then(({data}) => {
            setCar(data.car);
            setSame(data.same)
        })
    }, [id])
    if(!car){
        return <Load/>
    }
    const images = car.pictures.map((picture) => <img className='product__carousel--image' src={'picture.url'} onDragStart={handleDragStart}/>)


    let sameCar = [];
    if(same){
        sameCar = same.map((car, idx) => (
            <div className='item' data-value={idx}>
                <SameBody {...car}/>
            </div>
        ))
    }

  return (
    <Container className='pt-4' style={{position: 'relative'}}>
        <Row>
            <Col lg={6}>
                <AliceCarousel mouseTracking items={images} controlsStrategy="alternative"/>
            </Col>
            <Col>
                <h1>car.name</h1>
                <p>
                    <Badge bg="primary">{car.category}</Badge>
                </p>
                <p className="product__price">${car.price}</p>
                <p style={{ textAlign: "justify" }} className="py-3">
                    <strong>Description:</strong> {car.description}
                </p>
            </Col>
        </Row>
    </Container>
  )
}

export default CarPage