import dynamic from "next/dynamic";
import ProductsDefinition from "./products";


// const DynamicProducts = dynamic(
//   () => import("./products"),{
//     ssr: false
//   })

export default function Products() {
  
  return(
    <ProductsDefinition/>
  );
}