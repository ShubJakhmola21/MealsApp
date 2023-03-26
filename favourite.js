
function addFavourite()
{
    const mealsContainer = document.getElementById('meals-container');
    
    var item=JSON.parse(localStorage.favoriteMeals);
    for(var i=0 ;i<item.length;i++)
    {
        const searchTerm = item[i];
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        if (data.meals === null) {
            mealsContainer.innerHTML = '<p>No meals found. Please try again.</p>';
        } else {
            data.meals.forEach(meal => {
            const mealElement = document.createElement('div');
            mealElement.classList.add('meal');
            mealElement.innerHTML=`
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h2>${meal.strMeal}</h2>
            <p>${meal.strInstructions}</p>
          `;
            mealsContainer.appendChild(mealElement);
            console.log(mealElement)
            });
        }
        })
        .catch(error => console.log(error));
    }
}

addFavourite();