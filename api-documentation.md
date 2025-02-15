# 📖 API Documentation for Inventory Management

## 1️⃣ Update Stock & Price (Single)

- **Endpoint:** `PUT /api/vendor/update`
- **Request Body:**
  ```json
  {
    "apparelCode": "A001",
    "size": "M",
    "stock": 10,
    "price": 25.99
  }
  ```
- **Response:**
  ```json
  {
    "status": "success",
    "message": "Stock and price updated successfully"
  }
  ```

## 2️⃣ Bulk Update Stock & Price

- **Endpoint:** `PUT /api/vendor/update/bulk`
- **Request Body:**
  ```json
  {
    "updates": [
      { "apparelCode": "A001", "size": "M", "stock": 10, "price": 25.99 },
      { "apparelCode": "A002", "size": "L", "stock": 5, "price": 30.0 }
    ]
  }
  ```
- **Response:**
  ```json
  {
    "status": "success",
    "message": "Bulk update successful",
    "data": {
      "updatedItems": [...]
    }
  }

  ```

## 3️⃣ Check Order Availability

- **Endpoint:** `POST /api/order/check-availability`
- **Request Body:**

  ```json
  {
    "order": [
      { "apparelCode": "TSHIRT001", "size": "M", "quantity": 2 },
      { "apparelCode": "HOODIE002", "size": "L", "quantity": 1 }
    ]
  }
  ```

- **Response:**
  ```json
  {
    "success": true,
    "message": "Order can be fulfilled",
    "data": {
      "canFulfill": true
    }
  }
  ```

## 4️⃣ Get Lowest Order Cost

- **Endpoint:** `POST /api/order/lowest-cost`
- **Request Body:**

  ```json
  {
    "order": [
      { "apparelCode": "TSHIRT001", "size": "M", "quantity": 2 },
      { "apparelCode": "HOODIE002", "size": "L", "quantity": 1 }
    ]
  }
  ```

- **Response:**
  ```json
  {
      "success": true,
      "message": "Oder can be fulfilled",
      "data": {
          "totalCost": 89.97,
          "breakdown": [...]
      }
  }
  ```
