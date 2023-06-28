import logo from "../images/cart.png"
import "./todo.css";
import {useState} from "react";


const Todo = () => {
    const [inputData, setInputData] = useState(" ");
    const [item, setItem] = useState([]);
    const [toggleSubmit, setToggleSubmit] = useState(true)
    const [isEditItem, setIsEditItem] = useState(null)


    const addItem = () => {
        if(!inputData) {
          alert("please fill the item")
        }
        else if(inputData && !toggleSubmit) {
             setItem(
              item.map((elem) => {
                if ( elem.id === isEditItem ) {
                  return { ...elem, name:inputData}
                }
                return elem;
              })
             )
             setToggleSubmit(true)
             setInputData("")
             setIsEditItem(null)
           
        }
        else {
          const allInputData = { id: new Date().getTime().toString(), name: inputData }
          setItem([...item, allInputData])
          setInputData("")
        }
       
    }
   
  
     
    {/****************************************** delete ***************************************** */}
      const deleteItem = (index) => {
          const updatedItem = item.filter((elem) => {
            return index !== elem.id
          })
          setItem(updatedItem);
      }
    
  {/****************************************** removeAll ***************************************** */}
      const removeAll = () => {
        setItem([]);
      }



  {/****************************************** edit item ***************************************** */}
      const editItem = (id) => {
        const newEditItem = item.find((elem) => {
          return id === elem.id
        })
        setToggleSubmit(false)
        setInputData(newEditItem.name)
        setIsEditItem(id)
   
      }




      const handleChange = (event) => {
        setInputData(event.target.value)
      }

  return (
    <div className=".main-div">
     <div className=".child-div">
     <figure>
        <img src={logo} className="logoimg" alt="cartImg" />
        <figcaption> Add your list here...</figcaption>
     </figure>


     <div className="addItems">
         <input type="text"
           placeholder="Add your list item here..." 
            className="inputclass"
            value={inputData}
            onChange={handleChange}
            />
            {
              toggleSubmit ? <i className="fa fa-plus"   title="Add Item" onClick={addItem} ></i> :
              <i className= "far fa-edit"  title="update Item" onClick={addItem}></i>


            }
            
     </div>


     <div className="showItem">
     {
        item.map((elem) => {
            return (
                <div className="eachItem" key={elem.id}>
                   <h3>{elem.name}</h3>
                   <div className="todo-btn">
                   <i className= "far fa-edit"  title="edit Item" onClick={() => editItem(elem.id)}></i>
                   <i className="fas fa-trash"  title="Delete Item" onClick={() => deleteItem(elem.id)}></i>
             </div>
             </div> 
            )
        })
     }
        
     </div>


     <div className="showItems">
         <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}>Check List</button>
     </div>


     </div>
    </div>
  )
}

export default Todo