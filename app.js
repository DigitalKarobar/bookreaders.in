document.addEventListener("DOMContentLoaded", function () {
    // Function to fetch book data from data.json
    async function fetchBookData() {
      try {
        const response = await fetch("data.json");
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching book data:", error);
        return [];
      }
    }
  
    // Function to populate the categories menu and Best Seller link
    function populateCategoriesMenu(data) {
      const categoriesMenu = document.getElementById("categories-menu");
  
      // Get unique categories from the data
      const categories = [...new Set(data.map(book => book.category))];
  
      // Create menu items for each category
      categories.forEach(category => {
        const li = document.createElement("li");
        li.textContent = category;
        li.addEventListener("click", () => filterBooksByCategory(category, data));
        categoriesMenu.appendChild(li);
      });
  
      // Add Best Seller link
      const bestSellerLink = document.createElement("li");
      bestSellerLink.textContent = "Best Seller";
      bestSellerLink.addEventListener("click", () => filterBestSellerBooks(data));
      categoriesMenu.appendChild(bestSellerLink);
    }
  
    // Function to filter books by category
    function filterBooksByCategory(category, data) {
      const filteredBooks = data.filter(book => book.category === category);
      displayBooks(filteredBooks);
    }
  
    // Function to filter bestseller books
    function filterBestSellerBooks(data) {
      const bestSellerBooks = data.filter(book => book.bestSeller === true);
      displayBooks(bestSellerBooks);
    }
  
    // Function to display books
    function displayBooks(books) {
      const bookList = document.getElementById("book-list");
      bookList.innerHTML = "";
  
      books.forEach(book => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
  
        const bookImageContainer = document.createElement("div");
        bookImageContainer.classList.add("book-image-container");
  
        const bookImage = document.createElement("img");
        bookImage.src = book.imageURL;
        bookImage.alt = book.title;
        bookImage.classList.add("book-cover");
  
        if (book.bestSeller) {
          const bestSellerTag = document.createElement("span");
          bestSellerTag.textContent = "Best Seller";
          bestSellerTag.classList.add("best-seller-tag");
          bookImageContainer.appendChild(bestSellerTag);
        }
  
        const bookTitle = document.createElement("h2");
        bookTitle.textContent = book.title;
  
        const amazonLink = document.createElement("a");
        amazonLink.href = book.amazonLink;
        amazonLink.textContent = "Buy on Amazon";
        amazonLink.classList.add("buy-button");
  
        bookImageContainer.appendChild(bookImage);
        bookCard.appendChild(bookImageContainer);
        bookCard.appendChild(bookTitle);
        bookCard.appendChild(amazonLink);
        bookList.appendChild(bookCard);
      });
    }
  
    // Initial setup - fetch data and populate the menu and book list
    fetchBookData()
      .then(data => {
        populateCategoriesMenu(data);
        displayBooks(data);
      });
  });
  