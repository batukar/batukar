import React from 'react'
import Container from "./Layouts/Container";
import Sidebar from "./Layouts/Sidebar";
import Content from "./Layouts/Content";
import Widget from "./Layouts/Widget";

const App = () => {
    return (
        <div className="bg-dark-innerFrame">
            <Container>
                <Sidebar/>
                <Content/>
                <Widget/>
            </Container>
        </div>
    );
}

export default App;
