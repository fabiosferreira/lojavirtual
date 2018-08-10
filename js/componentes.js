var Produto = React.createClass({
	addToCarrinho: function(e) {
		$.publish('item.adicionado', this.props.data);			    			    
	},

	render: function() {

		var data = this.props.data;

		return (
			<div className="thumbnail">
			<img src={data.images[0].src} alt="produto image" />
			<div>
			<h5 className="produto_titulo"><a href="#">{data.title}</a></h5>
			<div className="produto_preco">R$ {data.variants[0].price}</div>
			<div className="produto_btn">
			<button className='btn btn-primary' onClick={this.addToCarrinho}>
			Comprar
			</button>
			</div>
			</div>
			</div>
			);
	}
});

var Produtos = React.createClass({      	
	render: function(){

		var produtos = this.props.data.map(function(produto) {
			return (
				<li key={produto.id}>
				<Produto data={produto} />
				</li>
				)
		});

		return (
			<ul className="clearfix">
			{produtos}
			</ul>
		);
	}
});


var Carrinho = React.createClass({			

	getInitialState: function() {		      
		$.subscribe('item.adicionado', this.addItem);		      

		return {
			items: [],		        
			total: 0
		};
	},

	addItem: function(e, item) {
		var posicao = this.state.items.indexOf(item);
		if (posicao==-1){
			item.qtde = 1;		
			item.precoTotal = item.variants[0].price;    		
			this.state.items.push(item);
		}else{
			this.state.items[posicao].qtde = this.state.items[posicao].qtde + 1;	
			this.state.items[posicao].precoTotal= this.state.items[posicao].variants[0].price * this.state.items[posicao].qtde;
			this.state.items[posicao].precoTotal = this.state.items[posicao].precoTotal.toFixed(2);	    		
		}

		this.forceUpdate();
		this.countTotal();		      		      
	},		    

	countTotal: function() {
		var total = 0;

		this.state.items.forEach(function(item, index) {
			total += (parseFloat(item.variants[0].price) * item.qtde);
		});

		this.setState({
			total: total
		})
	},

	incrementaQtde: function(item){
		var posicao = this.state.items.indexOf(item);

		this.state.items[posicao].qtde = this.state.items[posicao].qtde + 1;
		this.state.items[posicao].precoTotal = this.state.items[posicao].variants[0].price * this.state.items[posicao].qtde;
		this.state.items[posicao].precoTotal = this.state.items[posicao].precoTotal.toFixed(2);
		this.forceUpdate();
		this.countTotal();
	},

	decrementaQtde: function(item){
		var posicao = this.state.items.indexOf(item);

		this.state.items[posicao].qtde = this.state.items[posicao].qtde - 1;		      	
		this.state.items[posicao].precoTotal = this.state.items[posicao].variants[0].price * this.state.items[posicao].qtde;
		this.state.items[posicao].precoTotal = this.state.items[posicao].precoTotal.toFixed(2);
		if (this.state.items[posicao].qtde == 0){
			this.state.items.splice(posicao, 1);
		}
		this.forceUpdate();
		this.countTotal();
	},

	render: function() {
		var self = this;

		var items = this.state.items.map(function(item) {
			return (
				<tr key={item.id}>
				<td className="carrinho_produto">{item.title}</td>

				<td className="carrinho_qtde">								    
				<button className="btn btn-default btn-qtde" type="button" onClick={self.decrementaQtde.bind(self, item)}>-</button>    			       
				<input className="form-control input_qtde" type="text" value={item.qtde} readOnly="true"></input>
				<button className="btn btn-default btn-qtde" type="button" onClick={self.incrementaQtde.bind(self, item)}>+</button>
				</td>
				<td className="carrinho_preco">R$ {item.variants[0].price}</td>
				<td className="carrinho_preco">R$ {item.precoTotal}</td>
				</tr>
				)
		});

		var body = (	
			<div>		        
			<h3>Itens <i className="fa fa-shopping-cart"></i> ({items.length})
			</h3>	

			<table className="table">
			<thead>
			<tr>
			<th className="carrinho_titulo">Produto</th>
			<th className="carrinho_qtde">Quantidade</th>
			<th className="carrinho_preco">Preço</th>
			<th className="carrinho_preco">Total</th>
			</tr>
			</thead>
			<tbody>
			{items}
			</tbody>
			</table>
			</div>
			);

		var vazio = 
		<div>		        
		<h3>Itens <i className="fa fa-shopping-cart"></i> ({items.length})</h3>	
		</div>

		return (
			<div className="panel panel-default">
			<div className="panel-body">
			{items.length > 0 ? body : vazio}
			<div className="carrinho_total">Total da compra: R$ {this.state.total.toFixed(2)}</div>
			</div>
			</div>
			);
	}
});

ReactDOM.render(<Produtos data={listaProdutos} />, document.getElementById('lista_produtos'));
ReactDOM.render(<Carrinho />, document.getElementById('carrinho'));