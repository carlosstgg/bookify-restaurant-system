import { MenuItem } from './menu.models';
import { User } from './auth.models';
import { Table } from './table.models';

export type OrderStatus = 'pending' | 'in_progress' | 'served' | 'paid' | 'cancelled';

export interface OrderItem {
    order_item_id?: number;
    menuItem?: MenuItem;
    item_id: number;
    quantity: number;
    subtotal: number;
}

export interface Order {
    order_id: number;
    table_id: number;
    employee_id: number;
    order_time: string; // ISO date
    status: OrderStatus;
    
    // Relations that might be included
    table?: Table;
    employee?: User;
    orderItems?: OrderItem[];
    // Helper
    total?: number; 
}

export interface CreateOrderRequest {
    table_id: number;
    employee_id: number;
    order_time: string;
    status: OrderStatus;
    orderItems: { item_id: number; quantity: number }[];
}
