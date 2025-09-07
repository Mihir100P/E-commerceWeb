const dummy = [
  {
    name: "Wireless Bluetooth Headphones",
    category: "Electronics",
    price: 59.99,
    image: "https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGVhZHBob25lfGVufDB8fDB8fHww"
  },
  {
    name: "Smartwatch Series 8",
    category: "Electronics",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1660844817855-3ecc7ef21f12?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c21hcnR3YXRjaHxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    name: "Men's Casual Sneakers",
    category: "Footwear",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1668069226492-508742b03147?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFuJTIwZm9vdHdlYXJ8ZW58MHx8MHx8fDA%3D"
  },
  {
    name: "Women's Running Shoes",
    category: "Footwear",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1621996659546-b0dd8b7e57af?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1hbiUyMGZvb3R3ZWFyfGVufDB8fDB8fHww"
  },
  {
    name: "Men's Denim Jacket",
    category: "Clothing",
    price: 79.99,
    image: "https://media.istockphoto.com/id/1185850452/photo/modern-young-guy-sitting-outdoors.webp?a=1&b=1&s=612x612&w=0&k=20&c=3SkodSpFFzZXaMNBMZB39uX0IvYQifse5vD6DWqKkmU="
  },
  {
    name: "Women's Summer Dress",
    category: "Clothing",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Gaming Laptop 16GB RAM",
    category: "Electronics",
    price: 999.99,
    image: "https://images.unsplash.com/photo-1551533257-19e98f46a429?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdhbW1pbmclMjBsYXB0b3B8ZW58MHx8MHx8fDA%3D"
  },
  {
    name: "Portable Bluetooth Speaker",
    category: "Electronics",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1675319245480-215961c129f1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydGFibGUlMjBibHVldG9vdGglMjBzcGVha2VyfGVufDB8fDB8fHww"
  },
  {
    name: "Leather Wallet",
    category: "Accessories",
    price: 24.99,
    image: "https://plus.unsplash.com/premium_photo-1681589453747-53fd893fa420?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Sunglasses Classic",
    category: "Accessories",
    price: 19.99,
    image: "https://media.istockphoto.com/id/1081398784/photo/sunglass-on-white-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=3RzzimuSJ_7YFzdMbIzgmsu7VZ_Qmmk1XFSNcNvk7PQ="
  },
  {
    name: "Yoga Mat Non-Slip",
    category: "Fitness",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1637157216470-d92cd2edb2e8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8eW9nYSUyMG1hdHxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    name: "Dumbbell Set 20kg",
    category: "Fitness",
    price: 59.99,
    image: "https://media.istockphoto.com/id/516415770/photo/rows-of-black-dumbbells-in-gym-center.webp?a=1&b=1&s=612x612&w=0&k=20&c=UF7twD2E39sncX7Xpc1wLZTOhaI_mwnKXUVoMezkLCQ="
  },
  {
    name: "Coffee Mug Ceramic",
    category: "Home & Kitchen",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1610478506025-8110cc8f1986?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29mZmVlJTIwbXVnfGVufDB8fDB8fHww"
  },
  {
    name: "Backpack Travel Bag",
    category: "Accessories",
    price: 49.99,
    image: "https://plus.unsplash.com/premium_photo-1670985781737-c818e03032cc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFnJTIwcGFjayUyMHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D"
  }
];

module.exports = { data: dummy };