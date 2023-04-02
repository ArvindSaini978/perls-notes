const addNote = document.querySelector('.add');
const notesContainer = document.querySelector('.notes-container');

const updateLSData = () =>{
    const writeNote = document.querySelectorAll('.writeNote');
    const notes = [];

    writeNote.forEach((note)=>{
        return notes.push(note.value);
    })

    localStorage.setItem('notes', JSON.stringify(notes));
}

const addNewNote =  (text = "") => {
    const htmlData = `
        <div class="btns">
        <button id="edit" title="save/edit" class="edit"><i class="bi bi-pencil-square"></i></button>
        <button id="delete" title="Delete" class="delete"><i class="bi bi-trash3-fill"></i></button>
        </div>
        <div id="main" class="main ${text ? '' : 'hidden'}"></div>
        <textarea class="writeNote ${text ? 'hidden' : ''}" placeholder="Write your note here..."></textarea>
        `;
    const note = document.createElement('div');
    notesContainer.insertAdjacentElement('beforeend', note);
    note.classList.add('note');
    note.insertAdjacentHTML('afterbegin', htmlData);
    // console.log(note);
    
    // getting the refrences
    const editBtn = note.querySelector('.edit');
    const delBtn = note.querySelector('.delete')
    const main = note.querySelector('.main');
    const writeNote = note.querySelector('.writeNote');
    
    writeNote.focus();
    // deleting the note
    delBtn.addEventListener('click', () => {
        const confermation = confirm("Do you want to permanently delete this note?");
        if (confermation == true) {
            note.remove();
            updateLSData();
        }
    });


    // toggle using edit button
    main.innerHTML = text;
    writeNote.value = text;



    editBtn.addEventListener('click', ()=>{
        main.classList.toggle('hidden');
        writeNote.classList.toggle('hidden');
        writeNote.focus();
    });


    writeNote.addEventListener('change', (event)=>{
        const Value = event.target.value ;
        main.innerHTML = Value;

        updateLSData();
    })


}

// getting data back from local Storage

const notes = JSON.parse(localStorage.getItem('notes'));
if (notes) { notes.forEach((note) => addNewNote(note) ) }



addNote.addEventListener('click', () => addNewNote());