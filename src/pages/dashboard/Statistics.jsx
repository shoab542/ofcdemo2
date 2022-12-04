import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';

// componets
import StatisticsWidget from '../../components/StatisticsWidget';
import { APICore } from '../../helpers/api/apiCore';
import { useSelector } from 'react-redux';

const api = new APICore();


const Statistics = () => {
    const[statistics,setStatistics] = useState({});
    const scurrency = useSelector(state => state.Currency.selectedCurrency)
    useEffect(()=>{

        const data = {
            total_contact: 500,
            draft_amount: 420,
            awaiting_approval_amount: 645,
            awaiting_payment_amount: 785,
            paid_amount: 310,

        }
        setStatistics(data)

        // api.get(`/api/statistics`,{})
        // .then(res=>{
        //     setStatistics(res.data)
        // }) 
    },[])
    return (
        <>
            <Row >
                <Col  >
                    <StatisticsWidget
                        variant="text-secondary"
                        counterOptions={{
                            prefix: '',
                            decimals: 0,
                        }}
                        description="Total Contact"
                        stats={statistics.total_contact}
                        color="#fff"
                    />
                </Col>
                <Col  >
                    <StatisticsWidget
                        variant="text-muted"
                        description="Draft (5)"
                        counterOptions={{
                            prefix: scurrency? scurrency.symbol : '',
                            decimals: 2,
                        }}
                        stats={statistics.draft_amount}
                        color="#fff"
                    />
                </Col>
                <Col  >
                    <StatisticsWidget
                        variant="text-info"
                        description="Awaiting Approval (33)"
                        counterOptions={{
                            prefix: scurrency? scurrency.symbol : '',
                            decimals: 2,
                        }}
                        stats={statistics.awaiting_approval_amount}
                        color="#fff"
                    />
                </Col>
                <Col  >
                    <StatisticsWidget 
                        variant="text-warning" 
                        description="Awaiting Payment (25)" 
                        counterOptions={{
                            prefix: scurrency? scurrency.symbol : '',
                            decimals: 2,
                        }}
                        stats={statistics.awaiting_payment_amount} 
                        color="#fff" 
                    />
                </Col>
                <Col  >
                <StatisticsWidget 
                    variant="text-success" 
                    description="Paid (18)" 
                    counterOptions={{
                        prefix: scurrency? scurrency.symbol : '',
                        decimals: 2,
                    }}
                    stats={statistics.paid_amount} 
                    color="#fff" 
                />
                </Col>
                
            </Row>
        </>
    );
};

export default Statistics;
