import { Button,Row, Col, Form } from 'react-bootstrap';

// components


import AssetTypeChart from './AssetTypeChart';
import Statistics from './Statistics';
import CompanyDues from './CompanyDues';
import { ReactSortable } from 'react-sortablejs';
import { useEffect, useState } from 'react';
import InvoiceChart from './InvoiceChart';
import RevenueChart from './RevenueChart';



const Dashboard = () => {   
    

    
    return (
        <div className='mt-4'>
            <Row>
                <Col>
                    {/* <div className="page-title-box">
                        <div className="page-title-right">
                            {editDashboard ?
                            <>
                            <Button variant="outline-info" className="waves-effect waves-light me-2" onClick={()=>setEditDashboard(!editDashboard)}>
                                Cancel
                            </Button> 
                            <Button variant="primary" className="waves-effect waves-light" onClick={()=>onSave()}>
                                Save Changes
                            </Button> 
                            </>:
                            <Button variant="primary" className="waves-effect waves-light" onClick={()=>setEditDashboard(!editDashboard)}>
                                Edit Dashboard
                            </Button> 
                            }
                        </div>
                        <h4 className="page-title">Dashboard</h4>
                    </div> */}
                </Col>
            </Row>

            <Statistics />
            

                <Row>
                
                    <Col  xl={6}>
                        
                        <RevenueChart/>
                        
                    </Col>
                    <Col  xl={6}>
                    <CompanyDues />
                        {/* <AssetTypeChart/> */}
                        
                    </Col>
                
                
                </Row>


            
        </div>
    );
};

export default Dashboard;
