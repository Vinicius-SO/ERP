import { Items } from './items/items';
import { columns } from './items/column';

export default function HomePage() {
  return <Items columns={columns} />;
}