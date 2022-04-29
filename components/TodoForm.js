const TodoForm = () => {
    return (
        <div>
            <form>
                <input placeholder='New Todo'></input>
               <div><select>
                    <option value="Status (Pending/ In Progress / Done)">Status (Pending/ In Progress / Done)</option>
                    <option value="pending">Pending</option>
                    <option value="In progress">In Progress</option>
                    <option value="Done">Done</option>
                </select></div> 
                
                <button>ADD</button>
                <button>MODIFY</button>
            </form>
        </div>
    )
}

export default TodoForm