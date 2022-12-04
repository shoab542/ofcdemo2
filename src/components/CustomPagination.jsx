import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';


const Pagination = ({visitPage, previous_number ,next_number ,total_page ,current_page ,active}) => {
    
    const filterPages = useCallback(
        (visiblePages, totalPages) => {
            return visiblePages.filter((page) => page <= totalPages);
        },
        [total_page]
    );

    const getVisiblePages = useCallback(
        (page, total) => {
            if (total < 7) {
                return filterPages([1, 2, 3, 4, 5, 6], total);
            } else {
                if (page % 5 >= 0 && page > 4 && page + 2 < total) {
                    return [1, page - 1, page, page + 1, total];
                } else if (page % 5 >= 0 && page > 4 && page + 2 >= total) {
                    return [1, total - 3, total - 2, total - 1, total];
                } else {
                    return [1, 2, 3, 4, 5, total];
                }
            }
        },
        [filterPages]
    );

    const changePage = (page) => {
        const active = page + 1;

        if (page === active) {
            return;
        }

        const visiblePages = getVisiblePages(page, total_page);
        setVisiblePages(filterPages(visiblePages, total_page));
        visitPage(page);
    };
    
    const [visiblePages, setVisiblePages] = useState(getVisiblePages(null, total_page));

    
    
    useEffect(()=>{ 
        const visiblePages = getVisiblePages(null, total_page);
        setVisiblePages(visiblePages);
    },[getVisiblePages])

    return (
        <>
            <div className="d-lg-flex align-items-center text-center pb-1">
                

                <span className="me-3">
                    Page{' '}
                    <strong>
                        {current_page} of {total_page}
                    </strong>{' '}
                </span>

                <ul className="pagination pagination-rounded d-inline-flex ms-auto align-item-center mb-0">
                    <li
                        key="prevpage"
                        className={classNames('page-item', 'paginate_button', 'previous', {
                            disabled: active === 1,
                        })}
                        onClick={() => {
                            previous_number();
                        }}
                    >
                        <Link to="#" className="page-link">
                            <i className="mdi mdi-chevron-left"></i>
                        </Link>
                    </li>
                    
                    {(visiblePages || []).map((page, index, array) => {
                        return array[index - 1] + 1 < page ? (
                            <React.Fragment key={page}>
                                <li className="page-item disabled d-none d-xl-inline-block">
                                    <Link to="#" className="page-link">
                                        ...
                                    </Link>
                                </li>
                                <li
                                    className={classNames('page-item', 'd-none', 'd-xl-inline-block', {
                                        active: active === page,
                                    })}
                                    onClick={(e) => changePage(page)}
                                >
                                    <Link to="#" className="page-link">
                                        {page}
                                    </Link>
                                </li>
                            </React.Fragment>
                        ) : (
                            <li
                                key={page}
                                className={classNames('page-item', 'd-none', 'd-xl-inline-block', {
                                    active: active === page,
                                })}
                                onClick={(e) => changePage(page)}
                            >
                                <Link to="#" className="page-link">
                                    {page}
                                </Link>
                            </li>
                        );
                    })}
                    <li
                        key="nextpage"
                        className={classNames('page-item', 'paginate_button', 'next', {
                            disabled: active === total_page,
                        })}
                        onClick={() => {
                            next_number();
                        }}
                    >
                        <Link to="#" className="page-link">
                            <i className="mdi mdi-chevron-right"></i>
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Pagination;
