import React, { useState, useEffect } from 'react';
import { Modal, Button,Form,Row,Col,Alert} from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { RootState, AppDispatch } from '../../redux/store';
// components
import { FormInput } from '../../components';
import { APICore } from '../../helpers/api/apiCore';
import { useDispatch,useSelector } from 'react-redux';
import { getCity } from '../../redux/location/actions';
import { setContactErrorAlert } from '../../redux/actions';

const api = new APICore();

interface FormData {
    name: string;
    client_id: string;
    contact_type: string;
    contact_person: string;
    phone: string;
    email: string;
    city: any;
    country: any;
    billing_address: string;
}

interface AddContactProps {
    show: boolean;
    onHide: () => void;
    contact: FormData;
    countries: any;
    onSubmit: (value: any) => void;
}

const ContactForm = ({ show, onHide, onSubmit,contact,countries }: AddContactProps) => {
    /*
    form validation schema
    */
   
    const dispatch = useDispatch<AppDispatch>();
    const error = useSelector((state:RootState) => state.Contact.error);
    const loading = useSelector((state:RootState) => state.Contact.loading);
    const cities = useSelector((state:RootState) => state.Location.city);
    const schemaResolver = yupResolver(
        yup.object().shape({
            name: yup.string().required('Please enter name'),
            client_id: yup.string().required('Please enter client id'),
            contact_type: yup.string().required('Please select contact type').typeError('Please select contact type'),
            contact_person: yup.string().required('Please enter contact person'),
            phone: yup.string().required('Please enter phone number').typeError('Please enter number'),
                              
        })
    );

    const methods = useForm<Partial<FormData>>({
        defaultValues: {name:contact?.name,client_id:contact?.client_id,contact_person:contact?.contact_person,phone:contact?.phone,email:contact?.email,city:contact?.city?.id,country:contact?.country?.id,billing_address:contact?.billing_address},
        resolver: schemaResolver,
    });
    const {
        handleSubmit,
        register,
        reset,
        setValue,
        control,
        formState: { errors },
    } = methods;


    useEffect(()=>{
        if(contact?.country){
            dispatch(getCity(contact?.country?.id))
        }
    },[contact])
   
    return (
        <>
            <Modal show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header className="bg-light" onHide={onHide} closeButton>
                    <Modal.Title className="m-0">Add Contact</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                {!loading  && error && (
                    <Alert variant="danger" className="my-2" onClose={()=>dispatch(setContactErrorAlert(''))} dismissible>
                        {error}
                    </Alert>
                )}
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col>
                                
                                <FormInput
                                    label="Name"
                                    type="text"
                                    name="name"
                                    labelClassName='required'
                                    placeholder="Enter Name"
                                    containerClass={'mb-3'}
                                    register={register}
                                    errors={errors}
                                    control={control}
                                />
                                <FormInput
                                    label="Client Id"
                                    type="text"
                                    name="client_id"
                                    labelClassName='required'
                                    placeholder="Enter Client Id"
                                    containerClass={'mb-3'}
                                    register={register}
                                    errors={errors}
                                    control={control}
                                />
                            
                                <FormInput
                                label="Contact Type"
                                type="select"
                                name="contact_type"
                                labelClassName='required'
                                containerClass={'mb-3'} 
                                register={register}
                                errors={errors}
                                control={control}
                                defaultValue={contact ? contact.contact_type : ''}
                                >    
                                    <option value="" disabled>Select Contact Type ...</option>                         
                                    <option value="individual" >Individual</option>                         
                                    <option value="corporate" >Corporate</option>                                                 
                                
                                </FormInput>

                                <FormInput
                                    label="Contact Person"
                                    type="text"
                                    name="contact_person"
                                    labelClassName='required'
                                    placeholder="Enter Contact Person"
                                    containerClass={'mb-3'}
                                    register={register}
                                    errors={errors}
                                    control={control}
                                />

                                <FormInput
                                    label="Phone"
                                    type="text"
                                    name="phone"
                                    labelClassName='required'
                                    placeholder="ex: +8801XXXXXXX"
                                    containerClass={'mb-3'}
                                    register={register}
                                    errors={errors}
                                    control={control}
                                />
                                
                                
                            </Col>
                            <Col>
                           
                                <FormInput
                                    label="Email"
                                    type="text"
                                    name="email"
                                    placeholder="Enter Email"
                                    containerClass={'mb-3'}
                                    register={register}
                                    errors={errors}
                                    control={control}
                                />
                                <FormInput
                                label="Country"
                                type="select"
                                name="country"
                                containerClass={'mb-3'} 
                                register={register}
                                errors={errors}
                                control={control} 
                                defaultValue={contact ? contact?.country?.id : ''}
                                onChange={(e:any) => {dispatch(getCity(e.target.value));if(!e.target.value){setValue('city','')}}}
                                >    
                                    <option value="">Select Country ...</option> 
                                    {countries?.map((item:any)=>{
                                        return(
                                            <option key={'co'+item.id} value={item.id} >{item.name}</option>
                                        )
                                    })}                                                 
                                
                                </FormInput>
                                <Form.Group className='mb-3'>
                                    <Form.Label >City</Form.Label>

                                    <Form.Select
                                        aria-label="Default select example"
                                        isInvalid={errors && errors['city'] ? true : false}
                                        {...register('city')}
                                        defaultValue={contact ? contact?.city?.id : ''}
                                        
                                    >
                                        <option value="">Select City ...</option>                         
                                            {cities?.map((item:any)=>{
                                                return(
                                                    <option selected={contact?.city?.id===item.id} key={'ci'+item.id} value={item.id} >{item.name}</option>
                                                )
                                            })} 
                                    </Form.Select>

                                    {errors && errors['city'] ? (
                                        <Form.Control.Feedback type="invalid">
                                            {errors['city']['message']}
                                        </Form.Control.Feedback>
                                    ) : null}
                                </Form.Group>
                                {/* <FormInput
                                label="City"
                                type="select"
                                name="city"
                                containerClass={'mb-3'} 
                                register={register}
                                errors={errors}
                                control={control} 
                                defaultValue={contact ? contact?.city?.id : ''}
                                >    
                                    <option value="" disabled>Select City ...</option>                         
                                    {cities?.map((item:any)=>{
                                        return(
                                            <option key={'ci'+item.id} value={item.id} >{item.name}</option>
                                        )
                                    })}                                                 
                                
                                </FormInput> */}
                                
                                <FormInput
                                    label="Billing Address"
                                    type="textarea"
                                    name="billing_address"
                                    placeholder="Enter Billing Adress"
                                    containerClass={'mb-3'}
                                    register={register}
                                    errors={errors}
                                    control={control}
                                />
                            </Col>
                            
                        </Row>
                        
                         
                        <div className="text-end">
                            <Button variant="success" type="submit" className="waves-effect waves-light me-1">
                                Save
                            </Button>
                            <Button
                                variant="danger"
                                type="button"
                                className="waves-effect waves-light"
                                onClick={onHide}
                            >
                                Cancel
                            </Button>
                        </div>
                        
                    </Form>
                   
                    
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ContactForm;
