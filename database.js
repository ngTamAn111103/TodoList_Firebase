import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getDatabase, set, ref, push, get } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js"
import {done_task} from "./app.js"
const firebaseConfig = {
    apiKey: "AIzaSyBkQ5kTrnE0EVIz_8EW1QJEGwB0RJ-1Lkg",
    authDomain: "todolist-11cc6.firebaseapp.com",
    databaseURL: "https://todolist-11cc6-default-rtdb.firebaseio.com",
    projectId: "todolist-11cc6",
    storageBucket: "todolist-11cc6.appspot.com",
    messagingSenderId: "869818059574",
    appId: "1:869818059574:web:5e45aec3cdbd0975698197",
    measurementId: "G-B37KD7M1VP"
};

const app = initializeApp(firebaseConfig);

const db = getDatabase();

// Select * from tasks 
function getAllTask() {
    console.log("getAllTask");
    // Tạo một tham chiếu đến node "tasks" trong Realtime Database của bạn.
    const tasksRef = ref(db, 'tasks');

    // Dùng với tasksRef để lấy một snapshot của dữ liệu trong node "tasks" tại thời điểm hiện tại. Dữ liệu được trả về trong hàm callback dưới dạng một đối tượng.
    get(tasksRef).then((snapshot) => {
        // Kiểm tra có dữ liệu hay không
        if (snapshot.exists()) {
            const tasks = snapshot.val();

            // Xử lý dữ liệu tasks ở đây
            for (const taskId in tasks) {
                const task = tasks[taskId];
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
                checkbox.id = taskId;

                // Thêm event listener:
                checkbox.addEventListener('click', function () {
                    console.log("Gọi done_task");
                    done_task(this);
                });

                // cấu hình li
                li_task.className = "list-group-item d-flex align-items-center border-0 mb-2 rounded li_task";
                li_task.style.backgroundColor = "#f4f6f7";
                li_task.innerText = task.task;
                if (task.done === true) {
                    checkbox.checked = true;
                    li_task.style.textDecoration = "line-through";
                    // bỏ con vào cha cuối cùng
                    li_task.insertBefore(checkbox, li_task.firstChild);
                    ul_task.insertBefore(li_task, ul_task.lastChild);
                }
                else {
                    // bỏ con vào cha đầu tiên
                    li_task.insertBefore(checkbox, li_task.firstChild);
                    ul_task.insertBefore(li_task, ul_task.firstChild);
                }


            }
        } else {
            console.log("Không có dữ liệu");
        }
    }).catch((error) => {
        console.error(error);
    });
}

// Hiển thị lên HTML
getAllTask();

export function createTask(text) {
    console.log("createTask");

    const taskRef = ref(db, 'tasks');

    // Tạo một key tự động cho mục mới
    const newTaskKey = push(taskRef).key;

    // Cập nhật dữ liệu với key mới
    set(ref(db, `tasks/${newTaskKey}`), 
    {
        task: text,
        done: false
    });

    // Tạo giao diện

}

// cập nhật lại task đã được done
export function update(li) {
    console.log("update");
    const checkbok = li.firstChild
    const text = li.innerText
    const id = checkbok.id
    console.log(`tasks/${id}`);
    set(ref(db, `tasks/${id}`), {
        task: text,
        done: checkbok.checked ? true : false
    });
}