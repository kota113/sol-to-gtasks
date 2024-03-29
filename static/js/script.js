document.addEventListener('DOMContentLoaded', async function () {
    const response = await fetch('/api/tasklists');
    if (!response.ok) {
        console.log("not logged in");
        return;
    }
    const tasklists = await response.json();
    const dropdown = document.getElementById('dropdown');
    const button = document.getElementById('dropdownButton');
    const submitBtn = document.getElementById('taskListSubmitBtn');

    // Populate the list
    for (const item of tasklists) {
        const li = document.createElement('li');
        li.textContent = item["title"];
        li.id = "tasklist-" + item["id"]
        li.classList.add('py-2', 'px-3', 'text-gray-700', 'hover:bg-gray-100', 'cursor-pointer');
        if (item["id"] === button.getAttribute('data-selected-id')) {
            button.textContent = item["title"];
            li.classList.add('active-tasklist');
        }
        li.addEventListener('click', function () {
            button.textContent = item["title"];
            li.classList.add('active-tasklist');
            dropdown.classList.add('hidden');
            for (const other of dropdown.children) {
                if (other !== li) {
                    other.classList.remove('active-tasklist');
                }
            }
        });
        dropdown.appendChild(li);
    }

    // Toggle dropdown
    button.addEventListener('click', function () {
        submitBtn.disabled = false;
        dropdown.classList.toggle('hidden');
    });

    // Close dropdown when clicking outside
    window.addEventListener('click', function (e) {
        if (!dropdown.contains(e.target) && !button.contains(e.target)) {
            dropdown.classList.add('hidden');
        }
    });
});

document.getElementById("taskListSubmitBtn").addEventListener("click", async function () {
    const choice = document.getElementsByClassName('active-tasklist')[0];
    const response = await fetch('/api/set-tasklist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            tasklist: choice.id.substring(9)
        })
    });
    document.getElementById("taskListSubmitBtn").disabled = true;
    if (!response.ok) {
        console.log("error");
    } else {
        Swal.fire({
            title: "完了しました",
            text: "同期が開始されるまで１分ほどかかる可能性があります。",
            icon: "success"
        });
    }
})

document.getElementById("icalUrlSubmitBtn").addEventListener("click", async function () {
    const icalUrl = document.getElementById('icalUrlInput');
    const response = await fetch('/api/set-ical-url', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            icalUrl: icalUrl.value
        })
    });
    document.getElementById("icalUrlSubmitBtn").disabled = true;
    if (!response.ok) {
        console.log("error");
    }
})

document.getElementById("icalUrlInput").addEventListener("focus", function () {
    document.getElementById("icalUrlSubmitBtn").disabled = false;
})
