// Select Elements

const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");
const github = new Github();
const ui = new UI();

eventListeners();

function eventListeners(){
    githubForm.addEventListener("submit",getData);
    clearLastUsers.addEventListener("click",clearAllSearched);
    document.addEventListener("DOMContentLoaded",getAllSearched);
}
function getData(e){
    let username = nameInput.value.trim();

    if (username === ""){
        alert("Please enter a valid username.");
    }
    else {

        github.getGithubData(username)
        .then(response =>{
            if (response.user.message === "Not Found"){
                ui.showError("User not found");
            }
            else {
                ui.addSearchedUserToUI(username);
                Storage.addSearchedUserToStorage(username);
                ui.showUserInfo(response.user);
                ui.showRepoInfo(response.repo);
            }
        })
        .catch(err => ui.showError(err));
    }

    ui.clearInput(); // Clear Input
    e.preventDefault();
}
function clearAllSearched(){
    // Delete all search
    if (confirm("Are you sure ?")){
        Storage.clearAllSearchedUsersFromStorage(); // Clear Storage
        ui.clearAllSearchedFromUI();
    }




}
function getAllSearched(){
    // Get searched from Storage Upload to UI
 
    let users = Storage.getSearchedUsersFromStorage();

    let result = "";
    users.forEach(user => { 
        result += `<li class="list-group-item">${user}</li>`;

    });

    lastUsers.innerHTML = result;

}
