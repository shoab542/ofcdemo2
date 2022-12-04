import React,{ useEffect, useState } from 'react';
import { Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import FeatherIcon from 'feather-icons-react';
import FileUploader from '../../../components/FileUploader';
// components
import PageTitle from '../../../components/PageTitle';
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { APICore } from '../../../helpers/api/apiCore';
import { UpdateProfile, UpdateProfileImage} from '../../../redux/actions';

const api = new APICore()


const MyProfile = () => {
    const dispatch = useDispatch();
    const[isEdit,setIsEdit] = useState(false);
    const[isImageEdit,setIsImageEdit] = useState(false);
    const { user, error, loading, success } = useSelector((state) => ({
        user: state.Auth.user,
        error: state.Auth.error,
        loading: state.Auth.loading,
        success: state.Auth.success,
    }));

   const[first_name,setFirstName] = useState(user.first_name);
   const[last_name,setLastName] = useState(user.last_name);
   const[email,setEmail] = useState(user.email);
   const[phone,setPhone] = useState(user.phone);
   const[profile_image,setProfileImage] = useState(user.profile_image);

   const handleProfileUpdate = (e) =>{
    e.preventDefault();
    dispatch(UpdateProfile({first_name,last_name,email,phone}));
    setIsEdit(!isEdit);
   }
   const handleProfileImageUpdate = (e) =>{
    e.preventDefault();
    dispatch(UpdateProfileImage({profile_image}));
    setIsImageEdit(!isImageEdit);
   }

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'My Profile', path: '/app/my-profile', active: true },
                ]}
                title={'My Profile'}
            />
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                        {!loading && error && (
                                <Alert variant="danger" className="my-2">
                                    {error}
                                </Alert>
                            )}
                        {!loading && success && (
                            <Alert variant="success" className="my-2">
                                {success}
                            </Alert>
                        )}
                            <Row>
                                <Col sm={2}>
                                    <Link to='/app/my-profile'>
                                    <Button variant="primary"  style={{width:'100%',fontWeight: '100 !important', textAlign: 'start',marginBottom: '8px'}}>
                                        <FeatherIcon icon="user" size={15} className="me-2"/>My Profile
                                    </Button> 
                                    </Link>

                                    <Link to='/app/change_password'>
                                    <Button variant="white"  style={{width:'100%',fontWeight: '100 !important', textAlign: 'start',border: 'none'}}>
                                        <FeatherIcon icon="lock" size={15} className="me-2"/>Change Password
                                    </Button> 
                                    </Link>
                                </Col>
                                <Col sm={10}>
                                    <div style={{margin: 50}}>
                                    {!isEdit && !isImageEdit &&
                                    <Row style={{marginBottom: '40px'}}>
                                        <Col sm={1} style={{position: 'relative'}}>
                                            
                                            <img src={user.profile_image}   style={{width: '100px',height:'100px',objectFit: 'cover',borderRadius: '100%'}} alt="" />
                                            <Button  variant="primary" type='button'  style={{width:'40px',height: '40px',borderRadius: '100%',display: 'flex',justifyContent: 'center',alignItems:'center',position: 'absolute',bottom: -8,right:-8}} onClick={()=>setIsImageEdit(!isImageEdit)}>
                                                <FeatherIcon icon="edit" size={15} />
                                            </Button>
                                            
                                        
                                        </Col>
                                        <Col sm={11}>
                                            <h3>{first_name} {last_name}</h3>
                                            
                                        </Col>
                                    </Row>
                                    }

                                    {isImageEdit ? 
                                    <Form onSubmit={(e)=>handleProfileImageUpdate(e)}>
                                        <Row>
                                            <Col>
                                                <Card>
                                                    <Card.Body>
                                                        <FileUploader
                                                            onFileUpload={(files) => {
                                                                setProfileImage(files[0])
                                                            }}
                                                        />
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        </Row>
                                        
                                                                   
                                        <Button  variant="white" type='button'  style={{width:'15%',marginTop: '20px',marginRight: 5}} onClick={()=>setIsImageEdit(!isImageEdit)}>
                                            Cancel
                                        </Button> 
                                        <Button  variant="primary" type='submit'  style={{width:'15%',marginTop: '20px'}}>
                                            Save
                                        </Button> 
                                        

                                    </Form>
                                    :
                                    <Form onSubmit={(e)=>handleProfileUpdate(e)}>
                                        <Row>
                                            <Col>
                                                <Form.Group  className="mb-3">
                                                    <Form.Label  >
                                                        First Name
                                                    </Form.Label>
                                                    <Form.Control type="text" name="first_name"  placeholder="Enter First Name" value={first_name} readOnly={isEdit ? false:true} size='lg' onChange={(e)=>setFirstName(e.target.value)}/>
                                                </Form.Group>
                                                <Form.Group  className="mb-3">
                                                    <Form.Label  >
                                                        Last Name
                                                    </Form.Label>
                                                    <Form.Control type="text" name="last_name"  placeholder="Enter Last Name" value={last_name} readOnly={isEdit ? false:true} size='lg' onChange={(e)=>setLastName(e.target.value)}/>
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group  className="mb-3">
                                                    <Form.Label  >
                                                        Email
                                                    </Form.Label>
                                                    <Form.Control type="email" name="email"  placeholder="Enter Email" value={email} readOnly={isEdit ? false:true} size='lg' onChange={(e)=>setEmail(e.target.value)}/>
                                                </Form.Group>
                                                <Form.Group  className="mb-3">
                                                    <Form.Label  >
                                                        Phone
                                                    </Form.Label>
                                                    <Form.Control type="text" name="phone"  placeholder="Enter Phone" value={phone} readOnly={isEdit ? false:true} size='lg' onChange={(e)=>setPhone(e.target.value)}/>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        
                                        {isEdit ?  
                                        <>                            
                                        <Button  variant="white" type='button'  style={{width:'15%',marginTop: '20px',marginRight: 5}} onClick={()=>setIsEdit(!isEdit)}>
                                            Cancel
                                        </Button> 
                                        <Button  variant="primary" type='submit'  style={{width:'15%',marginTop: '20px'}}>
                                            Save
                                        </Button> 
                                        </>
                                        :
                                        <Button  variant="primary" type='button'  style={{width:'15%',marginTop: '20px'}} onClick={()=>setIsEdit(!isEdit)}>
                                            <FeatherIcon icon="edit" size={15} className="me-2"/>Edit
                                        </Button>
                                        }

                                    </Form>
                                    }
                                    </div>
                                </Col>
                            </Row>                            
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default MyProfile;
