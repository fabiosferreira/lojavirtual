var listaProdutos = null;

$.ajax({
  //url: "https://www.kyliecosmetics.com/products.json",
  //url: "https://www.redbullshopus.com/products.json",
  url: "https://shopicruit.myshopify.com/admin/products.json?page=1&access_token=c32313df0d0ef512ca64d5b336a0d7c6",
  dataType: 'json',  
  async: false,  
  success: function(data) {
    listaProdutos = data.products;        
  }
});
