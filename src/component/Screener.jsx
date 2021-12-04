import React, { useState } from 'react';

const Screener = () => {
    var fileReader;

    const handleFileRead = (e) => {
        const content = fileReader.result;
        console.log(content.length);
        console.log(content);
      };
      
      const handleFileChosen = (file) => {
        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(file);
      };
    
    return (
        <div>
            <input onChange={(e)=>handleFileChosen(e.target.files[0])} type="file" name="" id="" />
        </div>
    )
}

export default Screener
