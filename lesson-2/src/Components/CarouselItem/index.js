import React from 'react';
import PropTypes from "prop-types";
import Carousel from 'react-bootstrap/Carousel';

const CarouselItem = ({ image }) => {
  return (
    <Carousel.Item>
      <img
        // className="d-block w-100"
        src={image}
        alt={image}
      />
      <Carousel.Caption>
        <h3>First slide label</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </Carousel.Caption>
    </Carousel.Item>)
}

CarouselItem.propTypes = {
  image: PropTypes.string.isRequired,
}
export default CarouselItem;