INSERT INTO customers (
    first_name, last_name, email, phone, address1, address2, city, zip, note, active, created_at, updated_at
) VALUES
    ('John', 'Doe', 'john.doe@example.com', '123-456-7890', '123 Main St', 'Apt 4B', 'Barcelona', '10001', 'Customer since 2020', true, now(), now()),
    ('Jane', 'Smith', 'jane.smith@example.com', '987-654-3210', '456 Oak St', NULL, 'Barcelona', '90001', 'VIP customer', true, now(), now()),
    ('Alice', 'Johnson', 'alice.johnson@example.com', '555-123-4567', '789 Pine St', 'Suite 100', 'Barcelona', '60601', NULL, true, now(), now()),
    ('Bob', 'Brown', 'bob.brown@example.com', '444-555-6666', '321 Maple St', NULL, 'Barcelona', '77001', 'Preferred customer', true, now(), now()),
    ('Charlie', 'Davis', 'charlie.davis@example.com', '222-333-4444', '654 Elm St', 'Floor 2', 'Barcelona', '94101', 'New customer', true, now(), now());