export interface InventoryItem {
    inventory_id: number;
    item_name: string;
    quantity: number;
    unit: string;
    min_quantity?: number;
}
