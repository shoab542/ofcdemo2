import React, { useCallback, useEffect, useRef } from 'react';
import { Nav, Tab } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import SimpleBar from 'simplebar-react';

// actions
import { hideRightSidebar } from '../../redux/actions';

// store
import { AppDispatch, RootState } from '../../redux/store';


import ThemeCustomizer from '../../components/ThemeCustomizer/';



interface RightSideBarProps {
    hideRightSidebar?: () => void;
    title?: string;
    children?: any;
}

const RightSideBar = (props: RightSideBarProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const rightBarNodeRef: any = useRef(null);

    const { isOpenRightSideBar } = useSelector((state: RootState) => ({
        isOpenRightSideBar: state.Layout.isOpenRightSideBar,
    }));

    /**
     * Handle the click anywhere in doc
     */
    const handleOtherClick = useCallback(
        (e: any) => {
            if (isOpenRightSideBar) {
                if (rightBarNodeRef && rightBarNodeRef.current && rightBarNodeRef.current.contains(e.target)) {
                    return;
                } else {
                    dispatch(hideRightSidebar());
                }
            }
        },
        [rightBarNodeRef, dispatch, isOpenRightSideBar]
    );

    useEffect(() => {
        document.addEventListener('mousedown', handleOtherClick, false);
        return () => {
            document.removeEventListener('mousedown', handleOtherClick, false);
        };
    }, [handleOtherClick]);

    return (
        <React.Fragment>
            <div className="right-bar" ref={rightBarNodeRef}>
                <SimpleBar style={{ maxHeight: '100%', zIndex: 10000 }} timeout={500} scrollbarMaxSize={320}>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="themecustomizer">
                        <Nav variant="tabs" className="nav-bordered nav-justified">
                            
                            <Nav.Item as="li">
                                <Nav.Link eventKey="themecustomizer" className="py-2 cursor-pointer">
                                    <i className="mdi mdi-cog-outline d-block font-22 my-1"></i>
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>

                        <Tab.Content className="p-0">
                            <Tab.Pane eventKey="themecustomizer">
                                <ThemeCustomizer />
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </SimpleBar>
            </div>
            <div className="rightbar-overlay"></div>
        </React.Fragment>
    );
};

export default RightSideBar;
