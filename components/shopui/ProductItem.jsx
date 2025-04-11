
import NextButton from "../common/NextButton";

function ProductItem({ item }) {
  // console.log(item)
  return (
    <div key={item.productId}>

      <div className="mt-10 mb-10">
        <NextButton
          title={item.productName}
          destination={item.productId}
        />
      </div>
    </div>
  );
}

export default ProductItem;
