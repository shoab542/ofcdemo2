import { Modal, Button, Alert } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// components
import { VerticalForm, FormInput } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setUserErrorAlert } from '../../redux/actions';




interface FormData {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
    groups: any;
    is_active: boolean;
}



interface AddContactsProps {
    show: boolean;
    onHide: () => void;
    user?: FormData;
    cgroups: any;
    
    onSubmit: (value: any) => void;
}

const UserForm = ({ show, onHide, onSubmit, user, cgroups }: AddContactsProps) => {
    
    /*
    form validation schema
    */
    const dispatch = useDispatch();

    const loading = useSelector((state:RootState) => state.User.loading);
    const error = useSelector((state:RootState) => state.User.error);
    const schemaResolver = yupResolver(
        yup.object().shape({
            first_name: yup.string().required('Please enter first name'),
            last_name: yup.string().required('Please enter last name'),
            groups: yup.number().required('Please select role').typeError('Please select role'),
            email: yup.string().required('Please enter email').email('Please enter valid email'),
            phone: yup
                .string()
                .required('Please enter phone')           
        })
    );
    
         
    
    return (
        <>
            <Modal show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header className="bg-light" onHide={onHide} closeButton>
                    <Modal.Title className="m-0">Add User</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                {!loading  && error && (
                    <Alert variant="danger" className="my-2" onClose={()=>dispatch(setUserErrorAlert(''))} dismissible>
                        {error}
                    </Alert>
                )}
                    <VerticalForm onSubmit={onSubmit} resolver={schemaResolver} defaultValues={{first_name:user?.first_name,last_name:user?.last_name,email:user?.email,phone:user?.phone,is_active:user?.is_active}}>
                        
                        <FormInput
                            label="First Name"
                            type="text"
                            name="first_name"
                            placeholder="Enter first name"
                            containerClass={'mb-3'}
                            labelClassName='required'
                        />
                        <FormInput
                            label="Last Name"
                            type="text"
                            name="last_name"
                            placeholder="Enter last name"
                            containerClass={'mb-3'}
                            labelClassName='required'
                        />
                        <FormInput
                            label="Email address"
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            containerClass={'mb-3'}
                            labelClassName='required'
                        />
                        {!user &&
                        <FormInput
                            label="Password"
                            type="password"
                            name="password"
                            required
                            placeholder="Enter Password"
                            containerClass={'mb-3'}
                            labelClassName='required'
                        />
                        }
                        <FormInput
                            label="Phone"
                            type="text"
                            name="phone"
                            placeholder="Enter phone number"
                            containerClass={'mb-3'}
                            labelClassName='required'
                        />
                        <FormInput
                          label="Role"
                          type="select"
                          name="groups"
                          containerClass={'mb-3'}
                          labelClassName='required'  
                          defaultValue={user && user.groups ? user.groups[0]?.id : ''}
                        >    
                           <option value="" disabled>Select Role ...</option>                         
                        {cgroups?.map((item:any)=>{
                            return(
                                <option key={item.id} value={item.id}>{item.name}</option>
                            )                                
                        })}
                        </FormInput>
                            
                        <FormInput type="checkbox"  label="Is Active" name="is_active" />

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
                    </VerticalForm>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default UserForm;
