import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useCallback, useEffect, useState } from 'react';

// const DUMMY_MEALS = [
//   {
//     id: 'm1',
//     name: 'Sushi',
//     description: 'Finest fish and veggies',
//     price: 22.99,
//   },
//   {
//     id: 'm2',
//     name: 'Schnitzel',
//     description: 'A german specialty!',
//     price: 16.5,
//   },
//   {
//     id: 'm3',
//     name: 'Barbecue Burger',
//     description: 'American, raw, meaty',
//     price: 12.99,
//   },
//   {
//     id: 'm4',
//     name: 'Green Bowl',
//     description: 'Healthy...and green...',
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [meals, setMeals] = useState([]);

  const fetchMealHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setTimeout(async () => {
      
      try {
        const response = await fetch("http://localhost:4000/meals");
        
        if(!response.ok) {
          throw new Error("Something weng wrong");
        }
        const mealsFound = await response.json();
  
        setMeals(mealsFound);
  
      } catch(error) {
        setError(error.message);
      }
      setIsLoading(false);
    }, 5000);

  }, []);
  
  useEffect(() => {
    fetchMealHandler();
  }, [fetchMealHandler]);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal._id}
      id={meal._id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  let content = <p>Loading...</p>;
  if (!isLoading && !error) {
    content = <ul>{mealsList}</ul>;
  }
  if(error) {
    content = <p>Something went wrong.</p>
  }
  return (
    <section className={classes.meals}>
     <Card>
      {content}
     </Card>
   </section>
  );
};

export default AvailableMeals;
