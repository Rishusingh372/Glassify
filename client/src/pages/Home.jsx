import Carousel from 'react-bootstrap/Carousel';
import b1 from "../images/b1.webp";
import b2 from "../images/b2.jpg";
import b3 from "../images/b3.webp";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Home=()=>{
    return(
        <>
       <Carousel>
      <Carousel.Item>
      <img src={b1} width="100%" height="350" />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src={b2} width="100%" height="350" />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
          <img src={b3} width="100%" height="350" />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

    <h1 className='heading1'> Top Brands</h1>

      <hr />

      <div id='topbrand'>
          
          <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={b1} />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>

      </div>


        </>
    )
}

export default Home;