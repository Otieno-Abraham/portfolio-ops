// ========== USER DATABASE ==========
const users = {
    admin: {
        password: 'admin',
        companies: ['GTA', 'VAT', 'BAT'],
        folders: ['Corporate_Records', 'Contracts', 'Shareholder_Agreements', 'Compliance_Filings', 'Board_Documents', 'Investor_Documents', 'Operational_Documents']
    },
    legal: {
        password: 'legal',
        companies: ['GTA', 'VAT', 'BAT'],
        folders: ['Corporate_Records', 'Contracts', 'Shareholder_Agreements', 'Compliance_Filings', 'Board_Documents']
    },
    support: {
        password: 'support',
        companies: ['GTA', 'BAT'],
        folders: ['Operational_Documents', 'Contracts']
    }
};

// ========== LOGIN FUNCTION ==========
function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (users[username] && users[username].password === password) {
        window.location.href = 'dashboard.html?user=' + username;
    } else {
        alert('Invalid username or password');
    }
}

// ========== GET CURRENT USER ==========
function getCurrentUser() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('user') || 'admin';
}

// ========== DISPLAY USER INFO ==========
function displayUserInfo() {
    const userDisplay = document.getElementById('userDisplay');
    if (userDisplay) {
        userDisplay.innerHTML = '👤 ' + getCurrentUser();
    }
}

// ========== CHECK IF USER CAN ACCESS COMPANY ==========
function canAccessCompany(company) {
    const username = getCurrentUser();
    return users[username].companies.includes(company);
}

// ========== GET USER'S ALLOWED FOLDERS ==========
function getAllowedFolders() {
    const username = getCurrentUser();
    return users[username].folders;
}

// ========== DOCUMENT REGISTER DATA ==========
const documents = [
    { company: 'GTA', name: 'Shareholder Agreement', type: 'Legal', version: 'v2', owner: 'Legal Team', updated: '2026-02-15', status: 'Active' },
    { company: 'GTA', name: 'Annual Compliance Filing', type: 'Compliance', version: 'v1', owner: 'Compliance', updated: '2025-12-10', status: 'Archived' },
    { company: 'VAT', name: 'Master Services Agreement', type: 'Contract', version: 'v3', owner: 'Ops Manager', updated: '2026-03-01', status: 'Active' },
    { company: 'VAT', name: 'Board Minutes – March 2026', type: 'Governance', version: 'v1', owner: 'Executive', updated: '2026-03-20', status: 'Draft' },
    { company: 'BAT', name: 'Tax Filing – Q1 2026', type: 'Compliance', version: 'v1', owner: 'Finance', updated: '2026-04-05', status: 'Active' },
    { company: 'BAT', name: 'Support Contract', type: 'Contract', version: 'v2', owner: 'Support Team', updated: '2026-02-28', status: 'Active' }
];

// ========== TASK TRACKER DATA ==========
const tasks = [
    { company: 'GTA', task: 'Annual Compliance Filing', category: 'Compliance', owner: 'Legal Team', deadline: '2026-06-30', priority: 'High', status: 'Pending' },
    { company: 'GTA', task: 'Board Meeting Prep', category: 'Governance', owner: 'Executive', deadline: '2026-04-10', priority: 'Medium', status: 'In Progress' },
    { company: 'VAT', task: 'Contract Renewal', category: 'Legal', owner: 'Ops Manager', deadline: '2026-04-15', priority: 'Medium', status: 'In Progress' },
    { company: 'VAT', task: 'Update Shareholder Register', category: 'Corporate', owner: 'Legal Team', deadline: '2026-03-25', priority: 'Low', status: 'Not Started' },
    { company: 'BAT', task: 'Q2 Investor Report', category: 'Reporting', owner: 'Finance', deadline: '2026-07-15', priority: 'High', status: 'Pending' },
    { company: 'BAT', task: 'Support Ticket Review', category: 'Operations', owner: 'Support Team', deadline: '2026-03-30', priority: 'Medium', status: 'In Progress' }
];

// ========== FILTER DOCUMENTS BY USER ==========
function getFilteredDocuments() {
    const username = getCurrentUser();
    const userCompanies = users[username].companies;
    return documents.filter(doc => userCompanies.includes(doc.company));
}

// ========== FILTER TASKS BY USER ==========
function getFilteredTasks() {
    const username = getCurrentUser();
    const userCompanies = users[username].companies;
    return tasks.filter(task => userCompanies.includes(task.company));
}

// ========== OPEN PASSWORD PROTECTED DOCUMENT ==========
function openFile() {
    const password = prompt('Enter password to open document:');
    if (password === 'demo') {
        alert('✅ Access granted. Document would open here.');
    } else {
        alert('❌ Incorrect password.');
    }
}

// ========== LOGOUT ==========
function logout() {
    window.location.href = 'index.html';
}

// ========== INITIALIZE DASHBOARD ==========
function initDashboard() {
    displayUserInfo();
    const username = getCurrentUser();
    const userCompanies = users[username].companies;
    
    const companyList = document.getElementById('companyList');
    if (companyList) {
        userCompanies.forEach(company => {
            const div = document.createElement('div');
            div.className = 'company-item';
            div.textContent = company;
            div.onclick = () => showCompanyFolders(company);
            companyList.appendChild(div);
        });
    }
}

// ========== SHOW COMPANY FOLDERS ==========
function showCompanyFolders(company) {
    document.getElementById('breadcrumb').innerHTML = company;
    const folders = getAllowedFolders();
    
    let html = '<div class="folder-grid">';
    folders.forEach(folder => {
        html += `<div class="folder-item" onclick="showFiles('${company}', '${folder}')">${folder}</div>`;
    });
    html += '</div>';
    
    document.getElementById('contentArea').innerHTML = html;
}

// ========== SHOW FILES IN FOLDER ==========
function showFiles(company, folder) {
    document.getElementById('breadcrumb').innerHTML = company + ' / ' + folder;
    
    let html = '<div class="file-grid">';
    
    if (folder.includes('Contract')) {
        html += '<div class="file-item" onclick="openFile()">ServiceAgreement_v2.pdf</div>';
        html += '<div class="file-item" onclick="openFile()">NDA_v1.pdf</div>';
    } else if (folder.includes('Compliance')) {
        html += '<div class="file-item" onclick="openFile()">TaxFiling_2025.pdf</div>';
    } else {
        html += '<div class="file-item" onclick="openFile()">Document.pdf</div>';
    }
    
    html += '</div>';
    document.getElementById('contentArea').innerHTML = html;
}

// ========== INITIALIZE REGISTER PAGE ==========
function initRegister() {
    displayUserInfo();
    const filteredDocs = getFilteredDocuments();
    const tbody = document.getElementById('documentTable');
    
    if (tbody) {
        filteredDocs.forEach(doc => {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td>${doc.company}</td>
                <td>${doc.name}</td>
                <td>${doc.type}</td>
                <td>${doc.version}</td>
                <td>${doc.owner}</td>
                <td>${doc.updated}</td>
                <td>${doc.status}</td>
            `;
        });
    }
}

// ========== INITIALIZE TRACKER PAGE ==========
function initTracker() {
    displayUserInfo();
    const filteredTasks = getFilteredTasks();
    const tbody = document.getElementById('taskTable');
    
    if (tbody) {
        filteredTasks.forEach(task => {
            const row = tbody.insertRow();
            let priorityClass = '';
            if (task.priority === 'High') priorityClass = 'priority-high';
            else if (task.priority === 'Medium') priorityClass = 'priority-medium';
            else if (task.priority === 'Low') priorityClass = 'priority-low';
            
            row.innerHTML = `
                <td>${task.company}</td>
                <td>${task.task}</td>
                <td>${task.category}</td>
                <td>${task.owner}</td>
                <td>${task.deadline}</td>
                <td class="${priorityClass}">${task.priority}</td>
                <td>${task.status}</td>
            `;
        });
    }
}
