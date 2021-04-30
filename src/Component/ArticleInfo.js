import React ,{ Component } from 'react';
import './ArticleInfo.css';
import { ListGroup } from 'react-bootstrap'
//import backLogo from './logo-agritrop.png'


class ArticleInfo extends Component {


    render () {
        return (

            <div className="compoTitle">
                <div className="Title">
                    <h4>Title : A real-time PCR for SARS-coronavirus incorporating target gene pre-amplification</h4>
                </div>

                <div className="Type">
                    Type : Academic Article and research paper
                </div>

                <div>
                    <h4> Authors : </h4>
                    <ListGroup variant="flush">
                        <ListGroup.Item>  Li Hui Wang </ListGroup.Item>
                        <ListGroup.Item> Chen Dillon </ListGroup.Item>
                        <ListGroup.Item> Natalie Wong </ListGroup.Item>
                        <ListGroup.Item> Freda Pui-Fan Chan </ListGroup.Item>
                        <ListGroup.Item> Paul Cheung </ListGroup.Item>
                        <ListGroup.Item> Albert Fung </ListGroup.Item>
                    </ListGroup>
                </div>




            </div>


        );



    }
}
export default ArticleInfo;
