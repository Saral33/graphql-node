import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from './queries/products/ProductQuery';

function App() {
  const { data, loading } = useQuery(GET_PRODUCTS);
  console.log({ data });
  return (
    <div>
      {loading ? (
        <div>Loading....</div>
      ) : (
        <div>
          {data?.products?.map((d, index) => (
            <div key={d._id}>
              {index + 1}) {d.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
