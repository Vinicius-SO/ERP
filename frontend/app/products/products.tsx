'use client'
import { ProductsTable } from  "./table"
import { useItemsContext } from "../items/ItemsContext";



const ProductsDefinition = () => {
  const {items} = useItemsContext()
  const filteredItems = items.filter((item)=>{
    return item.type == 'produto'
  })
  console.log(items)
  return(
    <div className="flex flex-col w-full items-center ">
      <h2 className="w-6/12 my-10 text-3xl text-zinc-800 font-semibold"> Produtos</h2>
      <ProductsTable data={filteredItems}/>
    </div>
  )
}

export default ProductsDefinition