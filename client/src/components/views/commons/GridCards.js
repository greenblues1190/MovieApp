import React from 'react';
import { Col, Image } from 'antd';
import { DEFAULT_IMAGE } from '../../config/Config';


function GridCards(props) {
    return (
        <Col lg={6} md={8} xs={24}>
            <div style={{ position: 'relative' }}>
                <a href={`/${props.type}/${props.id}`}>
                    <Image
                        height={450}
                        src={props.image}
                        alt={props.name}
                        fallback={DEFAULT_IMAGE}
                        preview={false}
                    />
                </a>
            </div>
        </Col>
    )
}

export default GridCards;
