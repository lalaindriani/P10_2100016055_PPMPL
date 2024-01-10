// ! Dont change this code
const {
  fetchProductsData,
  setProductsCards,
  convertToRupiah,
  countDiscount,
} = require("../src/index.js");
const cartData = require("../src/data/cart.js");


describe('Product API Testing', () => {
  // Mengidentifikasi dan mengatasi masalah di awal siklus hidup pengembangan, 
  // sehingga meningkatkan kualitas dan keandalan produk secara keseluruhan.

  // Uji Kasus 1 (should return product data with id 1)
  test('should return product data with id 1', async () => {

    // Mengambil data produk dengan id 1 menggunakan fungsi fetchProductsData
    const productData = await fetchProductsData(1);
    // Memastikan bahwa properti 'id' dari data produk adalah 1
    expect(productData.id).toBe(1);
    // Memastikan bahwa properti 'title' dari data produk adalah "iPhone 9"
    expect(productData.title).toBe("iPhone 9");
});

  // Uji Kasus 2 (should check products.length with limit)
  test('should check products.length with limit', async () => {

    // Mengambil data produk menggunakan fungsi fetchProductsData
    const productData = await fetchProductsData(); 
    // Mengonversi data produk menjadi kartu produk menggunakan setProductsCards
    const productsCards = setProductsCards(productData.products);
    // Mendapatkan batas (limit) dari data produk
    const limit = productData.limit;
    // Memastikan jumlah kartu produk sama dengan batas yang diharapkan
    expect(productsCards.length).toBe(limit);
});

  // Uji Kasus 3 (should convert price from dollars to rupiah correctly)

  test("should validate product discount calculation", () => {

    // Harga produk
    const price = 100;
    // Persentase diskon
    const discountPercentage = 10;
    // Menghitung harga setelah diskon menggunakan fungsi countDiscount
    const discountedPrice = countDiscount(price, discountPercentage);
    // Memastikan bahwa harga setelah diskon sesuai dengan nilai yang diharapkan (90)
    expect(discountedPrice).toBe(90);
});

// Asyncronous Testing
// https://jestjs.io/docs/asynchronous


// Mocking
// https://jestjs.io/docs/mock-functions

const { fetchCartsData } = require("../src/dataService");

jest.mock("../src/dataservice", () => {
  const originalModule = jest.requireActual("../src/dataservice");
  return {
    ...originalModule,
    __esModule: true,
    fetchCartsData: jest.fn(),
  };
});

// Setup & Teardown
// https://jestjs.io/docs/setup-teardown

describe("Cart API Testing", () => {
  // Memastikan bahwa interaksi antara aplikasi klien (misalnya, aplikasi web atau seluler) dan API server berfungsi seperti yang diharapkan. 

  // Test case 1
  test("should compare total cart items with length of fetched data", async () => {
    
    // Mengatur nilai yang akan dihasilkan oleh fungsi fetchCartsData saat dijalankan
    fetchCartsData.mockResolvedValue(cartData.carts);
    // Mengambil data keranjang secara asinkron menggunakan fetchCartsData
    const cartsData = await fetchCartsData();
    // Menghitung total item dalam keranjang
    const totalItems = cartsData.length;
    // Mendapatkan nilai total item yang diharapkan dari data keranjang
    const expectedTotal = cartData.total;
    // Memastikan bahwa total item sesuai dengan nilai yang diharapkan
    expect(totalItems).toBe(expectedTotal);
  });

  // Test case 2  
  test("should compare total length of carts data with total", async () => {

    // Mengatur nilai yang akan dihasilkan oleh fungsi fetchCartsData saat dijalankan
    fetchCartsData.mockResolvedValue([
        { id: 1, productId: 1, quantity: 1 },
        { id: 2, productId: 2, quantity: 2 },
    ]);
    // Mengambil data keranjang secara asinkron menggunakan fetchCartsData
    const cartsData = await fetchCartsData();
    // Menghitung total jumlah item dalam data keranjang
    const totalLength = cartsData.reduce((acc, cart) => acc + cart.quantity, 0);
    // Memastikan bahwa total jumlah item sesuai dengan nilai yang diharapkan (3)
    expect(totalLength).toBe(3);
  });
});

// Setup & Teardown
// https://jestjs.io/docs/setup-teardown

let productsData; // Variabel untuk menyimpan data produk dari API

// Fetch data produk sebelum menjalankan test suite
beforeAll(async () => {
  productsData = await fetchProductsData();
});

describe("Product Utility Testing", () => {
  // Memastikan bahwa utilitas ini memberikan kontribusi positif terhadap fungsionalitas, keandalan, dan kinerja produk.

  describe("convertToRupiah", () => {
    // Mengubah nilai numerik menjadi string berformat yang mewakili mata uang Rupiah Indonesia

    // Test case 1
    test("should convert 100 dollars into rupiah", () => {

      // Mengonversi 100 dolar ke dalam format Rupiah menggunakan fungsi convertToRupiah
      const priceInRupiah = convertToRupiah(100);
      // Memastikan bahwa hasil konversi sesuai dengan format Rupiah yang diharapkan
      expect(priceInRupiah).toMatch(/Rp\s1\.543\.600,\d{2}/);
      // Memastikan bahwa hasil konversi memiliki tipe data string
      expect(typeof priceInRupiah).toBe("string");
    });

    // Test case 2
    test("should convert 1000 dollars into rupiah", () => {

      // Mengonversi 1000 dolar ke dalam format Rupiah menggunakan fungsi convertToRupiah
      const priceInRupiah = convertToRupiah(1000);
      // Memastikan bahwa hasil konversi sesuai dengan format Rupiah yang diharapkan
      expect(priceInRupiah).toMatch(/Rp\s15\.436\.000,\d{2}/);
  });
    });

  });2
  test("should calculate discount correctly", () => {
    // Test case 1
    // Menguji fungsi countDiscount dengan memberikan harga awal sebesar 100,000 dan persentase diskon sebesar 20%.
    const discountedPrice1 = countDiscount(100000, 20);
    expect(discountedPrice1).toBe(80000);

    // Test case 2
    // Menguji fungsi countDiscount untuk memastikan bahwa perhitungan harga diskon dilakukan dengan benar.
    const discountedPrice2 = countDiscount(75000, 10);
    expect(discountedPrice2).toBe(67500);
  });

  describe("setProductsCards", () => {
    // Mengubah data produk ke dalam format yang sesuai untuk merender kartu produk di antarmuka pengguna.
    
    test("it should return an array of products with specific keys", () => {

      // Mendapatkan array produk yang sudah diformat menjadi kartu produk
      const productsCards = setProductsCards(productsData.products);
      // Mendapatkan kunci (keys) dari produk pertama dalam hasil
      const firstProductKeys = Object.keys(productsCards[0]);
      // Kunci yang diharapkan dalam kartu produk
      const expectedKeys = ["price", "after_discount", "image"];
      // Memastikan kunci produk pertama sesuai dengan yang diharapkan
      expect(firstProductKeys).toEqual(expect.arrayContaining(expectedKeys));
    });
  });
});