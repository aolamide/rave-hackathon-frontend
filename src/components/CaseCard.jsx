import React from 'react';

const CaseCard = ({problem}) => {
    const {title, description, image, doc, amount, donatedAmount} = problem;
    return (
        <div className="case-card">
            <img src='http://placehold.it/200x200' alt="title"/>
            <h3>{title}</h3>
            <p>{description}</p>
            <p>{`N${donatedAmount}/N${amount} donated`}</p>
            <a href="#"><button className="btn-donate">Donate</button></a>
        </div>
    ) 
}

export default CaseCard
