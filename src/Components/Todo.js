import React, { useState, useEffect } from 'react'
const getLocalStorage = () => {
    const lists = localStorage.getItem("mytodo")
    if (lists) {
        return JSON.parse(lists);
    } else {
        return [];
    }
}
const Todo = () => {
    const [input, setinput] = useState('')
    const [items, setItems] = useState(getLocalStorage())
    const [editItem, seteditItem] = useState("")
    const [toggle, settoggle] = useState('')
    const addItem = () => {
        if (!input) {
            alert("fill the input")
        }
        else if (input && toggle) {
            setItems(
                items.map((curr) => {
                    if (curr.id === editItem) {
                        return { ...curr, name: input }
                    }
                    return curr;
                })
            )
        }
        else {
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: input
            }
            setItems([...items, myNewInputData])
            setinput('')
        }
    }

    const updateItem = (id) => {
        const getElement = items.find((curr) => {
            return curr.id === id;
        })
        setinput(getElement.name)
        seteditItem(id);
        settoggle(true)
    }

    const deleteItem = (id) => {
        const getElement = items.filter((finder) => {
            return finder.id !== id;
        })
        setItems(getElement)

    }

    useEffect(() => {
        localStorage.setItem('mytodo', JSON.stringify(items))
    }, [items])


    return (
        <div className="shadow-lg absolute w-[30%] p-2 h-[70%] ml-[35%] mt-[5%] bg-violet-400 ">
            <input type="text"
                className='w-full mt-8  h-[10%] bg-white'
                value={input}
                onChange={(e) => setinput(e.target.value)}
            />
            <div className="side-options flex gap-2">
                <button className="add border-2" onClick={addItem}>+</button>
                {toggle ? <button className="add border-2" >📄</button> : <button className="add border-2" >✏️</button>}


            </div>
            <div className="card-container m-2">
                {
                    items.map((item) => {
                        return <div key={item.id} className="card w-full h-6 bg-white flex justify-between">
                            <div className="title">
                                {item.name}
                            </div>
                            <div className="side-options flex gap-2">
                                <button className="add border-2" onClick={() => deleteItem(item.id)} >🪣</button>
                                <button className="edit border-2" onClick={() => updateItem(item.id)}  > Edit</button>
                            </div>
                        </div>
                    })
                }




            </div>
            <div className="flex justify-between mt-4">

                <button className='border-2' onClick={() => setItems([])}>CheckList</button>
            </div>
        </div>
    )
}

export default Todo