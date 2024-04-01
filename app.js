import { createTask, update} from './database.js'

// Lắng nghe sự kiện enter để add task
document.getElementById('form2').addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
        add_task()
    }
});

function add_task() {
    console.log("add_task");
    // Lấy nội dung task mới vừa nhập
    const text_new = document.getElementById('form2').value

    if (text_new != "") {
        // trả rỗng lại input
        document.getElementById('form2').value = "";

        // thẻ ul chứa toàn bộ li task
        const ul_task = document.getElementById('task_container');

        // Tạo 1 li mới chứa task mới
        const li_task = document.createElement('li');
        // tạo input là con của li 
        const checkbox = document.createElement('input');

        // cấu hình checkbox
        checkbox.type = "checkbox";
        checkbox.className = "form-check-input me-2";
        checkbox.ariaLabel = "...";


        // Thêm event listener:
        checkbox.addEventListener('click', function () {
            done_task(this);
        });

        // cấu hình li
        li_task.className = "list-group-item d-flex align-items-center border-0 mb-2 rounded li_task";
        li_task.style.backgroundColor = "#f4f6f7";
        li_task.innerText = text_new;

        // bỏ con vào cha
        li_task.insertBefore(checkbox, li_task.firstChild);
        ul_task.insertBefore(li_task, ul_task.firstChild);


    }
    document.getElementById('form2').focus();

    // // lưu vào database
    createTask(text_new)
}



// truyền vào input được nhấn
export function done_task(input) {

    // lấy li 
    const li_task = input.parentNode;
    const ul_task = document.querySelector('#task_container');

    // Nếu chưa check
    if (input.checked) {
        ul_task.removeChild(li_task);
        ul_task.appendChild(li_task);
        li_task.style.textDecoration = "line-through";
        
    } else {
        ul_task.removeChild(li_task);
        ul_task.insertBefore(li_task, ul_task.firstChild);
        li_task.style.textDecoration = "none";
    }
    update(li_task)
}





