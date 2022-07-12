function addItemToList(){
    const itemText = document.getElementById("item-text");
    const listContainer = document.getElementById("list-container");

    const addedItemContainer = document.createElement('div');
    addedItemContainer.classList.add("added-item");

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