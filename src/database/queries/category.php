<?php
// database/queries/category.php

namespace App\Database\Queries;

final class Category
{
    public static function getRecipesByCategoryIdQuery(): string
    {
        return "SELECT recipes.*, ingredients.name AS ingredient_name, recipes_has_ingredients.quantity 
        FROM recipes 
        LEFT JOIN recipes_has_ingredients ON recipes.id = recipes_has_ingredients.id_recipe
        LEFT JOIN ingredients ON recipes_has_ingredients.id_ingredient = ingredients.id WHERE category_id = :categoryId";
    }

    public static function getCategoriesQuery(): string
    {
        return "SELECT * FROM category";
    }
    public function getCategoryName($categoryId) {
        $query = "SELECT name FROM category WHERE id = :categoryId";
        $stmt = $this->db->prepare($query);
        $stmt->execute(array(':categoryId' => $categoryId));
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result ? $result['name'] : 'Unknown Category';
    }
}

