const form = document.getElementById("workout-form");
const workoutList = document.getElementById("workout-list");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const exercise = document.getElementById("exercise");
    const workout = {
        date: document.getElementById("date").value,
        exercise: exercise.options[exercise.selectedIndex].text,
        sets: document.getElementById("sets").value,
        reps: document.getElementById("reps").value,
        weight: document.getElementById("weight").value,
    };

    const item = document.createElement("li");
    item.textContent = `${workout.date} - ${workout.exercise}: ${workout.sets} sets, ${workout.reps} reps, ${workout.weight}kg`;

    workoutList.appendChild(item);
    form.reset();
});
