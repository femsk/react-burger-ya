import styles from './ingredient-details.module.css';

export const IngredientDetails = ({
  ingredient: { image_large: imageUrl, name, calories, carbohydrates, fat, proteins },
}) => {
  return (
    <div className={styles.ingredient_details}>
      <img src={imageUrl} alt={name} className={styles.ingredient_image} />
      <span className="text text_type_main-medium mt-4">{name}</span>
      <div
        className={`${styles.ingredient_specifications} text text_type_main-default mt-8 mb-15`}
      >
        <div className={`${styles.ingredient_specification_item} mr-5`}>
          <span className="text text_type_main-default text_color_inactive">
            Калории,ккал
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {calories}
          </span>
        </div>
        <div className={`${styles.ingredient_specification_item} mr-5`}>
          <span className="text text_type_main-default text_color_inactive">
            Белки, г
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {proteins}
          </span>
        </div>
        <div className={`${styles.ingredient_specification_item} mr-5`}>
          <span className="text text_type_main-default text_color_inactive">
            Жиры, г
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {fat}
          </span>
        </div>
        <div className={`${styles.ingredient_specification_item} `}>
          <span className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {carbohydrates}
          </span>
        </div>
      </div>
    </div>
  );
};
