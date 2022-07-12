function addItemToList(){

    const itemText = document.getElementById("item-text");
    const listContainer = document.getElementById("list-container");

    const addedItemContainer = document.createElement('div');
    addedItemContainer.classList.add("added-item");
    addedItemContainer.classList.add("draggable")
    addedItemContainer.draggable = true;

    let textDiv = document.createElement('div');
    textDiv.classList.add('added-item-text');

    let timeDiv = document.createElement('div');
    timeDiv.classList.add('added-item-time');

    let removeItemBtn = document.createElement('button');
    removeItemBtn.classList.add("remove-item-btn");
    removeItemBtn.innerHTML = "❌";
    removeItemBtn.title = "Delete"

    textDiv.innerHTML = itemText.value;
    timeDiv.innerHTML = getDateAndTime();
    
    addedItemContainer.appendChild(textDiv);
    addedItemContainer.appendChild(timeDiv);
    addedItemContainer.appendChild(removeItemBtn);
    listContainer.appendChild(addedItemContainer);

    removeItems();
    dragEvent();

}

function getDateAndTime(){
    const date = new Date();
    let trimDate = date.toString().replace('GMT-0400 (Eastern Daylight Time)', '');
    return trimDate ; 
}

function removeItems(){
    const itemList = document.querySelectorAll(".remove-item-btn");
    itemList.forEach(item => {
        item.addEventListener('click', () => {
            item.closest('.added-item').remove();
        });
    });
}

document.onkeydown = function(e) {
    if(e.key === "Enter")
        addItemToList();
}

function dragEvent(){

    const draggableList = document.querySelectorAll('.draggable');
    const listContainer = document.querySelector('.list-container');

    draggableList.forEach(dragItem => {
        dragItem.addEventListener('dragstart',() => {
            dragItem.classList.add('dragging');
        });
        
        dragItem.addEventListener('dragend', () => {
            dragItem.classList.remove('dragging');
        });
    });

    listContainer.addEventListener('dragover', e => {
        e.preventDefault();
        const afterElement = getDragAfterElement(listContainer, e.clientY);
        const draggable = document.querySelector('.dragging');
        if(afterElement == null){
            listContainer.appendChild(draggable);
        }else{
            listContainer.insertBefore(draggable, afterElement);
        }
        listContainer.appendChild(draggable);
    });
}

function getDragAfterElement(container, y){
    const draggableElement = [...container.querySelectorAll('.draggable:not(.dragging)')];

    return draggableElement.reduce( (closest, child) =>{
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height /2;
        if(offset < 0 && offset > closest.offset){
            return {offset: offset, element: child}
        }else{
            return closest;
        }
    }, {offset: Number.NEGATIVE_INFINITY}).element;
}