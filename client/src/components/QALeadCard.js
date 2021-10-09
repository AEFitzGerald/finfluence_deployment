import React from 'react';


const QALeadCard = () => {
    return (
    <>
        <div className="qa-lead-card mt-3">  

                <figure className="text-end mb-5">

                    <blockquote className="blockquote">
                        <p className="qa-lead-card-text">How will the metaverse change psychology?</p>
                    </blockquote>

                    <figcaption className="blockquote-footer">
                        UserA <cite title="Source Title">Source Title</cite>
                    </figcaption>

                </figure>

                <figure className="text-end mb-5">
                    
                    <blockquote className="blockquote">
                        <p className="qa-lead-card-text">What cyptocurrencies have the least environmental impact?</p>
                    </blockquote>

                    <figcaption className="blockquote-footer">
                        UserB <cite title="Source Title">Source Title</cite>
                    </figcaption>

                </figure>

                <figure className="text-end mb-5">

                    <blockquote className="blockquote">
                        <p className="qa-lead-card-text">What are the top humanitarian usecases for blockchain technologies?</p>
                    </blockquote>

                    <figcaption className="blockquote-footer">
                        UserC <cite title="Source Title">Source Title</cite>
                    </figcaption>
                    
                </figure>

                <div className="d-flex justify-content-center">
                    <a href="/questionboard" className="btn enter-btn mt-3">Converse on the QA board...</a>
                </div>    
        </div> 
    </>
    );
};

export default QALeadCard;