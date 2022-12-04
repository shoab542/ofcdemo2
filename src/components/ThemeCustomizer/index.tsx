import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// actions
import {
    changeLayout,
    changeLayoutColor,
    toggleSidebarUserInfo,
    
} from '../../redux/actions';

// store
import { RootState, AppDispatch } from '../../redux/store';

// constants
import * as layoutConstants from '../../constants/layout';



// components
import LayoutTypes from './LayoutTypes';
import LayoutColor from './LayoutColor';



const ThemeCustomizer = () => {
    const dispatch = useDispatch<AppDispatch>();
    

    const {
        layoutColor,
        layoutType,
    } = useSelector((state: RootState) => ({
        layoutColor: state.Layout.layoutColor,
        layoutType: state.Layout.layoutType,
    }));




  



    /**
     * On layout change
     */
    const changeLayoutType = (value: any) => {
        var layout = value;
        switch (layout) {
            case 'horizontal':
                dispatch(changeLayout(layoutConstants.LayoutTypes.LAYOUT_HORIZONTAL));
                break;
            case 'detached':
                dispatch(changeLayout(layoutConstants.LayoutTypes.LAYOUT_DETACHED));
                break;
            case 'vertical':
                dispatch(changeLayout(layoutConstants.LayoutTypes.LAYOUT_VERTICAL));
                break;
            default:
                dispatch(changeLayout(layoutConstants.LayoutTypes.LAYOUT_TWO_COLUMN));
                break;
        }
    };

    /**
     * Change the layout color
     */
    const changeLayoutColorScheme = (value: any) => {
        var mode = value;
        switch (mode) {
            case 'dark':
                dispatch(changeLayoutColor(layoutConstants.LayoutColor.LAYOUT_COLOR_DARK));
                break;
            default:
                dispatch(changeLayoutColor(layoutConstants.LayoutColor.LAYOUT_COLOR_LIGHT));
                break;
        }
    };

   

    

  



   

    /*
     * Toggle the leftsidebar use info
     */
    const toggleLeftSidebarUserInfo = (value: any) => {
        var checked = value;
        dispatch(toggleSidebarUserInfo(checked));
    };



    /**
     * Reset everything
     */
    const reset = () => {
        changeLayoutType(layoutConstants.LayoutTypes.LAYOUT_TWO_COLUMN);
        changeLayoutColorScheme(layoutConstants.LayoutColor.LAYOUT_COLOR_LIGHT);
       
        toggleLeftSidebarUserInfo(false);
        
        
    };

    return (
        <React.Fragment>
            <h6 className="fw-medium px-3 m-0 py-2 font-13 text-uppercase bg-light">
                <span className="d-block py-1">Theme Settings</span>
            </h6>
            <div className="p-3">
                <div className="alert alert-warning" role="alert">
                    <strong>Customize </strong> the overall color scheme, sidebar menu, etc.
                </div>

                {/* Layouts */}
                <LayoutTypes
                    changeLayoutType={changeLayoutType}
                    layoutType={layoutType}
                    layoutConstants={layoutConstants.LayoutTypes}
                />

                <LayoutColor
                    changeLayoutColorScheme={changeLayoutColorScheme}
                    layoutColor={layoutColor}
                    layoutConstants={layoutConstants.LayoutColor}
                />

                

                

                

                <div className="d-grid mt-4">
                    <button className="btn btn-primary" id="resetBtn" onClick={() => reset()}>
                        Reset to Default
                    </button>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ThemeCustomizer;
