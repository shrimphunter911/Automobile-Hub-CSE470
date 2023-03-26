import axios from "../axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCars } from "../features/carSlice";
import PreviewCar from "../components/PreviewCar";

function FrontPage() {
    const dispatch = useDispatch();
    const cars = useSelector((state) => state.car);
    const lastCars = cars.slice(0, 8);
    console.log(lastCars)
    useEffect(() => {
        axios.get("/cars").then(({ data }) => dispatch(updateCars(data)));
    }, []);
    return (
        <div>
            <div className="featured-products-container container mt-4">
                <h2>Last cars</h2>
                <div className="d-flex justify-content-center flex-wrap">
                    {lastCars.map((car) => (
                        <PreviewCar {...car} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FrontPage;