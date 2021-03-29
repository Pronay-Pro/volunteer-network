import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";

const AddEvents = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [imageURL, setIMageURL] = useState(null);


  const onSubmit = data => {
    const eventData = {
      name: data.name,
      imageURL: imageURL
    };
    const url = `http://localhost:5055/addEvent`;
    
    fetch(url, {
      method: 'POST', 
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(eventData)
    })
    .then(res => console.log('server side response', res))
  };

  const handleImageUpload = event => {
    console.log(event.target.files[0])
    const imageData = new FormData();
    imageData.set('key', '2a552b2013b33f1a3bf5815178fe690a');
    imageData.append('image', event.target.files[0]);
    
    axios.post('https://api.imgbb.com/1/upload', 
    imageData)
    .then(function (response) {
      setIMageURL(response.data.data.display_url);
    })
    .catch(function (error) {
      console.log(error);
    });

  }
  return (
    <div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="name" defaultValue="New event" ref={register} />
      <input name="exampleRequired" type="file" onChange={handleImageUpload} />
      {errors.exampleRequired && <span>This field is required</span>}
      
      <input type="submit" />
    </form>
    </div>
  );
};

export default AddEvents;