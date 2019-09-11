const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];

function addItem (e) {
    e.preventDefault(); 
    const text = (this.querySelector('[name=item]')).value; 
    const item = {
        text,
        done: false 
    };
    items.push(item);
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items)); 
    this.reset();
}

  function populateList (plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, i) => {
        return `
            <li>
                <input type="checkbox" data-index= ${i} id="item${i}" ${plate.done ?
                    'checked' : ''} />
                <label for="item${i}">${plate.text}</label>
            </li>
        `;
    }).join('');
}
  
function toggleDone(e) {
  if (!e.target.matches('input')) return; // skip this unless it's an input
  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

  addItems.addEventListener('submit', addItem);
  itemsList.addEventListener('click', toggleDone);
  
const deleteFirstItem = document.querySelector('.deleteFirst');
const deleteLastItem = document.querySelector('.deleteLast');
const deleteAllItems = document.querySelector('.deleteAll');
const checkAllButton = document.querySelector('.checkAll');
const uncheckAllButton = document.querySelector('.uncheckAll');

deleteFirstItem.addEventListener('click', removeFirstItem);
deleteAllItems.addEventListener('click', removeItems);
checkAllButton.addEventListener('click', checkAllItems);
uncheckAllButton.addEventListener('click', checkAllItems);

function removeFirstItem (items) {
    document.querySelectorAll('ul.plates li')[0].remove();
    localStorage.items.split('},').slice(0, 1);
    delete items[0];
    console.log('hello');
}

let itemElements = document.querySelectorAll('ul.plates li'); 
function removeItems (items) {
    let li = itemsList.firstElementChild;
    itemsList.removeChild(li);
    localStorage.clear();
    console.log(itemsList);
}

function checkAllItems (e) {
    items.forEach((item, index, items) => {
      (e.target === checkAllButton) ? (items[index].done = true)
        : (items[index].done = false) 
      console.log(items); 
    }); 
    localStorage.setItem('items', JSON.stringify(items)); 
    populateList(items, itemsList);
  }
  
  populateList(items, itemsList);