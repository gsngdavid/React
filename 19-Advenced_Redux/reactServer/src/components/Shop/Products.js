import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {
    id:'p1',
    title:'Test1',
    price:5,
    description:'This is a first product - amazing!'
  },
  {
    id:'p2',
    title:'Test2',
    price:10,
    description:'This is a first product - amazing!'
  },
  {
    id:'p3',
    title:'Test3',
    price:15,
    description:'This is a first product - amazing!'
  },
];


const products = DUMMY_PRODUCTS.map(product => <ProductItem
    key={product.id}
    id={product.id}
    title={product.title}
    price={product.price}
    description={product.description}
  />
);


const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {products}
      </ul>
    </section>
  );
};

export default Products;
