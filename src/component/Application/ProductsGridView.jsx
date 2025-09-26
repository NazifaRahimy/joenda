const ProductsGridView = ({products, timeAgo}) => {
  return (
    <div className="products relative grid grid-cols-2  gap-2 w-full">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white w-full relative border d overflow-hidden"
        >
          <img
            src={`https://joyenda-server.onrender.com${product.images[0].url}`}
            className="w-full h-40 object-cover"
            alt={product.product}
          />
          <div className="w-full absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2 flex justify-between items-center">
            <div>
              <h4 className="text-sm font-medium">{product.product}</h4>
              <p className="text-lg font-semibold mt-1">
                {timeAgo(product.createdAt)} - {product.price}$
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ProductsGridView;
