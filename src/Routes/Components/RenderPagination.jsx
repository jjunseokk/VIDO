import React, { useState } from 'react'

import next_on from '../../../img/next_on.svg';
import next_off from '../../../img/next_off.svg';
import endNext_on from '../../../img/endNext_on.svg';
import endNext_off from '../../../img/endNext_off.svg';
import prev_on from '../../../img/prev_on.svg';
import prev_off from '../../../img/prev_off.svg';
import endPrev_on from '../../../img/endPrev_on.svg';
import endPrev_off from '../../../img/endPrev_off.svg';

import next_on_light from '../../../img/next_on_light.svg';
import next_off_light from '../../../img/next_off_light.svg';
import endNext_on_light from '../../../img/endNext_on_light.svg';
import endNext_off_light from '../../../img/endNext_off_light.svg';
import prev_on_light from '../../../img/prev_on_light.svg';
import prev_off_light from '../../../img/prev_off_light.svg';
import endPrev_on_light from '../../../img/endPrev_on_light.svg';
import endPrev_off_light from '../../../img/endPrev_off_light.svg';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const RenderPagination = ({ totalPage, setPage, type = "", page, mode }) => {
    const [visibilityL, setVisibilityL] = useState(false);
    const [visibilityR, setVisibilityR] = useState(false);
    const params = useParams();


    const handlePageChange = (page) => {
        if (page == 1) {
            setVisibilityL(true);
            setVisibilityR(false);
            setPage(page);
        } else if (page == totalPage) {
            setVisibilityL(false);
            setVisibilityR(true);
            setPage(page);
        } else {
            setPage(page);
            setVisibilityL(false);
            setVisibilityR(false);
        }
    }

    useEffect(() => {
        if (page == 1) {
            setVisibilityL(true);
            setVisibilityR(false);
            setPage(page);
        } else if (page == totalPage) {
            setVisibilityL(false);
            setVisibilityR(true);
            setPage(page);
        } else {
            setVisibilityL(false);
            setVisibilityR(false);
            setPage(page);
        }
    }, [page]);

    const currentPage = page;
    const pagesToShow = 5;
    const pages = [];
    const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));

    for (let i = startPage; i <= Math.min(totalPage, startPage + pagesToShow - 1); i++) {
        pages.push(
            <p
                key={i}
                onClick={() => handlePageChange(i)}
                className={type == 'tag' || 'search' ? i == currentPage ? 'active' : '' : i == params.id ? 'active' : ''}
            >
                {i}
            </p >
        );
    }

    useEffect(() => {
        setPage(page);
    }, [totalPage])

    return (
        <div className='pagination'>
            {mode == 'light' ? (
                <>
                    <button
                        disabled={visibilityL == true || page == 1 ? true : false}
                        onClick={() => handlePageChange(1)}>
                        <img src={visibilityL == true || page == 1 ? endPrev_off_light : endPrev_on_light} alt='next' />
                    </button>
                    <button
                        disabled={visibilityL == true || page == 1 ? true : false}
                        onClick={() => handlePageChange(currentPage - 1)}>
                        <img src={visibilityL == true || page == 1 ? prev_off_light : prev_on_light} alt='next' />
                    </button>
                    {pages}
                    <button
                        disabled={visibilityR == true || page == totalPage ? true : false}
                        onClick={() => handlePageChange(currentPage + 1)}>
                        <img src={visibilityR == true || page == totalPage ? next_off_light : next_on_light} alt='next' />
                    </button>
                    <button
                        disabled={visibilityR == true || page == totalPage ? true : false}
                        onClick={() => handlePageChange(totalPage)}>
                        <img src={visibilityR == true || page == totalPage ? endNext_off_light : endNext_on_light} alt='next' />
                    </button>
                </>

            ) : (
                <>
                    <button
                        disabled={visibilityL == true || page == 1 ? true : false}
                        onClick={() => handlePageChange(1)}>
                        <img src={visibilityL == true || page == 1 ? endPrev_off : endPrev_on} alt='next' />
                    </button>
                    <button
                        disabled={visibilityL == true || page == 1 ? true : false}
                        onClick={() => handlePageChange(currentPage - 1)}>
                        <img src={visibilityL == true || page == 1 ? prev_off : prev_on} alt='next' />
                    </button>
                    {pages}
                    <button
                        disabled={visibilityR == true || page == totalPage ? true : false}
                        onClick={() => handlePageChange(currentPage + 1)}>
                        <img src={visibilityR == true || page == totalPage ? next_off : next_on} alt='next' />
                    </button>
                    <button
                        disabled={visibilityR == true || page == totalPage ? true : false}
                        onClick={() => handlePageChange(totalPage)}>
                        <img src={visibilityR == true || page == totalPage ? endNext_off : endNext_on} alt='next' />
                    </button>
                </>

            )}

        </div>
    );
}

export default RenderPagination;