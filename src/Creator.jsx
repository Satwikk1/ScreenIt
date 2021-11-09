import React, { useEffect, useRef, useState } from 'react';


const Creator = () => {
    const [currPos, setCurrPos] = useState(0);
    const [filledTags, setFilledTags] = useState(null);
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const [tag, setTag] = useState('#');
    const [text, setText] = useState('');
    const [helper, setHelper] = useState(false);
    const [generated, setGenerated] = useState(false);

    const textarea = useRef(null);
    const div = useRef(null);

    useEffect(() => {
        window.setInterval(()=>{
            if(div!=null){div.current.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})}
        }, 500)
    }, [filledTags])

    return (
        <div>
            <div className="input-container">
                <div className="container">
                    <textarea ref={textarea} onChange={(e)=>{setText(e.target.value)}} value={text} onClick={(e)=>{
                        setCurrPos(e.target.selectionStart)
                    }} id="editable" placeholder="paste your content here!"></textarea>
                </div>
                <div className="cursor-handlers">
                    <h5 className="position">{currPos}</h5>

                    <button onClick={()=>{
                        setStart(currPos);
                        textarea.current.focus();
                    }}>start</button>

                    <button onClick={()=>{
                        setEnd(currPos);
                        textarea.current.focus();
                    }}>end</button>
                </div>
            </div>

            <div className="form-container">
                <div ref={div} className="filled-tags-container" style={{margin: "20px 5px"}}>
                    {
                    filledTags===null?
                    null
                    :
                        filledTags.map((item, idx)=>{
                            return(
                                <div className="added-container">
                                    <div>{idx+1}. | </div>
                                    <div className="added"> <b>{text.slice(item[0], item[1])}</b> |</div>
                                    <div className="added"> {item[0]} |</div>
                                    <div className="added"> {item[1]} |</div>
                                    <div className="added">{ item[2]} |</div>
                                </div>
                            )
                        })
                    }
                </div>
                <div>
                    <input onChange={(e)=>{setStart(e.target.value)}} value={start} style={{margin: "0 8px 0 8px"}} type="number" className="start-input-0" placeholder="start"/>
                    <input onChange={(e)=>{setEnd(e.target.value)}} value={end} style={{margin: "0 8px 0 8px"}}  type="number" className="end-input-0" placeholder="end"/>
                    <select onChange={(e)=>{setTag(e.target.value)}} value={tag} style={{margin: "0 8px 0 8px"}}>
                        <option default value="#">tag</option>
                        <option value="companies worked at">companies worked at</option>
                        <option value="designation">designation</option>
                        <option value="total experience">total experience</option>
                        <option value="skill">skill</option>
                        <option value="experience duration">experience duration</option>
                        <option value="collage name">collage name</option>
                        <option value="certification">certification</option>
                        <option value="wins">wins</option>
                        <option value="name">name</option>
                        <option value="email">email</option>
                    </select>
                    <button onClick={()=>{
                        var temp;
                        if(filledTags==null){
                            temp = [];
                        }else{
                            temp = filledTags;
                        }
                        var l = [start, end, tag]
                        temp.push(l);
                        setFilledTags(temp);
                        setHelper(!helper);
                    }} style={{margin: "0 8px 0 8px"}}>add</button>
                </div>
                <div className="generate-button">
                    <button onClick={()=>{
                        if(filledTags && !generated){
                            var resultString = '["';
                            resultString+=text;
                            resultString+='",{"entities": ['
                            for(let i=0; i<filledTags.length; i++){
                                resultString+='['
                                resultString+=String(filledTags[i][0])
                                resultString+=','
                                resultString+=String(filledTags[i][1])
                                resultString+=',"'
                                resultString+=String(filledTags[i][2])
                                resultString+='"],'
                            }
                            resultString+=']}]'
                            setText(resultString)
                            setGenerated(true)
                        }
                    }}>generate</button>
                </div>
            </div>
        </div>
    )
}

export default Creator
