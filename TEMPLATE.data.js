// ===== TEMPLATE — copy this file to create a new series =====
// HOW TO ADD A NEW PRODUCT SERIES (e.g. series 3 through 8):
//
// 1. Copy this file and rename it, e.g. "royal-classic.data.js"
// 2. Copy TEMPLATE-series.html and rename it, e.g. "royal-classic.html"
// 3. In your renamed HTML file, find the line near the bottom:
//      <script src="TEMPLATE.data.js"></script>
//    and change it to:
//      <script src="royal-classic.data.js"></script>
// 4. Create an image folder: /images/series/royal-classic/
//    and put your product photos in it (e.g. 01.jpg, 02.jpg, ...)
// 5. Fill in seriesName, tagline, and the products list below.
// 6. Add a new card on the homepage (index.html) inside the
//    "PLACEHOLDER SERIES SLOTS" comment block in the Products section —
//    uncomment it, fill it in, and point onclick to your new .html file.
//
// That's it — no other files need to change.

const seriesData = {
  seriesName: 'SERIES NAME',       // shown as the big page title
  titleAccentIndex: 1,             // which word (0-based) is highlighted light-blue
  tagline: 'Short description of this collection',
  products: [
    // Copy this block for every product in the series.
    {
      code: 'XXX-001',             // unique product code, also used in search
      name: 'Product Name',
      price: 0,                    // number only, no currency symbol (leave 0 or remove line for "Ask price")
      image: '../images/series/SERIES-FOLDER-NAME/01.jpg',
      details: [
        // Add as many spec rows as you need, or leave the array empty: []
        { label: 'Degree', value: '45°' },
        { label: 'S. Box', value: '36 | M. Box: 216' }
      ]
    },
    {
      code: 'XXX-002',
      name: 'Another Product',
      price: 0,
      image: '../images/series/SERIES-FOLDER-NAME/02.jpg',
      details: []
    }
    // ...add more products here
  ]
};
