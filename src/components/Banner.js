import { useState, useEffect } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons";
import headerImg from "../assets/img/header-img.svg";
import TrackVisibility from "react-on-screen";
import { isVisible } from "@testing-library/user-event/dist/utils";

export const Banner = () => {

    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const toRotate = [ "Web Developer", "Web Designer", "UI/UX Designer" ];
    const [text, setText] = useState("");
    const [delta, setDelta] = useState(300 - Math.random() * 100);
    const [index, setIndex] = useState(1);
    const period = 2000;

    useEffect(() => {
        let ticker = setInterval (() => {
            tick();
        }, delta)


        return () => { clearInterval(ticker)};
    }, [text])

    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
            setDelta(prevDelta => prevDelta /2)
        }


        if (!isDeleting && updatedText === fullText){
            setIsDeleting(true);
            setDelta(period);
        }
        else if (isDeleting && updatedText === ""){
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setDelta(500);
        }
        else {
            setIndex(prevIndex => prevIndex + 1);
        }
    }

return (
   <section className="banner" id="home">
    <Container>
        <Row className="align-items-center">

            <Col xs={12} md={6} xl={7}>

        <TrackVisibility>
        {({ isVisible }) =>
        <div className={isVisible ? "animate_animated animated_fadeIn" : ""}>
        <span className="tagline">Welcome to my Portfolio</span>
            <h1>{'Hi Im webdecoded'} <span className="wrap">Web Developer</span></h1>
            <p>Sample text</p>
            <button onClick={() => console.log('connect')}> Let's Connect!<ArrowRightCircle size={25} /></button>
        </div>}
        </TrackVisibility>    
            </Col>

        <Col xs={12} md={6} xl={5}>
        <TrackVisibility>
        {({ isVisible }) =>
        <div className={isVisible ? "animate_animated animate_zoomIn" : ""}>
        <img src={headerImg} alt="Header Img" />
        </div>}
        </TrackVisibility>
        </Col>

        </Row>
    </Container>
   </section>
)

}