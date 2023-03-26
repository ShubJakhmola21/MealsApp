const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const mealsContainer = document.getElementById('meals-container');

searchButton.addEventListener('click', searchMeal);

function searchMeal() {
  const searchTerm = searchInput.value;
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
    .then(response => response.json())
    .then(data => {
      mealsContainer.innerHTML = '';
      if (data.meals === null) {
        mealsContainer.innerHTML = '<p>No meals found. Please try again.</p>';
      } else {
        data.meals.forEach(meal => {
          const mealElement = document.createElement('div');
          mealElement.classList.add('meal');
          mealElement.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h2>${meal.strMeal}</h2>
            <p>${meal.strInstructions}</p>
            <button onclick="addMeal('${meal.idMeal}')">Add to favorites</button>
          `;
          mealsContainer.appendChild(mealElement);
        });
      }
    })
    .catch(error => console.log(error));
}

function addMeal(mealId) {
  const favoriteMeals = JSON.parse(localStorage.getItem('favoriteMeals')) || [];
  if (!favoriteMeals.includes(mealId)) {
    favoriteMeals.push(mealId);
    localStorage.setItem('favoriteMeals', JSON.stringify(favoriteMeals));
    alert('Meal added to favorites!');
  } else {
    alert('This meal is already in your favorites.');
  }
}
