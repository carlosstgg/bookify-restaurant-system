import { InventoryItem } from './inventory.models';

export interface Category {
  category_id: number;
  name: string;
}

export interface Recipe {
  recipe_id?: number;
  inventory_id: number;
  quantity_needed: number;
  inventory?: InventoryItem;
}

export interface MenuItem {
  item_id: number;
  name: string;
  description?: string;
  price: number;
  category_id: number;
  available: boolean;
  category?: Category;
  recipes?: Recipe[];
}
