-- ================================================================
-- DATABASE INITIALIZATION
-- ================================================================
DROP DATABASE IF EXISTS restaurant_management_db;
CREATE DATABASE restaurant_management_db;
USE restaurant_management_db;

-- ================================================================
-- TABLE: Categories
-- Stores food and drink categories (e.g., Burgers, Drinks, Desserts)
-- ================================================================
CREATE TABLE Categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(80) NOT NULL,

    -- Index for fast category search
    INDEX idx_category_name (name)
) ENGINE=InnoDB;

-- ================================================================
-- TABLE: MenuItems
-- Stores all dishes and beverages offered in the restaurant
-- ================================================================
CREATE TABLE MenuItems (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category_id INT NOT NULL,
    available BOOLEAN DEFAULT TRUE,

    FOREIGN KEY (category_id) REFERENCES Categories(category_id),

    -- Indexes
    INDEX idx_item_name (name),
    INDEX idx_category (category_id)
) ENGINE=InnoDB;

-- ================================================================
-- TABLE: Tables
-- Represents physical restaurant tables
-- ================================================================
CREATE TABLE Tables (
    table_id INT AUTO_INCREMENT PRIMARY KEY,
    table_number INT NOT NULL UNIQUE,
    capacity INT NOT NULL,

    INDEX idx_capacity (capacity)
) ENGINE=InnoDB;

-- ================================================================
-- TABLE: Employees
-- Stores restaurant staff (waiters, chefs, cashiers)
-- ================================================================
CREATE TABLE Employees (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(120) NOT NULL,
    role ENUM('waiter', 'chef', 'cashier', 'manager') NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    phone VARCHAR(20),

    -- Index for staff filtering
    INDEX idx_role (role)
) ENGINE=InnoDB;

-- ================================================================
-- TABLE: Orders
-- Stores customer orders (linked to a waiter and a table)
-- ================================================================
CREATE TABLE Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    table_id INT NOT NULL,
    employee_id INT NOT NULL,
    order_time DATETIME NOT NULL,
    status ENUM('pending', 'in_progress', 'served', 'paid', 'cancelled') DEFAULT 'pending',

    FOREIGN KEY (table_id) REFERENCES Tables(table_id),
    FOREIGN KEY (employee_id) REFERENCES Employees(employee_id),

    -- Indexes
    INDEX idx_status (status),
    INDEX idx_order_time (order_time)
) ENGINE=InnoDB;

-- ================================================================
-- TABLE: OrderItems
-- Stores each dish/drink included in an order
-- ================================================================
CREATE TABLE OrderItems (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    item_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    subtotal DECIMAL(10,2) NOT NULL,

    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (item_id) REFERENCES MenuItems(item_id),

    -- Indexes
    INDEX idx_order (order_id),
    INDEX idx_menu_item (item_id)
) ENGINE=InnoDB;

-- ================================================================
-- TABLE: Inventory
-- Tracks ingredients and resources
-- ================================================================
CREATE TABLE Inventory (
    inventory_id INT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(120) NOT NULL,
    quantity INT NOT NULL,
    unit VARCHAR(20) NOT NULL,
    min_quantity INT DEFAULT 0,

    INDEX idx_inventory_name (item_name)
) ENGINE=InnoDB;

-- ================================================================
-- TABLE: Payments
-- Stores payments made for orders
-- ================================================================
CREATE TABLE Payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_date DATETIME NOT NULL,
    method ENUM('cash', 'card', 'transfer') NOT NULL,

    FOREIGN KEY (order_id) REFERENCES Orders(order_id),

    -- Index for financial filtering
    INDEX idx_payment_date (payment_date)
) ENGINE=InnoDB;
