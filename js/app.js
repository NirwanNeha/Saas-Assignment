const apiUrl = 'https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json';
const tableBody = document.querySelector('#projects-table tbody');
const paginationDiv = document.querySelector('#pagination');
const recordsPerPage = 5;
let currentPage = 1;
let projects = [];

async function fetchProjects() {
    try {
        const response = await fetch(apiUrl);
        projects = await response.json();
        console.log(projects); 
        displayProjects();
        setupPagination();
    } catch (error) {
        // For showing a warning message if there's an error in fetching the data
        alert('Unable to load API data. Please try again later.');
    }
}

function displayProjects() {
    tableBody.innerHTML = '';
    const start = (currentPage - 1) * recordsPerPage;
    const end = start + recordsPerPage;
    const paginatedProjects = projects.slice(start, end);

    paginatedProjects.forEach((project, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${start + index + 1}</td>
            <td>${project['percentage.funded']}</td>
            <td>${project['amt.pledged']}</td>
        `;
        tableBody.appendChild(row);
    });
}

// for pagination 
function setupPagination() {
    paginationDiv.innerHTML = '';
    const totalPages = Math.ceil(projects.length / recordsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.classList.add('pagination-button');
        if (i === currentPage) button.disabled = true;
        button.addEventListener('click', () => {
            currentPage = i;
            displayProjects();
            setupPagination();
        });
        paginationDiv.appendChild(button);
    }
}

fetchProjects();
