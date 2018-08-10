var listaProdutos = null;

$.ajax({
  url: "http://shopicruit.myshopify.com/products.json",
  dataType: 'json',  
  async: false,  
  success: function(data) {
    listaProdutos = data.products;        
  }
});