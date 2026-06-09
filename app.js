import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";

const firebaseConfig = {
    databaseURL: "https://rep-tracker-a6275-default-rtdb.europe-west1.firebasedatabase.app/",
    apiKey: "AIzaSyAzyua549ft9x7Nv4iFNkxudvY2J2DEwS4",
    authDomain: "rep-tracker-a6275.firebaseapp.com",
    projectId: "rep-tracker-a6275",
    storageBucket: "rep-tracker-a6275.firebasestorage.app",
    messagingSenderId: "557112589347",
    appId: "1:557112589347:web:35913226a84d6f9ea44596"
}

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const form = document.getElementById("workout-form");
const workoutList = document.getElementById("workout-list");
let workouts = JSON.parse(localStorage.getItem("workouts")) || [];

function saveWorkouts() {
    localStorage.setItem("workouts", JSON.stringify(workouts));
}

function deleteWorkout(index) {
    workouts.splice(index, 1);
    saveWorkouts();
    renderWorkouts();
}

function addWorkout(workout, index) {
    const row = document.createElement("tr");
    const values = [
        workout.date,
        workout.exercise,
        workout.sets,
        workout.reps,
        workout.weight,
        workout.time,
    ];

    values.forEach(function (value) {
        const cell = document.createElement("td");
        cell.textContent = value;
        row.appendChild(cell);
    });

    const actionCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function () {
        deleteWorkout(index);
    });

    actionCell.appendChild(deleteButton);
    row.appendChild(actionCell);
    workoutList.appendChild(row);
}

function renderWorkouts() {
    workoutList.innerHTML = "";
    workouts.forEach(addWorkout);
}

renderWorkouts();

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const exercise = document.getElementById("exercise");
    const workout = {
        date: document.getElementById("date").value,
        exercise: exercise.options[exercise.selectedIndex].text,
        sets: document.getElementById("sets").value,
        reps: document.getElementById("reps").value,
        weight: document.getElementById("weight").value,
        time: document.getElementById("time").value,
    };

    workouts.push(workout);
    saveWorkouts();
    renderWorkouts();
    form.reset();
});
