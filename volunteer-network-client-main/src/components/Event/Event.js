import React, { useEffect, useState } from 'react';

const Event = ({event}) => {
    const deleteEvent = id => {
        fetch(`http://localhost:5055/deleteEvent/${id}`,{
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(deleteEvent)
        })
    }
    return (
        <div className="col-md-3">
            <img style={{height: '300px'}} src={event.imageURL} alt=""/>
            <h3>{event.name} <button onClick={() => deleteEvent(event._id)}>Delete</button></h3>
            
        </div>
    );
};

export default Event;